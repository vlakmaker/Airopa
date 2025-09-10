import { byPillar } from '@/lib/content';
import type { Post } from '@/types/content';
import { useEffect, useState } from 'react';
import { StoryCard } from './StoryCard';

export function StartupGrid() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => { byPillar('startups').then(ps => setPosts(ps.slice(0, 3))); }, []);
  if (!posts.length) return null;
  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-headline mb-4">European Startup Spotlight</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map(p => <StoryCard key={p.slug} post={p} />)}
      </div>
    </section>
  );
}
