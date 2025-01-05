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
  selectedStoreName: string;
  setSelectedStoreName: (name: string) => void;
  storeNames: string[];
}

export const StoreFilters = ({
  searchQuery,
  setSearchQuery,
  hideInactive,
  setHideInactive,
  selectedStoreName,
  setSelectedStoreName,
  storeNames,
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
          <Label className="text-sm font-medium">Store Name</Label>
          <Select
            value={selectedStoreName}
            onValueChange={setSelectedStoreName}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Stores" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stores</SelectItem>
              {storeNames.map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};