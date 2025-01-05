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

  return (
    <aside className="w-64 min-h-screen bg-background/60 backdrop-blur-sm border-r border-border/40 animate-slide-in">
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-secondary/80 to-secondary text-secondary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};