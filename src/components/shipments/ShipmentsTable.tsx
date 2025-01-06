import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

export function ShipmentsTable() {
  const queryClient = useQueryClient();

  const { data: pendingShipments, isLoading } = useQuery({
    queryKey: ['pending-shipments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          id,
          sku,
          name,
          location,
          sale_price,
          shipping_cost
        `)
        .eq('status', 'pending_shipment');

      if (error) throw error;
      return data;
    },
  });

  const markAsShipped = useMutation({
    mutationFn: async (productId: string) => {
      const { error } = await supabase
        .from('products')
        .update({ status: 'shipped' })
        .eq('id', productId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-shipments'] });
      queryClient.invalidateQueries({ queryKey: ['shipment-stats'] });
      toast.success('Product marked as shipped');
    },
    onError: (error) => {
      toast.error('Failed to update shipment status');
      console.error('Error:', error);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SKU</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Sale Price</TableHead>
            <TableHead>Shipping Cost</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pendingShipments?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.location}</TableCell>
              <TableCell>${product.sale_price?.toFixed(2)}</TableCell>
              <TableCell>${product.shipping_cost?.toFixed(2) || '0.00'}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="secondary"
                  onClick={() => markAsShipped.mutate(product.id)}
                >
                  Mark as Shipped
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}