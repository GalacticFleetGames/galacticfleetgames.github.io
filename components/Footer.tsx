import Link from "next/link";
import ChannelIcon from "@/components/ChannelIcon";
import { footer, contact, channelLogoStyle } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  const copyright = footer.copyright.replace("{year}", String(year));
  return (
    <footer className="footer" aria-label="Site footer" style={{ height: "200px" }}>
      <div className="footer-inner">
        <div className="footer-top">
          <Link className="footer-brand" href="/" aria-label="Galactic Fleet — home">
            <img src="/assets/galactic-fleet-logo.svg" alt="Galactic Fleet" />
          </Link>

          <nav className="footer-nav" aria-label="Footer navigation">
            <Link href="/dev-stories">Dev Stories</Link>
            <Link href="/team">Team</Link>
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
          </nav>

          <Link className="cta-pill footer-cta" href="/contact">
            Contact us
          </Link>
        </div>

        <div className="footer-divider" aria-hidden="true"></div>

        <div className="footer-bottom">
          <p className="footer-copy">
            {copyright}
            <Link className="footer-minigame" href="/play">
              {footer.minigameLabel}
            </Link>
          </p>
          <div className="footer-socials" aria-label="Social channels">
            {contact.channels.map((c) => (
              <a
                key={c.id}
                className="social-slot"
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={c.name}
                style={channelLogoStyle(c)}
              >
                <ChannelIcon id={c.id} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
