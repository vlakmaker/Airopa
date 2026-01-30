import { featured } from '@/lib/content';
import type { Post } from '@/types/content';
import { useEffect, useState } from 'react';
import { StoryCard } from './StoryCard';
import { ErrorDisplay } from './ui/ErrorDisplay';
import { StoryCardSkeleton } from './ui/LoadingSkeleton';
import { handleContentError } from '@/lib/errors';

/**
 * FeaturedStory Component - Displays the featured post with proper error handling
 * 
 * @returns React component with loading, error, and success states
 */
export function FeaturedStory() {
  // Professional state management with explicit states
  const [state, setState] = useState<{
    isLoading: boolean;
    error: Error | null;
    post: Post | null;
  }>({
    isLoading: true,
    error: null,
    post: null
  });

  /**
   * Load featured post with comprehensive error handling
   */
  const loadFeaturedPost = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const post = await featured();
      setState({ isLoading: false, error: null, post });
    } catch (error) {
      const handledError = handleContentError(error);
      console.error('Failed to load featured post:', handledError);
      
      setState({ 
        isLoading: false, 
        error: handledError, 
        post: null 
      });
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadFeaturedPost();
  }, []);

  // Professional state handling with proper fallbacks
  if (state.isLoading) {
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
          <div className="rounded-xl border border-border bg-card shadow-lg">
            <StoryCardSkeleton />
          </div>
        </div>
      </section>
    );
  }

  if (state.error) {
    return (
      <section id="featured-story" className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-primary mb-4 relative inline-block">
              Featured Story
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-accent rounded-full" />
            </h2>
          </div>
          <ErrorDisplay 
            error={state.error} 
            retryCallback={loadFeaturedPost}
            className="max-w-2xl mx-auto"
          />
        </div>
      </section>
    );
  }

  if (!state.post) {
    return (
      <section id="featured-story" className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-primary mb-4 relative inline-block">
              Featured Story
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-accent rounded-full" />
            </h2>
          </div>
          <div className="text-center py-8">
            <p className="text-muted-foreground">No featured story available at this time.</p>
          </div>
        </div>
      </section>
    );
  }

  // Success state - the actual content
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
          <StoryCard post={state.post} />
        </div>
      </div>
    </section>
  );
}