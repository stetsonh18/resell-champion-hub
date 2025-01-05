import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TotalItemsCard } from "./cards/TotalItemsCard";
import { InventoryValueCard } from "./cards/InventoryValueCard";
import { LowStockCard } from "./cards/LowStockCard";
import { InStockCard } from "./cards/InStockCard";
import { StatsSkeleton } from "./StatsSkeleton";

export const InventoryStats = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["inventory-stats"],
    queryFn: async () => {
      const { data: products, error } = await supabase
        .from("products")
        .select("quantity, purchase_price, target_price");

      if (error) throw error;

      const totalItems = products.length;
      const totalValue = products.reduce(
        (sum, product) => sum + product.purchase_price * product.quantity,
        0
      );
      const inStock = products.filter(product => product.quantity > 0).length;
      const listed = products.filter(product => product.target_price > 0).length;

      return {
        totalItems,
        totalValue,
        inStock,
        listed,
      };
    },
  });

  if (isLoading) return <StatsSkeleton />;

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <TotalItemsCard totalItems={stats?.totalItems ?? 0} />
      <InStockCard inStock={stats?.inStock ?? 0} />
      <LowStockCard lowStock={stats?.listed ?? 0} />
      <InventoryValueCard totalValue={stats?.totalValue ?? 0} />
    </div>
  );
};