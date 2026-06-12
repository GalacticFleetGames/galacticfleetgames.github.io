// ============================================================================
//  DEV STORIES / BLOG POSTS  —  loaded from Markdown files.
// ============================================================================
//
//  Every post is ONE Markdown file in   content/stories/<id>.md
//  The filename becomes the URL:  content/stories/casim.md -> /dev-stories/casim
//
//  Each file starts with a small details block between two --- lines
//  (the "frontmatter"), followed by the article text:
//
//        ---
//        title: My Post Headline
//        brief: One-line summary shown on cards and the list page.
//        order: 4
//        ---
//
//        The article starts here. Write freely — no quotes or brackets.
//
//  Frontmatter fields (one per line, "name: value"):
//        title          the post headline.
//        brief          one-line summary (shown on cards, list, and post intro).
//        order          posts are sorted by this number, lowest first.
//        cover          OPTIONAL cover image path. Defaults to
//                       /assets/placeholders/<id>.svg — only add this line if
//                       your image is a .png/.jpg or has a different name,
//                       e.g.  cover: /assets/placeholders/lookingup.png
//        coverPosition  OPTIONAL — which part of the cover stays visible when
//                       it's cropped to fit. Default is "center". Use "left",
//                       "right", "top", "bottom", or a pair like "25% 50%".
//        draft          set to true to hide the post from the site entirely.
//
//  Article formatting markers (below the closing ---):
//        ## Heading        ### Smaller heading        > Pull-quote
//        **bold**          *italic*        - bullet item        1. numbered
//  Leave a blank line between paragraphs.
//
//  TO ADD A POST:    create content/stories/<new-id>.md with a block like the
//                    one above, and drop a cover image at
//                    public/assets/placeholders/<new-id>.svg
//  TO REMOVE A POST: delete its .md file — or add  draft: true  to its
//                    frontmatter to keep it around unpublished.
// ============================================================================
//
//  NOTE FOR DEVELOPERS: this module reads the filesystem, so it is
//  server-only (pages, generateStaticParams, ...). Client components may only
//  import the Story TYPE from here:  import type { Story } from "@/lib/stories"

import { readdirSync, readFileSync } from "fs";
import path from "path";

export type Story = {
  id: string; // filename without .md -> the URL slug
  title: string;
  brief: string;
  cover: string; // resolved cover image URL (frontmatter `cover` or default)
  coverPosition?: string;
};

const STORIES_DIR = path.join(process.cwd(), "content", "stories");

type Frontmatter = Record<string, string>;

// Split a file into its frontmatter block and the article body. Forgiving by
// design: files without a frontmatter block (or with an unclosed one) are
// treated as all body, and frontmatter lines that aren't "name: value" are
// skipped rather than rejected.
function splitFrontmatter(raw: string): { meta: Frontmatter; body: string } {
  const lines = raw.replace(/^\uFEFF/, "").split(/\r?\n/); // strip BOM if present
  if (lines[0]?.trim() !== "---") return { meta: {}, body: raw };

  const meta: Frontmatter = {};
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === "---") {
      return { meta, body: lines.slice(i + 1).join("\n") };
    }
    // Split on the FIRST colon only, so values may contain colons
    // (e.g.  title: Looking Up: Our First Game).
    const sep = lines[i].indexOf(":");
    if (sep === -1) continue;
    const key = lines[i].slice(0, sep).trim();
    let value = lines[i].slice(sep + 1).trim();
    // Surrounding quotes are allowed but not required.
    if (value.length >= 2 && (value[0] === '"' || value[0] === "'") && value.endsWith(value[0])) {
      value = value.slice(1, -1);
    }
    if (key) meta[key] = value;
  }
  return { meta: {}, body: raw };
}

type LoadedStory = Story & { order: number; draft: boolean; body: string };

function loadStory(file: string): LoadedStory {
  const id = file.replace(/\.md$/, "");
  const raw = readFileSync(path.join(STORIES_DIR, file), "utf8");
  const { meta, body } = splitFrontmatter(raw);
  const order = Number(meta.order);
  return {
    id,
    title: meta.title || id,
    brief: meta.brief || "",
    cover: meta.cover || `/assets/placeholders/${id}.svg`,
    coverPosition: meta.coverPosition || undefined,
    order: Number.isFinite(order) ? order : Infinity, // unordered posts go last
    draft: (meta.draft || "").trim().toLowerCase() === "true",
    body,
  };
}

function loadAll(): LoadedStory[] {
  let files: string[];
  try {
    files = readdirSync(STORIES_DIR);
  } catch {
    return [];
  }
  return files
    .filter((f) => f.endsWith(".md"))
    .map(loadStory)
    .filter((s) => !s.draft)
    .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
}

// All published stories in display order, without article bodies (so lists
// and the home-page carousel don't carry the full article text around).
export function getStories(): Story[] {
  return loadAll().map((s) => ({
    id: s.id,
    title: s.title,
    brief: s.brief,
    cover: s.cover,
    coverPosition: s.coverPosition,
  }));
}

// One published story including its article body, or undefined if there is
// no such post (or it's a draft).
export function getStory(slug: string): (Story & { body: string }) | undefined {
  return loadAll().find((s) => s.id === slug);
}
