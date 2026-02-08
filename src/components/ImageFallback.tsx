import { cn } from '@/lib/utils';
import { getCategoryMeta } from '@/lib/categories';

interface ImageFallbackProps {
  category?: string;
  className?: string;
}

export function ImageFallback({ category, className }: ImageFallbackProps) {
  const meta = getCategoryMeta(category);

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-gradient-to-br aspect-video flex items-center justify-center',
        meta.gradient,
        className,
      )}
    >
      <span className="text-white/20 text-sm font-medium uppercase tracking-widest select-none">
        {meta.label}
      </span>
    </div>
  );
}
