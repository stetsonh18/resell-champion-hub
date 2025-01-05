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
      <div className="flex pt-16"> {/* Added pt-16 to account for header height */}
        <Sidebar />
        <main className="flex-1 ml-[280px]"> {/* Added ml-[280px] to offset sidebar width */}
          <div className="max-w-full mx-auto">
            <div className="p-4">
              <SidebarTrigger />
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};