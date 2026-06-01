import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SpaceInvaders from "@/components/SpaceInvaders";

export const metadata: Metadata = {
  title: "Launch · Galactic Fleet",
};

export default function PlayPage() {
  return (
    <>
      <Header />
      <main className="play-page">
        <div className="play-inner">
          <p className="play-eyebrow">Mission control</p>
          <h1 className="play-title">Defend the fleet</h1>
          <p className="play-lede">
            The invasion is here. Move with the arrow keys (or A / D), fire with
            space. On a phone? Use the buttons below the screen. Survive as
            long as you can.
          </p>

          <SpaceInvaders />
        </div>
      </main>
      <Footer />
    </>
  );
}
