import { useQuery } from "@tanstack/react-query";
import { Package, TrendingUp, AlertTriangle } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { supabase } from "@/integrations/supabase/client";

export const ProductStats = ({ products }: { products?: any[] }) => {
  const inStockProducts = products?.filter(product => product.status === 'in_stock').length || 0;
  const listedProducts = products?.filter(product => product.status === 'listed').length || 0;
  const totalActiveProducts = inStockProducts + listedProducts;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Active Products"
        value={totalActiveProducts.toString()}
        icon={Package}
      />
      <StatCard
        title="In Stock Items"
        value={inStockProducts.toString()}
        icon={AlertTriangle}
      />
      <StatCard
        title="Listed Items"
        value={listedProducts.toString()}
        icon={TrendingUp}
      />
    </div>
  );
};