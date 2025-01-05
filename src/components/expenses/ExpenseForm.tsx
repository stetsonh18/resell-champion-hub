import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CategoryField } from "./form-fields/CategoryField";
import { DescriptionField } from "./form-fields/DescriptionField";
import { AmountField } from "./form-fields/AmountField";
import { DateField } from "./form-fields/DateField";
import { ReceiptField } from "./form-fields/ReceiptField";
import { ExpenseFormData } from "./types";

interface ExpenseFormProps {
  onSuccess?: () => void;
}

export const ExpenseForm = ({ onSuccess }: ExpenseFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<ExpenseFormData>({
    defaultValues: {
      category: "",
      description: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      receipt_url: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: ExpenseFormData) => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error("No user found");

      const { error } = await supabase.from("expenses").insert({
        category: values.category,
        description: values.description,
        amount: parseFloat(values.amount),
        date: new Date(values.date).toISOString(),
        receipt_url: values.receipt_url || null,
        user_id: user.id,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["expense-stats"] });
      toast({
        title: "Success",
        description: "Expense added successfully",
      });
      form.reset();
      onSuccess?.();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add expense",
        variant: "destructive",
      });
      console.error("Error adding expense:", error);
    },
  });

  const onSubmit = (values: ExpenseFormData) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CategoryField form={form} />
        <DescriptionField form={form} />
        <AmountField form={form} />
        <DateField form={form} />
        <ReceiptField form={form} />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Adding..." : "Add Expense"}
        </Button>
      </form>
    </Form>
  );
};