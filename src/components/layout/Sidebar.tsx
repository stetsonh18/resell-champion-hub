import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarNavItem } from "./SidebarNavItem";
import { SidebarCollapseButton } from "./SidebarCollapseButton";
import { menuItems } from "./config/menuItems";
import type { SidebarProps } from "./types/sidebar";

export const Sidebar = ({ className }: SidebarProps) => {
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
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      <SidebarCollapseButton 
        isCollapsed={isCollapsed} 
        onClick={() => setIsCollapsed(!isCollapsed)} 
      />
      
      <nav className="mt-8 px-2">
        <TooltipProvider delayDuration={0}>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <SidebarNavItem 
                key={item.path}
                item={item}
                isCollapsed={isCollapsed}
              />
            ))}
          </ul>
        </TooltipProvider>
      </nav>
    </aside>
  );
};