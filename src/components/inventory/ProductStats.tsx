import { useQuery } from "@tanstack/react-query";
import { Package, TrendingUp, AlertTriangle } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { supabase } from "@/integrations/supabase/client";

export const ProductStats = ({ products }: { products?: any[] }) => {
  const inStockProducts = products?.filter(product => product.status === 'in_stock').length || 0;
  const listedProducts = products?.filter(product => product.status === 'listed').length || 0;
  const totalActiveProducts = inStockProducts + listedProducts;
  const lowStock = products?.filter(product => product.quantity <= 5 && (product.status === 'in_stock' || product.status === 'listed')).length || 0;
  const outOfStock = products?.filter(product => product.quantity === 0 && (product.status === 'in_stock' || product.status === 'listed')).length || 0;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Active Products"
        value={totalActiveProducts.toString()}
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