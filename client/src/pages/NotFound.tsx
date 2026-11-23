import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";
import SEO from "@/components/SEO";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground relative overflow-hidden p-4">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      <SEO title="404 Page Not Found | Muhammad Shahrukh Khan" noIndex={true} />
      <Card className="w-full max-w-lg mx-4 shadow-2xl border border-border bg-card/80 backdrop-blur-md relative z-10">
        <CardContent className="pt-10 pb-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-[#00D4FF]">
              <AlertCircle className="h-12 w-12" />
            </div>
          </div>

          <h1 className="text-5xl font-extrabold font-heading text-foreground mb-2">404</h1>

          <h2 className="text-xl font-semibold text-[#00D4FF] mb-4">
            Page Not Found
          </h2>

          <p className="text-muted-foreground mb-8 leading-relaxed max-w-sm mx-auto text-sm sm:text-base">
            The requested route could not be found or has been moved to another location.
          </p>

          <div className="flex justify-center">
            <Button
              onClick={handleGoHome}
              className="bg-gradient-to-r from-[#2E75B6] to-[#00D4FF] text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
