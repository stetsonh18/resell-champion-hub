import { useState } from "react";
import { Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

export function ShipmentsFilters() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-sm font-semibold">Filters</h2>
      </div>
      
      <div>
        <Input
          placeholder="Search by SKU, title, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
}