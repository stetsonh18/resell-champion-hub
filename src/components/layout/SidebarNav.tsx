import { 
  Home, 
  Package, 
  ShoppingCart, 
  Truck, 
  RotateCcw, 
  Server,
  Grid,
  Layers,
  DollarSign, 
  TrendingUp 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: Package, label: "Inventory", path: "/inventory" },
  { icon: ShoppingCart, label: "Sales", path: "/sales" },
  { icon: Truck, label: "Pending Shipments", path: "/shipments" },
  { icon: RotateCcw, label: "Returns", path: "/returns" },
  { icon: Server, label: "Platforms", path: "/platforms" },
  { icon: Grid, label: "Stores", path: "/stores" },
  { icon: Layers, label: "Categories", path: "/categories" },
  { icon: DollarSign, label: "Expenses", path: "/expenses" },
  { icon: TrendingUp, label: "Analytics", path: "/analytics" },
];

export const SidebarNav = () => {
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <nav className="mt-4 px-2">
      <ul className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          const menuItem = (
            <Link
              to={item.path}
              className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-[#84CC16] text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/10"
              } ${isCollapsed ? "justify-center" : ""}`}
            >
              <Icon className="w-5 h-5 min-w-5" />
              {!isCollapsed && <span className="ml-3 truncate">{item.label}</span>}
            </Link>
          );

          return (
            <li key={item.path}>
              {isCollapsed ? (
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {menuItem}
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                menuItem
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};