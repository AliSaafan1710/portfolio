# Ali Saafan — Developer Portfolio

A responsive React portfolio with animated sections, dynamic project data, and an Express API for contact submissions.

## Run locally

```bash
npm install
npm run dev
```

The development command starts both the Vite frontend and Express API together. Vite proxies `/api` requests to `http://127.0.0.1:4000`.

## Contact email setup

Copy `.env.example` to `.env`, then set the SMTP host, port, username, password, and the destination email address. The API returns `503` for valid submissions until SMTP is configured. The contact endpoint is rate-limited and validates all fields on the server.

## API

- `GET /api/projects` returns the featured project data.
- `POST /api/contact` accepts `{ "name": "...", "email": "...", "message": "..." }` and sends it through Nodemailer.

The downloadable resume is served from `public/resume.pdf`.
