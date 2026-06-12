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

        <section className="section testimonial" id="testimonial">
          <blockquote className="testimonial-quote reveal">
            <p>&ldquo;Galactic Fleet has been an embedded part of our engineering team for over three years. When we needed to rewrite our world simulation system in Rust, they worked as a true extension of our team, taking ownership of the hard problems and driving the work forward alongside our engineers. They brought the cloud and AWS expertise we badly needed as a game studio, along with industry-standard CI/CD and AI practices that raised the bar for how we build and ship. They were also the team we trusted when we needed to scale our infrastructure for launch. They made sure the system could handle the pressure on day one. They don&rsquo;t wait to be told what needs fixing; they do it. That&rsquo;s rare in a co-development partner.&rdquo;</p>
            <footer className="testimonial-attribution reveal delay-1">
              <strong>David Pitkin</strong>
              <span>VP of Engineering</span>
              <span>Playable Worlds</span>
            </footer>
          </blockquote>
        </section>

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
