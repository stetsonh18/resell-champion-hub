import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthChange = async (event: string, session: any) => {
      if (session) {
        try {
          // First ensure profile exists
          const { data: existingProfile } = await supabase
            .from('profiles')
            .select('subscription_status')
            .eq('id', session.user.id)
            .maybeSingle();

          if (!existingProfile) {
            // Create profile if it doesn't exist
            await supabase
              .from('profiles')
              .insert([
                { 
                  id: session.user.id,
                  subscription_status: 'inactive'
                }
              ]);
          }

          // Redirect to dashboard
          navigate("/dashboard");
          
        } catch (error: any) {
          console.error('Error during login:', error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "An error occurred during login. Please try again.",
          });
        }
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome to ResellPro
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {searchParams.get('screen') === 'sign-up' 
              ? 'Create your account to get started'
              : 'Sign in to manage your inventory and sales'}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#7C3AED',
                    brandAccent: '#6D28D9',
                  },
                },
              },
            }}
            providers={["google", "github"]}
            view={searchParams.get('screen') === 'sign-up' ? 'sign_up' : 'sign_in'}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;