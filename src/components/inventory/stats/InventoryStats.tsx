import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TotalItemsCard } from "./cards/TotalItemsCard";
import { InventoryValueCard } from "./cards/InventoryValueCard";
import { LowStockCard } from "./cards/LowStockCard";
import { StatsSkeleton } from "./StatsSkeleton";

export const InventoryStats = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["inventory-stats"],
    queryFn: async () => {
      const { data: products, error } = await supabase
        .from("products")
        .select("quantity, purchase_price, target_price");

      if (error) throw error;

      const totalItems = products.reduce((sum, product) => sum + product.quantity, 0);
      const totalValue = products.reduce(
        (sum, product) => sum + product.purchase_price * product.quantity,
        0
      );
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
      <TotalItemsCard totalItems={stats?.totalItems ?? 0} />
      <InventoryValueCard totalValue={stats?.totalValue ?? 0} />
      <LowStockCard lowStock={stats?.lowStock ?? 0} />
    </div>
  );
};