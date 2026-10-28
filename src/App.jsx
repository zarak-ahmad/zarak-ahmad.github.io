import { useState } from "react";
import Hero from "./Hero.jsx";
import {
  certificates,
  education,
  experience,
  languages,
  profile,
  projects,
  skillGroups,
} from "./content.js";

function BrandIcon({ name }) {
  const key = name.toLowerCase();

  if (key === "github") {
    return (
      <svg className="brand-icon github" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
        />
      </svg>
    );
  }

  if (key === "upwork") {
    return (
      <svg className="brand-icon upwork" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"
        />
      </svg>
    );
  }

  if (key === "linkedin") {
    return (
      <svg className="brand-icon linkedin" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
        />
      </svg>
    );
  }

  return null;
}

function BrandLink({ href, label }) {
  return (
    <a className="brand-link" href={href} target="_blank" rel="noreferrer">
      <BrandIcon name={label} />
      <span>{label}</span>
    </a>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const from = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const body = `${message}\n\n— ${name}\n${from}`;
    const href = `mailto:${profile.email}?subject=${encodeURIComponent(
      `Portfolio note from ${name}`
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
    window.location.href = href;
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <label>
        Name
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Message
        <textarea name="message" rows="5" required />
      </label>
      <button className="contact-pill contact-pill-solid" type="submit">
        {sent ? "Opening email" : "Send a note"}
      </button>
    </form>
  );
}

export default function App() {
  return (
    <>
      <Hero />
      <main>
        <section id="about" className="section about">
          <div className="about-photo">
            <img src="/portrait.png" alt="Portrait of Zarak Ahmad" />
          </div>
          <div>
            <p className="kicker">About</p>
            <h2>Full stack, from the screen to the database.</h2>
            <p className="lede">
              I&apos;m Zarak Ahmad, a full-stack developer in Islamabad. I
              take a product from the screen to the database: React on the
              front, Node and Express or Laravel on the back, and access
              rules that match how the business actually works.
            </p>
            <p>
              I work at Naxovate Technologies on web applications, including
              AI-integrated features. Alongside that I&apos;ve built a
              library system with three role-based portals and a Laravel
              inventory and point-of-sale app. I&apos;m completing a B.S. in
              Computer Science at Virtual University of Pakistan.
            </p>
            <dl className="facts">
              <div>
                <dt>Based in</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt>Languages</dt>
                <dd>{languages.join(", ")}</dd>
              </div>
              <div>
                <dt>Stack</dt>
                <dd>MERN, Laravel, and TypeScript</dd>
              </div>
            </dl>
            <div className="profile-links">
              <BrandLink href={profile.linkedin} label="LinkedIn" />
              <BrandLink href={profile.github} label="GitHub" />
              <BrandLink href={profile.upwork} label="Upwork" />
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <p className="kicker">Skills</p>
          <h2>The stack I ship with.</h2>
          <div className="skill-grid">
            {skillGroups.map((group) => (
              <article key={group.label}>
                <h3>{group.label}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="section">
          <p className="kicker">Work</p>
          <h2>Selected projects.</h2>
          <div className="projects">
            {projects.map((project) => (
              <article key={project.index} className="project">
                <span>{project.index}</span>
                <div>
                  <h3>{project.title}</h3>
                  <p className="stack">{project.stack}</p>
                  <p>{project.summary}</p>
                  {project.links?.length ? (
                    <div className="project-links">
                      {project.links.map((link) => (
                        <BrandLink
                          key={link.label}
                          href={link.href}
                          label={link.label}
                        />
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section experience">
          <div>
            <p className="kicker">Experience</p>
            <h2>Where I&apos;ve been building.</h2>
            <div className="jobs">
              {experience.map((job) => (
                <article className="job" key={job.company}>
                  <p className="when">{job.when}</p>
                  <h3>{job.role}</h3>
                  <p className="where">{job.company}</p>
                  <ul>
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
          <div className="side-lists">
            <div>
              <p className="kicker">Education</p>
              <ul className="plain-list">
                {education.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}</strong>
                    <span>{item.place}</span>
                    <span>{item.when}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="kicker">Certificates</p>
              <ul className="plain-list">
                {certificates.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}</strong>
                    {item.place ? <span>{item.place}</span> : null}
                    <span>{item.when}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div>
            <p className="kicker">Contact</p>
            <h2>Tell me about the product.</h2>
            <p className="lede">
              For a role, a build, or a question, message me on WhatsApp,
              email, or call.
            </p>
            <div className="contact-links">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <span className="phone-line">
                <a href={profile.phoneHref}>{profile.phoneDisplay}</a>
                <a
                  className="wa-icon"
                  href={profile.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`WhatsApp ${profile.phoneDisplay}`}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M20.5 3.5A11 11 0 0 0 2.1 17.8L1 23l5.3-1.1A11 11 0 0 0 12 23a11 11 0 0 0 8.5-19.5zM12 21a9 9 0 0 1-4.6-1.3l-.3-.2-3.1.8.8-3-.2-.3A9 9 0 1 1 12 21zm5-6.7c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.5 4 15 15 0 0 0 1.5.6 3.6 3.6 0 0 0 1.7.1 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3z"
                    />
                  </svg>
                </a>
              </span>
              <BrandLink href={profile.linkedin} label="LinkedIn" />
              <BrandLink href={profile.github} label="GitHub" />
              <BrandLink href={profile.upwork} label="Upwork" />
              <p>{profile.location}</p>
            </div>
          </div>
          <ContactForm />
        </section>
      </main>
      <footer className="footer">
        <span>{profile.name}</span>
        <span>{profile.role}</span>
      </footer>
    </>
  );
}
