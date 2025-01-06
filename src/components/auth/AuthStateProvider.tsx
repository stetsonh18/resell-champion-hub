import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AuthState {
  isAuthenticated: boolean;
  hasValidSubscription: boolean;
  isLoading: boolean;
}

const AuthStateContext = createContext<AuthState | undefined>(undefined);

export const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within an AuthStateProvider");
  }
  return context;
};

export const AuthStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasValidSubscription, setHasValidSubscription] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const checkAuthAndSubscription = async (session: any) => {
      if (!session) {
        if (mounted) {
          setIsAuthenticated(false);
          setHasValidSubscription(false);
          setIsLoading(false);
        }
        return;
      }

      setIsAuthenticated(true);

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("subscription_status")
        .eq("id", session.user.id)
        .maybeSingle();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
        if (mounted) {
          setHasValidSubscription(false);
          setIsLoading(false);
        }
        return;
      }

      const isSubscribed =
        profile?.subscription_status === "active" ||
        profile?.subscription_status === "trialing";

      if (mounted) {
        setHasValidSubscription(isSubscribed);
        setIsLoading(false);
      }
    };

    // Initial auth check
    supabase.auth.getSession().then(({ data: { session } }) => {
      checkAuthAndSubscription(session);
    });

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        if (!mounted) return;
        checkAuthAndSubscription(session);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [mounted]);

  return (
    <AuthStateContext.Provider
      value={{ isAuthenticated, hasValidSubscription, isLoading }}
    >
      {children}
    </AuthStateContext.Provider>
  );
};