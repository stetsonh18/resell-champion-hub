import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CategoryResponse } from "./use-categories";

const categoryFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["category", "subcategory"]),
  parent_id: z.string().optional().nullable(),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

const generateRandomCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < 3; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const useCategoryForm = (onSuccess: () => void, category?: CategoryResponse) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: category?.name || "",
      type: category?.type || "category",
      parent_id: category?.parent_id || null,
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      if (category) {
        // Update existing category
        const { error } = await supabase
          .from("categories")
          .update({
            name: data.name,
            type: data.type,
            parent_id: data.parent_id,
          })
          .eq('id', category.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Category updated successfully",
        });
      } else {
        // Create new category
        const { error } = await supabase.from("categories").insert({
          name: data.name,
          code: generateRandomCode(),
          type: data.type,
          parent_id: data.parent_id,
          user_id: user.id,
        });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Category created successfully",
        });
      }

      queryClient.invalidateQueries({ queryKey: ["categories"] });
      onSuccess();
      if (!category) {
        form.reset({
          name: "",
          type: "category",
          parent_id: null,
        });
      }
    } catch (error) {
      console.error("Error creating/updating category:", error);
      toast({
        title: "Error",
        description: "Failed to create/update category",
        variant: "destructive",
      });
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};