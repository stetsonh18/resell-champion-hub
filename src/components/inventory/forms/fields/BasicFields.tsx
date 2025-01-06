import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/hooks/use-create-product";

interface FormFieldProps {
  form: UseFormReturn<ProductFormValues>;
}

export const NameField = ({ form }: FormFieldProps) => (
  <FormField
    control={form.control}
    name="name"
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-sm font-medium">Name</FormLabel>
        <FormControl>
          <Input 
            placeholder="Enter product name" 
            {...field} 
            className="bg-background h-10"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const NotesField = ({ form }: FormFieldProps) => (
  <FormField
    control={form.control}
    name="notes"
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-sm font-medium">Notes</FormLabel>
        <FormControl>
          <Textarea 
            placeholder="Add any additional notes" 
            {...field} 
            className="bg-background min-h-[120px] resize-none"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);