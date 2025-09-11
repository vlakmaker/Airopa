import { byPillar } from '@/lib/content';
import type { Post } from '@/types/content';
import { useEffect, useState } from 'react';
import { StoryCard } from './StoryCard';

export const CountrySpotlight = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  
  useEffect(() => { 
    byPillar('country').then(ps => setPosts(ps.slice(0, 3))); 
  }, []);
  
  if (!posts.length) return null;

  return (
    <section id="countries" className="container mx-auto px-4 py-16 bg-gradient-to-br from-secondary/20 to-accent/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-primary mb-4 relative inline-block">
            Country Spotlights
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-accent rounded-full" />
          </h2>
          <p className="text-subhead text-muted-foreground">
            AI developments across European nations
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(p => <StoryCard key={p.slug} post={p} />)}
        </div>
      </div>
    </section>
  );
};