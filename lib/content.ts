// ============================================================================
//  SITE CONTENT  —  edit everything here.
// ============================================================================
//
//  This is the ONLY file you need to touch to replace the placeholder copy.
//  Each field below maps to a piece of text on the live site. Just change the
//  text inside the quotes "like this" and save — the page updates instantly
//  when the dev server (npm run dev) is running.
//
//  Rules of thumb:
//    • Only change what's INSIDE the "quotes". Leave the field names alone.
//    • Keep the quotes and the comma at the end of each line.
//    • For an apostrophe inside text, write it normally: "We're".
//    • Blank a line out by leaving empty quotes: "".
//
//  Blog / Dev Story posts live in their own file: lib/stories.ts
// ============================================================================

import type { CSSProperties } from "react";

// ---------------------------------------------------------------------------
//  SITE-WIDE  (browser tab title + search-engine description)
// ---------------------------------------------------------------------------
export const site = {
  title: "Galactic Fleet",
  description: "Galactic Fleet — engineering across the system.",
};

// ---------------------------------------------------------------------------
//  HOME PAGE  (the front page at "/")
// ---------------------------------------------------------------------------
export const home = {
  // Big line of text directly under the logo on the landing screen.
  heroTagline:
    "We own the hard problems, be there in the tough moments, and treat your game like it's ours.",

  // The "About" teaser block lower down the home page.
  about: {
    title: "About",
    body:
      "Galactic Fleet is a Budapest-based co-development studio that specializes in collaborative game development with partners all around the world.",
    buttonLabel: "More", // text on the button that links to the full About page
  },

  // Heading above the contact icons at the bottom of the home page.
  contactHeading: "Contact Us",
};

// ---------------------------------------------------------------------------
//  ABOUT PAGE  ("/about")
// ---------------------------------------------------------------------------
//  `paragraphs` is a list — add or remove lines to add or remove paragraphs.
//  Leave the list empty ( paragraphs: [] ) to show the "Coming online soon."
//  placeholder instead.
export const about = {
  title: "About",
  paragraphs: [
    "Under construction.",
  ],
};

// ---------------------------------------------------------------------------
//  TEAM PAGE  ("/team")
// ---------------------------------------------------------------------------
export const team = {
  title: "Team",
  paragraphs: [
    "Under construction.",
  ],
};

// ---------------------------------------------------------------------------
//  SERVICES PAGE  ("/services")
// ---------------------------------------------------------------------------
export const services = {
  title: "Services",
  paragraphs: [
    "Under construction.",
  ],
};

// ---------------------------------------------------------------------------
//  CONTACT PAGE  ("/contact")
// ---------------------------------------------------------------------------
export const contact = {
  heading: "Get in touch",
  lede:
    "Tell us about the mission. We'll write back within a working day — two, " +
    "if the comms are quiet on the other side of the moon.",
  email: "balazs@galactic-fleet.com",

  // The little status line: location · timezone · availability.
  location: {
    place: "Budapest · Hungary",
    timezone: "UTC +2",
    availability: "Online 24/7",
  },

  // Your social / contact channels. Edit name, handle and url for each.
  // Add a new channel by copying one block; delete a block to remove one.
  // `color` sets the little logo square's colour (any CSS colour works).
  channels: [
    {
      id: "linkedin",
      name: "LinkedIn",
      handle: "Galactic Fleet",
      url: "https://linkedin.com/company/galactic-fleet",
      color: "#0A66C2",
    },
    {
      id: "x",
      name: "X · Twitter",
      handle: "@GalacticFleetx",
      url: "https://x.com/GalacticFleetx",
      color: "#000000",
    },
    {
      id: "substack",
      name: "Substack",
      handle: "@galacticfleet",
      url: "https://substack.com/@galacticfleet?utm_source=global-search",
      // Instagram uses a gradient instead of a flat colour:
       color: "#ec9513ff",
    },
  ] as Channel[],

  // How many empty "More channels soon" placeholder rows to show under the
  // real channels. Set to 0 once you've added all your real channels.
  placeholderRowCount: 0,
};

// ---------------------------------------------------------------------------
//  PLAY / MINIGAME PAGE  ("/play")
// ---------------------------------------------------------------------------
export const play = {
  eyebrow: "Mission control",
  title: "Defend the fleet",
  lede:
    "The invasion is here. Move with the arrow keys (or A / D), fire with " +
    "space. On a phone? Use the buttons below the screen. Survive as long as " +
    "you can.",
};

// ---------------------------------------------------------------------------
//  DEV STORIES INDEX  ("/dev-stories")  — the list page heading.
//  The actual posts (titles, dates, bodies) live in lib/stories.ts
// ---------------------------------------------------------------------------
export const devStories = {
  eyebrow: "Field notes from orbit",
  title: "Dev Stories",
};

// ---------------------------------------------------------------------------
//  FOOTER  (appears on every page)
// ---------------------------------------------------------------------------
export const footer = {
  // The {year} placeholder is replaced automatically with the current year.
  copyright: "© {year} Galactic Fleet — All systems nominal.",
  minigameLabel: "Minigame",
};

// ---------------------------------------------------------------------------
//  (type definition — you don't need to edit this)
// ---------------------------------------------------------------------------
export type Channel = {
  id: string;
  name: string;
  handle: string;
  url: string;
  color?: string;
  gradient?: string;
};

// Helper used by the contact page to turn a channel's colour/gradient into a
// style. You don't need to touch this.
export function channelLogoStyle(c: Channel): CSSProperties {
  return c.gradient ? { backgroundImage: c.gradient } : { background: c.color };
}
