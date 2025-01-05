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
        <main className="flex-1 pl-[280px] w-full"> {/* Changed ml to pl and added w-full */}
          <div className="container mx-auto px-4 py-6">
            <SidebarTrigger />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};