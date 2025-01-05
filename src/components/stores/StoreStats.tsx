import { useQuery } from "@tanstack/react-query";
import { Store, MapPin, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { supabase } from "@/integrations/supabase/client";

export const StoreStats = () => {
  const { data: stores } = useQuery({
    queryKey: ["stores"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stores")
        .select("*");
      if (error) throw error;
      return data;
    },
  });

  const totalStores = stores?.length || 0;
  const activeStores = stores?.filter(store => store.status === 'active').length || 0;
  const uniqueLocations = new Set(stores?.map(store => store.location)).size || 0;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Total Stores"
        value={totalStores.toString()}
        icon={Store}
      />
      <StatCard
        title="Active Stores"
        value={activeStores.toString()}
        icon={TrendingUp}
      />
      <StatCard
        title="Total Locations"
        value={uniqueLocations.toString()}
        icon={MapPin}
      />
    </div>
  );
};