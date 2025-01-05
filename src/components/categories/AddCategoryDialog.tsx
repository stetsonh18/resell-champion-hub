import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CategoryResponse } from "@/hooks/use-categories";
import { CategoryForm } from "./CategoryForm";
import { useCategoryForm } from "@/hooks/use-category-form";

interface AddCategoryDialogProps {
  categories: CategoryResponse[];
}

export function AddCategoryDialog({ categories }: AddCategoryDialogProps) {
  const [open, setOpen] = useState(false);
  const { form, onSubmit } = useCategoryForm(() => setOpen(false));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-secondary hover:bg-secondary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <CategoryForm 
          form={form} 
          onSubmit={onSubmit} 
          categories={categories} 
        />
      </DialogContent>
    </Dialog>
  );
}