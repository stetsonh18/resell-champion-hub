import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { productSchema, ProductFormValues } from "./ProductFormSchema";
import { useCategories } from "@/hooks/use-categories";

export const useProductForm = (onSuccess: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      category_id: "",
      sku: "",
      purchase_price: "",
      target_price: "",
      quantity: "1",
      condition: "new",
      notes: "",
    },
  });

  const generateSKU = async (categoryId: string) => {
    if (!categoryId) return "";
    
    const category = categories?.find(cat => cat.id === categoryId);
    if (!category?.code) return "";

    const { count } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', categoryId);

    const nextNumber = (count || 0) + 1;
    const paddedNumber = nextNumber.toString().padStart(4, '0');
    return `${category.code}-${paddedNumber}`;
  };

  const onCategoryChange = async (categoryId: string) => {
    setSelectedCategory(categoryId);
    form.setValue("category_id", categoryId);
    const sku = await generateSKU(categoryId);
    form.setValue("sku", sku);
  };

  const onSubmit = async (data: ProductFormValues) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.from("products").insert({
        name: data.name,
        category_id: data.category_id,
        sku: data.sku,
        purchase_price: parseFloat(data.purchase_price),
        target_price: parseFloat(data.target_price),
        quantity: parseInt(data.quantity),
        condition: data.condition,
        notes: data.notes || null,
        user_id: (await supabase.auth.getUser()).data.user?.id,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product added successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["products"] });
      onSuccess();
    } catch (error) {
      console.error("Error adding product:", error);
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    categories,
    selectedCategory,
    onCategoryChange,
    onSubmit: form.handleSubmit(onSubmit),
  };
};