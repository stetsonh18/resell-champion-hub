import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ReturnActionsProps {
  return: any; // Will be properly typed once we update the types
}

export const ReturnActions = ({ return: returnItem }: ReturnActionsProps) => {
  const queryClient = useQueryClient();

  const { mutate: updateStatus } = useMutation({
    mutationFn: async ({ status }: { status: 'approved' | 'rejected' }) => {
      const { error } = await supabase
        .from("returns")
        .update({ status })
        .eq("id", returnItem.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["returns"] });
      toast.success("Return status updated successfully");
    },
    onError: () => {
      toast.error("Failed to update return status");
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {returnItem.status === "pending" && (
          <>
            <DropdownMenuItem onClick={() => updateStatus({ status: "approved" })}>
              Approve Return
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateStatus({ status: "rejected" })}>
              Reject Return
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};