
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

  const handleCameraCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('capture', 'user'); // Front camera for selfie
      fileInputRef.current.click();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-900">Upload Your Photo</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Please upload a clear photo of yourself or take a selfie. Make sure your face is clearly visible and the image is well-lit.
        </p>
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 sm:p-12 text-center bg-gray-50"
      >
        <div className="flex flex-col items-center space-y-6">
          <Camera className="w-16 h-16 text-gray-400" />
          <div>
            <p className="text-gray-700 mb-4 text-base">
              Take a selfie or upload a photo from your device
            </p>
            {form.selfieDoc && (
              <p className="text-sm text-green-600 font-medium mb-4">
                Selected: {form.selfieDoc.name}
              </p>
            )}
          </div>
          
          {/* Mobile-optimized buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button 
              type="button"
              onClick={handleCameraCapture}
              className="bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 min-h-[48px] text-base w-full sm:w-auto"
            >
              <Camera className="w-5 h-5" />
              <span>Take Selfie</span>
            </button>
            
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 min-h-[48px] text-base w-full sm:w-auto"
            >
              <Upload className="w-5 h-5" />
              <span>Upload Photo</span>
            </button>
          </div>
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
