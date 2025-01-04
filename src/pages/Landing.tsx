import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <header className="flex justify-between items-center py-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">ResellPro</h1>
          <Button onClick={() => navigate("/login")} variant="secondary">
            Sign In
          </Button>
        </header>

        <main className="py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Manage Your Reselling Business Like a Pro
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Track inventory, sales, and profits all in one place. Streamline your
              operations and grow your reselling business with powerful analytics
              and insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/login")}
                size="lg"
                className="text-lg px-8"
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8"
                onClick={() => navigate("/login")}
              >
                Learn More
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Landing;