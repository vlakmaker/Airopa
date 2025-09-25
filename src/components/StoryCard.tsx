import { cn } from "@/lib/utils";
import type { Post } from "@/types/content";

export function StoryCard({ post, featured = false }: { post: Post; featured?: boolean }) {
    const d = post.data;

    // Format date like "3h ago" or "Sep 10"
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffHours < 168) return `${Math.floor(diffHours / 24)}d ago`;
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    };

    return (
        <a
            href={d.canonical}
            target="_blank"
            rel="noreferrer"
            className={cn(
                "group block rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
                featured ? "p-0 md:flex md:gap-6" : "p-0"
            )}
        >
            <article className="flex flex-col h-full">
                {/* Cover Image */}
                {d.cover && (
                    <div
                        className={cn(
                            "overflow-hidden bg-muted",
                            featured ? "aspect-video md:aspect-auto md:w-1/2" : "aspect-video"
                        )}
                    >
                        <img
                            src={d.cover}
                            alt={d.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                )}

                <div className={cn("flex flex-col flex-1", featured ? "p-6" : "p-5")}>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent-foreground border border-accent/20">
                            {d.pillar}
                        </span>
                        {d.tags &&
                            d.tags.slice(0, 2).map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/50 text-secondary-foreground border border-secondary/30"
                                >
                                    {tag}
                                </span>
                            ))}
                        {d.country && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/20 text-accent-foreground">
                                {d.country}
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <header className="mb-3">
                        <h3
                            className={cn(
                                "font-sans font-semibold leading-snug text-foreground group-hover:text-primary transition-colors",
                                featured ? "text-xl md:text-2xl" : "text-lg"
                            )}
                        >
                            {d.title}
                        </h3>
                    </header>

                    {/* Summary */}
                    <p
                        className={cn(
                            "text-slate-700 line-clamp-3 mb-4",
                            featured ? "text-base md:text-lg" : "text-sm"
                        )}
                    >
                        {d.summary || "Read more about this story..."}
                    </p>

                    {/* Metadata Footer */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-3 border-t border-border/50">
                        <div className="flex items-center gap-2">
                            <time>{formatDate(d.date)}</time>
                            {d.location && (
                                <>
                                    <span>•</span>
                                    <span>{d.location}</span>
                                </>
                            )}
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-xs">{d.source?.name || "Source"}</span>
                            <svg
                                className="w-3 h-3 opacity-60"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </article>
        </a>
    );
}
