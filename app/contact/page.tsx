import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChannelIcon from "@/components/ChannelIcon";
import { contact, channelLogoStyle } from "@/lib/content";

export const metadata: Metadata = { title: "Contact · Galactic Fleet" };

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="contact-page" style={{ background: "#B07F77", color: "#ffffff" }}>
        <section className="contact-hero">
          <h1 className="contact-h1">{contact.heading}</h1>

          <p className="contact-lede">{contact.lede}</p>

          <a
            className="contact-primary-email"
            href={`mailto:${contact.email}`}
          >
            {contact.email}
          </a>

          <p className="contact-location" aria-label="Location and availability">
            <span>{contact.location.place}</span>
            <span className="dot" aria-hidden="true">
              ·
            </span>
            <span>{contact.location.timezone}</span>
            <span className="dot" aria-hidden="true">
              ·
            </span>
            <span>{contact.location.availability}</span>
          </p>
        </section>

        <div className="contact-divider" aria-hidden="true"></div>

        <ul className="channel-list" aria-label="Galactic Fleet channels">
          {contact.channels.map((c) => (
            <li key={c.id} className="channel-row">
              <a
                className="channel-link"
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${c.name} — ${c.handle}`}
              >
                <span className="channel-logo" style={channelLogoStyle(c)} aria-hidden="true">
                  <ChannelIcon id={c.id} />
                </span>
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

          {Array.from({ length: contact.placeholderRowCount }).map((_, i) => (
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
