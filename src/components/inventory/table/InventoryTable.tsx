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

export const InventoryTable = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

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