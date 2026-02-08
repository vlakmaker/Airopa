import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SPOTLIGHT_CATEGORIES } from '@/lib/categories';
import { getCategoryMeta } from '@/lib/categories';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';

export function CompactHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = SPOTLIGHT_CATEGORIES.map((cat) => ({
    category: cat,
    label: getCategoryMeta(cat).label,
    sectionId: `spotlight-${cat}`,
  }));

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'border-b border-border shadow-sm'
          : 'border-b border-border',
      )}
    >
      {/* Background image layer */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/hero-bg.jpg')" }}
      />
      <div
        className={cn(
          'absolute inset-0 transition-all duration-300',
          'bg-background/80',
        )}
      />
      <div className="relative container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          {isHomePage ? (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xl font-serif font-medium text-primary hover:text-accent transition-colors"
            >
              AIropa<span className="text-accent">.news</span>
            </button>
          ) : (
            <Link
              to="/"
              className="text-xl font-serif font-medium text-primary hover:text-accent transition-colors"
            >
              AIropa<span className="text-accent">.news</span>
            </Link>
          )}

          {/* Desktop: Category Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) =>
              isHomePage ? (
                <button
                  key={item.category}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
                </button>
              ) : (
                <Link
                  key={item.category}
                  to="/"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>

          {/* Desktop: Tagline + Subscribe */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-xs text-muted-foreground hidden lg:block">
              Signals from the European AI frontier
            </span>
          </div>

          {/* Mobile: Hamburger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 text-muted-foreground hover:text-foreground">
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <SheetTitle className="text-lg font-serif mb-6">
                  AIropa<span className="text-accent">.news</span>
                </SheetTitle>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) =>
                    isHomePage ? (
                      <button
                        key={item.category}
                        onClick={() => scrollToSection(item.sectionId)}
                        className="text-left text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        key={item.category}
                        to="/"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                      >
                        {item.label}
                      </Link>
                    ),
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
