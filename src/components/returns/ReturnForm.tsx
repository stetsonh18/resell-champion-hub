import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { SaleField } from "./form-fields/SaleField";
import { ReturnFields } from "./form-fields/ReturnFields";
import { FeeFields } from "./form-fields/FeeFields";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";

type ReturnFormProps = {
  onSuccess: () => void;
};

type FormValues = {
  sale_id: string;
  return_date: string;
  reason: string;
  refund_amount: number;
  shipping_fee?: number;
  restocking_fee?: number;
};

export const ReturnForm = ({ onSuccess }: ReturnFormProps) => {
  const [selectedSale, setSelectedSale] = useState<any>(null);
  const { toast } = useToast();
  const session = useSession();

  const form = useForm<FormValues>({
    defaultValues: {
      return_date: new Date().toISOString().split('T')[0],
      refund_amount: 0,
      shipping_fee: 0,
      restocking_fee: 0,
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!session?.user?.id || !selectedSale) {
      toast({
        title: "Error",
        description: "Missing required information",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.from("returns").insert({
        user_id: session.user.id,
        sale_id: data.sale_id,
        product_id: selectedSale.product_id,
        return_date: data.return_date,
        reason: data.reason,
        refund_amount: data.refund_amount,
        shipping_fee: data.shipping_fee || 0,
        restocking_fee: data.restocking_fee || 0,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Return has been processed successfully",
      });
      
      onSuccess();
    } catch (error) {
      console.error('Error processing return:', error);
      toast({
        title: "Error",
        description: "Failed to process return",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <SaleField form={form} onSaleSelect={setSelectedSale} />
        <ReturnFields form={form} />
        <FeeFields form={form} />
        
        <div className="flex justify-end">
          <Button type="submit">
            Process Return
          </Button>
        </div>
      </form>
    </Form>
  );
};