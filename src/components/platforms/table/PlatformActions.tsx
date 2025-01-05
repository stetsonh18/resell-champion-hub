import { Button } from "@/components/ui/button";
import { EditPlatformDialog } from "../dialogs/EditPlatformDialog";
import { Trash } from "lucide-react";

interface PlatformActionsProps {
  platform: {
    id: string;
    name: string;
    url: string;
    base_fee: number;
    percentage_fee: number;
    notes?: string;
  };
  onDelete: (id: string) => void;
}

export const PlatformActions = ({ platform, onDelete }: PlatformActionsProps) => {
  return (
    <div className="flex justify-end gap-2">
      <EditPlatformDialog platform={platform} />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          if (window.confirm("Are you sure you want to delete this platform?")) {
            onDelete(platform.id);
          }
        }}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};