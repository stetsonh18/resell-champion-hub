import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, RefreshCw, ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const TaskManagement = () => {
  const navigate = useNavigate();

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <Button
            variant="outline"
            className="flex items-center justify-between p-4 h-auto"
            onClick={() => navigate("/shipments")}
          >
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span>Pending Shipments</span>
            </div>
            <span className="text-lg font-bold">{taskCounts?.pendingShipments || 0}</span>
          </Button>

          <Button
            variant="outline"
            className="flex items-center justify-between p-4 h-auto"
            onClick={() => navigate("/returns")}
          >
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              <span>Returns to Process</span>
            </div>
            <span className="text-lg font-bold">{taskCounts?.pendingReturns || 0}</span>
          </Button>

          <Button
            variant="outline"
            className="flex items-center justify-between p-4 h-auto"
            onClick={() => navigate("/inventory")}
          >
            <div className="flex items-center gap-2">
              <ListTodo className="h-4 w-4" />
              <span>Items to List</span>
            </div>
            <span className="text-lg font-bold">{taskCounts?.unlistedProducts || 0}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};