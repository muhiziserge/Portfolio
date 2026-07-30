import Link from "next/link";
import { Fragment } from "react";
import { Nav } from "@/components/nav";
import { projects } from "@/lib/projects";

const SIGNAL_ITEMS = [
  "GOVERNMENT",
  "HEALTH",
  "AGRICULTURE",
  "ENTERPRISE DATA",
  "WORKFORCE",
];

const STRENGTHS = [
  {
    label: "Process",
    text: "End-to-end ownership — research, flows, systems, prototypes, and the handoff that makes it ship.",
  },
  {
    label: "Data-heavy UI",
    text: "Dashboards, monitoring portals, and conditional-logic forms across health, agriculture, and enterprise operations.",
  },
  {
    label: "AI-native workflow",
    text: "Figma's AI agent, Claude, and vibe-coded prototypes as a standard part of how I design and validate ideas.",
  },
  {
    label: "Design systems",
    text: "Built the IremboAI chatbot design system from Figma components through to a working Angular demo.",
  },
  {
    label: "Team & mentorship",
    text: "Absorbed and grew a second design team; built a structured, rubric-based hiring process for senior designers.",
  },
];

export default function Home() {
  return (
    <>
      <Nav />

      <div className="signal">
        <div className="signal-track">
          <span>
            <span className="signal-dot" />
            SYSTEMS DESIGNED FOR
          </span>
          {SIGNAL_ITEMS.map((item) => (
            <Fragment key={item}>
              <span className="signal-sep">/</span>
              <span className="signal-item">{item}</span>
            </Fragment>
          ))}
        </div>
      </div>

      <header className="hero wrap">
        <p className="eyebrow">Product Designer · Kigali, Rwanda</p>
        <h1>Design for the infrastructure people actually depend on.</h1>
        <p className="lede">
          Nine years designing the government, health, agriculture, and enterprise
          platforms that sit underneath everyday life for millions of people — mostly
          across Rwanda, mostly the kind of data-heavy, high-stakes systems that don&apos;t
          get to be wrong.
        </p>
        <div className="hero-meta">
          <span>
            Currently <strong>Lead Product Designer, Irembo</strong>
          </span>
          <span>9 yrs experience</span>
          <span>Grown &amp; led design teams</span>
        </div>
      </header>

      <section className="section" id="work">
        <div className="wrap">
          <div className="section-head">
            <h2>Selected work</h2>
            <p className="section-note">
              Organized by the system, not the calendar — each one turns something
              operational into something legible.
            </p>
          </div>
          <div className="grid">
            {projects.map((project) => (
              <Link key={project.slug} className="card" href={`/work/${project.slug}`}>
                <span className="card-domain">{project.domain}</span>
                <h3>{project.cardTitle}</h3>
                <p>{project.cardDescription}</p>
                <span className="card-foot">
                  View case study <span className="arrow">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="wrap">
          <div className="section-head">
            <h2>About</h2>
          </div>
          <div className="about-copy">
            <p>
              I design the interfaces that sit on top of complicated, real-world
              operations — government services, clinical workflows, export supply
              chains, field workforces — and make them usable by the people who depend
              on them, often people coming online for the first time.
            </p>
            <p>
              At Irembo, Rwanda&apos;s national digital public services company, I lead
              end-to-end product design across IremboGov and TeleClinic. Before that,
              I&apos;ve owned design across enterprise data platforms, agriculture
              traceability systems, fleet management, and HR tooling for blue-collar
              workforces — and grown and led design teams along the way.
            </p>
          </div>

          <div className="divider-list" style={{ marginTop: 48 }}>
            {STRENGTHS.map((s) => (
              <div className="divider-row" key={s.label}>
                <span className="label">{s.label}</span>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer" id="contact">
        <div className="wrap">
          <h2>Let&apos;s talk about what you&apos;re building.</h2>
          <div className="footer-links">
            <a href="mailto:s.muhizi.01@gmail.com">s.muhizi.01@gmail.com</a>
            <a href="tel:+250782774572">+250 782 774 572</a>
            <a href="https://linkedin.com/in/muhizi-serge" target="_blank" rel="noopener">
              linkedin.com/in/muhizi-serge
            </a>
          </div>
        </div>
        <div className="wrap footer-base">
          © 2026 Serge Muhizi. Built with intent, not a template.
        </div>
      </footer>
    </>
  );
}
