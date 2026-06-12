import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getStories } from "@/lib/stories";
import { devStories } from "@/lib/content";

export const metadata: Metadata = { title: "Dev Stories · Galactic Fleet" };

export default function DevStoriesIndex() {
  return (
    <>
      <Header />
      <main className="ds-list-page" style={{ background: "#8A6770", color: "#ffffff" }}>
        <div className="ds-list-inner">
          <header className="ds-list-head">
            <p className="ds-list-eyebrow">{devStories.eyebrow}</p>
            <h1 className="ds-list-title">{devStories.title}</h1>
          </header>

          <ol className="story-list" aria-label="All dev stories">
            {getStories().map((s) => (
              <li key={s.id} className="story-row">
                <Link
                  className="story-row-thumb"
                  href={`/dev-stories/${s.id}`}
                  aria-label={`Open ${s.title}`}
                >
                  <img
                    src={s.cover}
                    alt={`${s.title} cover`}
                    style={{ objectPosition: s.coverPosition }}
                  />
                </Link>
                <div className="story-row-content">
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
