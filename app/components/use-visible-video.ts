"use client";

import { useEffect, type RefObject } from "react";

/** Decode decorative video only while visible, on larger screens with motion enabled. */
export function useVisibleVideo(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = root.current;
    const video = element?.querySelector("video");
    if (!element || !video) return;

    const media = window.matchMedia("(min-width: 901px) and (prefers-reduced-motion: no-preference)");
    let visible = false;
    let disposed = false;
    const update = () => {
      if (visible && media.matches && !document.hidden) {
        void video.play().then(() => {
          if (disposed || !visible || !media.matches || document.hidden) video.pause();
        }).catch(() => undefined);
      } else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }, { threshold: 0.05 });
    observer.observe(element);
    media.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      disposed = true;
      observer.disconnect();
      media.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      video.pause();
    };
  }, [root]);
}
