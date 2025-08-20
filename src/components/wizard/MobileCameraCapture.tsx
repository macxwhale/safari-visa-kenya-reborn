
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Upload, RotateCcw, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MobileCameraCaptureProps {
  onCapture: (file: File) => void;
  accept?: string;
  maxSizeMB?: number;
  className?: string;
}

export const MobileCameraCapture: React.FC<MobileCameraCaptureProps> = ({
  onCapture,
  accept = "image/*",
  maxSizeMB = 5,
  className
}) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [capturedFile, setCapturedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'user', // Front camera for selfies
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCapturing(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Access Error",
        description: "Unable to access camera. Please use file upload instead.",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCapturing(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `capture-${Date.now()}.jpg`, {
              type: 'image/jpeg'
            });
            
            if (file.size > maxSizeMB * 1024 * 1024) {
              toast({
                title: "File Too Large",
                description: `Please capture a smaller image (max ${maxSizeMB}MB)`,
                variant: "destructive"
              });
              return;
            }
            
            setCapturedFile(file);
            setPreview(canvas.toDataURL());
            stopCamera();
          }
        }, 'image/jpeg', 0.8);
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: `Please select a smaller file (max ${maxSizeMB}MB)`,
          variant: "destructive"
        });
        return;
      }
      
      setCapturedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const confirmCapture = () => {
    if (capturedFile) {
      onCapture(capturedFile);
      setPreview(null);
      setCapturedFile(null);
      toast({
        title: "Image Captured",
        description: "Your image has been successfully captured.",
      });
    }
  };

  const retake = () => {
    setPreview(null);
    setCapturedFile(null);
    startCamera();
  };

  // Check if device supports camera
  const hasCameraSupport = navigator.mediaDevices && navigator.mediaDevices.getUserMedia;

  if (preview) {
    return (
      <div className={className}>
        <div className="relative bg-muted rounded-lg overflow-hidden">
          <img 
            src={preview} 
            alt="Captured" 
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black/20 flex items-end p-4">
            <div className="flex gap-2 w-full">
              <Button
                onClick={retake}
                variant="outline"
                size="lg"
                className="flex-1 bg-white/90 hover:bg-white"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake
              </Button>
              <Button
                onClick={confirmCapture}
                variant="brand"
                size="lg"
                className="flex-1"
              >
                <Check className="w-4 h-4 mr-2" />
                Use Photo
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isCapturing) {
    return (
      <div className={className}>
        <div className="relative bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-64 object-cover"
          />
          <canvas ref={canvasRef} className="hidden" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
            <div className="flex gap-2 w-full">
              <Button
                onClick={stopCamera}
                variant="outline"
                size="lg"
                className="flex-1 bg-white/90 hover:bg-white"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={capturePhoto}
                variant="brand"
                size="lg"
                className="flex-1"
              >
                <Camera className="w-4 h-4 mr-2" />
                Capture
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="space-y-4">
        {hasCameraSupport && (
          <Button
            onClick={startCamera}
            variant="brand"
            size="lg"
            className="w-full"
          >
            <Camera className="w-5 h-5 mr-2" />
            Take Photo
          </Button>
        )}
        
        <div className="relative">
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            size="lg"
            className="w-full"
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload from Gallery
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};
