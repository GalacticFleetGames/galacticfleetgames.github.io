import type { Metadata } from "next";
import SubPage from "@/components/SubPage";

export const metadata: Metadata = { title: "Team · Galactic Fleet" };

export default function TeamPage() {
  return <SubPage title="Team" color="#E8C09C" textColor="#25344B" />;
}
