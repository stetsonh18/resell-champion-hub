import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ProductForm } from "./ProductForm";
import { ProductFormValues } from "./schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function AddProductDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: addProduct, isPending } = useMutation({
    mutationFn: async (values: ProductFormValues) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from("products")
        .insert({
          name: values.name,
          category_id: values.category_id,
          purchase_price: values.purchase_price,
          target_price: values.target_price,
          quantity: values.quantity,
          condition: values.condition,
          notes: values.notes,
          store_id: values.store_id,
          location: values.location,
          purchase_date: values.purchase_date?.toISOString(),
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product added successfully");
      setOpen(false);
    },
    onError: (error) => {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <ProductForm
          onSubmit={addProduct}
          isSubmitting={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}