
import { Button } from "@/components/ui/button";
import { X, Check, HelpCircle } from "lucide-react";
import { useState } from "react";

interface DeclarationModalProps {
  onClose: () => void;
  onContinue: () => void;
  onBack: () => void;
}

export default function DeclarationModal({ onClose, onContinue, onBack }: DeclarationModalProps) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Modal overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300" onClick={onClose} />

      {/* Modal content */}
      <div className="relative z-50 bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full h-full sm:h-auto sm:max-w-5xl sm:max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-gray-100 flex-shrink-0">
          <div className="flex-1 pr-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Declaration of Consent</h1>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700 flex items-center gap-2 px-3 py-2 hidden sm:flex"
            >
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 pb-24 sm:pb-8">
          <div className="max-w-4xl space-y-8">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="font-bold text-blue-900 mb-3 text-base sm:text-lg">Important Information</h3>
              <p className="text-sm sm:text-base text-blue-800 leading-relaxed">
                By proceeding with this application, you acknowledge that you have read and understood the terms and conditions for the Kenya Electronic Travel Authorization (eTA).
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Declaration</h3>
              
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                  <p className="font-semibold text-gray-900">I hereby declare that:</p>
                  <ul className="list-disc ml-6 space-y-3">
                    <li>All information provided in this application is true, complete, and accurate to the best of my knowledge.</li>
                    <li>I understand that providing false or misleading information may result in the refusal of my application or denial of entry into Kenya.</li>
                    <li>I consent to the collection, use, and disclosure of my personal information for the purpose of processing this eTA application.</li>
                    <li>I understand that this eTA does not guarantee entry into Kenya and that final admission is determined by immigration officers at the port of entry.</li>
                    <li>I agree to comply with all laws and regulations of Kenya during my visit.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <label className="flex items-start gap-4 cursor-pointer touch-manipulation">
                <div className="relative mt-1 flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                    agreed ? 'bg-brand-green border-brand-green' : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    {agreed && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>
                <span className="text-sm sm:text-base text-gray-700 leading-relaxed pt-0.5">
                  I have read, understood, and agree to the above declaration. I consent to the processing of my application for the Kenya eTA.
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 sm:relative sm:bottom-auto flex flex-col sm:flex-row justify-between items-stretch sm:items-center p-6 sm:p-8 border-t border-gray-100 bg-white flex-shrink-0 gap-4 sm:gap-6">
          <Button 
            variant="outline" 
            onClick={onBack} 
            className="order-2 sm:order-1 w-full sm:w-auto px-6 py-3 font-medium border-gray-300 hover:bg-gray-50"
          >
            Back
          </Button>
          <div className="flex flex-col sm:flex-row gap-3 order-1 sm:order-2">
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="w-full sm:w-auto px-6 py-3 font-medium border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              onClick={onContinue}
              disabled={!agreed}
              className="bg-brand-green hover:bg-brand-green/90 text-white disabled:bg-gray-300 disabled:cursor-not-allowed w-full sm:w-auto px-8 py-3 font-semibold transition-colors"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
