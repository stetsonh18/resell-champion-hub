import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StatusFilterProps {
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
}

export const StatusFilter = ({ selectedStatus, setSelectedStatus }: StatusFilterProps) => {
  return (
    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Statuses</SelectItem>
        <SelectItem value="in_stock">In Stock</SelectItem>
        <SelectItem value="listed">Listed</SelectItem>
        <SelectItem value="pending_shipment">Pending Shipment</SelectItem>
        <SelectItem value="shipped">Shipped</SelectItem>
      </SelectContent>
    </Select>
  );
};