import { featured } from '@/lib/content';
import type { Post } from '@/types/content';
import { useEffect, useState } from 'react';
import { StoryCard } from './StoryCard';

export function FeaturedStory() {
  const [post, setPost] = useState<Post | null>(null);
  useEffect(() => { featured().then(setPost); }, []);
  if (!post) return null;
  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-headline mb-4">Featured Story</h2>
      <StoryCard post={post} />
    </section>
  );
}
