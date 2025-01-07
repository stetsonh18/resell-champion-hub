import { StatCard } from "@/components/dashboard/StatCard";
import { Box, DollarSign, Package, ShoppingCart, TrendingUp, History } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { formatCurrency } from "@/lib/utils";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddProductDialog } from "@/components/inventory/dialogs/AddProductDialog";
import { AddSaleDialog } from "@/components/sales/AddSaleDialog";
import { AddReturnDialog } from "@/components/returns/AddReturnDialog";
import { AddExpenseDialog } from "@/components/expenses/AddExpenseDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Product = Database["public"]["Tables"]["products"]["Row"];
type Sale = Database["public"]["Tables"]["sales"]["Row"];

const Index = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddSaleOpen, setIsAddSaleOpen] = useState(false);
  const [isAddReturnOpen, setIsAddReturnOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  const { data: sales } = useQuery({
    queryKey: ["recent-sales"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sales")
        .select("*, product:products(name)")
        .order("sale_date", { ascending: false });
      
      if (error) throw error;
      return data as (Sale & { product: { name: string } })[];
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

  const { data: recentActivity } = useQuery({
    queryKey: ["recent-activity"],
    queryFn: async () => {
      const [salesResult, returnsResult] = await Promise.all([
        supabase
          .from("sales")
          .select("*, product:products(name)")
          .order("created_at", { ascending: false })
          .limit(5),
        supabase
          .from("returns")
          .select("*, product:products(name)")
          .order("created_at", { ascending: false })
          .limit(5)
      ]);

      if (salesResult.error) throw salesResult.error;
      if (returnsResult.error) throw returnsResult.error;

      const combined = [
        ...salesResult.data.map(sale => ({
          type: 'sale' as const,
          date: new Date(sale.created_at),
          description: `Sold ${sale.product.name} for ${formatCurrency(sale.sale_price)}`
        })),
        ...returnsResult.data.map(return_ => ({
          type: 'return' as const,
          date: new Date(return_.created_at),
          description: `Return processed for ${return_.product.name}`
        }))
      ].sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5);

      return combined;
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
            value={formatCurrency(salesAmountThisMonth)}
            icon={DollarSign}
          />
          <StatCard
            title="Average Sale Price"
            value={formatCurrency(averageSalePrice)}
            icon={DollarSign}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  className="bg-secondary hover:bg-secondary/90"
                  onClick={() => setIsAddProductOpen(true)}
                >
                  Add Product
                </Button>
                <Button 
                  className="bg-secondary hover:bg-secondary/90"
                  onClick={() => setIsAddSaleOpen(true)}
                >
                  Add Sale
                </Button>
                <Button 
                  className="bg-secondary hover:bg-secondary/90"
                  onClick={() => setIsAddReturnOpen(true)}
                >
                  Process Return
                </Button>
                <Button 
                  className="bg-secondary hover:bg-secondary/90"
                  onClick={() => setIsAddExpenseOpen(true)}
                >
                  Add Expense
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity?.map((activity, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">
                      {activity.date.toLocaleDateString()}
                    </span>
                    <span>{activity.description}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <AddProductDialog 
          isOpen={isAddProductOpen} 
          onClose={() => setIsAddProductOpen(false)} 
        />
        <AddSaleDialog 
          open={isAddSaleOpen} 
          onOpenChange={setIsAddSaleOpen} 
        />
        <AddReturnDialog 
          open={isAddReturnOpen} 
          onOpenChange={setIsAddReturnOpen} 
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