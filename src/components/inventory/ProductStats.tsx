import { useQuery } from "@tanstack/react-query";
import { Package, TrendingUp, AlertTriangle } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { supabase } from "@/integrations/supabase/client";

export const ProductStats = ({ products }: { products?: any[] }) => {
  const totalProducts = products?.length || 0;
  const lowStock = products?.filter(product => product.quantity <= 5).length || 0;
  const outOfStock = products?.filter(product => product.quantity === 0).length || 0;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Total Products"
        value={totalProducts.toString()}
        icon={Package}
      />
      <StatCard
        title="Low Stock Items"
        value={lowStock.toString()}
        icon={AlertTriangle}
      />
      <StatCard
        title="Out of Stock"
        value={outOfStock.toString()}
        icon={TrendingUp}
      />
    </div>
  );
};