import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
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
  </TableRow>
);

export const SalesTable = ({ sales, isLoading }: SalesTableProps) => {
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
              <TableHead>Estimated Profit</TableHead>
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
            <TableHead>Estimated Profit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!sales?.length ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                No sales found. Add your first sale to get started.
              </TableCell>
            </TableRow>
          ) : (
            sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{format(new Date(sale.sale_date), "MMM d, yyyy")}</TableCell>
                <TableCell className="font-medium">{sale.product?.name || "—"}</TableCell>
                <TableCell>{sale.platform?.name || "—"}</TableCell>
                <TableCell>${sale.sale_price.toFixed(2)}</TableCell>
                <TableCell>{sale.quantity}</TableCell>
                <TableCell>${sale.estimated_profit?.toFixed(2) || "0.00"}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};