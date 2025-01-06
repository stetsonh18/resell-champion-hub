import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { SalesActions } from "./table/SalesActions";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface SalesTableProps {
  sales?: any[];
  isLoading: boolean;
}

const TableRowSkeleton = () => (
  <TableRow>
    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
  </TableRow>
);

export const SalesTable = ({ sales, isLoading }: SalesTableProps) => {
  const queryClient = useQueryClient();

  const calculateEstimatedProfit = (sale: any) => {
    const revenue = sale.sale_price + (sale.shipping_amount_collected || 0);
    const costs = (sale.product?.purchase_price || 0) + 
                 (sale.shipping_cost || 0) + 
                 (sale.platform_fees || 0);
    return revenue - costs;
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('sales')
        .delete()
        .eq('id', id);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['sales'] });
      toast.success('Sale deleted successfully');
    } catch (error) {
      console.error('Error deleting sale:', error);
      toast.error('Failed to delete sale');
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sale Date</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Sale Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Shipping Collected</TableHead>
              <TableHead>Shipping Cost</TableHead>
              <TableHead>Platform Fees</TableHead>
              <TableHead>Estimated Profit</TableHead>
              <TableHead>Actions</TableHead>
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
            <TableHead>Sale Date</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Sale Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Shipping Collected</TableHead>
            <TableHead>Shipping Cost</TableHead>
            <TableHead>Platform Fees</TableHead>
            <TableHead>Estimated Profit</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!sales?.length ? (
            <TableRow>
              <TableCell colSpan={10} className="text-center text-muted-foreground">
                No sales found. Add your first sale to get started.
              </TableCell>
            </TableRow>
          ) : (
            sales.map((sale) => {
              const estimatedProfit = calculateEstimatedProfit(sale);
              return (
                <TableRow key={sale.id}>
                  <TableCell>{format(new Date(sale.sale_date), "MMM d, yyyy")}</TableCell>
                  <TableCell className="font-medium">{sale.product?.name || "—"}</TableCell>
                  <TableCell>{sale.platform?.name || "—"}</TableCell>
                  <TableCell>${sale.sale_price.toFixed(2)}</TableCell>
                  <TableCell>{sale.quantity}</TableCell>
                  <TableCell>${sale.shipping_amount_collected?.toFixed(2) || "0.00"}</TableCell>
                  <TableCell>${sale.shipping_cost?.toFixed(2) || "0.00"}</TableCell>
                  <TableCell>${sale.platform_fees?.toFixed(2) || "0.00"}</TableCell>
                  <TableCell className={estimatedProfit >= 0 ? "text-green-600" : "text-red-600"}>
                    ${estimatedProfit.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <SalesActions sale={sale} onDelete={handleDelete} />
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};