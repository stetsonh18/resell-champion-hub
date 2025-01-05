import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CategoryResponse } from "@/hooks/use-categories";
import { CategoryForm } from "./CategoryForm";
import { useCategoryForm } from "@/hooks/use-category-form";

interface EditCategoryDialogProps {
  category: CategoryResponse;
  isOpen: boolean;
  onClose: () => void;
  categories: CategoryResponse[];
}

export function EditCategoryDialog({ category, isOpen, onClose, categories }: EditCategoryDialogProps) {
  const { form, onSubmit } = useCategoryForm(() => onClose(), category);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <CategoryForm 
          form={form} 
          onSubmit={onSubmit} 
          categories={categories}
          isEditing={true}
        />
      </DialogContent>
    </Dialog>
  );
}