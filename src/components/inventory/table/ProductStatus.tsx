import { Badge } from "@/components/ui/badge";

interface ProductStatusProps {
  status: string;
}

export const ProductStatus = ({ status }: ProductStatusProps) => (
  <Badge variant={status === "in_stock" ? "default" : "secondary"}>
    {status}
  </Badge>
);