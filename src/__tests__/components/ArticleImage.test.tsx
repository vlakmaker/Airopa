import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ArticleImage } from "@/components/ArticleImage";

describe("ArticleImage", () => {
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
  });
});
