import { cn } from "@/lib/utils";
import { MenuItem } from "./types/sidebar";
import { Link, useLocation } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarNavItemProps {
  item: MenuItem;
  isCollapsed: boolean;
}

export const SidebarNavItem = ({ item, isCollapsed }: SidebarNavItemProps) => {
  const location = useLocation();
  const Icon = item.icon;
  const isActive = location.pathname === item.path;

  return (
    <li>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={item.path}
            className={cn(
              "flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200",
              isActive
                ? "bg-gradient-to-r from-secondary/80 to-secondary text-secondary-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              isCollapsed && "justify-center"
            )}
          >
            <Icon className={cn(
              "w-5 h-5",
              !isCollapsed && "mr-3"
            )} />
            {!isCollapsed && item.label}
          </Link>
        </TooltipTrigger>
        {isCollapsed && (
          <TooltipContent side="right">
            {item.label}
          </TooltipContent>
        )}
      </Tooltip>
    </li>
  );
};