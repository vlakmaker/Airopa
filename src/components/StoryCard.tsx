import type { Post } from '@/types/content';

export function StoryCard({ post }: { post: Post }) {
    const d = post.data;
    
    // Format date for display
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
        
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffHours < 168) return `${Math.floor(diffHours / 24)}d ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <a
            href={d.canonical}
            target="_blank"
            rel="noreferrer"
            className="group block rounded-lg border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full"
        >
            <article className="flex flex-col h-full">
                {/* Cover Image */}
                {d.cover && (
                    <div className="aspect-video w-full overflow-hidden bg-muted">
                        <img 
                            src={d.cover} 
                            alt={d.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                )}
                
                <div className="p-5 flex flex-col flex-1">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent-foreground border border-accent/20">
                            {d.pillar}
                        </span>
                        {d.tags && d.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/50 text-secondary-foreground border border-secondary/30">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <header className="mb-3">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {d.title}
                        </h3>
                    </header>

                    {/* Summary */}
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
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
                            <span className="text-xs font-medium">{d.source?.name || 'Source'}</span>
                            <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </div>
                    </div>
                </div>
            </article>
        </a>
    );
}
