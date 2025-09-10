import type { Pillar, Post, PostFrontmatter } from '@/types/content';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const files = import.meta.glob('/src/content/post/**/*.md', { eager: true, as: 'raw' });

const slugFromPath = (p: string) => p.replace('/src/content/post/', '').replace(/\.md$/, '');

export async function getAllPosts(): Promise<Post[]> {
    const entries = await Promise.all(
        Object.entries(files).map(async ([path, raw]) => {
            const { content, data } = matter(raw) as { content: string; data: PostFrontmatter };
            const processed = await remark().use(html).process(content);
            return {
                slug: slugFromPath(path),
                html: String(processed),
                data: { tags: [], editor_pick: false, ai_generated: true, ...data },
            };
        })
    );
    return entries.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
}

export async function byPillar(pillar: Pillar) {
    const posts = await getAllPosts();
    return posts.filter(p => p.data.pillar === pillar);
}

export async function featured() {
    const posts = await getAllPosts();
    return posts.find(p => p.data.editor_pick) ?? posts[0];
}
