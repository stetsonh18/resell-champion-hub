import { TableCell, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { ProductStatus } from "./ProductStatus";
import { ProductActions } from "./ProductActions";

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
        <ProductActions product={product} onDelete={onDelete} />
      </TableCell>
    </TableRow>
  );
};