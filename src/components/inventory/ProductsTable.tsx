import { Table, TableBody } from "@/components/ui/table";
import { LoadingState } from "./table/TableSkeleton";
import { ProductTableHeader } from "./table/TableHeader";
import { ProductRow } from "./table/ProductRow";
import { EmptyState } from "./table/EmptyState";
import { useDeleteProduct } from "@/hooks/use-delete-product";

interface ProductsTableProps {
  products?: any[];
  isLoading: boolean;
}

export const ProductsTable = ({ products, isLoading }: ProductsTableProps) => {
  const { mutate: deleteProduct } = useDeleteProduct();

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