import type { Metadata } from "next";
import SubPage from "@/components/SubPage";
import { team } from "@/lib/content";

export const metadata: Metadata = { title: "Team · Galactic Fleet" };

export default function TeamPage() {
  return (
    <SubPage
      title={team.title}
      color="#E8C09C"
      textColor="#25344B"
      paragraphs={team.paragraphs}
    />
  );
}
