import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Check, X } from "lucide-react";

export const ReturnsStats = () => {
  const { data: stats } = useQuery({
    queryKey: ["returns-stats"],
    queryFn: async () => {
      const { data: returns, error } = await supabase
        .from("returns")
        .select("status, refund_amount");

      if (error) throw error;

      const totalReturns = returns.length;
      const pendingReturns = returns.filter(r => r.status === "pending").length;
      const approvedReturns = returns.filter(r => r.status === "approved").length;
      const totalRefunds = returns
        .filter(r => r.status === "approved")
        .reduce((sum, r) => sum + (r.refund_amount || 0), 0);

      return {
        totalReturns,
        pendingReturns,
        approvedReturns,
        totalRefunds,
      };
    },
  });

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Returns</CardTitle>
          <RefreshCw className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.totalReturns || 0}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Returns</CardTitle>
          <RefreshCw className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.pendingReturns || 0}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Approved Returns</CardTitle>
          <Check className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.approvedReturns || 0}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Refunds</CardTitle>
          <X className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${stats?.totalRefunds?.toFixed(2) || "0.00"}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};