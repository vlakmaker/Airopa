import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { reportImageMetric } from "@/lib/imagePerformance";

interface ArticleImageProps {
  src?: string;
  fallbackSrc: string;
  alt: string;
  containerClassName?: string;
  imageClassName?: string;
  loading?: "eager" | "lazy";
  decoding?: "async" | "auto" | "sync";
}

function normalizeUrl(url?: string): string | undefined {
  const trimmed = url?.trim();
  return trimmed ? trimmed : undefined;
}

function addRetryParam(url: string): string {
  try {
    const parsed = new URL(url, window.location.origin);
    parsed.searchParams.set("__img_retry", String(Date.now()));
    return parsed.toString();
  } catch {
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}__img_retry=${Date.now()}`;
  }
}

export function ArticleImage({
  src,
  fallbackSrc,
  alt,
  containerClassName,
  imageClassName,
  loading = "lazy",
  decoding = "async",
}: ArticleImageProps) {
  const primarySrc = useMemo(() => normalizeUrl(src), [src]);
  const initialSrc = primarySrc || fallbackSrc;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [imageSrc, setImageSrc] = useState(initialSrc);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(loading !== "lazy");
  const hasRetriedRef = useRef(false);
  const retryCountRef = useRef(0);
  const hasReportedRef = useRef(false);
  const requestStartedAtRef = useRef<number | null>(null);

  useEffect(() => {
    setImageSrc(initialSrc);
    setIsLoaded(false);
    setShouldLoad(loading !== "lazy");
    hasRetriedRef.current = false;
    retryCountRef.current = 0;
    hasReportedRef.current = false;
    requestStartedAtRef.current = null;
  }, [initialSrc, loading]);

  useEffect(() => {
    if (loading !== "lazy") {
      setShouldLoad(true);
      return;
    }

    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const node = containerRef.current;
    if (!node) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: "200px 0px", threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    if (shouldLoad && requestStartedAtRef.current === null) {
      requestStartedAtRef.current = performance.now();
    }
  }, [shouldLoad]);

  function loadTimeMs(): number {
    const startedAt = requestStartedAtRef.current;
    if (startedAt === null) return 0;
    return Math.round(performance.now() - startedAt);
  }

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden bg-muted", containerClassName)}>
      {!isLoaded && <div className="absolute inset-0 animate-pulse bg-muted" />}
      <img
        src={shouldLoad ? imageSrc : undefined}
        alt={alt}
        loading={loading}
        decoding={decoding}
        onLoad={() => {
          setIsLoaded(true);
          if (hasReportedRef.current) return;

          const usedFallback = imageSrc === fallbackSrc;
          reportImageMetric({
            status: usedFallback ? "fallback_loaded" : "loaded",
            src: imageSrc,
            loadTimeMs: loadTimeMs(),
            retries: retryCountRef.current,
            usedFallback,
          });
          hasReportedRef.current = true;
        }}
        onError={() => {
          setImageSrc((prev) => {
            if (prev === fallbackSrc) {
              setIsLoaded(true);
              if (!hasReportedRef.current) {
                reportImageMetric({
                  status: "failed",
                  src: prev,
                  loadTimeMs: loadTimeMs(),
                  retries: retryCountRef.current,
                  usedFallback: true,
                });
                hasReportedRef.current = true;
              }
              return prev;
            }

            if (!hasRetriedRef.current) {
              hasRetriedRef.current = true;
              retryCountRef.current += 1;
              setIsLoaded(false);
              return addRetryParam(prev);
            }

            setIsLoaded(false);
            return fallbackSrc;
          });
        }}
        className={cn(
          "w-full h-full object-cover transition-all duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          imageClassName
        )}
      />
    </div>
  );
}
