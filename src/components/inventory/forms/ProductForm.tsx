import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/hooks/use-create-product";
import { NameField, NotesField } from "./fields/BasicFields";
import { ConditionField } from "./fields/ConditionField";
import { PurchaseDateField } from "./fields/DateField";
import { PriceQuantityFields } from "./fields/PriceQuantityFields";
import { StoreField } from "./fields/StoreField";
import { CategoryField } from "./fields/CategoryField";
import { StatusField } from "./fields/StatusField";

interface ProductFormProps {
  form: UseFormReturn<ProductFormValues>;
  onSubmit: () => void;
  buttonText: string;
  showStatus?: boolean;
}

export function ProductForm({ form, onSubmit, buttonText, showStatus = false }: ProductFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-4">
          <NameField form={form} />
          <div className="grid grid-cols-2 gap-4">
            <StoreField form={form} />
            <CategoryField form={form} />
          </div>
          <PriceQuantityFields form={form} />
          <div className="grid grid-cols-2 gap-4">
            <ConditionField form={form} />
            <PurchaseDateField form={form} />
          </div>
          {showStatus && <StatusField form={form} />}
          <NotesField form={form} />
        </div>
        <div className="mt-6">
          <Button 
            type="submit" 
            className="w-full bg-zinc-700 hover:bg-zinc-600 text-white"
          >
            {buttonText}
          </Button>
        </div>
      </form>
    </Form>
  );
}