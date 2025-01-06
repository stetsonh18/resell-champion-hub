import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "@/components/router/AppRouter";
import { AuthStateProvider } from "@/components/auth/AuthStateProvider";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" attribute="class">
        <BrowserRouter>
          <AuthStateProvider>
            <AppRouter />
            <Toaster />
          </AuthStateProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;