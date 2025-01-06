import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/hooks/use-create-product";

interface DateFieldProps {
  form: UseFormReturn<ProductFormValues>;
}

export const PurchaseDateField = ({ form }: DateFieldProps) => (
  <FormField
    control={form.control}
    name="purchase_date"
    render={({ field }) => (
      <FormItem className="flex flex-col">
        <FormLabel>Purchase Date</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                className={cn(
                  "w-full pl-3 text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value ? (
                  format(new Date(field.value), "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value ? new Date(field.value) : undefined}
              onSelect={(date) => {
                if (date) {
                  field.onChange(date);
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    )}
  />
);