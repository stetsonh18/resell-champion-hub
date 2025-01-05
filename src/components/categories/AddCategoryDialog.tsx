import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { categoryFormSchema, CategoryFormValues } from "./schemas/categoryFormSchema";
import { CategoryForm } from "./CategoryForm";
import { CategoryResponse } from "@/hooks/use-categories";

interface AddCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const generateRandomCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < 3; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const AddCategoryDialog = ({
  open,
  onOpenChange,
}: AddCategoryDialogProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      type: "category",
      parentId: null,
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select(`
          *,
          parent:parent_id(name)
        `)
        .eq("type", "category")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as CategoryResponse[];
    },
  });

  const onSubmit = async (values: CategoryFormValues) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("No user found");

      const code = generateRandomCode();

      const { error } = await supabase.from("categories").insert({
        name: values.name,
        type: values.type,
        code,
        user_id: user.id,
        parent_id: values.type === "subcategory" ? values.parentId : null,
      });

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      toast({
        title: "Success",
        description: "Category created successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["categories"] });
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating category:", error);
      toast({
        title: "Error",
        description: "Failed to create category",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Create a new category or subcategory to organize your products.
          </DialogDescription>
        </DialogHeader>
        <CategoryForm 
          form={form} 
          onSubmit={onSubmit} 
          categories={categories}
        />
      </DialogContent>
    </Dialog>
  );
};