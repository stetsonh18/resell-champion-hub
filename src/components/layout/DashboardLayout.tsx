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
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <div className="max-w-full mx-auto">
            <div className="p-4">
              <SidebarTrigger />
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};