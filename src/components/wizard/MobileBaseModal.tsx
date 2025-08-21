
import { ReactNode } from "react";
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

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`relative bg-white w-full h-full sm:h-auto sm:max-w-4xl sm:max-h-[95vh] flex flex-col overflow-hidden ${isMobile ? 'rounded-t-3xl' : 'sm:rounded-2xl'} shadow-2xl ${className}`}>
        
        {/* Mobile Progress Bar */}
        {showProgressBar && progressSteps.length > 0 && isMobile && (
          <div className="bg-background border-b border-border p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-foreground">Progress</span>
              <span className="text-sm text-muted-foreground">
                {progressSteps.filter(step => step.completed).length + (progressSteps.find(step => step.current) ? 1 : 0)} of {progressSteps.length}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-brand-green h-2 rounded-full transition-all duration-500 ease-out" 
                style={{ 
                  width: `${((progressSteps.filter(step => step.completed).length + (progressSteps.find(step => step.current) ? 1 : 0)) / progressSteps.length) * 100}%` 
                }}
              />
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
                      ? 'bg-success text-success-foreground' 
                      : step.current 
                        ? 'bg-info text-info-foreground' 
                        : 'bg-muted-foreground text-background'
                  }`}>
                    {step.completed ? '✓' : index + 1}
                  </div>
                  <span className={`text-sm font-medium ${
                    step.current ? 'text-info' : step.completed ? 'text-success' : 'text-muted-foreground'
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
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border flex-shrink-0">
            <div className="flex-1 pr-4">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">{title}</h1>
              {subtitle && (
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{subtitle}</p>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground touch-target flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 pb-32 sm:pb-4">
            {children}
          </div>

          {/* Fixed Bottom Navigation - Mobile Optimized */}
          <div className={`${isMobile ? 'fixed bottom-0 left-0 right-0' : 'relative'} flex flex-col sm:flex-row justify-between items-stretch sm:items-center p-4 sm:p-6 border-t border-border flex-shrink-0 bg-background gap-3 sm:gap-4 ${isMobile ? 'pb-safe' : ''} shadow-lg sm:shadow-none`}>
            {onBack ? (
              <Button 
                variant="outline" 
                onClick={onBack}
                size="lg"
                className="flex items-center justify-center gap-2 w-full sm:w-auto order-2 sm:order-1 touch-target text-base"
              >
                <ArrowLeft className="w-4 h-4" />
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
                className="w-full sm:w-auto order-1 sm:order-2 touch-target text-base font-semibold"
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
