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
import { Edit, Trash, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { toast } from "sonner";
import { EditPlatformDialog } from "./EditPlatformDialog";
import { Skeleton } from "@/components/ui/skeleton";

const TableRowSkeleton = () => (
  <TableRow>
    <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
  </TableRow>
);

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

  if (!platforms) {
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
            <TableRowSkeleton />
            <TableRowSkeleton />
            <TableRowSkeleton />
          </TableBody>
        </Table>
      </div>
    );
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
                  <div className="flex items-center gap-2">
                    {platform.status === "active" ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <Switch
                      checked={platform.status === "active"}
                      onCheckedChange={(checked) =>
                        updatePlatformStatus({
                          id: platform.id,
                          status: checked ? "active" : "inactive",
                        })
                      }
                    />
                  </div>
                </TableCell>
                <TableCell>
                  {format(new Date(platform.created_at), "MMM d, yyyy")}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <EditPlatformDialog platform={platform} />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this platform?")) {
                          deletePlatform(platform.id);
                        }
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};