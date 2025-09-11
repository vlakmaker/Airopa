import { featured } from '@/lib/content';
import type { Post } from '@/types/content';
import { useEffect, useState } from 'react';
import { StoryCard } from './StoryCard';

export function FeaturedStory() {
  const [post, setPost] = useState<Post | null>(null);
  useEffect(() => { 
    console.log('FeaturedStory: Loading featured post...');
    featured().then(p => {
      console.log('FeaturedStory: Featured post loaded:', p);
      setPost(p);
    }); 
  }, []);
  console.log('FeaturedStory: Rendering, post:', post?.data?.title);
  if (!post) return <div>Loading featured story...</div>;
  return (
    <section id="featured-story" className="container mx-auto px-4 py-8">
      <h2 className="text-headline mb-4">Featured Story</h2>
      <StoryCard post={post} />
    </section>
  );
}
