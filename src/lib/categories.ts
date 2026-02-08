import type { ArticleCategory } from '@/api/types';

export interface CategoryMeta {
  label: string;
  gradient: string;
  chipColor: string;
  chipBg: string;
  sectionTitle: string;
  sectionSubtitle: string;
}

export const CATEGORY_META: Record<string, CategoryMeta> = {
  startups: {
    label: 'Startups',
    gradient: 'from-emerald-500 to-teal-600',
    chipColor: 'text-emerald-700',
    chipBg: 'bg-emerald-100 border-emerald-200',
    sectionTitle: 'Startup Spotlight',
    sectionSubtitle: "Innovation from Europe's rising AI companies",
  },
  policy: {
    label: 'Policy',
    gradient: 'from-blue-500 to-indigo-600',
    chipColor: 'text-blue-700',
    chipBg: 'bg-blue-100 border-blue-200',
    sectionTitle: 'Policy & Regulation',
    sectionSubtitle: 'Latest developments in AI governance',
  },
  research: {
    label: 'Research',
    gradient: 'from-purple-500 to-violet-600',
    chipColor: 'text-purple-700',
    chipBg: 'bg-purple-100 border-purple-200',
    sectionTitle: 'Research & Science',
    sectionSubtitle: 'Breakthroughs from European labs and universities',
  },
  industry: {
    label: 'Industry',
    gradient: 'from-amber-500 to-orange-600',
    chipColor: 'text-amber-700',
    chipBg: 'bg-amber-100 border-amber-200',
    sectionTitle: 'Industry & Enterprise',
    sectionSubtitle: 'AI adoption across European business',
  },
};

export const SPOTLIGHT_CATEGORIES: ArticleCategory[] = ['startups', 'policy', 'research', 'industry'];

export function getCategoryMeta(category?: string): CategoryMeta {
  if (category && category in CATEGORY_META) {
    return CATEGORY_META[category];
  }
  return CATEGORY_META.research;
}
