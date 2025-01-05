import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableSkeleton } from "./TableSkeleton";
import { Badge } from "@/components/ui/badge";

export const InventoryTable = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Purchase Price</TableHead>
            <TableHead>Target Price</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>${product.purchase_price}</TableCell>
              <TableCell>${product.target_price}</TableCell>
              <TableCell>{product.condition}</TableCell>
              <TableCell>
                <Badge variant={product.quantity > 0 ? "default" : "destructive"}>
                  {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};