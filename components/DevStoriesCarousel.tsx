"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { STORIES, type Story } from "@/lib/stories";

export default function DevStoriesCarousel() {
  const [perPage, setPerPage] = useState(3);
  const [pos, setPos] = useState(1);
  const [animate, setAnimate] = useState(true);
  // True while a slide transition is in flight. Blocks further clicks so the
  // position counter can't run past the cloned edge pages.
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setPerPage(w < 720 ? 1 : w < 1024 ? 2 : 3);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const pages = useMemo<Story[][]>(() => {
    const out: Story[][] = [];
    for (let i = 0; i < STORIES.length; i += perPage) {
      out.push(STORIES.slice(i, i + perPage));
    }
    return out;
  }, [perPage]);

  const totalPages = pages.length;

  const physical = useMemo<Story[][]>(() => {
    if (totalPages <= 1) return pages;
    return [pages[totalPages - 1], ...pages, pages[0]];
  }, [pages, totalPages]);

  const logicalPage =
    totalPages > 1 ? (((pos - 1) % totalPages) + totalPages) % totalPages : 0;

  useEffect(() => {
    isAnimatingRef.current = false;
    setAnimate(false);
    setPos(totalPages > 1 ? 1 : 0);
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimate(true));
    });
    return () => cancelAnimationFrame(id);
  }, [totalPages]);

  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimate(true);
        isAnimatingRef.current = false;
      });
    });
    return () => cancelAnimationFrame(id);
  }, [animate]);

  const onTransitionEnd = () => {
    if (totalPages <= 1) {
      isAnimatingRef.current = false;
      return;
    }
    if (pos === 0) {
      setAnimate(false);
      setPos(totalPages);
    } else if (pos === totalPages + 1) {
      setAnimate(false);
      setPos(1);
    } else {
      isAnimatingRef.current = false;
    }
  };

  const next = () => {
    if (totalPages <= 1) return;
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setAnimate(true);
    setPos((p) => p + 1);
  };
  const prev = () => {
    if (totalPages <= 1) return;
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setAnimate(true);
    setPos((p) => p - 1);
  };
  const jumpTo = (i: number) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setAnimate(true);
    setPos(i + 1);
  };

  return (
    <section className="section dev-stories" id="dev-stories">
      <div className="stories-row">
        <button
          className="arrow-btn"
          type="button"
          aria-label="Previous stories"
          onClick={prev}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 6 9 12 15 18" />
          </svg>
        </button>

        <div
          className="stories-viewport"
          role="region"
          aria-roledescription="carousel"
          aria-label="Dev stories"
        >
          <div
            className="stories-track"
            style={{
              transition: animate
                ? "transform .55s cubic-bezier(.45, 0, .2, 1)"
                : "none",
              transform: `translateX(-${pos * 100}%)`,
            }}
            onTransitionEnd={onTransitionEnd}
          >
            {physical.map((pageStories, pi) => (
              <div
                className="stories-page"
                key={pi}
                style={{ gridTemplateColumns: `repeat(${perPage}, minmax(0, 1fr))` }}
                aria-hidden={pi !== pos}
              >
                {pageStories.map((s) => (
                  <article key={s.id} className="story-card">
                    <h3>{s.title}</h3>
                    <div className="story-thumb">
                      <img
                        src={`/assets/placeholders/${s.id}.svg`}
                        alt={`${s.title} cover`}
                      />
                    </div>
                    <p>{s.brief}</p>
                    <Link className="read-btn" href={`/dev-stories/${s.id}`}>
                      read
                    </Link>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>

        <button
          className="arrow-btn"
          type="button"
          aria-label="Next stories"
          onClick={next}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </div>

      {totalPages > 1 && (
        <div className="stories-dots" role="tablist" aria-label="Stories pages">
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === logicalPage}
              aria-label={`Page ${i + 1} of ${totalPages}`}
              className={`stories-dot ${i === logicalPage ? "active" : ""}`}
              onClick={() => jumpTo(i)}
            ></button>
          ))}
        </div>
      )}
    </section>
  );
}
