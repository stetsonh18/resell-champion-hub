import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PlatformsTable } from "@/components/platforms/PlatformsTable";
import { AddPlatformDialog } from "@/components/platforms/AddPlatformDialog";
import { PlatformStats } from "@/components/platforms/PlatformStats";
import { PlatformFilters } from "@/components/platforms/PlatformFilters";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Platforms = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hideInactive, setHideInactive] = useState(false);
  const [selectedPlatformName, setSelectedPlatformName] = useState("all");

  const { data: platforms } = useQuery({
    queryKey: ["platforms"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("platforms")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const platformNames = [...new Set(platforms?.map((platform) => platform.name) || [])];

  const filteredPlatforms = platforms?.filter((platform) => {
    const matchesSearch =
      platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      platform.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = hideInactive ? platform.status === "active" : true;
    const matchesPlatformName =
      selectedPlatformName === "all" || platform.name === selectedPlatformName;
    return matchesSearch && matchesStatus && matchesPlatformName;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Platforms</h1>
            <p className="text-muted-foreground">
              Manage your selling platforms and settings
            </p>
          </div>
          <AddPlatformDialog />
        </div>

        <PlatformStats />

        <PlatformFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          hideInactive={hideInactive}
          setHideInactive={setHideInactive}
          selectedPlatformName={selectedPlatformName}
          setSelectedPlatformName={setSelectedPlatformName}
          platformNames={platformNames}
        />

        <PlatformsTable platforms={filteredPlatforms} />
      </div>
    </DashboardLayout>
  );
};

export default Platforms;