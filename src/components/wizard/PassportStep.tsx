import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Camera, Loader2 } from "lucide-react";
import { ApplicationFormState } from "@/hooks/useApplicationForm";
import { useToast } from "@/hooks/use-toast";
import { MobileCameraCapture } from "./MobileCameraCapture";

interface PassportStepProps {
  form: ApplicationFormState;
  onChange: (field: keyof ApplicationFormState, value: string | File | null) => void;
}

export default function PassportStep({ form, onChange }: PassportStepProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    try {
      onChange('passportDoc', file);
      toast({
        title: "Document uploaded",
        description: "Your passport document has been uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload document. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

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
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Passport Document Upload */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Upload Passport Document</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Upload a clear photo of your passport's main information page.
          </p>
        </div>

        {/* Mobile-optimized camera capture */}
        <div className="block sm:hidden">
          <MobileCameraCapture
            onCapture={(file) => onChange('passportDoc', file)}
            accept="image/*"
            maxSizeMB={5}
            className="w-full"
          />
        </div>

        {/* Desktop file upload */}
        <div className="hidden sm:block">
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? "border-brand-green bg-brand-green/5"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isUploading}
            />
            
            <div className="space-y-4">
              {isUploading ? (
                <Loader2 className="mx-auto h-12 w-12 text-brand-green animate-spin" />
              ) : (
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
              )}
              
              <div>
                <p className="text-lg font-medium text-gray-900">
                  {isUploading ? "Uploading..." : "Drop your passport here"}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  or click to browse files
                </p>
              </div>
              
              <Button
                type="button"
                variant="outline"
                disabled={isUploading}
                className="pointer-events-none"
              >
                <FileText className="w-4 h-4 mr-2" />
                Choose File
              </Button>
            </div>
          </div>
        </div>

        {form.passportDoc && (
          <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
            <p className="text-sm text-success-foreground">
              ✓ Passport document uploaded: {form.passportDoc.name}
            </p>
          </div>
        )}
      </div>

      {/* Passport Information Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-base font-medium">
            Full Name (as shown on passport) *
          </Label>
          <Input
            id="fullName"
            value={form.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            placeholder="Enter your full name"
            className="text-base h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="passport" className="text-base font-medium">
            Passport Number *
          </Label>
          <Input
            id="passport"
            value={form.passport}
            onChange={(e) => onChange('passport', e.target.value)}
            placeholder="Enter passport number"
            className="text-base h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nationality" className="text-base font-medium">
            Nationality *
          </Label>
          <Input
            id="nationality"
            value={form.nationality}
            onChange={(e) => onChange('nationality', e.target.value)}
            placeholder="Enter nationality"
            className="text-base h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth" className="text-base font-medium">
            Date of Birth *
          </Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={form.dateOfBirth}
            onChange={(e) => onChange('dateOfBirth', e.target.value)}
            className="text-base h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="placeOfBirth" className="text-base font-medium">
            Place of Birth *
          </Label>
          <Input
            id="placeOfBirth"
            value={form.placeOfBirth}
            onChange={(e) => onChange('placeOfBirth', e.target.value)}
            placeholder="Enter place of birth"
            className="text-base h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="passportIssueDate" className="text-base font-medium">
            Passport Issue Date *
          </Label>
          <Input
            id="passportIssueDate"
            type="date"
            value={form.passportIssueDate}
            onChange={(e) => onChange('passportIssueDate', e.target.value)}
            className="text-base h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="passportExpiryDate" className="text-base font-medium">
            Passport Expiry Date *
          </Label>
          <Input
            id="passportExpiryDate"
            type="date"
            value={form.passportExpiryDate}
            onChange={(e) => onChange('passportExpiryDate', e.target.value)}
            className="text-base h-12"
          />
        </div>
      </div>

      {/* OCR Helper Text */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Camera className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">
              Smart Document Reading
            </h4>
            <p className="text-sm text-blue-700">
              For best results, ensure your passport photo is clear, well-lit, and all text is readable. 
              Our system can help extract information automatically from high-quality images.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
