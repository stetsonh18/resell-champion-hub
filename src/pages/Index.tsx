import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { Box, DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react";
import { AddProductDialog } from "@/components/inventory/dialogs/AddProductDialog";
import { AddExpenseDialog } from "@/components/expenses/AddExpenseDialog";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

const Index = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddSaleOpen, setIsAddSaleOpen] = useState(false);
  const [isAddReturnOpen, setIsAddReturnOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

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

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Total Products"
            value={totalProducts.toString()}
            icon={Package}
          />
          <StatCard
            title="Items Sold This Month"
            value={itemsSoldThisMonth.toString()}
            icon={ShoppingCart}
          />
          <StatCard
            title="Items in Stock"
            value={inStockProducts.toString()}
            icon={Box}
          />
          <StatCard
            title="Active Listings"
            value={activeListings.toString()}
            icon={TrendingUp}
          />
          <StatCard
            title="Sales This Month"
            value={`$${salesAmountThisMonth.toFixed(2)}`}
            icon={DollarSign}
          />
          <StatCard
            title="Average Sale Price"
            value={`$${averageSalePrice.toFixed(2)}`}
            icon={DollarSign}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <QuickActions 
            setIsAddProductOpen={setIsAddProductOpen}
            setIsAddSaleOpen={setIsAddSaleOpen}
            setIsAddReturnOpen={setIsAddReturnOpen}
            setIsAddExpenseOpen={setIsAddExpenseOpen}
          />
          <RecentActivity />
        </div>

        <AddProductDialog 
          open={isAddProductOpen} 
          onOpenChange={setIsAddProductOpen}
        />
        <AddExpenseDialog 
          open={isAddExpenseOpen} 
          onOpenChange={setIsAddExpenseOpen}
        />
      </div>
    </DashboardLayout>
  );
};

export default Index;