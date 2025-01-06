import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const ProductTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>SKU</TableHead>
        <TableHead>Product Name</TableHead>
        <TableHead>Purchase Price</TableHead>
        <TableHead>Store</TableHead>
        <TableHead>Category</TableHead>
        <TableHead>Purchase Date</TableHead>
        <TableHead>Quantity</TableHead>
        <TableHead>Location</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};