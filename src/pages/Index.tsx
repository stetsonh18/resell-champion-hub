import { Card } from "@/components/ui/card";
import { DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

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

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium">Total Sales</h3>
        </div>
        <p className="text-2xl font-bold">${totalSales.toFixed(2)}</p>
      </Card>
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium">Total Products</h3>
        </div>
        <p className="text-2xl font-bold">{totalProducts}</p>
      </Card>
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium">Listed Products</h3>
        </div>
        <p className="text-2xl font-bold">{listedProducts}</p>
      </Card>
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium">Pending Shipment</h3>
        </div>
        <p className="text-2xl font-bold">{pendingShipment}</p>
      </Card>
    </div>
  );
};

export default Index;