import { TableCell, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductStatus } from "./ProductStatus";
import { EditProductDialog } from "../dialogs/EditProductDialog";

interface ProductRowProps {
  product: any;
  onDelete: (id: string) => void;
}

export const ProductRow = ({ product, onDelete }: ProductRowProps) => {
  return (
    <TableRow key={product.id}>
      <TableCell>
        <code className="rounded bg-muted px-2 py-1">
          {product.sku}
        </code>
      </TableCell>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell>
        {product.stores?.name || "—"}
      </TableCell>
      <TableCell>{product.categories?.name || "Uncategorized"}</TableCell>
      <TableCell>
        {product.purchase_date 
          ? format(new Date(product.purchase_date), "MMM d, yyyy")
          : "—"}
      </TableCell>
      <TableCell>{product.quantity}</TableCell>
      <TableCell>{product.location || "—"}</TableCell>
      <TableCell>
        <ProductStatus status={product.status} />
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <EditProductDialog product={product} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDelete(product.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
};