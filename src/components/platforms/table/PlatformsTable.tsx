import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, isValid, parseISO } from "date-fns";
import { toast } from "sonner";
import { PlatformActions } from "./PlatformActions";
import { PlatformStatus } from "./PlatformStatus";
import { TableSkeleton } from "./TableSkeleton";

interface PlatformsTableProps {
  platforms?: any[];
}

export const PlatformsTable = ({ platforms }: PlatformsTableProps) => {
  const queryClient = useQueryClient();

  const { mutate: updatePlatformStatus } = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'active' | 'inactive' }) => {
      const { error } = await supabase
        .from("platforms")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platforms"] });
      toast.success("Platform status updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update platform status");
      console.error("Error updating platform status:", error);
    },
  });

  const { mutate: deletePlatform } = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("platforms")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platforms"] });
      toast.success("Platform deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete platform");
      console.error("Error deleting platform:", error);
    },
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    const date = parseISO(dateString);
    return isValid(date) ? format(date, "MMM d, yyyy") : "Invalid date";
  };

  if (!platforms) {
    return <TableSkeleton />;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Platform Name</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Base Fee</TableHead>
            <TableHead>% Fee</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {platforms.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground">
                No platforms found. Create your first platform to get started.
              </TableCell>
            </TableRow>
          ) : (
            platforms.map((platform) => (
              <TableRow key={platform.id}>
                <TableCell className="font-medium">{platform.name}</TableCell>
                <TableCell>
                  <a 
                    href={platform.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {platform.url}
                  </a>
                </TableCell>
                <TableCell>${platform.base_fee.toFixed(2)}</TableCell>
                <TableCell>{platform.percentage_fee}%</TableCell>
                <TableCell>
                  <PlatformStatus
                    status={platform.status}
                    onStatusChange={(checked) =>
                      updatePlatformStatus({
                        id: platform.id,
                        status: checked ? "active" : "inactive",
                      })
                    }
                  />
                </TableCell>
                <TableCell>
                  {formatDate(platform.created_at)}
                </TableCell>
                <TableCell>
                  <PlatformActions
                    platform={platform}
                    onDelete={deletePlatform}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};