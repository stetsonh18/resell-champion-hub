import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarCollapseButtonProps {
  isCollapsed: boolean;
  onClick: () => void;
}

export const SidebarCollapseButton = ({ 
  isCollapsed, 
  onClick 
}: SidebarCollapseButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute -right-3 top-6 z-10 h-6 w-6 rounded-full border bg-background"
      onClick={onClick}
    >
      <ChevronLeft className={cn(
        "h-4 w-4 transition-transform",
        isCollapsed ? "rotate-180" : ""
      )} />
    </Button>
  );
};