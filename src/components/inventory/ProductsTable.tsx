import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const TableRowSkeleton = () => (
  <TableRow>
    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
  </TableRow>
);

interface ProductsTableProps {
  products?: any[];
  isLoading: boolean;
}

export const ProductsTable = ({ products, isLoading }: ProductsTableProps) => {
  const queryClient = useQueryClient();

  const { mutate: deleteProduct } = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete product");
      console.error("Error deleting product:", error);
    },
  });

  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Store</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Purchase Date</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRowSkeleton />
            <TableRowSkeleton />
            <TableRowSkeleton />
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SKU</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Store</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Purchase Date</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!products?.length ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center text-muted-foreground">
                No products found. Add your first product to get started.
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <code className="rounded bg-muted px-2 py-1">
                    {product.sku}
                  </code>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  {product.stores?.name || "—"}
                </TableCell>
                <TableCell>{product.categories?.name || "Uncategorized"}</TableCell>
                <TableCell>
                  {product.purchase_date 
                    ? format(new Date(product.purchase_date), "MMM d, yyyy")
                    : "—"}
                </TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.location || "—"}</TableCell>
                <TableCell>
                  <Badge variant={product.status === "in_stock" ? "default" : "secondary"}>
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        // TODO: Implement edit functionality
                        toast.info("Edit functionality coming soon");
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this product?")) {
                          deleteProduct(product.id);
                        }
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};