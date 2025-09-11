import { byPillar } from '@/lib/content';
import type { Post } from '@/types/content';
import { useEffect, useState } from 'react';
import { StoryCard } from './StoryCard';

export const PolicySection = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  
  useEffect(() => { 
    byPillar('policy').then(ps => setPosts(ps.slice(0, 3))); 
  }, []);
  
  if (!posts.length) return null;

  return (
    <section id="policy" className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-primary mb-4 relative inline-block">
            Policy & Regulation
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-accent rounded-full" />
          </h2>
          <p className="text-subhead text-muted-foreground">
            Latest developments in AI policy and regulation
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {posts.map(p => <StoryCard key={p.slug} post={p} />)}
        </div>
      </div>
    </section>
  );
};