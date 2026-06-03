import type { Metadata } from "next";
import SubPage from "@/components/SubPage";
import { about } from "@/lib/content";

export const metadata: Metadata = { title: "About · Galactic Fleet" };

export default function AboutPage() {
  return (
    <SubPage
      title={about.title}
      color="#6B5560"
      textColor="#ffffff"
      paragraphs={about.paragraphs}
    />
  );
}
