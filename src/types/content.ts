export type Pillar = 'regulation' | 'innovation' | 'economics' | 'startups' | 'policy' | 'country';

export interface PostFrontmatter {
    title: string;
    date: string;        // ISO
    pillar: Pillar;
    country?: string;
    tags?: string[];
    source: { name: string; url: string };
    canonical: string;
    cover?: string;      // optional image URL
    location?: string;   // e.g. "Amsterdam, Netherlands"
    summary: string;
    editor_pick?: boolean;
    ai_generated?: boolean;
}

export interface Post {
    slug: string;
    html: string;
    data: PostFrontmatter;
}
