
import { toast } from "sonner";

export const useToast = () => {
  return {
    toast: (options: { title?: string; description?: string; variant?: "default" | "destructive" }) => {
      if (options.variant === "destructive") {
        toast.error(options.title || options.description || "An error occurred");
      } else {
        toast.success(options.title || options.description || "Success");
      }
    }
  };
};
