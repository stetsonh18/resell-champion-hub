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
import { format } from "date-fns";
import { toast } from "sonner";
import { LoadingState } from "./table/TableSkeleton";
import { ProductActions } from "./table/ProductActions";
import { ProductStatus } from "./table/ProductStatus";

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

  const handleProductUpdated = () => {
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };

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
            <LoadingState />
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
                  <ProductStatus status={product.status} />
                </TableCell>
                <TableCell className="text-right">
                  <ProductActions
                    product={product}
                    onDelete={() => deleteProduct(product.id)}
                    onEdit={handleProductUpdated}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};