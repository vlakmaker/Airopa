import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

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
  const [imageSrc, setImageSrc] = useState(initialSrc);
  const [isLoaded, setIsLoaded] = useState(false);
  const hasRetriedRef = useRef(false);

  useEffect(() => {
    setImageSrc(initialSrc);
    setIsLoaded(false);
    hasRetriedRef.current = false;
  }, [initialSrc]);

  return (
    <div className={cn("relative overflow-hidden bg-muted", containerClassName)}>
      {!isLoaded && <div className="absolute inset-0 animate-pulse bg-muted" />}
      <img
        src={imageSrc}
        alt={alt}
        loading={loading}
        decoding={decoding}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setImageSrc((prev) => {
            if (prev === fallbackSrc) {
              setIsLoaded(true);
              return prev;
            }

            if (!hasRetriedRef.current) {
              hasRetriedRef.current = true;
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
