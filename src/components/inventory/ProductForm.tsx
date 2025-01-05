import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage 
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ProductFormValues, productFormSchema } from "./schema";
import { BasicInfoFields } from "./form-fields/BasicInfoFields";
import { InventoryFields } from "./form-fields/InventoryFields";
import { CategoryStoreFields } from "./form-fields/CategoryStoreFields";
import { DateLocationFields } from "./form-fields/DateLocationFields";

interface ProductFormProps {
  onSubmit: (values: ProductFormValues) => void;
  isSubmitting?: boolean;
  initialValues?: Partial<ProductFormValues>;
}

export function ProductForm({ onSubmit, isSubmitting, initialValues }: ProductFormProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: initialValues?.name || "",
      purchase_price: initialValues?.purchase_price || 0,
      target_price: initialValues?.target_price || 0,
      quantity: initialValues?.quantity || 1,
      condition: initialValues?.condition || "new",
      notes: initialValues?.notes || "",
      category_id: initialValues?.category_id || undefined,
      store_id: initialValues?.store_id || undefined,
      purchase_date: initialValues?.purchase_date || new Date(),
      location: initialValues?.location || "",
      status: initialValues?.status || "in_stock",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <BasicInfoFields form={form} />
        <InventoryFields form={form} />
        <CategoryStoreFields form={form} />
        <DateLocationFields form={form} />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter any additional notes"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Saving Changes..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
}