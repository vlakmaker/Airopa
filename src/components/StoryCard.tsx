import type { Post } from '@/types/content';

export function StoryCard({ post }: { post: Post }) {
    const d = post.data;
    return (
        <article className="card-frosted p-4">
            <header className="mb-2">
                <a className="text-[hsl(var(--primary))] font-semibold hover:underline" href={d.canonical} target="_blank" rel="noreferrer">
                    {d.title}
                </a>
            </header>
            <p className="text-sm text-slate-700 mb-3">{d.summary}</p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="px-2 py-0.5 rounded-full border">{d.pillar}</span>
                {d.country && <span className="px-2 py-0.5 rounded-full border">{d.country}</span>}
                <span>Source: <a className="hover:underline" href={d.canonical} target="_blank" rel="noreferrer">{d.source.name}</a></span>
            </div>
        </article>
    );
}
