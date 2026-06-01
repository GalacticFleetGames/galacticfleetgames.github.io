import type { Metadata } from "next";
import SubPage from "@/components/SubPage";

export const metadata: Metadata = { title: "About · Galactic Fleet" };

export default function AboutPage() {
  return <SubPage title="About" color="#6B5560" textColor="#ffffff" />;
}
