import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StoresTable } from "@/components/stores/StoresTable";
import { AddStoreDialog } from "@/components/stores/AddStoreDialog";
import { StoreStats } from "@/components/stores/StoreStats";
import { StoreFilters } from "@/components/stores/StoreFilters";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Stores = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hideInactive, setHideInactive] = useState(false);
  const [selectedStoreName, setSelectedStoreName] = useState("all");

  const { data: stores } = useQuery({
    queryKey: ["stores"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stores")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const storeNames = [...new Set(stores?.map((store) => store.name) || [])];

  const filteredStores = stores?.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = hideInactive ? store.status === "active" : true;
    const matchesStoreName =
      selectedStoreName === "all" || store.name === selectedStoreName;
    return matchesSearch && matchesStatus && matchesStoreName;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Stores</h1>
            <p className="text-muted-foreground">
              Manage your store locations and settings
            </p>
          </div>
          <AddStoreDialog />
        </div>

        <StoreStats />

        <StoreFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          hideInactive={hideInactive}
          setHideInactive={setHideInactive}
          selectedStoreName={selectedStoreName}
          setSelectedStoreName={setSelectedStoreName}
          storeNames={storeNames}
        />

        <StoresTable stores={filteredStores} />
      </div>
    </DashboardLayout>
  );
};

export default Stores;