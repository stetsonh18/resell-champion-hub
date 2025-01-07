import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import { DialogClose } from "@/components/ui/dialog";
import { SaleField } from "./form-fields/SaleField";
import { ReturnFields } from "./form-fields/ReturnFields";
import { FeeFields } from "./form-fields/FeeFields";

const returnFormSchema = z.object({
  sale_id: z.string().min(1, "Sale is required"),
  return_date: z.string().min(1, "Return date is required"),
  reason: z.string().min(1, "Reason is required"),
  refund_amount: z.number().min(0, "Refund amount must be positive"),
  shipping_fee: z.number().min(0, "Shipping fee must be positive"),
  restocking_fee: z.number().min(0, "Restocking fee must be positive"),
});

type ReturnFormValues = z.infer<typeof returnFormSchema>;

export const ReturnForm = () => {
  const queryClient = useQueryClient();
  const [selectedSale, setSelectedSale] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ReturnFormValues>({
    resolver: zodResolver(returnFormSchema),
    defaultValues: {
      return_date: new Date().toISOString().split('T')[0],
      refund_amount: 0,
      shipping_fee: 0,
      restocking_fee: 0,
    },
  });

  const { mutateAsync: createReturn } = useMutation({
    mutationFn: async (values: ReturnFormValues) => {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error("User not authenticated");
      if (!selectedSale) throw new Error("Sale not selected");

      const returnData = {
        user_id: user.id,
        sale_id: values.sale_id,
        product_id: selectedSale.product_id,
        return_date: new Date(values.return_date).toISOString(),
        reason: values.reason,
        refund_amount: values.refund_amount,
        shipping_fee: values.shipping_fee,
        restocking_fee: values.restocking_fee,
      };

      const { error } = await supabase.from("returns").insert([returnData]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["returns"] });
      toast.success("Return created successfully");
      form.reset();
    },
    onError: (error) => {
      console.error("Error creating return:", error);
      toast.error("Failed to create return");
    },
  });

  const onSubmit = async (data: ReturnFormValues) => {
    setIsSubmitting(true);
    try {
      await createReturn(data);
      return true; // Return success to trigger dialog close
    } catch (error) {
      return false; // Return failure to prevent dialog close
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <SaleField form={form} onSaleSelect={setSelectedSale} />
        <ReturnFields form={form} />
        <FeeFields form={form} />
        
        <DialogClose asChild>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            Create Return
          </Button>
        </DialogClose>
      </form>
    </Form>
  );
};