import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CosmicBackground from "@/components/CosmicBackground";
import ScrollReveal from "@/components/ScrollReveal";
import DevStoriesCarousel from "@/components/DevStoriesCarousel";
import RocketInvite from "@/components/RocketInvite";

export default function Home() {
  return (
    <>
      <CosmicBackground />
      <RocketInvite />
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
              Placeholder Text Placeholder Text Placeholder Text Placeholder Text
            </p>
          </div>
        </section>

        <section className="section about" id="about">
          <div className="about-copy">
            <h2 className="about-title reveal">About</h2>
            <p className="about-body reveal delay-1">
              Placeholder Text Placeholder Text Placeholder Text Placeholder Text
              Placeholder Text Placeholder Text Placeholder Text Placeholder Text
            </p>
            <Link className="btn-slate reveal delay-2" href="/about">
              More
            </Link>
          </div>
          <div className="about-image reveal delay-1">
            <img src="/assets/placeholders/about.svg" alt="About Galactic Fleet" />
          </div>
        </section>

        <DevStoriesCarousel />

        <section className="section contact" id="contact">
          <h2 className="reveal">Contact Us</h2>
          <div className="contact-pill reveal delay-1">
            <div className="icon-slot" aria-hidden="true"></div>
            <div className="icon-slot" aria-hidden="true"></div>
            <div className="icon-slot" aria-hidden="true"></div>
            <div className="icon-slot" aria-hidden="true"></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
