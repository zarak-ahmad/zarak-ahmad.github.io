import { useEffect, useRef, useState } from "react";
import Portrait from "./Portrait.jsx";
import { nav, profile } from "./content.js";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const FINAL = profile.word;
const NAME = profile.nameWord;
const NAME_AT = Math.floor((FINAL.length - NAME.length) / 2);

function randomGlyph() {
  return GLYPHS[(Math.random() * GLYPHS.length) | 0];
}

function frameText(elapsed) {
  const slots = Array.from({ length: FINAL.length }, () => "");

  if (elapsed < 1150) {
    const appear = Math.min(1, Math.max(0, (elapsed - 180) / 780));
    for (let i = 0; i < NAME.length; i += 1) {
      const slot = i + NAME_AT;
      const lockAt = (i + 1) / NAME.length;
      slots[slot] = appear >= lockAt ? NAME[i] : randomGlyph();
    }
    return slots;
  }

  const morph = Math.min(1, (elapsed - 1150) / 1450);
  for (let i = 0; i < FINAL.length; i += 1) {
    const lockAt = (i + 0.35) / FINAL.length;
    slots[i] = morph >= lockAt ? FINAL[i] : randomGlyph();
  }
  return slots;
}

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

export default function Hero() {
  const portraitRef = useRef(null);
  const navRef = useRef(null);
  const metaRef = useRef(null);
  const cueRef = useRef(null);
  const rafRef = useRef(0);
  const finishRef = useRef(() => {});
  const [slots, setSlots] = useState(() => Array.from({ length: FINAL.length }, () => ""));
  const [locked, setLocked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    let finished = false;

    const applyChrome = (amount) => {
      const fade = String(amount);
      const shift = `${(1 - amount) * 12}px`;
      if (navRef.current) {
        navRef.current.style.opacity = fade;
        navRef.current.style.transform = `translateY(${shift})`;
      }
      if (metaRef.current) {
        metaRef.current.style.opacity = fade;
        metaRef.current.style.transform = `translateY(${shift})`;
      }
      if (cueRef.current) cueRef.current.style.opacity = amount > 0.95 ? "1" : "0";
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(rafRef.current);
      if (cancelled) return;
      setSlots(FINAL.split(""));
      setLocked(true);
      setDone(true);
      applyChrome(1);
      portraitRef.current?.setProgress(1);
      document.body.style.overflow = "";
    };

    finishRef.current = finish;

    const start = () => {
      if (cancelled || finished) return;
      if (reduce) {
        finish();
        return;
      }

      document.body.style.overflow = "hidden";
      const started = performance.now();
      let lastText = 0;
      let settled = false;

      const tick = (now) => {
        if (cancelled) return;
        const elapsed = now - started;

        if (!settled && (now - lastText > 48 || elapsed > 2600)) {
          setSlots(frameText(elapsed));
          lastText = now;
        }
        if (!settled && elapsed > 2650) {
          settled = true;
          setSlots(FINAL.split(""));
          setLocked(true);
        }

        const portraitProgress = clamp01((elapsed - 1450) / 1700);
        portraitRef.current?.setProgress(1 - (1 - portraitProgress) ** 2);
        applyChrome(clamp01((elapsed - 2500) / 800));

        if (elapsed < 3900) rafRef.current = requestAnimationFrame(tick);
        else finish();
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    const onSkip = (event) => {
      if (event.type === "keydown" && event.key !== "Escape" && event.key !== "Enter") return;
      finish();
    };

    document.fonts.ready.then(() => {
      if (!cancelled) window.setTimeout(start, 160);
    });
    window.addEventListener("keydown", onSkip);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onSkip);
      finishRef.current = () => {};
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (window.scrollY < 80) setActive("home");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = nav.filter((item) => item.id !== "home");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="hero" id="home">
      <header ref={navRef} className={`nav${scrolled ? " is-scrolled" : ""}`}>
        <a className="brand" href="#home">
          {profile.name}
        </a>
        <button
          className="menu-btn"
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
        <nav className={menuOpen ? "is-open" : ""} aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={active === item.id ? "is-active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <Portrait ref={portraitRef} />

      <div className="lockup">
        <h1 className={`word${locked ? " is-locked" : ""}`} aria-label="Portfolio">
          {slots.map((glyph, index) => (
            <span key={index} className={glyph ? "is-on" : ""} data-i={index}>
              {glyph || "M"}
            </span>
          ))}
        </h1>
        <div ref={metaRef} className="lockup-meta">
          <p>{profile.role}</p>
          <a
            className="contact-pill contact-pill-solid"
            href={profile.whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
          <a className="contact-pill" href="#contact">
            Contact
          </a>
        </div>
      </div>

      <button
        className={`skip${done ? " is-hidden" : ""}`}
        type="button"
        onClick={() => finishRef.current()}
      >
        Skip intro
      </button>

      <a ref={cueRef} className="scroll-cue" href="#about">
        Scroll
      </a>
    </section>
  );
}
