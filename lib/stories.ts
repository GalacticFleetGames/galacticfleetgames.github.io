// ============================================================================
//  DEV STORIES / BLOG POSTS  —  the post LIST lives here.
// ============================================================================
//
//  This file holds the short details for each post (title, brief, cover).
//  The ARTICLE TEXT for each post lives in its own Markdown file:
//
//        content/stories/<id>.md
//
//  e.g. the post with id "casim" reads its body from
//       content/stories/casim.md
//
//  --------------------------------------------------------------------------
//  TO EDIT A POST'S ARTICLE:  open content/stories/<id>.md and paste/type
//  freely. No quotes, brackets, or backticks — just write. Formatting markers:
//        ## Heading        ### Smaller heading        > Pull-quote
//        **bold**          *italic*        - bullet item        1. numbered
//  Leave a blank line between paragraphs.
//
//  TO EDIT THE TITLE / SUMMARY:  change the "quotes" below.
//
//  TO ADD A NEW POST:  copy a { ... } block below, give it a new unique `id`,
//  then create a matching content/stories/<that-id>.md file and a cover image
//  at public/assets/placeholders/<that-id>.svg
//
//  COVER IMAGE:  by default the cover is public/assets/placeholders/<id>.svg
//  If your image is a .png/.jpg (or a different name), add a `cover:` line to
//  that post, e.g.  cover: "/assets/placeholders/lookingup.png"
// ============================================================================

export type Story = {
  id: string; // unique slug -> URL, .md filename, and cover image name
  title: string; // the post headline
  brief: string; // one-line summary (shown on cards, list, and post intro)
  cover?: string; // OPTIONAL cover image path. Only needed if your image isn't
  //   public/assets/placeholders/<id>.svg — e.g. for a .png or .jpg.
  //   Example: cover: "/assets/placeholders/lookingup.png"
  coverPosition?: string; // OPTIONAL — which part of the cover stays visible
  //   when it's cropped to fit. Default is "center". Use "left", "right",
  //   "top", "bottom", or a pair like "25% 50%".
};

// The cover image URL for a story. Uses the story's `cover` if set, otherwise
// falls back to public/assets/placeholders/<id>.svg
export function storyCover(story: Story): string {
  return story.cover ?? `/assets/placeholders/${story.id}.svg`;
}

export const STORIES: Story[] = [
  {
    id: "story-1",
    title: "Loading...",
    brief: "This story isn't quite ready yet, we thank you for your patience.",
  },
  {
    id: "lookingup",
    title: "Looking Up: Our First Game",
    brief: "We didn’t just build our first game — we learned how to make games by making it. ",
    cover: "/assets/placeholders/lookingup.png",
    coverPosition: "left",
  },
  {
    id: "story-3",
    title: "Loading...",
    brief: "This story isn't quite ready yet, we thank you for your patience.",
  },
];

export function getStoryById(id: string): Story | undefined {
  return STORIES.find((s) => s.id === id);
}
