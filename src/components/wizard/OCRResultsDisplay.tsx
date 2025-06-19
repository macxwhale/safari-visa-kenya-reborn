
import { OCRResult } from "@/services/ocrService";
import { CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface OCRResultsDisplayProps {
  result: OCRResult;
  isValidated: boolean;
  onAccept: () => void;
  onReject: () => void;
}

export default function OCRResultsDisplay({ 
  result, 
  isValidated, 
  onAccept, 
  onReject 
}: OCRResultsDisplayProps) {
  const [showDetails, setShowDetails] = useState(true);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {isValidated ? (
            <CheckCircle className="w-6 h-6 text-green-600" />
          ) : (
            <AlertCircle className="w-6 h-6 text-amber-600" />
          )}
          <div>
            <h3 className="font-semibold text-gray-900">
              Passport Information Extracted
            </h3>
            <p className="text-sm text-gray-600">
              Confidence: {Math.round(result.confidence * 100)}%
            </p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDetails(!showDetails)}
          className="text-gray-500 hover:text-gray-700"
        >
          {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span className="ml-2 text-sm">
            {showDetails ? 'Hide' : 'Show'} Details
          </span>
        </Button>
      </div>

      {showDetails && (
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                {result.fullName}
              </p>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Document Number</label>
              <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg font-mono">
                {result.documentNumber}
              </p>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Date of Birth</label>
              <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                {formatDate(result.dateOfBirth)}
              </p>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Validity Date</label>
              <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                {formatDate(result.validityDate)}
              </p>
            </div>
          </div>

          {!isValidated && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800">Validation Warning</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    Some extracted information may need verification. Please review the details carefully.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={onAccept}
          className="bg-green-600 hover:bg-green-700 text-white flex-1"
        >
          Accept & Continue
        </Button>
        <Button
          onClick={onReject}
          variant="outline"
          className="flex-1 border-gray-300 hover:bg-gray-50"
        >
          Reject & Re-upload
        </Button>
      </div>
    </div>
  );
}
