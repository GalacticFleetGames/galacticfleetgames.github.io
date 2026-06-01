import type { Metadata } from "next";
import SubPage from "@/components/SubPage";

export const metadata: Metadata = { title: "Services · Galactic Fleet" };

export default function ServicesPage() {
  return <SubPage title="Services" color="#C98B7E" textColor="#ffffff" />;
}
