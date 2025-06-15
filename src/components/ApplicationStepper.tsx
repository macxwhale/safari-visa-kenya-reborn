
import { Check } from "lucide-react";

export default function ApplicationStepper({
  currentStep,
  steps,
}: {
  currentStep: number;
  steps: string[];
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Application Progress</h2>
      
      {steps.map((label, i) => (
        <div className="flex items-start space-x-3" key={label}>
          <div className="flex-shrink-0">
            <div
              className={[
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors",
                i < currentStep
                  ? "bg-green-600 text-white"
                  : i === currentStep
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-500"
              ].join(" ")}
            >
              {i < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                i + 1
              )}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <p
              className={[
                "text-sm font-medium transition-colors",
                i <= currentStep
                  ? "text-green-600"
                  : "text-gray-500"
              ].join(" ")}
            >
              {label}
            </p>
          </div>
          
          {/* Connector line */}
          {i !== steps.length - 1 && (
            <div className="absolute left-4 mt-8 w-px h-6 bg-gray-200" style={{ marginLeft: '15px' }} />
          )}
        </div>
      ))}
    </div>
  );
}
