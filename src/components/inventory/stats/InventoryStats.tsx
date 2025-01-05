import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Package, DollarSign, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const InventoryStats = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["inventory-stats"],
    queryFn: async () => {
      const { data: products, error } = await supabase
        .from("products")
        .select("quantity, purchase_price, target_price");

      if (error) throw error;

      const totalItems = products.reduce((sum, product) => sum + product.quantity, 0);
      const totalValue = products.reduce((sum, product) => sum + (product.purchase_price * product.quantity), 0);
      const lowStock = products.filter(product => product.quantity < 5).length;

      return {
        totalItems,
        totalValue,
        lowStock,
      };
    },
  });

  if (isLoading) return <StatsSkeleton />;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Items</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.totalItems}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats?.totalValue.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.lowStock}</div>
        </CardContent>
      </Card>
    </div>
  );
};

const StatsSkeleton = () => (
  <div className="grid gap-4 md:grid-cols-3">
    {[1, 2, 3].map((i) => (
      <Card key={i}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-[100px]" />
        </CardContent>
      </Card>
    ))}
  </div>
);