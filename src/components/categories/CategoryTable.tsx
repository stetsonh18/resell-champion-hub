import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryResponse } from "@/hooks/use-categories";

interface CategoryTableProps {
  categories: CategoryResponse[];
  isLoading: boolean;
}

export const CategoryTable = ({ categories, isLoading }: CategoryTableProps) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const topLevelCategories = categories.filter(cat => cat.type === "category");

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60%]">Category Name</TableHead>
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
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
            {categories
              .filter(sub => sub.parent_id === category.id)
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
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </>
        ))}
      </TableBody>
    </Table>
  );
};