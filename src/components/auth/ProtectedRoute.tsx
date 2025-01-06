import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [hasValidSubscription, setHasValidSubscription] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          if (mounted) {
            setIsAuthenticated(false);
            setIsLoading(false);
          }
          return;
        }

        if (mounted) {
          setIsAuthenticated(true);
        }

        // Check subscription status
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('subscription_status')
          .eq('id', session.user.id)
          .maybeSingle();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          if (mounted) {
            setHasValidSubscription(false);
          }
          return;
        }

        const isSubscribed = profile?.subscription_status === 'active' || 
                           profile?.subscription_status === 'trialing';

        if (mounted) {
          setHasValidSubscription(isSubscribed);
          setIsLoading(false);
        }

        if (!isSubscribed) {
          toast({
            title: "Subscription Required",
            description: "Please subscribe to access the dashboard.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        if (mounted) {
          setIsAuthenticated(false);
          setHasValidSubscription(false);
          setIsLoading(false);
        }
      }
    };

    // Initial auth check
    checkAuth();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      
      if (!mounted) return;

      if (!session) {
        setIsAuthenticated(false);
        setHasValidSubscription(false);
        setIsLoading(false);
        return;
      }

      setIsAuthenticated(true);

      // Re-check subscription status on auth state change
      const { data: profile } = await supabase
        .from('profiles')
        .select('subscription_status')
        .eq('id', session.user.id)
        .maybeSingle();

      if (mounted) {
        setHasValidSubscription(
          profile?.subscription_status === 'active' || 
          profile?.subscription_status === 'trialing'
        );
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [toast]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to pricing if no valid subscription
  if (isAuthenticated && hasValidSubscription === false) {
    return <Navigate to="/#pricing" replace />;
  }

  return <>{children}</>;
};