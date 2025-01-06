import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const returnFormSchema = z.object({
  sale_id: z.string().min(1, "Sale is required"),
  reason: z.string().min(1, "Reason is required"),
  refund_amount: z.number().min(0, "Refund amount must be positive"),
});

type ReturnFormValues = z.infer<typeof returnFormSchema>;

export const ReturnForm = () => {
  const queryClient = useQueryClient();
  const [saleDetails, setSaleDetails] = useState<any>(null);
  
  const form = useForm<ReturnFormValues>({
    resolver: zodResolver(returnFormSchema),
    defaultValues: {
      reason: "",
      refund_amount: 0,
    },
  });

  const saleId = form.watch("sale_id");

  useEffect(() => {
    const fetchSaleDetails = async () => {
      if (!saleId) return;
      
      const { data, error } = await supabase
        .from("sales")
        .select(`
          *,
          products (*)
        `)
        .eq("id", saleId)
        .single();

      if (error) {
        toast.error("Error fetching sale details");
        return;
      }

      if (data) {
        setSaleDetails(data);
        // Pre-fill refund amount with sale price
        form.setValue("refund_amount", data.sale_price);
      }
    };

    fetchSaleDetails();
  }, [saleId, form]);

  const { mutate: createReturn } = useMutation({
    mutationFn: async (values: ReturnFormValues) => {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error("User not authenticated");
      if (!saleDetails) throw new Error("Sale details not found");

      const returnData = {
        user_id: user.id,
        sale_id: values.sale_id,
        product_id: saleDetails.product_id,
        reason: values.reason,
        refund_amount: values.refund_amount,
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => createReturn(data))} className="space-y-4">
        <FormField
          control={form.control}
          name="sale_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sale Reference</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <Button type="submit" className="w-full">
          Create Return
        </Button>
      </form>
    </Form>
  );
};