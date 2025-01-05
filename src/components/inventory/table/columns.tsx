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
    header: "Category",
    accessorKey: "categories",
    cell: ({ row }: { row: { original: Product } }) => (
      <span>{row.original.categories?.name || "No Category"}</span>
    ),
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
    cell: ({ row }: { row: { original: Product } }) => (
      <span>{row.original.quantity}</span>
    ),
  },
  {
    header: "Purchase Price",
    accessorKey: "purchase_price",
    cell: ({ row }: { row: { original: Product } }) => (
      <span>${row.original.purchase_price}</span>
    ),
  },
  {
    header: "Target Price",
    accessorKey: "target_price",
    cell: ({ row }: { row: { original: Product } }) => (
      <span>${row.original.target_price}</span>
    ),
  },
  {
    header: "Condition",
    accessorKey: "condition",
    cell: ({ row }: { row: { original: Product } }) => (
      <span>{row.original.condition}</span>
    ),
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