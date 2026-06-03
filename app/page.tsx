import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CosmicBackground from "@/components/CosmicBackground";
import ScrollReveal from "@/components/ScrollReveal";
import DevStoriesCarousel from "@/components/DevStoriesCarousel";
import ChannelIcon from "@/components/ChannelIcon";
import { home, contact, channelLogoStyle } from "@/lib/content";

export default function Home() {
  return (
    <>
      <CosmicBackground />
      <ScrollReveal />
      <Header />
      <main>
        <section className="section hero" id="top">
          <div className="hero-content">
            <img
              className="hero-logo reveal"
              src="/assets/galactic-fleet-logo.svg"
              alt="Galactic Fleet"
            />
            <p className="hero-placeholder reveal delay-1">
              {home.heroTagline}
            </p>
          </div>
        </section>

        <section className="section about" id="about">
          <div className="about-copy">
            <h2 className="about-title reveal">{home.about.title}</h2>
            <p className="about-body reveal delay-1">{home.about.body}</p>
            <Link className="btn-slate reveal delay-2" href="/about">
              {home.about.buttonLabel}
            </Link>
          </div>
          <div className="about-image reveal delay-1">
            <img src="/assets/placeholders/about.svg" alt="About Galactic Fleet" />
          </div>
        </section>

        <DevStoriesCarousel />

        <section className="section contact" id="contact">
          <h2 className="reveal">{home.contactHeading}</h2>
          <div className="contact-pill reveal delay-1">
            {contact.channels.map((c) => (
              <a
                key={c.id}
                className="icon-slot icon-slot-link"
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
        </section>
      </main>
      <Footer />
    </>
  );
}
