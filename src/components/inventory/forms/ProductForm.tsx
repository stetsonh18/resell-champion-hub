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
import { LocationField } from "./fields/LocationField";

interface ProductFormProps {
  form: UseFormReturn<ProductFormValues>;
  onSubmit: () => void;
  buttonText: string;
  showStatus?: boolean;
}

export function ProductForm({ form, onSubmit, buttonText, showStatus = false }: ProductFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="grid gap-6">
          <NameField form={form} />
          
          <div className="grid grid-cols-2 gap-6">
            <StoreField form={form} />
            <CategoryField form={form} />
          </div>

          <PriceQuantityFields form={form} />
          
          <div className="grid grid-cols-2 gap-6">
            <div className="flex-1">
              <ConditionField form={form} />
            </div>
            <div className="flex-1">
              <PurchaseDateField form={form} />
            </div>
          </div>

          {showStatus && <StatusField form={form} />}
          
          <LocationField form={form} />
          
          <NotesField form={form} />
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" className="w-32">
            {buttonText}
          </Button>
        </div>
      </form>
    </Form>
  );
}