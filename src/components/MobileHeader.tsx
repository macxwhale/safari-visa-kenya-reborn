
import { MobileNavigation } from './MobileNavigation';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

export const MobileHeader: React.FC = () => {
  return (
    <>
      {/* Top orange bar */}
      <div className="w-full h-1 sm:h-2 bg-[#C2491D]" />
      
      <header className="sticky top-0 z-30 bg-background border-b border-border shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 h-16 sm:h-20">
          {/* Mobile Menu Button */}
          <MobileNavigation />

          {/* Logo/Title - Responsive */}
          <div className="flex-1 mx-4">
            <div className="text-center sm:text-left">
              <p className="text-xs text-muted-foreground font-medium leading-tight uppercase tracking-wide">
                Immigration Services
              </p>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground leading-tight mt-1">
                eTA System
              </h1>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Language Selector - Simplified for mobile */}
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center gap-2 min-h-[40px]"
            >
              <span className="text-base">🇬🇧</span>
              <span className="hidden md:inline">English</span>
              <span className="md:hidden">EN</span>
            </Button>

            {/* Mobile Language Button */}
            <Button
              variant="outline"
              size="sm"
              className="sm:hidden flex items-center gap-1 px-2"
            >
              <span>🇬🇧</span>
              <span className="text-xs">EN</span>
            </Button>

            {/* Settings */}
            <Button
              variant="ghost"
              size="icon"
              className="touch-target text-muted-foreground hover:text-foreground"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};
