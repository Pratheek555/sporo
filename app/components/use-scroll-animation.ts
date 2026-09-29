"use client";

import { useEffect, type RefObject } from "react";

type ScrollAnimation = (options: {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
  section: HTMLElement;
}) => void;

/** Keep scroll libraries out of startup; prepare the next section before it enters. */
export function useScrollAnimation(root: RefObject<HTMLElement | null>, animate: ScrollAnimation) {
  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const media = window.matchMedia("(min-width: 901px) and (prefers-reduced-motion: no-preference)");
    let stop: (() => void) | undefined;

    const sync = () => {
      stop?.();
      if (!media.matches) return;
      let disposed = false;
      let context: ReturnType<typeof import("gsap").gsap.context> | undefined;
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
          if (disposed) return;
          gsap.registerPlugin(ScrollTrigger);
          context = gsap.context(() => animate({ gsap, ScrollTrigger, section }), section);
          void document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
        });
      }, { rootMargin: "400px 0px" });
      observer.observe(section);
      stop = () => { disposed = true; observer.disconnect(); context?.revert(); };
    };
    sync();
    media.addEventListener("change", sync);
    return () => { stop?.(); media.removeEventListener("change", sync); };
  }, [root, animate]);
}
