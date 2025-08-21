
import { ReactNode, useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { X, ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BottomSheetModalProps {
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

export const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
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
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const lastY = useRef(0);

  // Show modal with animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Check if content is scrolled to top
  const handleScroll = useCallback((e: Event) => {
    const target = e.target as HTMLElement;
    setIsAtTop(target.scrollTop <= 5);
  }, []);

  // Touch event handlers for swipe-to-dismiss
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    // Only allow swipe when at top of content
    if (!isAtTop) return;
    
    startY.current = e.touches[0].clientY;
    lastY.current = startY.current;
    setIsDragging(true);
  }, [isAtTop]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startY.current;
    
    // Only allow downward swipe
    if (deltaY > 0) {
      setDragOffset(deltaY);
      lastY.current = currentY;
    }
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // Close modal if dragged down more than 120px
    if (dragOffset > 120) {
      onClose();
    } else {
      setDragOffset(0);
    }
  }, [isDragging, dragOffset, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    const body = document.body;
    const originalStyle = window.getComputedStyle(body).overflow;
    body.style.overflow = 'hidden';
    
    return () => {
      body.style.overflow = originalStyle;
    };
  }, []);

  const modalTransform = isVisible 
    ? `translateY(${dragOffset}px)` 
    : 'translateY(100%)';
  
  const modalOpacity = isDragging 
    ? Math.max(0.7, 1 - dragOffset / 300) 
    : 1;

  const backdropOpacity = isVisible ? (isDragging ? modalOpacity * 0.6 : 0.6) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: backdropOpacity }}
        onClick={handleBackdropClick}
      />
      
      {/* Modal Container */}
      <div 
        ref={modalRef}
        className={`relative bg-background w-full flex flex-col rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out ${className}`}
        style={{ 
          transform: modalTransform,
          opacity: modalOpacity,
          height: 'calc(100dvh - env(safe-area-inset-top) - 2rem)',
          maxHeight: 'calc(100dvh - env(safe-area-inset-top) - 2rem)',
          willChange: 'transform'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
          <div 
            className="w-12 h-1.5 bg-muted rounded-full transition-colors"
            style={{ 
              backgroundColor: isDragging ? 'hsl(var(--muted-foreground))' : 'hsl(var(--muted))'
            }}
          />
        </div>

        {/* Progress Bar */}
        {showProgressBar && progressSteps.length > 0 && (
          <div className="bg-background border-b border-border px-6 py-4 flex-shrink-0">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-foreground">Progress</span>
              <span className="text-sm text-muted-foreground font-medium">
                {progressSteps.filter(step => step.completed).length + (progressSteps.find(step => step.current) ? 1 : 0)} of {progressSteps.length}
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2 mb-4">
              <div 
                className="bg-brand-green h-2 rounded-full transition-all duration-500 ease-out" 
                style={{ 
                  width: `${((progressSteps.filter(step => step.completed).length + (progressSteps.find(step => step.current) ? 1 : 0)) / progressSteps.length) * 100}%` 
                }}
              />
            </div>
            
            {/* Step Indicators */}
            <div className="flex justify-between px-1">
              {progressSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center flex-1 min-w-0">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step.completed 
                      ? 'bg-success text-white' 
                      : step.current 
                        ? 'bg-brand-green text-white' 
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    {step.completed ? '✓' : index + 1}
                  </div>
                  <span className={`text-xs font-medium mt-1 text-center truncate max-w-full ${
                    step.current ? 'text-brand-green' : step.completed ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-border flex-shrink-0">
          <div className="flex-1 pr-4 min-w-0">
            <h1 className="text-xl font-bold text-foreground leading-tight mb-2 break-words">{title}</h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground leading-relaxed break-words">{subtitle}</p>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground flex-shrink-0 w-10 h-10 rounded-full hover:bg-muted touch-target"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Scrollable Content */}
        <ScrollArea className="flex-1 min-h-0">
          <div 
            ref={contentRef}
            className="px-6 py-6 pb-32"
            style={{
              overscrollBehavior: 'contain',
              WebkitOverflowScrolling: 'touch'
            }}
            onScroll={handleScroll}
          >
            {children}
          </div>
        </ScrollArea>

        {/* Fixed Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 flex flex-col justify-between items-stretch p-6 border-t border-border bg-background gap-4 pb-safe shadow-2xl flex-shrink-0">
          <div className="flex flex-col gap-3">
            {onBack && (
              <Button 
                variant="outline" 
                onClick={onBack}
                size="lg"
                className="flex items-center justify-center gap-3 w-full touch-target text-base font-medium h-12"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}
            
            {showNextButton && onNext && (
              <Button 
                variant="brand"
                onClick={onNext}
                disabled={nextButtonDisabled}
                size="lg"
                className={`w-full touch-target text-base font-semibold h-12 ${
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
