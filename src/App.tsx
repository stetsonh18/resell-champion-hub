import { AppProviders } from "@/components/providers/AppProviders";
import { AppRouter } from "@/components/router/AppRouter";
import { SidebarProvider } from "@/components/ui/sidebar";

const App = () => {
  return (
    <AppProviders>
      <SidebarProvider defaultOpen={true}>
        <AppRouter />
      </SidebarProvider>
    </AppProviders>
  );
};

export default App;