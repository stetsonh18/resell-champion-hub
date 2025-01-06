import { Navigate } from "react-router-dom";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useAuthState } from "./AuthStateProvider";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, hasValidSubscription, isLoading } = useAuthState();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && hasValidSubscription === false) {
    return <Navigate to="/#pricing" replace />;
  }

  return <>{children}</>;
};