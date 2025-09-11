import { featured } from '@/lib/content';
import type { Post } from '@/types/content';
import { useEffect, useState } from 'react';
import { StoryCard } from './StoryCard';

export function FeaturedStory() {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    featured().then(setPost);
  }, []);

  if (!post) return <div>Loading featured story...</div>;

  return (
    <section id="featured-story" className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-primary mb-4 relative inline-block">
            Featured Story
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-accent rounded-full" />
          </h2>
          <p className="text-subhead text-muted-foreground">
            Top story from the European AI frontier
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card shadow-lg hover:shadow-xl transition">
          <StoryCard post={post} />
        </div>
      </div>
    </section>
  );
}
