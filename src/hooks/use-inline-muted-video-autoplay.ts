"use client";

import { type RefObject, useEffect } from "react";

type Options = {
  enabled: boolean;
  mediaKey: string;
};

/**
 * Safari/iOS: reforça muted/inline e várias tentativas de `play()` (metadata,
 * canplay, viewport, visibilidade).
 */
export function useInlineMutedVideoAutoplay(
  videoRef: RefObject<HTMLVideoElement | null>,
  { enabled, mediaKey }: Options
) {
  useEffect(() => {
    if (!enabled) return;
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    v.defaultMuted = true;
    v.volume = 0;
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "true");

    const attempt = () => {
      void v.play().catch(() => {});
    };

    attempt();

    const onMeta = () => attempt();
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("canplay", attempt, { once: true });

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting && e.intersectionRatio > 0.08)) {
          attempt();
        }
      },
      { threshold: [0, 0.1, 0.25] }
    );
    io.observe(v);

    const onVis = () => {
      if (document.visibilityState === "visible") attempt();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      v.removeEventListener("loadedmetadata", onMeta);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
    };
  }, [enabled, mediaKey]);
}
