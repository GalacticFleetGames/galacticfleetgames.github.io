export type Story = {
  id: string;
  title: string;
  brief: string;
  date: string;
  readTime: string;
  author: string;
};

export const STORIES: Story[] = [
  {
    id: "story-1",
    title: "Story 1",
    brief: "A quick line of text suggesting more, like an excerpt from the post body.",
    date: "May 14, 2026",
    readTime: "4 min read",
    author: "Engineering Crew",
  },
  {
    id: "story-2",
    title: "Story 2",
    brief: "A quick line of text suggesting more, like an excerpt from the post body.",
    date: "May 02, 2026",
    readTime: "6 min read",
    author: "Engineering Crew",
  },
  {
    id: "story-3",
    title: "Story 3",
    brief: "A quick line of text suggesting more, like an excerpt from the post body.",
    date: "Apr 21, 2026",
    readTime: "3 min read",
    author: "Engineering Crew",
  },
  {
    id: "story-4",
    title: "Story 4",
    brief: "A quick line of text suggesting more, like an excerpt from the post body.",
    date: "Apr 08, 2026",
    readTime: "8 min read",
    author: "Engineering Crew",
  },
  {
    id: "story-5",
    title: "Story 5",
    brief: "A quick line of text suggesting more, like an excerpt from the post body.",
    date: "Mar 27, 2026",
    readTime: "5 min read",
    author: "Engineering Crew",
  },
  {
    id: "story-6",
    title: "Story 6",
    brief: "A quick line of text suggesting more, like an excerpt from the post body.",
    date: "Mar 12, 2026",
    readTime: "7 min read",
    author: "Engineering Crew",
  },
];

export function getStoryById(id: string): Story | undefined {
  return STORIES.find((s) => s.id === id);
}
