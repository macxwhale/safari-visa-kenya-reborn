import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Upload, X } from "lucide-react";
import { ApplicationFormState } from "@/hooks/useApplicationForm";
import { MobileCameraCapture } from "./MobileCameraCapture";

interface SelfieStepProps {
  form: ApplicationFormState;
  onChange: (field: keyof ApplicationFormState, value: File | null) => void;
}

export default function SelfieStep({ form, onChange }: SelfieStepProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onChange('selfieDoc', file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onChange('selfieDoc', e.target.files[0]);
    }
  };

  const removeFile = () => {
    onChange('selfieDoc', null);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="mx-auto w-20 h-20 bg-info/10 rounded-full flex items-center justify-center">
          <Camera className="w-10 h-10 text-info" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Selfie Verification</h3>
          <p className="text-muted-foreground">
            Take a clear selfie or upload a recent photo of yourself for identity verification.
          </p>
        </div>
      </div>

      {/* Mobile-optimized camera capture */}
      <div className="max-w-md mx-auto">
        <MobileCameraCapture
          onCapture={(file) => onChange('selfieDoc', file)}
          accept="image/*"
          maxSizeMB={5}
          className="w-full"
        />
      </div>

      {form.selfieDoc && (
        <div className="max-w-md mx-auto p-4 bg-success/10 border border-success/20 rounded-lg">
          <p className="text-sm text-success-foreground text-center">
            ✓ Selfie uploaded: {form.selfieDoc.name}
          </p>
        </div>
      )}

      <div className="max-w-md mx-auto bg-info/5 border border-info/20 rounded-lg p-4">
        <h4 className="font-medium text-info mb-2">Photo Tips:</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Face the camera directly</li>
          <li>• Ensure good lighting</li>
          <li>• Remove sunglasses and hat</li>
          <li>• Keep a neutral expression</li>
          <li>• Make sure the image is clear and not blurry</li>
        </ul>
      </div>
    </div>
  );
}
