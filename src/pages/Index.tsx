import { Button } from "@/components/ui/button";
import { ArrowRight, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex justify-end mb-8">
          {isAuthenticated ? (
            <Button
              onClick={() => navigate("/inventory")}
              variant="outline"
              className="gap-2"
            >
              Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              variant="outline"
              className="gap-2"
            >
              Login
              <LogIn className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 animate-fade-in">
            Maximize Your Reselling Profits
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 animate-fade-in">
            Track inventory, manage sales, and analyze your performance all in one place.
            Start growing your reselling business today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button
              onClick={() => navigate(isAuthenticated ? "/inventory" : "/login")}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate(isAuthenticated ? "/analytics" : "/login")}
              className="px-8 py-6 text-lg"
            >
              View Demo
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Inventory Management
              </h3>
              <p className="text-gray-600">
                Keep track of your products, costs, and profit margins in real-time.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Sales Tracking
              </h3>
              <p className="text-gray-600">
                Monitor your sales across multiple platforms and analyze performance.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Analytics Dashboard
              </h3>
              <p className="text-gray-600">
                Make data-driven decisions with comprehensive analytics and reports.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;