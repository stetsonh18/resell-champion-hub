import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableSkeleton } from "./TableSkeleton";
import { columns } from "./columns";

interface InventoryTableProps {
  filters: {
    searchQuery: string;
    hideShipped: boolean;
    selectedStatus: string;
    selectedCategory: string;
  };
}

export const InventoryTable = ({ filters }: InventoryTableProps) => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", filters],
    queryFn: async () => {
      let query = supabase
        .from("products")
        .select("*, categories(name)")
        .order("created_at", { ascending: false });

      if (filters.searchQuery) {
        query = query.or(
          `name.ilike.%${filters.searchQuery}%,sku.ilike.%${filters.searchQuery}%`
        );
      }

      if (filters.hideShipped) {
        query = query.neq("status", "shipped");
      }

      if (filters.selectedStatus !== "all") {
        query = query.eq("status", filters.selectedStatus);
      }

      if (filters.selectedCategory !== "all") {
        query = query.eq("category_id", filters.selectedCategory);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.accessorKey}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product.id}>
              {columns.map((column) => (
                <TableCell key={`${product.id}-${column.accessorKey}`}>
                  {column.cell ? (
                    column.cell({ row: { original: product } })
                  ) : (
                    column.accessorKey === "categories" ? 
                    product.categories?.name :
                    product[column.accessorKey as keyof typeof product]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};