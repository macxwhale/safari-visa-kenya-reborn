
import { Button } from "@/components/ui/button";
import { HelpCircle, X } from "lucide-react";

interface ApplicationFormHeaderProps {
  currentStep: number;
  totalSteps: number;
  stepLabel: string;
  onClose: () => void;
}

export const ApplicationFormHeader: React.FC<ApplicationFormHeaderProps> = ({
  currentStep,
  totalSteps,
  stepLabel,
  onClose
}) => {
  return (
    <div className="flex items-center justify-between p-4 sm:p-6 lg:p-8 border-b border-gray-100 flex-shrink-0">
      <div className="flex-1">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
          {stepLabel}
        </h1>
        <div className="hidden sm:block mt-2">
          <p className="text-sm text-gray-500">
            Step {currentStep + 1} of {totalSteps}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 hidden sm:flex items-center gap-2 px-3 py-2">
          <HelpCircle className="w-4 h-4" />
          <span className="text-sm">Help</span>
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
