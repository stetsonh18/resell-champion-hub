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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  
  const form = useForm<ReturnFormValues>({
    resolver: zodResolver(returnFormSchema),
    defaultValues: {
      return_date: new Date().toISOString().split('T')[0],
      refund_amount: 0,
      shipping_fee: 0,
      restocking_fee: 0,
    },
  });

  // Fetch sold products
  const { data: sales, isLoading: isLoadingSales } = useQuery({
    queryKey: ["sold-products"],
    queryFn: async () => {
      const { data: sales, error } = await supabase
        .from("sales")
        .select(`
          id,
          sale_price,
          sale_date,
          product_id,
          products (
            name
          )
        `)
        .order('sale_date', { ascending: false });
      
      if (error) throw error;
      return sales;
    },
  });

  // Update refund amount when sale is selected
  useEffect(() => {
    if (selectedSale) {
      form.setValue('refund_amount', selectedSale.sale_price);
    }
  }, [selectedSale, form]);

  const { mutate: createReturn } = useMutation({
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => createReturn(data))} className="space-y-4">
        <FormField
          control={form.control}
          name="sale_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Product</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  const sale = sales?.find(s => s.id === value);
                  setSelectedSale(sale);
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a sold product" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {sales?.map((sale) => (
                    <SelectItem key={sale.id} value={sale.id}>
                      {sale.products.name} - Sold on {new Date(sale.sale_date).toLocaleDateString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="return_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Return Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
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

        <FormField
          control={form.control}
          name="shipping_fee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Return Shipping Fee</FormLabel>
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

        <FormField
          control={form.control}
          name="restocking_fee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Restocking Fee</FormLabel>
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