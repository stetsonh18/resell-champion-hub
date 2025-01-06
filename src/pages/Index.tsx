import { StatCard } from "@/components/dashboard/StatCard";
import { DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { formatCurrency } from "@/lib/utils";

type Product = Database["public"]["Tables"]["products"]["Row"];
type Sale = Database["public"]["Tables"]["sales"]["Row"];

const Index = () => {
  const { data: sales } = useQuery({
    queryKey: ["recent-sales"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sales")
        .select("*")
        .order("sale_date", { ascending: false });
      
      if (error) throw error;
      return data as Sale[];
    },
  });

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*");
      
      if (error) throw error;
      return data as Product[];
    },
  });

  const totalSales = sales?.reduce((acc, sale) => acc + Number(sale.sale_price), 0) || 0;
  const totalProducts = products?.length || 0;
  const listedProducts = products?.filter(product => product.status === "listed").length || 0;
  const pendingShipment = products?.filter(product => product.status === "pending_shipment").length || 0;

  const monthlyChange = calculateMonthlyChange(sales);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Sales"
          value={formatCurrency(totalSales)}
          icon={DollarSign}
          trend={monthlyChange ? {
            value: Math.abs(monthlyChange),
            isPositive: monthlyChange > 0
          } : undefined}
        />
        <StatCard
          title="Total Products"
          value={totalProducts.toString()}
          icon={Package}
        />
        <StatCard
          title="Listed Products"
          value={listedProducts.toString()}
          icon={ShoppingCart}
        />
        <StatCard
          title="Pending Shipment"
          value={pendingShipment.toString()}
          icon={TrendingUp}
        />
      </div>
    </div>
  );
};

const calculateMonthlyChange = (sales?: Sale[]) => {
  if (!sales?.length) return null;

  const now = new Date();
  const thisMonth = sales.filter(sale => {
    const saleDate = new Date(sale.sale_date);
    return saleDate.getMonth() === now.getMonth() && 
           saleDate.getFullYear() === now.getFullYear();
  }).reduce((sum, sale) => sum + Number(sale.sale_price), 0);

  const lastMonth = sales.filter(sale => {
    const saleDate = new Date(sale.sale_date);
    const lastMonthDate = new Date();
    lastMonthDate.setMonth(now.getMonth() - 1);
    return saleDate.getMonth() === lastMonthDate.getMonth() && 
           saleDate.getFullYear() === lastMonthDate.getFullYear();
  }).reduce((sum, sale) => sum + Number(sale.sale_price), 0);

  if (!lastMonth) return null;
  return ((thisMonth - lastMonth) / lastMonth) * 100;
};

export default Index;