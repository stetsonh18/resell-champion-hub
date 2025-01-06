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
        <FormLabel className="text-white">Name</FormLabel>
        <FormControl>
          <Input 
            placeholder="Enter product name" 
            {...field} 
            className="bg-[#1A1A1A] border-zinc-800 text-white"
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
        <FormLabel className="text-white">Notes</FormLabel>
        <FormControl>
          <Textarea 
            placeholder="Add any additional notes" 
            {...field} 
            className="bg-[#1A1A1A] border-zinc-800 text-white min-h-[100px] resize-none"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);