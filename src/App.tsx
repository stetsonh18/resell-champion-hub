import { AppProviders } from "@/components/providers/AppProviders";
import { AppRouter } from "@/components/router/AppRouter";

const App = () => {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
};

export default App;