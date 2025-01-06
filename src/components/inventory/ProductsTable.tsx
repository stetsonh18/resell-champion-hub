import { Table, TableBody } from "@/components/ui/table";
import { LoadingState } from "./table/TableSkeleton";
import { ProductTableHeader } from "./table/TableHeader";
import { ProductRow } from "./table/ProductRow";
import { EmptyState } from "./table/EmptyState";
import { useDeleteProduct } from "@/hooks/use-delete-product";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ProductsTableProps {
  products?: any[];
  isLoading: boolean;
}

export const ProductsTable = ({ products, isLoading }: ProductsTableProps) => {
  const { mutate: deleteProduct } = useDeleteProduct();

  const { data: productsWithCategories, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products-with-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          categories (
            id,
            name,
            code,
            type,
            parent_id
          ),
          stores (
            name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    // Add refetchInterval to ensure we catch inventory splits
    refetchInterval: 5000,
  });

  if (isLoading || isLoadingProducts) {
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
          {!productsWithCategories?.length ? (
            <EmptyState />
          ) : (
            productsWithCategories.map((product) => (
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