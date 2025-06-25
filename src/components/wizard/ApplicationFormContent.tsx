
import ApplicationStepper from "@/components/ApplicationStepper";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

interface ApplicationFormContentProps {
  currentStep: number;
  stepLabels: string[];
  children: React.ReactNode;
  error?: string | null;
}

export const ApplicationFormContent: React.FC<ApplicationFormContentProps> = ({
  currentStep,
  stepLabels,
  children,
  error
}) => {
  return (
    <div className="flex flex-col lg:flex-row flex-1 overflow-hidden min-h-0">
      {/* Left Sidebar - Hidden on mobile, shown on large screens */}
      <div className="hidden lg:block lg:w-80 xl:w-96 bg-gray-50 border-r border-gray-200 overflow-y-auto flex-shrink-0">
        <div className="p-6 xl:p-8">
          <ApplicationStepper currentStep={currentStep} steps={stepLabels} />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 xl:p-12 max-w-4xl mx-auto">
            {/* Mobile Progress Indicator */}
            <div className="lg:hidden mb-4 sm:mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-500">{currentStep + 1} of {stepLabels.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-brand-green h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${((currentStep + 1) / stepLabels.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Step Content */}
            <div className="h-full">
              <ErrorBoundary fallback={<div className="text-red-600 p-4 bg-red-50 border border-red-200 rounded-lg">Error loading step content</div>}>
                {children}
              </ErrorBoundary>
            </div>

            {error && (
              <div className="text-red-600 text-sm mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
