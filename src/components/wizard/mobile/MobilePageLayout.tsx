
import { Button } from "@/components/ui/button";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MobilePageLayoutProps {
  title: string;
  subtitle?: string;
  currentStep: number;
  totalSteps: number;
  children: React.ReactNode;
  onNext?: () => void;
  onBack?: () => void;
  nextButtonText?: string;
  nextButtonDisabled?: boolean;
  showBackButton?: boolean;
}

export const MobilePageLayout: React.FC<MobilePageLayoutProps> = ({
  title,
  subtitle,
  currentStep,
  totalSteps,
  children,
  onNext,
  onBack,
  nextButtonText = "Continue",
  nextButtonDisabled = false,
  showBackButton = true
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (currentStep === 0) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border shadow-sm">
        <div className="flex items-center justify-between p-4 h-16">
          {showBackButton && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleBack}
              className="touch-target"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          
          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold text-foreground truncate px-2">
              {title}
            </h1>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="touch-target text-muted-foreground"
          >
            <HelpCircle className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Progress Bar */}
        <div className="px-4 pb-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(((currentStep + 1) / totalSteps) * 100)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-success h-2 rounded-full transition-all duration-300" 
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 space-y-6">
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
          {children}
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="sticky bottom-0 bg-background border-t border-border p-4 pb-safe">
        {onNext && (
          <Button
            onClick={onNext}
            disabled={nextButtonDisabled}
            className="w-full touch-target"
            size="lg"
          >
            {nextButtonText}
          </Button>
        )}
      </footer>
    </div>
  );
};
