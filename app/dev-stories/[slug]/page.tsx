import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getStories, getStory } from "@/lib/stories";

type Params = { slug: string };

// Turn **bold** and *italic* markers inside a line into real formatting.
function renderInline(text: string, keyBase: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${keyBase}-${i}`}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={`${keyBase}-${i}`}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

// Matches a numbered-list line, e.g. "1. First item".
const ORDERED_ITEM = /^\d+\.\s+/;

// Render a story's article text (see lib/stories.ts for the markers):
//   "## "  -> subheading        "### "  -> smaller subheading
//   "> "   -> pull-quote        "- "    -> bullet list item
//   "1. "  -> numbered list      anything else -> a paragraph
function PostBody({ body }: { body: string }) {
  const lines = body
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Bullet list — group consecutive "- " lines into one <ul>.
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      const k = `list-${key++}`;
      blocks.push(
        <ul key={k}>
          {items.map((it, j) => (
            <li key={`${k}-${j}`}>{renderInline(it, `${k}-${j}`)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list — group consecutive "1." / "2." ... lines into one <ol>.
    if (ORDERED_ITEM.test(line)) {
      const items: string[] = [];
      while (i < lines.length && ORDERED_ITEM.test(lines[i])) {
        items.push(lines[i].replace(ORDERED_ITEM, ""));
        i++;
      }
      const k = `olist-${key++}`;
      blocks.push(
        <ol key={k}>
          {items.map((it, j) => (
            <li key={`${k}-${j}`}>{renderInline(it, `${k}-${j}`)}</li>
          ))}
        </ol>
      );
      continue;
    }

    const k = `line-${key++}`;
    if (line.startsWith("### ")) {
      blocks.push(<h3 key={k}>{renderInline(line.slice(4), k)}</h3>);
    } else if (line.startsWith("## ")) {
      blocks.push(<h2 key={k}>{renderInline(line.slice(3), k)}</h2>);
    } else if (line.startsWith("> ")) {
      blocks.push(<blockquote key={k}>{renderInline(line.slice(2), k)}</blockquote>);
    } else {
      blocks.push(<p key={k}>{renderInline(line, k)}</p>);
    }
    i++;
  }

  return <div className="post-body">{blocks}</div>;
}

export function generateStaticParams(): Params[] {
  return getStories().map((s) => ({ slug: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
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
  const story = getStory(slug);
  if (!story) notFound();
  const stories = getStories();
  const idx = stories.findIndex((s) => s.id === slug);
  const prev = idx > 0 ? stories[idx - 1] : null;
  const next = idx < stories.length - 1 ? stories[idx + 1] : null;

  return (
    <>
      <Header />
      <main className="post">
        <article className="post-inner">
          <p className="post-back">
            <Link href="/dev-stories">← Back to Dev Stories</Link>
          </p>

          <header className="post-head">
            <h1 className="post-title">{story.title}</h1>
            <p className="post-lede">{story.brief}</p>
          </header>

          <div className="post-hero">
            <img
              src={story.cover}
              alt={`${story.title} hero`}
              style={{ objectPosition: story.coverPosition }}
            />
          </div>

          <PostBody body={story.body} />

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
