import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/database";

export const columns = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "SKU",
    accessorKey: "sku",
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
  },
  {
    header: "Purchase Price",
    accessorKey: "purchase_price",
    cell: ({ row }: { row: { original: Product } }) => (
      <>${row.original.purchase_price}</>
    ),
  },
  {
    header: "Target Price",
    accessorKey: "target_price",
    cell: ({ row }: { row: { original: Product } }) => (
      <>${row.original.target_price}</>
    ),
  },
  {
    header: "Condition",
    accessorKey: "condition",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }: { row: { original: Product } }) => (
      <Badge variant={row.original.quantity > 0 ? "default" : "destructive"}>
        {row.original.quantity > 0 ? "In Stock" : "Out of Stock"}
      </Badge>
    ),
  },
];