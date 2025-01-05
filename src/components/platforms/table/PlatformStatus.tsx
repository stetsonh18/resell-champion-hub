import { CheckCircle, XCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface PlatformStatusProps {
  status: "active" | "inactive";
  onStatusChange: (checked: boolean) => void;
}

export const PlatformStatus = ({ status, onStatusChange }: PlatformStatusProps) => {
  return (
    <div className="flex items-center gap-2">
      {status === "active" ? (
        <CheckCircle className="h-4 w-4 text-green-500" />
      ) : (
        <XCircle className="h-4 w-4 text-red-500" />
      )}
      <Switch
        checked={status === "active"}
        onCheckedChange={onStatusChange}
      />
    </div>
  );
};