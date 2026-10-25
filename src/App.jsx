import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bike,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Compass,
  CreditCard,
  Database,
  GraduationCap,
  Github,
  Globe2,
  Images,
  Layers3,
  Linkedin,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Navigation,
  Plane,
  Phone,
  Send,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TicketCheck,
  UsersRound,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { projects as localProjects } from "./data/projects.js";

const navigation = ["About", "Skills", "Experience", "Projects", "Contact"];
const rotatingRoles = [
  "Full Stack Developer",
  "React & Node Systems Engineer",
  "Real-Time Mobility Product Engineer",
];

const skillGroups = [
  {
    title: "Frontend",
    Icon: Code2,
    tone: "cyan",
    skills: [
      "React.js",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Redux Toolkit",
      "Tailwind CSS",
      "HTML & CSS",
      "Material UI",
      "Bootstrap",
      "PWA",
    ],
  },
  {
    title: "Backend & real-time",
    Icon: Server,
    tone: "violet",
    skills: [
      "Node.js",
      "Express.js",
      "Socket.io",
      "REST APIs",
      "JWT",
      "WebSockets",
    ],
  },
  {
    title: "Data & storage",
    Icon: Layers3,
    tone: "teal",
    skills: ["MongoDB", "MySQL", "SQL Server", "Firebase"],
  },
  {
    title: "Mobile",
    Icon: Smartphone,
    tone: "indigo",
    skills: ["React Native", "Flutter"],
  },
  {
    title: "Integrations",
    Icon: Globe2,
    tone: "blue",
    skills: ["Google Maps", "Stripe", "Paymob", "Twilio", "SMS Misr", "Checkr"],
  },
  {
    title: "Tools & foundations",
    Icon: Zap,
    tone: "amber",
    skills: [
      "Git & GitHub",
      "Postman",
      "OOP",
      "SOLID",
      "Data Structures",
      "Algorithms",
    ],
  },
];

const experiences = [
  {
    role: "Full Stack Developer",
    company: "Nofal SEO",
    period: "Oct 2025 — Present",
    current: true,
    points: [
      "Leading backend development for ride-hailing experiences with Node.js, Express.js, and Socket.io.",
      "Built live tracking and chat workflows; integrated Stripe, Paymob, and Checkr driver verification.",
    ],
  },
  {
    role: "Full Stack MERN Developer",
    company: "Meta Codex",
    period: "May 2025 — Sep 2025",
    points: [
      "Delivered responsive React applications with Redux Toolkit state management.",
      "Designed and implemented maintainable REST APIs and scalable MERN features.",
    ],
  },
  {
    role: "Development Internships",
    company: "ITI · Creativa",
    period: "Intensive programs",
    points: [
      "Front-End and Cross-Platform Development training at ITI.",
      ".NET Development training at Creativa.",
    ],
  },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay }}
      style={reduceMotion ? { transform: "none" } : undefined}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRole() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % rotatingRoles.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <motion.span
      key={rotatingRoles[index]}
      className="hero-role"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {rotatingRoles[index]}
    </motion.span>
  );
}

function SectionHeading({ eyebrow, title, accent, description }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">
        <span className="eyebrow-dot" />
        {eyebrow}
      </span>
      <h2>
        {title} <span>{accent}</span>
      </h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    const stored = window.localStorage.getItem("portfolio-theme");
    return stored || "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 24);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.2, 0.5] },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((section) => observer.observe(section));
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="nav-shell mx-auto">
        <a
          className="brand"
          href="#home"
          onClick={closeMenu}
          aria-label="Ali Saafan home"
        >
          <span className="brand-mark">
            A<span>.</span>
          </span>
          <span className="brand-name">
            ALI SAAFAN<span className="brand-role"> / developer</span>
          </span>
        </a>
        <div className="nav-actions">
          <button
            className="menu-toggle"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav
          className={menuOpen ? "main-nav is-open" : "main-nav"}
          aria-label="Main navigation"
        >
          {navigation.map((item) => {
            const target = item.toLowerCase();
            return (
              <a
                key={item}
                href={`#${target}`}
                className={
                  active === target ? "nav-link is-active" : "nav-link"
                }
                onClick={closeMenu}
              >
                {item}
              </a>
            );
          })}
          <a
            className="nav-resume"
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Resume <ArrowUpRight size={14} />
          </a>
        </nav>
      </div>
    </header>
  );
}

