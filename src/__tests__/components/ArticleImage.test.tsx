import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ArticleImage } from "@/components/ArticleImage";
import { reportImageMetric } from "@/lib/imagePerformance";

vi.mock("@/lib/imagePerformance", () => ({
  reportImageMetric: vi.fn(),
}));

const reportImageMetricMock = vi.mocked(reportImageMetric);

describe("ArticleImage", () => {
  beforeEach(() => {
    reportImageMetricMock.mockReset();
  });

  afterEach(() => {
    (window as Window & { IntersectionObserver?: unknown }).IntersectionObserver = undefined;
  });

  it("uses fallback when src is empty/whitespace", () => {
    render(
      <ArticleImage
        src="   "
        fallbackSrc="/assets/fallback.jpg"
        alt="Test article image"
      />
    );

    const image = screen.getByAltText("Test article image") as HTMLImageElement;
    expect(image).toHaveAttribute("src", "/assets/fallback.jpg");
  });

  it("reports loaded metric on successful image load", () => {
    render(
      <ArticleImage
        src="https://example.com/image.jpg"
        fallbackSrc="/assets/fallback.jpg"
        alt="Metric article image"
      />
    );

    const image = screen.getByAltText("Metric article image") as HTMLImageElement;
    fireEvent.load(image);

    expect(reportImageMetricMock).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "loaded",
        usedFallback: false,
      })
    );
  });

  it("retries once before falling back", () => {
    render(
      <ArticleImage
        src="https://example.com/image.jpg"
        fallbackSrc="/assets/fallback.jpg"
        alt="Retry article image"
      />
    );

    const image = screen.getByAltText("Retry article image") as HTMLImageElement;

    fireEvent.error(image);
    expect(image.src).toContain("https://example.com/image.jpg");
    expect(image.src).toContain("__img_retry=");

    fireEvent.error(image);
    expect(image).toHaveAttribute("src", "/assets/fallback.jpg");

    fireEvent.load(image);
    expect(reportImageMetricMock).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "fallback_loaded",
        usedFallback: true,
        retries: 1,
      })
    );
  });

  it("defers lazy image request until intersection", async () => {
    let callback: ((entries: Array<{ isIntersecting: boolean }>) => void) | null = null;

    class FakeIntersectionObserver {
      constructor(cb: (entries: Array<{ isIntersecting: boolean }>) => void) {
        callback = cb;
      }
      observe() {}
      disconnect() {}
    }

    (window as Window & { IntersectionObserver?: unknown }).IntersectionObserver = FakeIntersectionObserver;

    render(
      <ArticleImage
        src="https://example.com/lazy.jpg"
        fallbackSrc="/assets/fallback.jpg"
        alt="Lazy article image"
        loading="lazy"
      />
    );

    const image = screen.getByAltText("Lazy article image") as HTMLImageElement;
    expect(image.getAttribute("src")).toBeNull();

    act(() => {
      callback?.([{ isIntersecting: true }]);
    });

    await waitFor(() => {
      expect(image.src).toContain("https://example.com/lazy.jpg");
    });
  });
});
