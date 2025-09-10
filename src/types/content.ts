export type Pillar = 'startups' | 'generic' | 'policy' | 'research' | 'country';

export interface PostFrontmatter {
    title: string;
    date: string; // ISO
    pillar: Pillar;
    country?: string; // 'EU' or ISO-2 like 'DE'
    tags?: string[];
    source: { name: string; url: string };
    canonical: string;
    editor_pick?: boolean;
    ai_generated?: boolean;
    summary: string; // 2–4 sentences
}

export interface Post {
    slug: string;
    html: string;           // rendered body
    data: PostFrontmatter;  // frontmatter
}
