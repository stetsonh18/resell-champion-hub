import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProfileFormValues } from "../types/profile";

interface BusinessInfoFormProps {
  form: UseFormReturn<ProfileFormValues>;
}

export const BusinessInfoForm = ({ form }: BusinessInfoFormProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="business_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Name (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="Business name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="tax_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tax ID (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="Tax ID" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};