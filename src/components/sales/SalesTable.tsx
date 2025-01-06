import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

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
    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
  </TableRow>
);

export const SalesTable = ({ sales, isLoading }: SalesTableProps) => {
  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Store</TableHead>
              <TableHead>Sale Price</TableHead>
              <TableHead>Net Profit</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
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
            <TableHead>Order #</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Store</TableHead>
            <TableHead>Sale Price</TableHead>
            <TableHead>Net Profit</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!sales?.length ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-muted-foreground">
                No sales found. Add your first sale to get started.
              </TableCell>
            </TableRow>
          ) : (
            sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>
                  <code className="rounded bg-muted px-2 py-1">
                    {sale.order_number}
                  </code>
                </TableCell>
                <TableCell className="font-medium">{sale.product?.name || "—"}</TableCell>
                <TableCell>{sale.platform?.name || "—"}</TableCell>
                <TableCell>{sale.store?.name || "—"}</TableCell>
                <TableCell>${sale.sale_price.toFixed(2)}</TableCell>
                <TableCell>${sale.net_profit.toFixed(2)}</TableCell>
                <TableCell>{format(new Date(sale.sale_date), "MMM d, yyyy")}</TableCell>
                <TableCell>
                  <Badge variant={sale.status === "completed" ? "default" : "secondary"}>
                    {sale.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};