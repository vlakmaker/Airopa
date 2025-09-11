import type { Post } from '@/types/content';

export function StoryCard({ post }: { post: Post }) {
    const d = post.data;
    return (
        <a
            href={d.canonical}
            target="_blank"
            rel="noreferrer"
            className="block card-frosted p-4 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        >
            <article>
                <header className="mb-2">
                    <h3 className="text-[hsl(var(--primary))] font-semibold hover:underline">
                        {d.title}
                    </h3>
                </header>
                <p className="text-sm text-slate-700 mb-3">{d.summary}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="px-2 py-0.5 rounded-full border">{d.pillar}</span>
                    {d.country && <span className="px-2 py-0.5 rounded-full border">{d.country}</span>}
                    <span>Source: {d.source.name}</span>
                </div>
            </article>
        </a>
    );
}
