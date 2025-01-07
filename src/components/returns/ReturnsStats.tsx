import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { RefreshCw, Check, X, ArrowLeftRight } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";

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
      <StatCard
        title="Total Returns"
        value={stats?.totalReturns?.toString() || "0"}
        icon={ArrowLeftRight}
      />
      <StatCard
        title="Pending Returns"
        value={stats?.pendingReturns?.toString() || "0"}
        icon={RefreshCw}
      />
      <StatCard
        title="Approved Returns"
        value={stats?.approvedReturns?.toString() || "0"}
        icon={Check}
      />
      <StatCard
        title="Total Refunds"
        value={`$${stats?.totalRefunds?.toFixed(2) || "0.00"}`}
        icon={X}
      />
    </div>
  );
};