import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ExpenseFormData } from "../types";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";

interface ReceiptFieldProps {
  form: UseFormReturn<ExpenseFormData>;
}

export const ReceiptField = ({ form }: ReceiptFieldProps) => {
  const [uploading, setUploading] = useState(false);

  return (
    <FormField
      control={form.control}
      name="receipt_url"
      render={({ field: { value, onChange, ...field } }) => (
        <FormItem>
          <FormLabel>Receipt Photo</FormLabel>
          <FormControl>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                className="relative"
                disabled={uploading}
              >
                <Input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={async (e) => {
                    if (!e.target.files?.[0]) return;
                    
                    try {
                      setUploading(true);
                      const file = e.target.files[0];
                      const fileExt = file.name.split(".").pop();
                      const { data: { user } } = await supabase.auth.getUser();
                      if (!user) throw new Error("No user found");
                      
                      const filePath = `${user.id}/${Math.random()}.${fileExt}`;
                      const { error: uploadError } = await supabase.storage
                        .from("receipts")
                        .upload(filePath, file);

                      if (uploadError) throw uploadError;

                      const { data: { publicUrl } } = supabase.storage
                        .from("receipts")
                        .getPublicUrl(filePath);

                      onChange(publicUrl);
                    } catch (error) {
                      console.error("Error uploading receipt:", error);
                    } finally {
                      setUploading(false);
                    }
                  }}
                  {...field}
                />
                <Upload className="mr-2 h-4 w-4" />
                {uploading ? "Uploading..." : "Upload Receipt"}
              </Button>
              {value && (
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline"
                >
                  View Receipt
                </a>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};