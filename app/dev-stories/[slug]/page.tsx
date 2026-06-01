import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { STORIES } from "@/lib/stories";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return STORIES.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = STORIES.find((s) => s.id === slug);
  return {
    title: story
      ? `${story.title} · Dev Stories · Galactic Fleet`
      : "Story · Galactic Fleet",
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const idx = STORIES.findIndex((s) => s.id === slug);
  if (idx < 0) notFound();
  const story = STORIES[idx];
  const prev = idx > 0 ? STORIES[idx - 1] : null;
  const next = idx < STORIES.length - 1 ? STORIES[idx + 1] : null;

  return (
    <>
      <Header />
      <main className="post">
        <article className="post-inner">
          <p className="post-back">
            <Link href="/dev-stories">← Back to Dev Stories</Link>
          </p>

          <header className="post-head">
            <p className="post-meta">
              <span>{story.date}</span>
              <span aria-hidden="true">·</span>
              <span>{story.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>{story.author}</span>
            </p>
            <h1 className="post-title">{story.title}</h1>
            <p className="post-lede">{story.brief}</p>
          </header>

          <div className="post-hero">
            <img
              src={`/assets/placeholders/${story.id}.svg`}
              alt={`${story.title} hero`}
            />
          </div>

          <div className="post-body">
            <p>
              Placeholder Text Placeholder Text Placeholder Text Placeholder Text
              Placeholder Text Placeholder Text Placeholder Text Placeholder Text
              Placeholder Text Placeholder Text Placeholder Text Placeholder Text
              Placeholder Text Placeholder Text Placeholder Text.
            </p>
            <p>
              Placeholder Text Placeholder Text Placeholder Text Placeholder Text
              Placeholder Text Placeholder Text Placeholder Text Placeholder Text
              Placeholder Text Placeholder Text Placeholder Text.
            </p>
            <h2>A subheading goes here</h2>
            <p>
              Placeholder Text Placeholder Text Placeholder Text Placeholder Text
              Placeholder Text Placeholder Text Placeholder Text Placeholder Text
              Placeholder Text Placeholder Text Placeholder Text Placeholder Text
              Placeholder Text Placeholder Text Placeholder Text Placeholder Text
              Placeholder Text Placeholder Text.
            </p>
            <blockquote>
              &ldquo;Placeholder pull quote — the kind of line the writer thinks
              deserves a wider margin and a bit of air around it.&rdquo;
            </blockquote>
            <p>
              Placeholder Text Placeholder Text Placeholder Text Placeholder Text
              Placeholder Text Placeholder Text Placeholder Text Placeholder Text
              Placeholder Text Placeholder Text Placeholder Text Placeholder Text.
            </p>
            <p>
              Placeholder Text Placeholder Text Placeholder Text Placeholder Text
              Placeholder Text Placeholder Text Placeholder Text Placeholder Text
              Placeholder Text Placeholder Text Placeholder Text Placeholder Text
              Placeholder Text Placeholder Text Placeholder Text.
            </p>
          </div>

          <nav className="post-nav" aria-label="Post navigation">
            {prev ? (
              <Link className="post-nav-link prev" href={`/dev-stories/${prev.id}`}>
                <span className="post-nav-dir">← Previous</span>
                <span className="post-nav-title">{prev.title}</span>
              </Link>
            ) : (
              <span className="post-nav-link prev disabled" aria-hidden="true"></span>
            )}
            {next ? (
              <Link
                className="post-nav-link next"
                href={`/dev-stories/${next.id}`}
                style={{ color: "rgb(20, 35, 68)" }}
              >
                <span className="post-nav-dir">Next →</span>
                <span className="post-nav-title">{next.title}</span>
              </Link>
            ) : (
              <span className="post-nav-link next disabled" aria-hidden="true"></span>
            )}
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}
