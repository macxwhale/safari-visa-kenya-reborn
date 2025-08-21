
import { ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, ArrowLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileBaseModalProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  onClose: () => void;
  onBack?: () => void;
  onNext?: () => void;
  nextButtonText?: ReactNode;
  showNextButton?: boolean;
  nextButtonDisabled?: boolean;
  className?: string;
  showProgressBar?: boolean;
  progressSteps?: Array<{
    label: string;
    completed: boolean;
    current: boolean;
  }>;
}

export const MobileBaseModal: React.FC<MobileBaseModalProps> = ({
  children,
  title,
  subtitle,
  onClose,
  onBack,
  onNext,
  nextButtonText = "Continue",
  showNextButton = true,
  nextButtonDisabled = false,
  className = "",
  showProgressBar = false,
  progressSteps = []
}) => {
  const isMobile = useIsMobile();
  const [isAnimating, setIsAnimating] = useState(true);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // Trigger slide-up animation
    const timer = setTimeout(() => setIsAnimating(false), 100);
    return () => clearTimeout(timer);
  }, []);

  // Touch handlers for swipe-to-dismiss
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile || !isDragging) return;
    const deltaY = e.touches[0].clientY - startY;
    if (deltaY > 0) {
      setCurrentY(deltaY);
    }
  };

  const handleTouchEnd = () => {
    if (!isMobile || !isDragging) return;
    setIsDragging(false);
    
    // If dragged down more than 150px, close modal
    if (currentY > 150) {
      onClose();
    } else {
      setCurrentY(0);
    }
  };

  const modalTransform = isDragging ? `translateY(${currentY}px)` : 'translateY(0)';
  const modalOpacity = isDragging ? Math.max(0.5, 1 - currentY / 300) : 1;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Enhanced Backdrop with blur */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
        style={{ opacity: modalOpacity }}
      />
      
      {/* Modal Content with bottom sheet behavior */}
      <div 
        className={`relative bg-white w-full flex flex-col overflow-hidden transition-all duration-300 ${
          isMobile 
            ? `rounded-t-3xl shadow-2xl max-h-[95vh] ${isAnimating ? 'translate-y-full' : 'translate-y-0'}` 
            : 'sm:rounded-2xl sm:max-w-4xl sm:max-h-[95vh] sm:m-4'
        } ${className}`}
        style={{ 
          transform: isMobile ? modalTransform : undefined,
          opacity: modalOpacity 
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        
        {/* Mobile drag handle */}
        {isMobile && (
          <div className="flex justify-center pt-2 pb-1">
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>
        )}

        {/* Enhanced Mobile Progress Bar */}
        {showProgressBar && progressSteps.length > 0 && isMobile && (
          <div className="bg-background border-b border-border px-6 py-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-foreground">Step Progress</span>
              <span className="text-sm text-muted-foreground font-medium">
                {progressSteps.filter(step => step.completed).length + (progressSteps.find(step => step.current) ? 1 : 0)} of {progressSteps.length}
              </span>
            </div>
            {/* Linear progress bar */}
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-brand-green h-2 rounded-full transition-all duration-500 ease-out" 
                style={{ 
                  width: `${((progressSteps.filter(step => step.completed).length + (progressSteps.find(step => step.current) ? 1 : 0)) / progressSteps.length) * 100}%` 
                }}
              />
            </div>
            {/* Step indicators */}
            <div className="flex justify-between mt-3 px-1">
              {progressSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step.completed 
                      ? 'bg-success text-white' 
                      : step.current 
                        ? 'bg-brand-green text-white' 
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    {step.completed ? '✓' : index + 1}
                  </div>
                  <span className={`text-xs font-medium mt-1 text-center max-w-16 truncate ${
                    step.current ? 'text-brand-green' : step.completed ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Desktop Progress Sidebar */}
        {showProgressBar && progressSteps.length > 0 && !isMobile && (
          <div className="hidden sm:block w-80 bg-muted border-r border-border p-6 flex-shrink-0">
            <div className="space-y-4">
              {progressSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step.completed 
                      ? 'bg-success text-white' 
                      : step.current 
                        ? 'bg-brand-green text-white' 
                        : 'bg-muted-foreground text-background'
                  }`}>
                    {step.completed ? '✓' : index + 1}
                  </div>
                  <span className={`text-sm font-medium ${
                    step.current ? 'text-brand-green' : step.completed ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Enhanced Header with better mobile spacing */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border flex-shrink-0">
            <div className="flex-1 pr-4">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight mb-2">{title}</h1>
              {subtitle && (
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{subtitle}</p>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground touch-target flex-shrink-0 w-12 h-12 rounded-full hover:bg-muted"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Scrollable Content with better mobile padding */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 pb-32 sm:pb-6 mobile-scroll">
            {children}
          </div>

          {/* Enhanced Mobile Navigation */}
          <div className={`${isMobile ? 'fixed bottom-0 left-0 right-0' : 'relative'} flex flex-col sm:flex-row justify-between items-stretch sm:items-center p-4 sm:p-6 border-t border-border flex-shrink-0 bg-background gap-4 sm:gap-4 ${isMobile ? 'pb-safe shadow-2xl' : ''}`}>
            {onBack ? (
              <Button 
                variant="outline" 
                onClick={onBack}
                size="lg"
                className="flex items-center justify-center gap-3 w-full sm:w-auto order-2 sm:order-1 touch-target text-base font-medium h-14 sm:h-12"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </Button>
            ) : (
              <div className="hidden sm:block" />
            )}
            
            {showNextButton && onNext && (
              <Button 
                variant="brand"
                onClick={onNext}
                disabled={nextButtonDisabled}
                size="lg"
                className={`w-full sm:w-auto order-1 sm:order-2 touch-target text-base font-semibold h-14 sm:h-12 ${
                  nextButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {nextButtonText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
