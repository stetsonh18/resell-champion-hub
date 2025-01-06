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
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { TableSkeleton } from "./TableSkeleton";
import { ReturnActions } from "./ReturnActions";

export const ReturnsTable = () => {
  const { data: returns, isLoading } = useQuery({
    queryKey: ["returns"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("returns")
        .select(`
          *,
          sales (
            sale_price,
            product:products (
              name
            )
          )
        `)
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
            <TableHead>Return Date</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Refund Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {returns?.map((returnItem) => (
            <TableRow key={returnItem.id}>
              <TableCell>
                {format(new Date(returnItem.return_date), "MMM d, yyyy")}
              </TableCell>
              <TableCell>{returnItem.sales.product.name}</TableCell>
              <TableCell>{returnItem.reason}</TableCell>
              <TableCell>${returnItem.refund_amount.toFixed(2)}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    returnItem.status === "approved"
                      ? "success"
                      : returnItem.status === "rejected"
                      ? "destructive"
                      : "default"
                  }
                >
                  {returnItem.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <ReturnActions return={returnItem} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};