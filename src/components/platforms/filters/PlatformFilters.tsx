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

interface PlatformFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  hideInactive: boolean;
  setHideInactive: (hide: boolean) => void;
  selectedPlatformName: string;
  setSelectedPlatformName: (name: string) => void;
  platformNames: string[];
}

export const PlatformFilters = ({
  searchQuery,
  setSearchQuery,
  hideInactive,
  setHideInactive,
  selectedPlatformName,
  setSelectedPlatformName,
  platformNames,
}: PlatformFiltersProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Filter className="h-4 w-4" />
        <span className="text-sm font-medium">Filters</span>
      </div>
      
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by platform name or URL..."
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
            <Label className="text-sm text-muted-foreground">Hide inactive platforms</Label>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium">Platform Name</Label>
          <Select
            value={selectedPlatformName}
            onValueChange={setSelectedPlatformName}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Platforms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              {platformNames.map((name) => (
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