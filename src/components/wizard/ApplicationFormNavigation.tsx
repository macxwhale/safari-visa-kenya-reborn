
import { Button } from "@/components/ui/button";

interface ApplicationFormNavigationProps {
  currentStep: number;
  totalSteps: number;
  submitting: boolean;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
}

export const ApplicationFormNavigation: React.FC<ApplicationFormNavigationProps> = ({
  currentStep,
  totalSteps,
  submitting,
  onNext,
  onBack,
  onSubmit
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 lg:relative lg:bottom-auto flex justify-between p-4 sm:p-6 lg:p-8 border-t border-border bg-white gap-4 shadow-lg lg:shadow-none pb-safe">
      <Button 
        variant="outline" 
        onClick={onBack} 
        disabled={submitting} 
        size="lg"
        className="flex-1 sm:flex-none font-medium"
      >
        Back
      </Button>
      {currentStep < totalSteps - 1 ? (
        <Button 
          variant="brand"
          onClick={onNext} 
          disabled={submitting} 
          size="lg"
          className="flex-1 sm:flex-none"
        >
          Continue
        </Button>
      ) : (
        <Button 
          variant="brand"
          onClick={onSubmit} 
          disabled={submitting} 
          size="lg"
          className="flex-1 sm:flex-none"
        >
          {submitting ? "Submitting..." : "Submit Application"}
        </Button>
      )}
    </div>
  );
};
