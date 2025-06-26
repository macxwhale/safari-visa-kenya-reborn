
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
  nextButtonText?: string;
  showNextButton?: boolean;
  nextButtonDisabled?: boolean;
  className?: string;
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
  className = ""
}) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && (
              <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {children}
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center p-6 border-t border-gray-100 flex-shrink-0">
          {onBack ? (
            <Button 
              variant="outline" 
              onClick={onBack}
              className="flex items-center gap-2 px-6 py-3"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          ) : (
            <div />
          )}
          
          {showNextButton && onNext && (
            <Button 
              onClick={onNext}
              disabled={nextButtonDisabled}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 font-semibold"
            >
              {nextButtonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
