
import { Check } from "lucide-react";

interface ModalProgressBarProps {
  steps: Array<{
    label: string;
    completed: boolean;
    current: boolean;
  }>;
}

export const ModalProgressBar: React.FC<ModalProgressBarProps> = ({ steps }) => {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-6 overflow-y-auto">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Application Progress</h3>
      
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.label} className="flex items-start space-x-3">
            {/* Step indicator */}
            <div className="flex-shrink-0">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                  step.completed
                    ? "bg-green-600 text-white"
                    : step.current
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step.completed ? (
                  <Check className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </div>
            </div>
            
            {/* Step label */}
            <div className="flex-1 min-w-0 pt-1">
              <p
                className={`text-sm font-medium transition-colors ${
                  step.completed || step.current
                    ? "text-gray-900"
                    : "text-gray-500"
                }`}
              >
                {step.label}
              </p>
            </div>
            
            {/* Connector line */}
            {index !== steps.length - 1 && (
              <div 
                className="absolute left-10 mt-8 w-px h-6 transition-colors"
                style={{ 
                  backgroundColor: step.completed ? '#10B981' : '#E5E7EB',
                  marginTop: '32px'
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
