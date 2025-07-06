
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { X, ArrowLeft } from "lucide-react";

interface BaseModalProps {
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

export const BaseModal: React.FC<BaseModalProps> = ({
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
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full h-full sm:h-auto sm:max-w-6xl sm:max-h-[90vh] flex flex-col sm:flex-row overflow-hidden ${className}`}>
        {/* Mobile Progress Bar */}
        {showProgressBar && progressSteps.length > 0 && (
          <div className="sm:hidden bg-background border-b border-border p-4">
            <div className="flex gap-2 overflow-x-auto">
              {progressSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-2 flex-shrink-0">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold touch-target ${
                    step.completed 
                      ? 'bg-success text-success-foreground' 
                      : step.current 
                        ? 'bg-info text-info-foreground' 
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    {step.completed ? '✓' : index + 1}
                  </div>
                  <span className={`text-xs font-medium whitespace-nowrap ${
                    step.current ? 'text-info' : step.completed ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Desktop Progress Bar */}
        {showProgressBar && progressSteps.length > 0 && (
          <div className="hidden sm:block w-80 bg-muted border-r border-border p-6 flex-shrink-0">
            <div className="space-y-4">
              {progressSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold touch-target ${
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
            <div className="flex-1 pr-2 sm:pr-0">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">{title}</h1>
              {subtitle && (
                <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground p-2 rounded-full hover:bg-muted touch-target flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 pb-20 sm:pb-4">
            {children}
          </div>

          {/* Footer Navigation - Fixed on mobile, relative on desktop */}
          <div className="fixed bottom-0 left-0 right-0 sm:relative sm:bottom-auto flex flex-col sm:flex-row justify-between items-stretch sm:items-center p-4 sm:p-6 border-t border-border flex-shrink-0 bg-background gap-3 sm:gap-4">
            {onBack ? (
              <Button 
                variant="outline" 
                onClick={onBack}
                size="lg"
                className="flex items-center justify-center gap-2 w-full sm:w-auto order-2 sm:order-1"
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
                className="w-full sm:w-auto order-1 sm:order-2"
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
