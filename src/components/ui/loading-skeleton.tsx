
import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'default' | 'form' | 'card' | 'button';
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  className, 
  variant = 'default' 
}) => {
  const baseClasses = "animate-pulse bg-muted rounded";
  
  const variantClasses = {
    default: "h-4 w-full",
    form: "h-12 w-full",
    card: "h-32 w-full",
    button: "h-12 w-24"
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)} />
  );
};

export const FormSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <LoadingSkeleton className="h-4 w-24" />
        <LoadingSkeleton variant="form" />
      </div>
      <div className="space-y-2">
        <LoadingSkeleton className="h-4 w-32" />
        <LoadingSkeleton variant="form" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <LoadingSkeleton className="h-4 w-20" />
          <LoadingSkeleton variant="form" />
        </div>
        <div className="space-y-2">
          <LoadingSkeleton className="h-4 w-20" />
          <LoadingSkeleton variant="form" />
        </div>
      </div>
      <div className="flex justify-between pt-4">
        <LoadingSkeleton variant="button" />
        <LoadingSkeleton variant="button" />
      </div>
    </div>
  );
};
