import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody } from "@/components/ui/table";
import { toast } from "sonner";
import { LoadingState } from "./table/TableSkeleton";
import { ProductTableHeader } from "./table/TableHeader";
import { ProductRow } from "./table/ProductRow";
import { EmptyState } from "./table/EmptyState";

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
          <ProductTableHeader />
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
        <ProductTableHeader />
        <TableBody>
          {!products?.length ? (
            <EmptyState />
          ) : (
            products.map((product) => (
              <ProductRow 
                key={product.id} 
                product={product} 
                onDelete={deleteProduct}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};