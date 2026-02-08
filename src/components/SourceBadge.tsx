import { getCountryFlag } from '@/lib/countries';

function formatSourceName(name: string): string {
  if (!name) return 'Source';
  // If it looks like a URL, extract the domain name
  if (name.includes('://') || name.includes('www.')) {
    try {
      const url = new URL(name.startsWith('http') ? name : `https://${name}`);
      const host = url.hostname.replace(/^www\./, '');
      // Capitalize the domain name part (e.g., "sifted.eu" → "Sifted")
      const parts = host.split('.');
      return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    } catch {
      return name;
    }
  }
  return name;
}

interface SourceBadgeProps {
  sourceName: string;
  country?: string;
}

export function SourceBadge({ sourceName, country }: SourceBadgeProps) {
  const hasCountry = country && country !== 'eu' && country !== 'EU' && country !== 'Europe';
  const flag = hasCountry ? getCountryFlag(country) : null;

  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
      {flag && <span>{flag}</span>}
      <span>{formatSourceName(sourceName)}</span>
    </span>
  );
}
