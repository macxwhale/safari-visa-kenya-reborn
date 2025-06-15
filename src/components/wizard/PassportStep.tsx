
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
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
  };
  onChange: (field: string, value: string | File | null) => void;
}

export default function PassportStep({ form, onChange }: PassportStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onChange('passportDoc', file);
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

  return (
    <div className="space-y-8 animate-fade-in max-w-2xl">
      {/* Upload Area */}
      <div className="space-y-4">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-gray-400 transition-colors bg-gray-50"
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 border-2 border-gray-400 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-700 mb-2">
                Drag & drop a photo or scan of the travel document or passport bio data page or click here to manually select
              </p>
              {form.passportDoc && (
                <p className="text-sm text-green-600 font-medium">
                  Selected: {form.passportDoc.name}
                </p>
              )}
            </div>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Upload passport page</span>
            </button>
          </div>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Passport Details Form */}
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
          />
        </div>
      </div>
    </div>
  );
}