function HeroVisual() {
  return (
    <div
      className="hero-visual"
      aria-label="Illustration of a live ride-tracking dashboard"
    >
      <div className="visual-orbit orbit-one" />
      <div className="visual-orbit orbit-two" />
      <div className="visual-glow" />
      <div className="dashboard-card">
        <div className="dashboard-top">
          <div className="dashboard-brand">
            <span className="mini-brand">A</span> saafan
            <span className="mono-label"> / LIVE SYSTEM</span>
          </div>
          <span className="live-indicator">
            <i /> Live
          </span>
        </div>
        <div className="map-canvas">
          <div className="map-grid" />
          <svg
            className="route-path"
            viewBox="0 0 340 214"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M45 161C82 161 72 111 117 111C162 111 141 48 193 48C246 48 215 124 280 124"
              stroke="#0a1423"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M45 161C82 161 72 111 117 111C162 111 141 48 193 48C246 48 215 124 280 124"
              stroke="url(#route-gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="5 7"
            />
            <defs>
              <linearGradient
                id="route-gradient"
                x1="45"
                y1="160"
                x2="280"
                y2="48"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#7C6BFF" />
                <stop offset="1" stopColor="#57E7F4" />
              </linearGradient>
            </defs>
          </svg>
          <span className="map-pin pin-start">
            <span />
          </span>
          <span className="map-pin pin-end">
            <Navigation size={12} />
          </span>
          <span className="map-car">
            <Bike size={15} />
          </span>
          <span className="map-label label-start">PICKUP</span>
          <span className="map-label label-end">DESTINATION</span>
          <div className="map-coordinate mono-label">
            30°02' N&nbsp; 31°14' E
          </div>
        </div>
        <div className="trip-panel">
          <div className="trip-avatar">AS</div>
          <div className="trip-copy">
            <strong>Trip in progress</strong>
            <span>New Cairo · Cairo, EG</span>
          </div>
          <div className="trip-time">
            <strong>04:32</strong>
            <span>ETA</span>
          </div>
        </div>
      </div>
      <div className="floating-chip chip-top">
        <span className="chip-check">
          <Check size={13} />
        </span>
        <span>
          <strong>Driver verified</strong>
          <small>Identity confirmed</small>
        </span>
      </div>
      <div className="floating-chip chip-bottom">
        <span className="chip-pulse">
          <Zap size={14} />
        </span>
        <span>
          <strong>Real-time systems</strong>
          <small>Built to scale</small>
        </span>
      </div>
      <div className="visual-index mono-label">
        01 — 03&nbsp; /&nbsp; ENGINEERED FOR THE REAL WORLD
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="hero section-wrap">
      <div className="hero-copy relative z-10">
        <Reveal>
          <div className="availability">
            <span className="availability-dot" /> Available for select
            opportunities
          </div>
          <div className="hero-heading-block">
            <p className="hero-intro">
              Hi, I’m <span>Ali Saafan</span>
            </p>
            <div className="hero-role-wrap">
              <span className="hero-role-label">Position</span>
              <AnimatedRole />
            </div>
          </div>
          <h1>
            Building digital
            <br />
            experiences that <span className="gradient-text">move</span>
            <span className="hero-period">.</span>
          </h1>
          <p className="hero-description">
            I design and build high-impact web products, real-time systems, and
            scalable APIs that turn complex business ideas into reliable digital
            experiences.
          </p>
          <div className="hero-actions flex flex-wrap">
            <a className="button button-primary" href="#projects">
              Explore projects <ArrowUpRight size={16} />
            </a>
            <a className="button button-quiet" href="#contact">
              Let’s talk <ArrowRight size={16} />
            </a>
          </div>
          <div className="hero-techline">
            <span>Specializing in</span>
            <b>React.js</b>
            <i /> <b>Node.js</b>
            <i /> <b>Real-time systems</b>
          </div>
        </Reveal>
      </div>
      <Reveal className="hero-art" delay={0.12}>
        <HeroVisual />
      </Reveal>
      <a className="scroll-cue mono-label" href="#about">
        <span>SCROLL TO EXPLORE</span>
        <ArrowDown size={14} />
      </a>
      <div className="hero-rail mono-label">
        CAIRO, EGYPT&nbsp; — &nbsp;30.0444° N, 31.2357° E
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-wrap section-block about-section">
      <Reveal>
        <SectionHeading
          eyebrow="A little about me"
          title="Engineering with"
          accent="purpose."
        />
      </Reveal>
      <div className="about-grid">
        <Reveal className="about-story">
          <p className="about-lead">
            I turn complex ideas into <span>products people can rely on.</span>
          </p>
          <p>
            I’m a Full Stack Developer with hands-on experience across the
            JavaScript ecosystem—building fast, accessible frontends and the
            resilient backends behind them.
          </p>
          <p>
            My focus is real-time systems: ride-hailing, live tracking, chat,
            and payment flows. I care about the details that make software
            dependable, from clean APIs to secure third-party integrations.
          </p>
          <div className="about-chips">
            <span>
              <Check size={13} /> Product-minded
            </span>
            <span>
              <Check size={13} /> Detail-oriented
            </span>
            <span>
              <Check size={13} /> Always learning
            </span>
          </div>
        </Reveal>
        <Reveal className="about-side" delay={0.1}>
          <div className="education-card">
            <div className="education-icon">
              <GraduationCap size={19} />
            </div>
            <div className="education-body">
              <span className="card-overline">EDUCATION</span>
              <h3>B.Sc. in Computer Science</h3>
              <p>Menoufia University</p>
              <span className="education-year">2019 — 2022</span>
            </div>
            <ArrowUpRight className="education-arrow" size={17} />
          </div>
          <div className="about-stat-row">
            <div className="about-stat">
              <strong>
                3<span>+</span>
              </strong>
              <small>years building</small>
            </div>
            <div className="stat-divider" />
            <div className="about-stat">
              <strong>3</strong>
              <small>live platforms</small>
            </div>
            <div className="stat-divider" />
            <div className="about-stat">
              <strong>
                24<span>/7</span>
              </strong>
              <small>curiosity</small>
            </div>
          </div>
          <div className="about-note">
            <Sparkles size={15} />
            <span>Good software is invisible. The impact isn’t.</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section-wrap section-block skills-section">
      <Reveal>
        <SectionHeading
          eyebrow="My toolkit"
          title="The right tools for"
          accent="the job."
          description="A practical stack for taking ideas from the first component to production."
        />
      </Reveal>
      <div className="skills-grid">
        {skillGroups.map(({ title, Icon, tone, skills }, index) => (
          <Reveal key={title} delay={index * 0.045}>
            <article className={`skill-card skill-card--${tone}`}>
              <div className="skill-card-head">
                <span className="skill-icon">
                  <Icon size={17} />
                </span>
                <h3>{title}</h3>
                <span className="skill-count mono-label">
                  {String(skills.length).padStart(2, "0")}
                </span>
              </div>
              <div className="skill-list">
                {skills.map((skill) => (
                  <span className="skill-tag" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section
      id="experience"
      className="section-wrap section-block experience-section"
    >
      <Reveal>
        <SectionHeading
          eyebrow="Where I’ve worked"
          title="Experience that"
          accent="ships."
        />
      </Reveal>
      <div className="experience-layout">
        <Reveal className="experience-intro">
          <span className="experience-big mono-label">
            01 <span>/ 03</span>
          </span>
          <h3>Building what’s next, one release at a time.</h3>
          <p>
            From ambitious startups to hands-on training, every step has brought
            me closer to building software that matters.
          </p>
          <a
            href="https://www.linkedin.com/in/ali-saafan-926197209"
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            More on LinkedIn <ArrowUpRight size={14} />
          </a>
        </Reveal>
        <div className="timeline">
          {experiences.map((item, index) => (
            <Reveal key={item.company} delay={index * 0.08}>
              <article className="timeline-item">
                <span
                  className={`timeline-marker${item.current ? " is-current" : ""}`}
                >
                  <span />
                </span>
                <div className="timeline-top">
                  <span className="timeline-period mono-label">
                    {item.period}
                  </span>
                  {item.current && (
                    <span className="current-badge">
                      <i /> CURRENT
                    </span>
                  )}
                </div>
                <h3>{item.role}</h3>
                <div className="timeline-company">
                  <BriefcaseBusiness size={14} /> {item.company}
                </div>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectVisual({ type }) {
  if (type === "hawa") {
    return (
      <div
        className="hawa-showcase"
        aria-label="Hawa Travel web experience and Flutter app preview"
      >
        <div className="hawa-showcase-glow" />
        <div className="hawa-showcase-grid" />
        <div className="hawa-showcase-topline">
          <span>
            <i /> PLATFORM PREVIEW
          </span>
          <span>WEB + FLUTTER</span>
        </div>
        <div className="hawa-device-stage">
          <div className="hawa-browser">
            <div className="hawa-browser-bar">
              <div className="hawa-browser-dots">
                <i />
                <i />
                <i />
              </div>
              <span>hawatravel.com</span>
              <ArrowUpRight size={12} />
            </div>
            <img
              src="/projects/hawa-flights-home.png"
              alt="Hawa Travel desktop flight booking website"
              loading="lazy"
            />
            <span className="hawa-device-label">
              <Globe2 size={11} /> WEB EXPERIENCE
            </span>
          </div>
          <div className="hawa-phone">
            <div className="hawa-phone-screen">
              <div className="hawa-phone-status">
                <span>9:41</span>
                <span>● ● ●</span>
              </div>
              <div className="hawa-phone-brand">
                <span className="hawa-phone-logo">
                  <Plane size={13} />
                </span>
                <span>
                  Hawa <b>travel</b>
                </span>
                <span className="hawa-phone-avatar">A</span>
              </div>
              <div className="hawa-phone-hero">
                <span>YOUR NEXT JOURNEY</span>
                <strong>
                  Explore
                  <br />
                  <b>the world.</b>
                </strong>
                <span className="hawa-phone-plane">
                  <Plane size={42} />
                </span>
              </div>
              <div className="hawa-phone-search">
                <span>
                  DESTINATION <b>Where to?</b>
                </span>
                <i />
                <span>
                  TRAVEL DATES <b>Choose dates</b>
                </span>
                <button type="button" tabIndex={-1}>
                  Explore trips <ArrowUpRight size={10} />
                </button>
              </div>
              <div className="hawa-phone-section">
                <strong>Explore experiences</strong>
                <span>See all</span>
              </div>
              <div className="hawa-phone-categories">
                <span>
                  <Plane size={12} /> Flights
                </span>
                <span>
                  <Building2 size={12} /> Stays
                </span>
                <span>
                  <Compass size={12} /> Tours
                </span>
              </div>
              <div className="hawa-phone-bottom">
                <span>⌂</span>
                <span>♡</span>
                <span>▤</span>
                <span>◉</span>
              </div>
            </div>
            <span className="hawa-device-label">
              <Smartphone size={11} /> FLUTTER APP · UI PREVIEW
            </span>
          </div>
        </div>
        <div className="hawa-showcase-footer">
          <span>
            <i /> MODULAR MONOLITH
          </span>
          <span>ONE PLATFORM · EVERY JOURNEY</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`project-visual project-visual-${type}`}>
      <div className="project-visual-grid" />
      <div className="project-visual-glow" />
      <div className="project-visual-window">
        <div className="window-header">
          <span />
          <span />
          <span />
          <small>LIVE OPERATIONS</small>
          <ArrowUpRight size={12} />
        </div>
        <div className="window-content">
          <div className="window-side">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="window-map">
            <span className="map-street street-one" />
            <span className="map-street street-two" />
            <span className="map-street street-three" />
            <span className="window-route" />
            <span className="window-route-dot dot-a" />
            <span className="window-route-dot dot-b" />
            {type === "delivery" && (
              <span className="window-delivery">
                <Bike size={14} />
              </span>
            )}
            {type === "seda" && <span className="window-seda">S</span>}
          </div>
          <div className="window-data">
            <span />
            <span />
            <span />
            <div />
          </div>
        </div>
        <div className="window-footer">
          <span>
            <i /> SYSTEM ONLINE
          </span>
          <span>
            LATENCY <b>42ms</b>
          </span>
        </div>
      </div>
      <span className="project-visual-caption mono-label">
        REAL-TIME&nbsp; /&nbsp; BUILT TO SCALE
      </span>
    </div>
  );
}

function ArchitectureModal({ project, onClose }) {
  const moduleIcons = [
    Plane,
    Building2,
    TicketCheck,
    Globe2,
    CreditCard,
    UsersRound,
  ];
  const architecture = project.architecture;

  return createPortal(
    <motion.div
      className="architecture-backdrop"
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.section
        className="architecture-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="architecture-title"
        initial={{ opacity: 0, y: 22, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 14, scale: 0.99 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <header className="architecture-header">
          <span className="architecture-header-icon">
            <Layers3 size={18} />
          </span>
          <div>
            <span className="architecture-overline mono-label">
              SYSTEM DESIGN · MODULAR MONOLITH
            </span>
            <h2 id="architecture-title">Inside Hawa Travel</h2>
          </div>
          <button
            className="architecture-close"
            type="button"
            aria-label="Close architecture details"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </header>
        <div className="architecture-body">
          <p className="architecture-summary">{architecture.summary}</p>
          <div className="architecture-flow">
            <span className="architecture-section-label">
              <Workflow size={13} /> REQUEST &amp; DATA FLOW
            </span>
            <div className="architecture-flow-steps">
              {architecture.flow.map((step, index) => (
                <div className="architecture-flow-entry" key={step}>
                  <span
                    className={`architecture-flow-step${index === architecture.flow.length - 1 ? " flow-step-last" : ""}`}
                  >
                    {index === 0 ? (
                      <Smartphone size={14} />
                    ) : index === 1 ? (
                      <LockKeyhole size={14} />
                    ) : index === 2 ? (
                      <Layers3 size={14} />
                    ) : index === 3 ? (
                      <Database size={14} />
                    ) : (
                      <Globe2 size={14} />
                    )}
                    {step}
                  </span>
                  {index < architecture.flow.length - 1 && (
                    <ArrowRight className="architecture-flow-arrow" size={15} />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="architecture-modules-heading">
            <span className="architecture-section-label">
              <Layers3 size={13} /> DOMAIN MODULES
            </span>
            <span>{architecture.modules.length} MODULES</span>
          </div>
          <div className="architecture-modules">
            {architecture.modules.map((module, index) => {
              const Icon = moduleIcons[index % moduleIcons.length];
              return (
                <article className="architecture-module" key={module.name}>
                  <span className="architecture-module-icon">
                    <Icon size={15} />
                  </span>
                  <div>
                    <h3>{module.name}</h3>
                    <p>{module.detail}</p>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="architecture-safeguards">
            <span className="architecture-section-label">
              <ShieldCheck size={13} /> SECURITY &amp; INTEGRITY
            </span>
            <div>
              {architecture.safeguards.map((safeguard) => (
                <span key={safeguard}>
                  <Check size={12} />
                  {safeguard}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="architecture-footer">
          <span>
            Laravel 13 <i /> PHP 8.4 <i /> MySQL <i /> Redis <i /> Flutter
          </span>
          <button type="button" onClick={onClose}>
            Close overview <ArrowRight size={14} />
          </button>
        </footer>
      </motion.section>
    </motion.div>,
    document.body,
  );
}

function ProjectCard({ project }) {
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);
  const [architectureOpen, setArchitectureOpen] = useState(false);
  const screenshots = project.screenshots ?? [];

  useEffect(() => {
    if (!architectureOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setArchitectureOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [architectureOpen]);

  useEffect(() => {
    if (selectedScreenshot === null) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedScreenshot(null);
      if (event.key === "ArrowRight") {
        setSelectedScreenshot((index) => (index + 1) % screenshots.length);
      }
      if (event.key === "ArrowLeft") {
        setSelectedScreenshot(
          (index) => (index - 1 + screenshots.length) % screenshots.length,
        );
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedScreenshot, screenshots.length]);

  return (
    <Reveal
      className={`project-card project-${project.accent}${project.flagship ? " project-flagship" : ""}`}
    >
      <ProjectVisual type={project.visual} />
      <div className="project-content">
        <div className="project-meta">
          <span className="project-number mono-label">
            PROJECT {project.number}
          </span>
          <span className="project-category">{project.category}</span>
          {project.flagship && (
            <span className="flagship-badge">
              <Sparkles size={11} /> FLAGSHIP
            </span>
          )}
        </div>
        <h3>
          {project.name}
          {project.flagship && (
            <span className="hawa-heading-subtitle">
              Complete Travel &amp; Mobility Booking Platform
            </span>
          )}
          <ArrowUpRight size={17} />
        </h3>
        {project.role && (
          <p className="project-role">
            <BriefcaseBusiness size={12} />
            {project.role}
          </p>
        )}
        <p>{project.description}</p>
        {project.features && (
          <div className="hawa-feature-list">
            {project.features.map((feature) => (
              <span key={feature}>
                <Check size={12} />
                {feature}
              </span>
            ))}
          </div>
        )}
        {screenshots.length > 0 && (
          <div className="screenshot-gallery">
            <div className="screenshot-gallery-heading">
              <span>
                <Images size={13} /> APP EXPERIENCE
              </span>
              <span className="screenshot-gallery-count">
                {screenshots.length} SCREENS
              </span>
            </div>
            <div
              className="screenshot-track"
              aria-label={`${project.name} app screenshots`}
            >
              {screenshots.map((screenshot, index) => (
                <button
                  className="screenshot-thumb"
                  key={screenshot.src}
                  type="button"
                  aria-label={`View screenshot: ${screenshot.label}`}
                  onClick={() => setSelectedScreenshot(index)}
                >
                  <span className="screenshot-device">
                    <img
                      src={screenshot.src}
                      alt={screenshot.label}
                      loading="lazy"
                    />
                  </span>
                  <span className="screenshot-thumb-label">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {project.categories && (
          <div className="project-categories" aria-label="Project categories">
            {project.categories.map((category) => (
              <span key={category}>{category}</span>
            ))}
          </div>
        )}
        <div className="project-links">
          {project.apps.map((app) => (
            <a
              href={app.href}
              target="_blank"
              rel="noreferrer"
              className="project-link-primary"
              key={app.href}
            >
              {app.label} <ArrowUpRight size={14} />
            </a>
          ))}
          {project.architecture ? (
            <button
              type="button"
              className="project-link-secondary architecture-trigger"
              onClick={() => setArchitectureOpen(true)}
            >
              Architecture &amp; docs <Layers3 size={14} />
            </button>
          ) : (
            <a
              href="https://github.com/AliSaafan23"
              target="_blank"
              rel="noreferrer"
              className="project-link-secondary"
            >
              Backend architecture <Github size={14} />
            </a>
          )}
        </div>
      </div>
      {architectureOpen && (
        <ArchitectureModal
          project={project}
          onClose={() => setArchitectureOpen(false)}
        />
      )}
      {selectedScreenshot !== null &&
        createPortal(
          <div
            className="screenshot-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} app screenshots`}
            onClick={(event) => {
              if (event.target === event.currentTarget)
                setSelectedScreenshot(null);
            }}
          >
            <button
              className="lightbox-close"
              type="button"
              aria-label="Close screenshot viewer"
              onClick={() => setSelectedScreenshot(null)}
            >
              <X size={18} />
            </button>
            <button
              className="lightbox-arrow lightbox-previous"
              type="button"
              aria-label="Previous screenshot"
              onClick={() =>
                setSelectedScreenshot(
                  (index) =>
                    (index - 1 + screenshots.length) % screenshots.length,
                )
              }
            >
              <ChevronLeft size={22} />
            </button>
            <figure className="lightbox-figure">
              <img
                src={screenshots[selectedScreenshot].src}
                alt={screenshots[selectedScreenshot].label}
              />
              <figcaption>
                <span>{screenshots[selectedScreenshot].label}</span>
                <span>
                  {String(selectedScreenshot + 1).padStart(2, "0")} /{" "}
                  {String(screenshots.length).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
            <button
              className="lightbox-arrow lightbox-next"
              type="button"
              aria-label="Next screenshot"
              onClick={() =>
                setSelectedScreenshot(
                  (index) => (index + 1) % screenshots.length,
                )
              }
            >
              <ChevronRight size={22} />
            </button>
          </div>,
          document.body,
        )}
    </Reveal>
  );
}

function Projects() {
  const [projects, setProjects] = useState(localProjects);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/projects", { signal: controller.signal })
      .then((response) => {
        if (!response.ok)
          throw new Error(`Projects API returned ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          const remoteProjects = new Map(
            data.map((project) => [project.name, project]),
          );
          const bundledNames = new Set(
            localProjects.map((project) => project.name),
          );
          setProjects([
            ...localProjects.map((project) => ({
              ...project,
              ...(remoteProjects.get(project.name) ?? {}),
              number: project.number,
            })),
            ...data.filter((project) => !bundledNames.has(project.name)),
          ]);
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError")
          console.info(
            "Using bundled project data; API is not connected.",
            error,
          );
      });
    return () => controller.abort();
  }, []);

  return (
    <section
      id="projects"
      className="section-wrap section-block projects-section"
    >
      <Reveal>
        <SectionHeading
          eyebrow="Selected work"
          title="Real products."
          accent="Real impact."
          description="A few of the platforms I’ve helped bring to life—from the first API to the final ride."
        />
      </Reveal>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.number} project={project} />
        ))}
      </div>
      <Reveal className="projects-footer">
        <span>Have a challenge in mind?</span>
        <a href="#contact">
          Let’s build something useful <ArrowRight size={15} />
        </a>
      </Reveal>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    setFeedback("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Your message could not be sent.");
      setStatus("success");
      setFeedback("Thanks for reaching out. I’ll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      setFeedback(
        error.message === "Failed to fetch"
          ? "The contact service is unavailable right now. Please email me directly."
          : error.message,
      );
    }
  };

  const links = [
    {
      label: "Email",
      value: "saafanali07@gmail.com",
      href: "mailto:saafanali07@gmail.com",
      Icon: Mail,
    },
    {
      label: "Phone",
      value: "+20 101 870 7520",
      href: "tel:+201018707520",
      Icon: Phone,
    },
    {
      label: "WhatsApp",
      value: "Message me directly",
      href: "https://wa.me/201018707520",
      Icon: MessageCircle,
    },
    {
      label: "LinkedIn",
      value: "Let’s connect",
      href: "https://www.linkedin.com/in/ali-saafan-926197209",
      Icon: Linkedin,
    },
    {
      label: "GitHub",
      value: "Explore my code",
      href: "https://github.com/AliSaafan23",
      Icon: Github,
    },
  ];

  return (
    <section
      id="contact"
      className="section-wrap section-block contact-section"
    >
      <Reveal>
        <SectionHeading
          eyebrow="Have a good one?"
          title="Let’s make it"
          accent="happen."
          description="Have a product idea, an interesting challenge, or just want to say hello? My inbox is open."
        />
      </Reveal>
      <div className="contact-grid">
        <Reveal className="contact-details">
          <div className="contact-location">
            <MapPin size={15} />
            <span>Cairo, Egypt</span>
            <span className="location-dot" /> <span>Available worldwide</span>
          </div>
          <div className="contact-links">
            {links.map(({ label, value, href, Icon }) => (
              <a
                className="contact-link"
                href={href}
                key={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
              >
                <span className="contact-link-icon">
                  <Icon size={16} />
                </span>
                <span className="contact-link-copy">
                  <small>{label}</small>
                  <strong>{value}</strong>
                </span>
                <ArrowUpRight size={14} className="contact-link-arrow" />
              </a>
            ))}
          </div>
          <div className="contact-aside">
            <ShieldCheck size={16} />
            <span>No spam, just a real conversation.</span>
          </div>
        </Reveal>
        <Reveal className="contact-form-wrap" delay={0.1}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-title">
              <span className="form-icon">
                <Send size={16} />
              </span>
              <div>
                <h3>Send me a message</h3>
                <p>I usually reply within 1–2 business days.</p>
              </div>
            </div>
            <label htmlFor="contact-name">Your name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder="Jane Smith"
              autoComplete="name"
              minLength={2}
              maxLength={100}
              required
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
            />
            <label htmlFor="contact-email">Email address</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="jane@company.com"
              autoComplete="email"
              maxLength={254}
              required
              value={form.email}
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })
              }
            />
            <label htmlFor="contact-message">Your message</label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Tell me a little about what you have in mind..."
              minLength={10}
              maxLength={3000}
              rows={4}
              required
              value={form.message}
              onChange={(event) =>
                setForm({ ...form, message: event.target.value })
              }
            />
            {feedback && (
              <p className={`form-feedback ${status}`} role="status">
                {feedback}
              </p>
            )}
            <button
              className="button button-primary form-submit"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending"
                ? "Sending…"
                : status === "success"
                  ? "Message sent"
                  : "Send message"}
              {status === "success" ? (
                <Check size={15} />
              ) : (
                <ArrowUpRight size={15} />
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <a className="footer-brand" href="#home">
          <span className="brand-mark">
            A<span>.</span>
          </span>
          <span>Designed & built with intention.</span>
        </a>
        <span className="footer-copy">
          © {new Date().getFullYear()} Ali Saafan. All rights reserved.
        </span>
        <a className="back-to-top mono-label" href="#home">
          BACK TO TOP <ArrowDown className="back-to-top-icon" size={13} />
        </a>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <div className="site-background" aria-hidden="true">
        <div className="background-grid" />
        <div className="background-glow background-glow-left" />
        <div className="background-glow background-glow-right" />
      </div>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
