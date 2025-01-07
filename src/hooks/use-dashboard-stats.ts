import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DashboardStats {
  totalProducts: number;
  inStockProducts: number;
  activeListings: number;
  itemsSoldThisMonth: number;
  salesAmountThisMonth: number;
  averageSalePrice: number;
  pendingShipments: number;
  pendingReturns: number;
  unlistedProducts: number;
}

export const useDashboardStats = () => {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*");
      
      if (error) throw error;
      return data;
    },
  });

  const { data: sales } = useQuery({
    queryKey: ["recent-sales"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sales")
        .select("*, products!sales_product_id_fkey(name)")
        .order("sale_date", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const { data: taskCounts } = useQuery({
    queryKey: ["task-counts"],
    queryFn: async () => {
      const [pendingShipments, pendingReturns, unlistedProducts] = await Promise.all([
        supabase
          .from("products")
          .select("id", { count: "exact" })
          .eq("status", "pending_shipment"),
        supabase
          .from("returns")
          .select("id", { count: "exact" })
          .eq("status", "pending"),
        supabase
          .from("products")
          .select("id", { count: "exact" })
          .eq("status", "in_stock")
      ]);

      return {
        pendingShipments: pendingShipments.count || 0,
        pendingReturns: pendingReturns.count || 0,
        unlistedProducts: unlistedProducts.count || 0
      };
    }
  });

  // Calculate statistics
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
  const totalProducts = products?.length || 0;
  const inStockProducts = products?.filter(p => p.status === "in_stock").length || 0;
  const activeListings = products?.filter(p => p.status === "listed").length || 0;
  
  const thisMonthSales = sales?.filter(sale => 
    new Date(sale.sale_date) >= firstDayOfMonth
  ) || [];
  
  const itemsSoldThisMonth = thisMonthSales.reduce((sum, sale) => sum + sale.quantity, 0);
  const salesAmountThisMonth = thisMonthSales.reduce((sum, sale) => sum + Number(sale.sale_price), 0);
  const averageSalePrice = thisMonthSales.length > 0 
    ? salesAmountThisMonth / thisMonthSales.length 
    : 0;

  return {
    totalProducts,
    inStockProducts,
    activeListings,
    itemsSoldThisMonth,
    salesAmountThisMonth,
    averageSalePrice,
    pendingShipments: taskCounts?.pendingShipments || 0,
    pendingReturns: taskCounts?.pendingReturns || 0,
    unlistedProducts: taskCounts?.unlistedProducts || 0,
  };
};