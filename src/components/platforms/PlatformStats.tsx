import { useQuery } from "@tanstack/react-query";
import { Server, TrendingUp, Globe } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { supabase } from "@/integrations/supabase/client";

export const PlatformStats = () => {
  const { data: platforms } = useQuery({
    queryKey: ["platforms"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("platforms")
        .select("*");
      if (error) throw error;
      return data;
    },
  });

  const totalPlatforms = platforms?.length || 0;
  const activePlatforms = platforms?.filter(platform => platform.status === 'active').length || 0;
  const averageFees = platforms?.reduce((acc, platform) => acc + platform.percentage_fee, 0) / (platforms?.length || 1) || 0;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Total Platforms"
        value={totalPlatforms.toString()}
        icon={Server}
      />
      <StatCard
        title="Active Platforms"
        value={activePlatforms.toString()}
        icon={TrendingUp}
      />
      <StatCard
        title="Average Fees"
        value={`${averageFees.toFixed(1)}%`}
        icon={Globe}
      />
    </div>
  );
};