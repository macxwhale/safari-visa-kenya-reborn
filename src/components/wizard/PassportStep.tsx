
import { Input } from "@/components/ui/input";
import { Upload, FileText, CheckCircle, Camera } from "lucide-react";
import { useRef } from "react";

interface PassportStepProps {
  form: {
    passportDoc: File | null;
    passport: string;
    nationality: string;
    dateOfBirth: string;
    placeOfBirth: string;
    passportIssueDate: string;
    passportExpiryDate: string;
    fullName: string;
  };
  onChange: (field: string, value: string | File | null) => void;
}

export default function PassportStep({ form, onChange }: PassportStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      onChange('passportDoc', file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0] || null;
    if (file && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
      onChange('passportDoc', file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleRemoveFile = () => {
    onChange('passportDoc', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCameraCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('capture', 'environment');
      fileInputRef.current.click();
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
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 sm:p-12 text-center bg-gray-50"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 border-2 border-gray-400 rounded-lg flex items-center justify-center">
                <FileText className="w-8 h-8 text-gray-600" />
              </div>
              <div>
                <p className="text-gray-700 mb-4 text-base">
                  Upload a photo or scan of your passport bio data page
                </p>
              </div>
              
              {/* Mobile-optimized buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button 
                  type="button"
                  onClick={handleCameraCapture}
                  className="bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 min-h-[48px] text-base w-full sm:w-auto"
                >
                  <Camera className="w-5 h-5" />
                  <span>Take Photo</span>
                </button>
                
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 min-h-[48px] text-base w-full sm:w-auto"
                >
                  <Upload className="w-5 h-5" />
                  <span>Upload File</span>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {form.passportDoc && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">File uploaded successfully!</p>
                  <p className="text-sm text-green-700">
                    Selected: {form.passportDoc.name}
                  </p>
                </div>
              </div>
              <button
                onClick={handleRemoveFile}
                className="text-sm text-green-600 hover:text-green-800 underline min-h-[44px] px-3"
              >
                Remove file
              </button>
            </div>
          </div>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Manual Form */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Passport Details
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <Input
              required
              placeholder="e.g. John Michael Smith"
              value={form.fullName}
              onChange={(e) => onChange('fullName', e.target.value)}
              className="min-h-[48px] text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Passport Number *
            </label>
            <Input
              required
              placeholder="e.g. A1234567"
              value={form.passport}
              onChange={(e) => onChange('passport', e.target.value)}
              className="min-h-[48px] text-base"
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
              className="min-h-[48px] text-base"
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
              className="min-h-[48px] text-base"
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
              className="min-h-[48px] text-base"
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
              className="min-h-[48px] text-base"
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
              className="min-h-[48px] text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
