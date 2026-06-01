"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Stage = "ask" | "rejected";

export default function RocketInvite() {
  const targetRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("ask");
  const router = useRouter();

  // Mirror the cosmic background's parallax (-0.12 scroll multiplier) so the
  // clickable rocket overlay tracks the rocket painted into the bg image.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (targetRef.current) {
          const y = window.scrollY;
          targetRef.current.style.transform = `translate3d(0, ${y * -0.12}px, 0)`;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll + listen for Esc when the modal is open.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const openModal = () => {
    setStage("ask");
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setStage("ask");
  };

  const onYes = () => {
    setOpen(false);
    router.push("/play");
  };

  const onNo = () => {
    setStage("rejected");
    // Give the user a beat to read the cheeky goodbye, then dismiss.
    window.setTimeout(() => {
      setOpen(false);
      setStage("ask");
    }, 2200);
  };

  return (
    <>
      <button
        ref={targetRef}
        className="rocket-target"
        type="button"
        aria-label="The Galactic Fleet rocket — click to play a minigame"
        onClick={openModal}
      />

      {open && (
        <div
          className="rocket-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            className="comic-bubble"
            role="dialog"
            aria-label="Rocket invitation"
            aria-modal="true"
          >
            {stage === "ask" ? (
              <>
                <h2>Do you want to play?</h2>
                <div className="comic-buttons">
                  <button className="comic-btn comic-btn-yes" onClick={onYes}>
                    Yes!
                  </button>
                  <button className="comic-btn comic-btn-no" onClick={onNo}>
                    No
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2>Suit yourself.</h2>
                <p className="comic-sub">More space for me, then.</p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
