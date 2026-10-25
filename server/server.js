import "dotenv/config";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import nodemailer from "nodemailer";
import { projects } from "../src/data/projects.js";

const app = express();
const port = Number(process.env.PORT) || 4000;
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Origin is not allowed by CORS."));
  },
}));
app.use(express.json({ limit: "20kb" }));
app.use("/api/contact", rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many messages. Please try again later." },
}));

app.get("/api/projects", (_req, res) => {
  res.json(projects);
});

app.post("/api/contact", async (req, res, next) => {
  const { name, email, message } = req.body ?? {};
  if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 100) {
    return res.status(400).json({ error: "Name must be between 2 and 100 characters." });
  }
  if (typeof email !== "string" || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }
  if (typeof message !== "string" || message.trim().length < 10 || message.trim().length > 3000) {
    return res.status(400).json({ error: "Message must be between 10 and 3000 characters." });
  }
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.CONTACT_TO_EMAIL) {
    return res.status(503).json({ error: "The contact service is not configured yet. Please email Ali directly." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transporter.sendMail({
      from: `"Portfolio contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: { name: name.trim(), address: email.trim() },
      subject: `Portfolio message from ${name.trim()}`,
      text: `From: ${name.trim()} <${email.trim()}>\n\n${message.trim()}`,
      html: `<p><strong>From:</strong> ${escapeHtml(name.trim())} &lt;${escapeHtml(email.trim())}&gt;</p><p>${escapeHtml(message.trim()).replace(/\n/g, "<br>")}</p>`,
    });
    return res.status(202).json({ message: "Message sent successfully." });
  } catch (error) {
    return next(error);
  }
});

app.use((error, _req, res, _next) => {
  console.error("API request failed:", error);
  if (res.headersSent) return;
  const status = error.message === "Origin is not allowed by CORS." ? 403 : 500;
  return res.status(status).json({
    error: status === 403 ? error.message : "The request could not be completed. Please try again later.",
  });
});

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

app.listen(port, () => {
  console.info(`Portfolio API listening on http://localhost:${port}`);
});
