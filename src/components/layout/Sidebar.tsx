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
    <aside className="w-64 min-h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 animate-slide-in">
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-secondary text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
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