import { cn } from '@/lib/utils';
import { getCategoryMeta } from '@/lib/categories';

interface CategoryChipProps {
  category: string;
  label?: string;
  active: boolean;
  onClick: () => void;
}

export function CategoryChip({ category, label, active, onClick }: CategoryChipProps) {
  const meta = getCategoryMeta(category);

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
        active
          ? `${meta.chipBg} ${meta.chipColor}`
          : 'bg-secondary/50 text-muted-foreground border-border hover:bg-secondary',
      )}
    >
      {label || meta.label}
    </button>
  );
}
