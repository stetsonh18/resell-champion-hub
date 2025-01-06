import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { SaleFormValues } from "../types";

interface PlatformFieldProps {
  form: UseFormReturn<SaleFormValues>;
  platforms?: any[];
  onPlatformChange?: (platformId: string) => void;
}

export const PlatformField = ({ form, platforms, onPlatformChange }: PlatformFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="platform_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Platform</FormLabel>
          <Select 
            onValueChange={(value) => {
              field.onChange(value);
              onPlatformChange?.(value);
            }} 
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a platform" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {platforms?.map((platform) => (
                <SelectItem key={platform.id} value={platform.id}>
                  {platform.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};