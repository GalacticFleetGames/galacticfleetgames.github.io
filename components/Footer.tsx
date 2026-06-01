import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
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
            © {year} Galactic Fleet — All systems nominal.
            <Link className="footer-minigame" href="/play">
              Minigame
            </Link>
          </p>
          <div className="footer-socials" aria-label="Social channels">
            <a className="social-slot" href="#" aria-label="Social channel 1"></a>
            <a className="social-slot" href="#" aria-label="Social channel 2"></a>
            <a className="social-slot" href="#" aria-label="Social channel 3"></a>
            <a className="social-slot" href="#" aria-label="Social channel 4"></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
