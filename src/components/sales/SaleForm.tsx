import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { DateField } from "./form-fields/DateField";
import { ProductField } from "./form-fields/ProductField";
import { PlatformField } from "./form-fields/PlatformField";
import { PriceFields } from "./form-fields/PriceFields";
import { type SaleFormValues } from "./types";
import { useSaleForm } from "./hooks/useSaleForm";

interface SaleFormProps {
  defaultValues?: SaleFormValues;
  saleId?: string;
  onSuccess?: () => void;
}

export function SaleForm({ defaultValues, saleId, onSuccess }: SaleFormProps) {
  const { 
    form, 
    products, 
    platforms, 
    isLoading, 
    calculatePlatformFees, 
    onSubmit 
  } = useSaleForm(defaultValues, saleId, onSuccess);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(e);
    } catch (error) {
      // Error is already handled in useSaleForm
      console.error("Form submission failed:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <DateField form={form} />
        <ProductField form={form} products={products} />
        <PlatformField 
          form={form} 
          platforms={platforms}
          onPlatformChange={(platformId) => 
            calculatePlatformFees(platformId, form.getValues('sale_price'))
          }
        />
        <PriceFields 
          form={form}
          onSalePriceChange={(price) => 
            calculatePlatformFees(form.getValues('platform_id'), price)
          }
        />
        <Button type="submit" className="w-full">
          {saleId ? "Update Sale" : "Add Sale"}
        </Button>
      </form>
    </Form>
  );
}