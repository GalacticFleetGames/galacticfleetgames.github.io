import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SpaceInvaders from "@/components/SpaceInvaders";
import { play } from "@/lib/content";

export const metadata: Metadata = {
  title: "Launch · Galactic Fleet",
};

export default function PlayPage() {
  return (
    <>
      <Header />
      <main className="play-page">
        <div className="play-inner">
          <p className="play-eyebrow">{play.eyebrow}</p>
          <h1 className="play-title">{play.title}</h1>
          <p className="play-lede">{play.lede}</p>

          <SpaceInvaders />
        </div>
      </main>
      <Footer />
    </>
  );
}
