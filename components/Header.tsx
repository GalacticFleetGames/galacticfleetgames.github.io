"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const THRESHOLD = 6;
    const TOP_ALWAYS_SHOW = 80;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;

        if (y < TOP_ALWAYS_SHOW) {
          setHidden(false);
        } else if (Math.abs(delta) > THRESHOLD) {
          setHidden(delta > 0);
        }
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const isHidden = hidden && !menuOpen;

  return (
    <>
      <header className={`header ${isHidden ? "header-hidden" : ""}`}>
        <div className="header-inner">
          <Link className="brand" href="/" aria-label="Galactic Fleet — home">
            <img
              src="/assets/galactic-fleet-logo.svg"
              alt="Galactic Fleet"
              className="brand-logo"
            />
          </Link>
          <nav className="nav">
            <Link href="/dev-stories">Dev Stories</Link>
            <Link href="/team">Team</Link>
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
          </nav>
          <Link className="cta-pill" href="/contact">
            Contact us
          </Link>
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <Link href="/dev-stories" onClick={closeMenu}>
          Dev Stories
        </Link>
        <Link href="/team" onClick={closeMenu}>
          Team
        </Link>
        <Link href="/services" onClick={closeMenu}>
          Services
        </Link>
        <Link href="/about" onClick={closeMenu}>
          About
        </Link>
        <Link className="cta-pill" href="/contact" onClick={closeMenu}>
          Contact us
        </Link>
      </div>
    </>
  );
}
