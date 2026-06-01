import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { STORIES } from "@/lib/stories";

export const metadata: Metadata = { title: "Dev Stories · Galactic Fleet" };

export default function DevStoriesIndex() {
  return (
    <>
      <Header />
      <main className="ds-list-page" style={{ background: "#8A6770", color: "#ffffff" }}>
        <div className="ds-list-inner">
          <header className="ds-list-head">
            <p className="ds-list-eyebrow">Field notes from orbit</p>
            <h1 className="ds-list-title">Dev Stories</h1>
          </header>

          <ol className="story-list" aria-label="All dev stories">
            {STORIES.map((s) => (
              <li key={s.id} className="story-row">
                <Link
                  className="story-row-thumb"
                  href={`/dev-stories/${s.id}`}
                  aria-label={`Open ${s.title}`}
                >
                  <img
                    src={`/assets/placeholders/${s.id}.svg`}
                    alt={`${s.title} cover`}
                  />
                </Link>
                <div className="story-row-content">
                  <p className="story-row-meta">
                    <span>{s.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{s.readTime}</span>
                  </p>
                  <h2 className="story-row-title">
                    <Link href={`/dev-stories/${s.id}`}>{s.title}</Link>
                  </h2>
                  <p className="story-row-brief">{s.brief}</p>
                  <Link className="read-btn" href={`/dev-stories/${s.id}`}>
                    read
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </main>
      <Footer />
    </>
  );
}
