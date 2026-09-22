"use client";

import { useEffect, useRef, useState } from "react";

type DeferredMapProps = {
  src: string;
};

export default function DeferredMap({ src }: DeferredMapProps) {
  const container = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const element = container.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      const fallback = setTimeout(() => setShouldLoad(true), 0);
      return () => clearTimeout(fallback);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        observer.disconnect();
        setShouldLoad(true);
      },
      { rootMargin: "600px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={container} className="landing-location-map">
      {shouldLoad && (
        <iframe
          src={src}
          title="Spiritual Tattoo Studio location in White Town, Puducherry"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      )}
    </div>
  );
}
