
import { Button } from "@/components/ui/button";
import { X, Check } from "lucide-react";
import { useState } from "react";

interface DeclarationModalProps {
  onClose: () => void;
  onContinue: () => void;
  onBack: () => void;
}

export default function DeclarationModal({ onClose, onContinue, onBack }: DeclarationModalProps) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Modal overlay */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal content */}
      <div className="relative z-50 bg-white rounded-lg shadow-xl max-w-4xl w-full mx-auto max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
          <h1 className="text-2xl font-bold text-gray-900">Declaration of Consent</h1>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClose}
            className="text-gray-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] flex-1">
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Important Information</h3>
              <p className="text-sm text-blue-800 leading-relaxed">
                By proceeding with this application, you acknowledge that you have read and understood the terms and conditions for the Kenya Electronic Travel Authorization (eTA).
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Declaration</h3>
              <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                <p>I hereby declare that:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>All information provided in this application is true, complete, and accurate to the best of my knowledge.</li>
                  <li>I understand that providing false or misleading information may result in the refusal of my application or denial of entry into Kenya.</li>
                  <li>I consent to the collection, use, and disclosure of my personal information for the purpose of processing this eTA application.</li>
                  <li>I understand that this eTA does not guarantee entry into Kenya and that final admission is determined by immigration officers at the port of entry.</li>
                  <li>I agree to comply with all laws and regulations of Kenya during my visit.</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <div className="relative mt-1">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    agreed ? 'bg-brand-green border-brand-green' : 'border-gray-300'
                  }`}>
                    {agreed && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <span className="text-sm text-gray-700 leading-relaxed">
                  I have read, understood, and agree to the above declaration. I consent to the processing of my application for the Kenya eTA.
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t bg-gray-50 flex-shrink-0">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={onContinue}
              disabled={!agreed}
              className="bg-brand-green hover:bg-brand-green/90 text-white disabled:bg-gray-400"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
