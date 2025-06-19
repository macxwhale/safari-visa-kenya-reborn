
import { Input } from "@/components/ui/input";
import { Upload, Loader2, FileText } from "lucide-react";
import { useRef, useState } from "react";
import { useOCR } from "@/hooks/useOCR";
import OCRResultsDisplay from "./OCRResultsDisplay";

interface PassportStepProps {
  form: {
    passportDoc: File | null;
    passport: string;
    nationality: string;
    dateOfBirth: string;
    placeOfBirth: string;
    passportIssueDate: string;
    passportExpiryDate: string;
  };
  onChange: (field: string, value: string | File | null) => void;
}

export default function PassportStep({ form, onChange }: PassportStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { ocrState, processPassportImage, clearOCRResult } = useOCR();
  const [showManualForm, setShowManualForm] = useState(false);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      onChange('passportDoc', file);
      await processPassportImage(file);
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0] || null;
    if (file && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
      onChange('passportDoc', file);
      await processPassportImage(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleAcceptOCR = () => {
    if (ocrState.result) {
      // Auto-fill form fields with OCR data
      onChange('passport', ocrState.result.documentNumber);
      onChange('nationality', form.nationality || ''); // Keep existing or empty
      onChange('dateOfBirth', ocrState.result.dateOfBirth);
      onChange('passportExpiryDate', ocrState.result.validityDate);
      
      // For full name, we might want to split it or let user handle it
      // This could be enhanced based on your form structure
      
      setShowManualForm(true);
    }
  };

  const handleRejectOCR = () => {
    clearOCRResult();
    onChange('passportDoc', null);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-2xl">
      {/* Upload Area */}
      <div className="space-y-6">
        {!form.passportDoc && (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-gray-400 transition-colors bg-gray-50"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 border-2 border-gray-400 rounded-lg flex items-center justify-center">
                <FileText className="w-8 h-8 text-gray-600" />
              </div>
              <div>
                <p className="text-gray-700 mb-2 text-base">
                  Drag & drop a photo or scan of the travel document or passport bio data page or click here to manually select
                </p>
                <p className="text-sm text-gray-500">
                  We'll automatically extract your passport information using OCR technology
                </p>
              </div>
              <button 
                type="button"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Upload className="w-5 h-5" />
                <span>Upload passport page</span>
              </button>
            </div>
          </div>
        )}
        
        {form.passportDoc && !ocrState.isProcessing && !ocrState.result && !ocrState.error && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">File uploaded successfully</p>
                <p className="text-sm text-blue-700">
                  Selected: {form.passportDoc.name}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* OCR Processing State */}
        {ocrState.isProcessing && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
              <div>
                <p className="font-medium text-blue-900">Processing passport image...</p>
                <p className="text-sm text-blue-700">
                  Extracting information from your document. This may take a few moments.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* OCR Error State */}
        {ocrState.error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-sm font-bold">!</span>
              </div>
              <div>
                <p className="font-medium text-red-900">Processing failed</p>
                <p className="text-sm text-red-700">{ocrState.error}</p>
                <button
                  onClick={handleRejectOCR}
                  className="text-sm text-red-600 hover:text-red-800 underline mt-2"
                >
                  Try uploading again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* OCR Results */}
        {ocrState.result && !showManualForm && (
          <OCRResultsDisplay
            result={ocrState.result}
            isValidated={ocrState.isValidated}
            onAccept={handleAcceptOCR}
            onReject={handleRejectOCR}
          />
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Manual Form - Show after OCR acceptance or if user wants to fill manually */}
      {(showManualForm || (!form.passportDoc && !ocrState.isProcessing)) && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {ocrState.result ? 'Verify & Complete Information' : 'Passport Details'}
            </h3>
            {ocrState.result && (
              <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                Auto-filled from OCR
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Passport Number *
              </label>
              <Input
                required
                placeholder="e.g. A1234567"
                value={form.passport}
                onChange={(e) => onChange('passport', e.target.value)}
                className={ocrState.result ? 'bg-green-50 border-green-200' : ''}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nationality *
              </label>
              <Input
                required
                placeholder="e.g. United States"
                value={form.nationality}
                onChange={(e) => onChange('nationality', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth *
              </label>
              <Input
                type="date"
                required
                value={form.dateOfBirth}
                onChange={(e) => onChange('dateOfBirth', e.target.value)}
                className={ocrState.result ? 'bg-green-50 border-green-200' : ''}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Place of Birth *
              </label>
              <Input
                required
                placeholder="e.g. New York, USA"
                value={form.placeOfBirth}
                onChange={(e) => onChange('placeOfBirth', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Passport Issue Date *
              </label>
              <Input
                type="date"
                required
                value={form.passportIssueDate}
                onChange={(e) => onChange('passportIssueDate', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Passport Expiry Date *
              </label>
              <Input
                type="date"
                required
                value={form.passportExpiryDate}
                onChange={(e) => onChange('passportExpiryDate', e.target.value)}
                className={ocrState.result ? 'bg-green-50 border-green-200' : ''}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
