
import { Input } from "@/components/ui/input";
import { Upload, Camera } from "lucide-react";
import { useRef } from "react";

interface SelfieStepProps {
  form: {
    selfieDoc: File | null;
  };
  onChange: (field: string, value: File | null) => void;
}

export default function SelfieStep({ form, onChange }: SelfieStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onChange('selfieDoc', file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0] || null;
    if (file && file.type.startsWith('image/')) {
      onChange('selfieDoc', file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Upload Your Photo</h3>
        <p className="text-gray-600 text-sm">
          Please upload a clear photo of yourself or take a selfie. Make sure your face is clearly visible and the image is well-lit.
        </p>
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-gray-400 transition-colors bg-gray-50"
      >
        <div className="flex flex-col items-center space-y-4">
          <Camera className="w-16 h-16 text-gray-400" />
          <div>
            <p className="text-gray-700 mb-2">
              Drag & drop your photo here or click to select from your device
            </p>
            {form.selfieDoc && (
              <p className="text-sm text-green-600 font-medium">
                Selected: {form.selfieDoc.name}
              </p>
            )}
          </div>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Upload Photo</span>
          </button>
        </div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
