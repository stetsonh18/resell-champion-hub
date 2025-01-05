import React from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { useSidebar } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div className="min-h-screen bg-[#0B1120]">
      <TopBar />
      <div className="flex">
        <Sidebar />
        <main className={`flex-1 transition-all duration-300 ${
          isCollapsed ? "pl-[60px]" : "pl-[280px]"
        }`}>
          <div className="p-8 max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};