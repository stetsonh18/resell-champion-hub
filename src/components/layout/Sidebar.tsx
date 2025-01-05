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
  TrendingUp,
  ChevronLeft
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useEffect } from "react";

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

export const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  return (
    <aside 
      className={cn(
        "relative min-h-screen bg-background/60 backdrop-blur-sm border-r border-border/40 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-6 z-10 h-6 w-6 rounded-full border bg-background"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <ChevronLeft className={cn(
          "h-4 w-4 transition-transform",
          isCollapsed ? "rotate-180" : ""
        )} />
      </Button>
      
      <nav className="mt-8 px-2">
        <TooltipProvider delayDuration={0}>
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
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
            })}
          </ul>
        </TooltipProvider>
      </nav>
    </aside>
  );
};