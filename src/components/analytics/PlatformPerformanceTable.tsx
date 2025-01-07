import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PlatformPerformanceTableProps {
  data: {
    name: string;
    sales: number;
    profit: number;
    orders: number;
    margin: number;
  }[];
}

export const PlatformPerformanceTable = ({ data }: PlatformPerformanceTableProps) => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Platform Performance</h3>
        </div>
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Platform</TableHead>
                <TableHead className="text-right">Sales</TableHead>
                <TableHead className="text-right">Profit</TableHead>
                <TableHead className="text-right">Orders</TableHead>
                <TableHead className="text-right">Margin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(row.sales)}
                  </TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(row.profit)}
                  </TableCell>
                  <TableCell className="text-right">{row.orders}</TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat('en-US', {
                      style: 'percent',
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1
                    }).format(row.margin / 100)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};