import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const FeeFields = ({ form }: { form: any }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="refund_amount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Refund Amount</FormLabel>
            <FormControl>
              <Input
                type="number"
                step="0.01"
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                value={field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="shipping_fee"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Return Shipping Fee</FormLabel>
            <FormControl>
              <Input
                type="number"
                step="0.01"
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                value={field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="restocking_fee"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Restocking Fee</FormLabel>
            <FormControl>
              <Input
                type="number"
                step="0.01"
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                value={field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};