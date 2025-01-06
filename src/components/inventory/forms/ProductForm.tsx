import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/hooks/use-product-form";
import { NameField, ConditionField, NotesField, PurchaseDateField } from "./fields/FormFields";
import { PriceQuantityFields } from "./fields/PriceQuantityFields";
import { StoreAndCategoryFields } from "./fields/StoreAndCategoryFields";

interface ProductFormProps {
  form: UseFormReturn<ProductFormValues>;
  onSubmit: () => void;
}

export function ProductForm({ form, onSubmit }: ProductFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <NameField form={form} />
        <StoreAndCategoryFields form={form} />
        <PriceQuantityFields form={form} />
        <div className="grid grid-cols-2 gap-4">
          <ConditionField form={form} />
          <PurchaseDateField form={form} />
        </div>
        <NotesField form={form} />
        <div className="flex justify-end">
          <Button type="submit">Create Product</Button>
        </div>
      </form>
    </Form>
  );
}