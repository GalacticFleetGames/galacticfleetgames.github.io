import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { services } from "@/lib/content";

export const metadata: Metadata = { title: "Services · Galactic Fleet" };

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="services-page" style={{ background: "#C98B7E", color: "#ffffff" }}>
        <div className="services-inner">
          <header className="services-head">
            <h1 className="services-title">{services.title}</h1>
            {services.intro ? (
              <p className="services-intro">{services.intro}</p>
            ) : null}
          </header>

          <ul className="services-grid">
            {services.items.map((s) => (
              <li key={s.title} className="service-card">
                <h2 className="service-name">{s.title}</h2>
                <p className="service-desc">{s.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
