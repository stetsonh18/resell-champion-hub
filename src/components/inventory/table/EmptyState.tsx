import { TableCell, TableRow } from "@/components/ui/table";

export const EmptyState = () => (
  <TableRow>
    <TableCell colSpan={9} className="text-center text-muted-foreground">
      No products found. Add your first product to get started.
    </TableCell>
  </TableRow>
);