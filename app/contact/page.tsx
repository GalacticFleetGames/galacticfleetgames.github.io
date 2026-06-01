import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: "Contact · Galactic Fleet" };

const CHANNELS: {
  id: string;
  name: string;
  handle: string;
  url: string;
  logoStyle: CSSProperties;
}[] = [
  {
    id: "github",
    name: "GitHub",
    handle: "github.com/galactic-fleet",
    url: "https://github.com/galactic-fleet",
    logoStyle: { background: "#181717" },
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    handle: "linkedin.com/company/galactic-fleet",
    url: "https://linkedin.com/company/galactic-fleet",
    logoStyle: { background: "#0A66C2" },
  },
  {
    id: "x",
    name: "X · Twitter",
    handle: "@galactic-fleet",
    url: "https://x.com/galactic-fleet",
    logoStyle: { background: "#000000" },
  },
  {
    id: "instagram",
    name: "Instagram",
    handle: "@galactic-fleet",
    url: "https://instagram.com/galactic-fleet",
    logoStyle: {
      backgroundImage:
        "linear-gradient(135deg, #feda75 0%, #fa7e1e 30%, #d62976 60%, #962fbf 80%, #4f5bd5 100%)",
    },
  },
  {
    id: "facebook",
    name: "Facebook",
    handle: "facebook.com/galactic-fleet",
    url: "https://facebook.com/galactic-fleet",
    logoStyle: { background: "#1877F2" },
  },
];

const PLACEHOLDER_ROW_COUNT = 2;

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="contact-page" style={{ background: "#B07F77", color: "#ffffff" }}>
        <section className="contact-hero">
          <h1 className="contact-h1">Get in touch</h1>

          <p className="contact-lede">
            Tell us about the mission. We&rsquo;ll write back within a working day — two,
            if the comms are quiet on the other side of the moon.
          </p>

          <a
            className="contact-primary-email"
            href="mailto:hello@galactic-fleet.com"
          >
            hello@galactic-fleet.com
          </a>

          <p className="contact-location" aria-label="Location and availability">
            <span>Earth Orbit · Sol III</span>
            <span className="dot" aria-hidden="true">
              ·
            </span>
            <span>UTC&nbsp;+0</span>
            <span className="dot" aria-hidden="true">
              ·
            </span>
            <span>Online 24/7</span>
          </p>
        </section>

        <div className="contact-divider" aria-hidden="true"></div>

        <ul className="channel-list" aria-label="Galactic Fleet channels">
          {CHANNELS.map((c) => (
            <li key={c.id} className="channel-row">
              <a
                className="channel-link"
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${c.name} — ${c.handle}`}
              >
                <span className="channel-logo" style={c.logoStyle} aria-hidden="true"></span>
                <span className="channel-text">
                  <span className="channel-name">{c.name}</span>
                  <span className="channel-handle">{c.handle}</span>
                </span>
                <span className="channel-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </li>
          ))}

          {Array.from({ length: PLACEHOLDER_ROW_COUNT }).map((_, i) => (
            <li key={`ph-${i}`} className="channel-row channel-row-placeholder">
              <div className="channel-link channel-link-placeholder" aria-hidden="true">
                <span className="channel-logo channel-logo-placeholder"></span>
                <span className="channel-text">
                  <span className="channel-name">More channels soon</span>
                  <span className="channel-handle">Drop a platform here</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
