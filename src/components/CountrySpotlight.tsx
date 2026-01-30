import { byPillar } from '@/lib/content';
import type { Post } from '@/types/content';
import { useEffect, useState } from 'react';
import { StoryCard } from './StoryCard';
import { ErrorDisplay } from './ui/ErrorDisplay';
import { StoryCardSkeleton } from './ui/LoadingSkeleton';
import { handleContentError } from '@/lib/errors';

export const CountrySpotlight = () => {
  const [state, setState] = useState<{
    isLoading: boolean;
    error: Error | null;
    posts: Post[];
  }>({
    isLoading: true,
    error: null,
    posts: []
  });

  const loadCountryPosts = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const posts = await byPillar('country');
      setState({ isLoading: false, error: null, posts: posts.slice(0, 3) });
    } catch (error) {
      const handledError = handleContentError(error);
      console.error('Failed to load country posts:', handledError);
      
      setState({ 
        isLoading: false, 
        error: handledError, 
        posts: [] 
      });
    }
  };

  useEffect(() => {
    loadCountryPosts();
  }, []);

  if (state.isLoading) {
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
            <StoryCardSkeleton />
            <StoryCardSkeleton />
            <StoryCardSkeleton />
          </div>
        </div>
      </section>
    );
  }

  if (state.error) {
    return (
      <section id="countries" className="container mx-auto px-4 py-16 bg-gradient-to-br from-secondary/20 to-accent/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-primary mb-4 relative inline-block">
              Country Spotlights
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-accent rounded-full" />
            </h2>
          </div>
          <ErrorDisplay 
            error={state.error} 
            retryCallback={loadCountryPosts}
            className="max-w-2xl mx-auto"
          />
        </div>
      </section>
    );
  }

  if (state.posts.length === 0) {
    return null;
  }

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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {state.posts.map(p => <StoryCard key={p.slug} post={p} />)}
        </div>
      </div>
    </section>
  );
};