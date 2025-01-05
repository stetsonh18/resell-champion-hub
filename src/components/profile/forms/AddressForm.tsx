import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { ProfileFormValues } from "../types/profile";
import { CurrencySelect } from "../CurrencySelect";

interface AddressFormProps {
  form: UseFormReturn<ProfileFormValues>;
}

export const AddressForm = ({ form }: AddressFormProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="shipping_address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Shipping Address</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter your shipping address"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="preferred_currency"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Currency</FormLabel>
            <FormControl>
              <CurrencySelect
                value={field.value}
                onValueChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};