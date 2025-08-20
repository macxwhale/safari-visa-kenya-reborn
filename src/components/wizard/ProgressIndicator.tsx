
import { Check, Clock } from "lucide-react";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  completedSteps: boolean[];
  stepLabels: string[];
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  completedSteps,
  stepLabels
}) => {
  return (
    <div className="w-full bg-background p-4 border-b border-border">
      {/* Mobile Progress Bar */}
      <div className="lg:hidden">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-foreground">
            Step {currentStep + 1} of {totalSteps}
          </span>
          <span className="text-sm text-muted-foreground">
            {completedSteps.filter(Boolean).length} completed
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-3 mb-3">
          <div 
            className="bg-success h-3 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>

        {/* Current Step Label */}
        <p className="text-sm font-medium text-foreground text-center">
          {stepLabels[currentStep]}
        </p>
      </div>

      {/* Desktop Progress Steps */}
      <div className="hidden lg:flex items-center justify-between">
        {stepLabels.map((label, index) => (
          <div key={index} className="flex items-center flex-1">
            <div className="flex items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                ${completedSteps[index] 
                  ? 'bg-success text-success-foreground' 
                  : index === currentStep
                    ? 'bg-info text-info-foreground animate-pulse'
                    : 'bg-muted text-muted-foreground'
                }
              `}>
                {completedSteps[index] ? (
                  <Check className="w-5 h-5" />
                ) : index === currentStep ? (
                  <Clock className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </div>
              <span className={`ml-3 text-sm font-medium ${
                index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {label}
              </span>
            </div>
            {index < stepLabels.length - 1 && (
              <div className={`flex-1 h-px mx-4 ${
                completedSteps[index] ? 'bg-success' : 'bg-muted'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
