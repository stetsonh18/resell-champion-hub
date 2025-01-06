import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/hooks/use-product-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface FormFieldProps {
  form: UseFormReturn<ProductFormValues>;
}

export const NameField = ({ form }: FormFieldProps) => (
  <FormField
    control={form.control}
    name="name"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input placeholder="Enter product name" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const ConditionField = ({ form }: FormFieldProps) => (
  <FormField
    control={form.control}
    name="condition"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Condition</FormLabel>
        <Select onValueChange={field.onChange} value={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="like_new">Like New</SelectItem>
            <SelectItem value="very_good">Very Good</SelectItem>
            <SelectItem value="good">Good</SelectItem>
            <SelectItem value="acceptable">Acceptable</SelectItem>
            <SelectItem value="for_parts">For Parts</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const PurchaseDateField = ({ form }: FormFieldProps) => (
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
                  format(field.value, "PPP")
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
              selected={field.value}
              onSelect={field.onChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
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
        <FormLabel>Notes</FormLabel>
        <FormControl>
          <Textarea placeholder="Add any additional notes" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);