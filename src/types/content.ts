export type Pillar = 'regulation' | 'innovation' | 'economics' | 'startups';

export interface PostFrontmatter {
    title: string;
    date: string;
    pillar: Pillar;
    canonical: string;
    tags?: string[];
    editor_pick?: boolean;
    ai_generated?: boolean;
}

export interface Post {
    slug: string;
    html: string;
    data: PostFrontmatter;
}
