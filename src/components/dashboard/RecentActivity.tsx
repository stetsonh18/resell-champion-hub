import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { History } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export const RecentActivity = () => {
  const { data: recentActivity } = useQuery({
    queryKey: ["recent-activity"],
    queryFn: async () => {
      const [salesResult, returnsResult] = await Promise.all([
        supabase
          .from("sales")
          .select("*, products!sales_product_id_fkey(name)")
          .order("created_at", { ascending: false })
          .limit(5),
        supabase
          .from("returns")
          .select("*, products!returns_product_id_fkey(name)")
          .order("created_at", { ascending: false })
          .limit(5)
      ]);

      if (salesResult.error) throw salesResult.error;
      if (returnsResult.error) throw returnsResult.error;

      const combined = [
        ...salesResult.data.map(sale => ({
          type: 'sale' as const,
          date: new Date(sale.created_at),
          description: `Sold ${sale.products.name} for ${formatCurrency(sale.sale_price)}`
        })),
        ...returnsResult.data.map(return_ => ({
          type: 'return' as const,
          date: new Date(return_.created_at),
          description: `Return processed for ${return_.products.name}`
        }))
      ].sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5);

      return combined;
    }
  });

  return (
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
  );
};