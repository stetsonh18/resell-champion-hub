import React from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="relative min-h-screen bg-[#0B1120]">
      <TopBar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 pl-[280px]">
          <div className="p-8 max-w-[1600px] mx-auto">
            <SidebarTrigger />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};