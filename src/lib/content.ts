import { Buffer } from 'buffer';
import type { Pillar, Post, PostFrontmatter } from '@/types/content';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Make Buffer available globally for gray-matter
globalThis.Buffer = Buffer;

const files = import.meta.glob('/src/content/post/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

console.log("🟢 Markdown files found:", Object.keys(files));

const slugFromPath = (p: string) =>
    p.replace('/src/content/post/', '').replace(/\.md$/, '');

export async function getAllPosts(): Promise<Post[]> {
    console.log("Markdown files found:", Object.keys(files));

    const entries = await Promise.all(
        Object.entries(files).map(async ([path, raw]) => {
            const { content, data } = matter(raw as string);
            const frontmatter = data as PostFrontmatter;
            const processed = await remark().use(html).process(content);
            return {
                slug: slugFromPath(path),
                html: String(processed),
                data: { tags: [], editor_pick: false, ai_generated: true, ...frontmatter },
            };
        })
    );

    console.log(`Total posts loaded: ${entries.length}`);
    return entries.sort(
        (a, b) =>
            new Date(b.data.date).getTime() -
            new Date(a.data.date).getTime()
    );
}

export async function byPillar(pillar: Pillar) {
    const posts = await getAllPosts();
    return posts.filter((p) => p.data.pillar === pillar);
}

export async function featured() {
    const posts = await getAllPosts();
    return posts.find((p) => p.data.editor_pick) ?? posts[0];
}
