import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StoreFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  hideInactive: boolean;
  setHideInactive: (hide: boolean) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  locations: string[];
}

export const StoreFilters = ({
  searchQuery,
  setSearchQuery,
  hideInactive,
  setHideInactive,
  selectedLocation,
  setSelectedLocation,
  locations,
}: StoreFiltersProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Filter className="h-4 w-4" />
        <span className="text-sm font-medium">Filters</span>
      </div>
      
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by store name or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium">Status Filter</Label>
          <div className="flex items-center space-x-2">
            <Switch
              checked={hideInactive}
              onCheckedChange={setHideInactive}
            />
            <Label className="text-sm text-muted-foreground">Hide inactive stores</Label>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium">Location</Label>
          <Select
            value={selectedLocation}
            onValueChange={setSelectedLocation}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};