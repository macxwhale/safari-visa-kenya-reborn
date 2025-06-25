
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
    <div className="fixed bottom-0 left-0 right-0 lg:relative lg:bottom-auto flex justify-between p-4 sm:p-6 lg:p-8 border-t border-gray-100 bg-white gap-4">
      <Button 
        variant="outline" 
        onClick={onBack} 
        disabled={submitting} 
        className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 font-medium border-gray-300 hover:bg-gray-50 text-sm sm:text-base"
      >
        Back
      </Button>
      {currentStep < totalSteps - 1 ? (
        <Button 
          onClick={onNext} 
          disabled={submitting} 
          className="bg-brand-green hover:bg-brand-green/90 text-white flex-1 sm:flex-none px-6 sm:px-8 py-2 sm:py-3 font-semibold text-sm sm:text-base"
        >
          Continue
        </Button>
      ) : (
        <Button 
          onClick={onSubmit} 
          disabled={submitting} 
          className="bg-brand-green hover:bg-brand-green/90 text-white flex-1 sm:flex-none px-6 sm:px-8 py-2 sm:py-3 font-semibold text-sm sm:text-base"
        >
          {submitting ? "Submitting..." : "Submit Application"}
        </Button>
      )}
    </div>
  );
};
