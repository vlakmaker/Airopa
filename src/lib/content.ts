import { Buffer } from 'buffer';
import type { Pillar, Post, PostFrontmatter } from '@/types/content';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { ContentLoadError, ContentParseError, ContentValidationError, validateFrontmatter } from './errors';

// Make Buffer available globally for gray-matter
globalThis.Buffer = Buffer;

const files = import.meta.glob('/src/content/post/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const slugFromPath = (p: string): string =>
  p.replace('/src/content/post/', '').replace(/\.md$/, '');

export async function getAllPosts(): Promise<Post[]> {
  try {
    const entries = await Promise.all(
      Object.entries(files).map(async ([path, raw]) => {
        try {
          if (typeof raw !== 'string') {
            throw new ContentLoadError(`Invalid content format for file: ${path}`);
          }

          const { content, data } = matter(raw);

          // Validate frontmatter
          validateFrontmatter(data);

          const frontmatter = data as PostFrontmatter;
          const processed = await remark().use(html).process(content);

          return {
            slug: slugFromPath(path),
            html: String(processed),
            data: { tags: [], editor_pick: false, ai_generated: true, ...frontmatter },
          };
        } catch (error) {
          if (error instanceof ContentValidationError) {
            console.warn(`Validation failed for ${path}:`, error.message);
            return null;
          }
          throw new ContentParseError(`Failed to parse ${path}`, error instanceof Error ? error.message : String(error));
        }
      })
    );

    // Filter out any null entries from validation failures
    const validEntries = entries.filter((entry): entry is Post => entry !== null);

    return validEntries.sort(
      (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    );
  } catch (error) {
    throw new ContentLoadError(`Failed to load posts: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function byPillar(pillar: Pillar): Promise<Post[]> {
  try {
    const posts = await getAllPosts();
    return posts.filter((p) => p.data.pillar === pillar);
  } catch (error) {
    throw new ContentLoadError(`Failed to filter posts by pillar "${pillar}": ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function featured(): Promise<Post> {
  try {
    const posts = await getAllPosts();
    const featuredPost = posts.find((p) => p.data.editor_pick);

    if (featuredPost) {
      return featuredPost;
    }

    // Fallback to most recent post if no featured post is found
    if (posts.length > 0) {
      return posts[0];
    }

    throw new ContentLoadError('No posts available to feature');
  } catch (error) {
    throw new ContentLoadError(`Failed to get featured post: ${error instanceof Error ? error.message : String(error)}`);
  }
}
