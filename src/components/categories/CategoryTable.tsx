import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryResponse } from "@/hooks/use-categories";
import { useState } from "react";
import { EditCategoryDialog } from "./EditCategoryDialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CategoryTableProps {
  categories: CategoryResponse[];
  isLoading: boolean;
}

export const CategoryTable = ({ categories, isLoading }: CategoryTableProps) => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [editingCategory, setEditingCategory] = useState<CategoryResponse | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<CategoryResponse | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const topLevelCategories = categories
    .filter(cat => cat.type === "category")
    .sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  const toggleSort = () => {
    setSortDirection(current => current === 'asc' ? 'desc' : 'asc');
  };

  const handleDelete = async () => {
    if (!deletingCategory) return;

    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', deletingCategory.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    }
    setDeletingCategory(null);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60%]">
              <Button
                variant="ghost"
                onClick={toggleSort}
                className="hover:bg-transparent p-0 h-auto font-medium flex items-center gap-1"
              >
                Category Name
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Category Code</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topLevelCategories.map((category) => (
            <>
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>
                  <span className="bg-secondary/20 text-secondary px-2 py-1 rounded-md text-sm">
                    {category.code}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setEditingCategory(category)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setDeletingCategory(category)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              {categories
                .filter(sub => sub.parent_id === category.id)
                .sort((a, b) => {
                  const comparison = a.name.localeCompare(b.name);
                  return sortDirection === 'asc' ? comparison : -comparison;
                })
                .map(subcategory => (
                  <TableRow key={subcategory.id} className="bg-muted/30">
                    <TableCell className="font-medium pl-8">
                      ↳ {subcategory.name}
                    </TableCell>
                    <TableCell>
                      <span className="bg-primary/20 text-primary px-2 py-1 rounded-md text-sm">
                        {subcategory.code}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setEditingCategory(subcategory)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setDeletingCategory(subcategory)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </>
          ))}
        </TableBody>
      </Table>

      {editingCategory && (
        <EditCategoryDialog
          category={editingCategory}
          isOpen={!!editingCategory}
          onClose={() => setEditingCategory(null)}
          categories={categories}
        />
      )}

      <AlertDialog open={!!deletingCategory} onOpenChange={() => setDeletingCategory(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the category
              {deletingCategory?.type === 'category' ? ' and all its subcategories' : ''}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};