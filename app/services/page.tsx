import type { Metadata } from "next";
import SubPage from "@/components/SubPage";
import { services } from "@/lib/content";

export const metadata: Metadata = { title: "Services · Galactic Fleet" };

export default function ServicesPage() {
  return (
    <SubPage
      title={services.title}
      color="#C98B7E"
      textColor="#ffffff"
      paragraphs={services.paragraphs}
    />
  );
}
