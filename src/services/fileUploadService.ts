
import { supabase } from "@/integrations/supabase/client";
import { safeAsync, withTimeout } from "@/utils/asyncHelpers";

const UPLOAD_TIMEOUT = 30000; // 30 seconds

export const uploadCriticalFile = async (file: File, type: string): Promise<string> => {
  const fileName = `${Date.now()}_${type}_${file.name}`;
  const { data, error } = await safeAsync(async () => {
    return withTimeout(
      supabase.storage
        .from("eta-documents")
        .upload(`public/${fileName}`, file),
      UPLOAD_TIMEOUT,
      `${type} upload timed out`
    );
  }, `Failed to upload ${type} document`);

  if (error || !data.data) {
    throw new Error(error || `Failed to upload ${type} document`);
  }
  
  return data.data.path;
};

export const uploadOptionalFile = async (file: File, type: string): Promise<void> => {
  const fileName = `${Date.now()}_${type}_${file.name}`;
  const { error } = await safeAsync(async () => {
    return supabase.storage
      .from("eta-documents")
      .upload(`public/${fileName}`, file);
  });

  if (error) {
    console.error(`Failed to upload optional document (${type}):`, error);
  }
};
