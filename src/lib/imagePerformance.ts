interface ImageMetricPayload {
  status: "loaded" | "fallback_loaded" | "failed";
  src: string;
  domain: string;
  loadTimeMs: number;
  retries: number;
  usedFallback: boolean;
}

interface ImagePerformanceSummary {
  total: number;
  loaded: number;
  fallbackLoaded: number;
  failed: number;
  retries: number;
  averageLoadMs: number;
  byDomain: Record<
    string,
    {
      total: number;
      loaded: number;
      fallbackLoaded: number;
      failed: number;
      retries: number;
      averageLoadMs: number;
    }
  >;
}

const summary: ImagePerformanceSummary = {
  total: 0,
  loaded: 0,
  fallbackLoaded: 0,
  failed: 0,
  retries: 0,
  averageLoadMs: 0,
  byDomain: {},
};

function parseDomain(url: string): string {
  try {
    return new URL(url, window.location.origin).hostname || "unknown";
  } catch {
    return "unknown";
  }
}

function updateAverage(currentAverage: number, currentCount: number, newValue: number): number {
  if (currentCount <= 1) return newValue;
  return (currentAverage * (currentCount - 1) + newValue) / currentCount;
}

export function reportImageMetric(payload: Omit<ImageMetricPayload, "domain">) {
  const domain = parseDomain(payload.src);
  const normalized: ImageMetricPayload = { ...payload, domain };

  summary.total += 1;
  summary.retries += payload.retries;
  summary.averageLoadMs = updateAverage(summary.averageLoadMs, summary.total, payload.loadTimeMs);

  if (!summary.byDomain[domain]) {
    summary.byDomain[domain] = {
      total: 0,
      loaded: 0,
      fallbackLoaded: 0,
      failed: 0,
      retries: 0,
      averageLoadMs: 0,
    };
  }

  const domainSummary = summary.byDomain[domain];
  domainSummary.total += 1;
  domainSummary.retries += payload.retries;
  domainSummary.averageLoadMs = updateAverage(domainSummary.averageLoadMs, domainSummary.total, payload.loadTimeMs);

  if (payload.status === "loaded") {
    summary.loaded += 1;
    domainSummary.loaded += 1;
  } else if (payload.status === "fallback_loaded") {
    summary.fallbackLoaded += 1;
    domainSummary.fallbackLoaded += 1;
  } else {
    summary.failed += 1;
    domainSummary.failed += 1;
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("airopa:image-metric", { detail: normalized }));
    if (import.meta.env.DEV) {
      // Dev-only visibility while we don't have a dedicated analytics sink.
      console.debug("[image-metric]", normalized);
    }
  }
}

export function getImagePerformanceSummary(): ImagePerformanceSummary {
  return {
    ...summary,
    byDomain: { ...summary.byDomain },
  };
}
