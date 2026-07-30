import { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Preloader from './components/Preloader';

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    ReactGA.send({ 
      hitType: 'pageview', 
      page: window.location.pathname,
      title: 'Muhammad Shahrukh Khan - Portfolio'
    });
  }, []);

  return (
    <>
      <Preloader onComplete={() => setPreloaderDone(true)} />
      {preloaderDone && (
        <ErrorBoundary>
          <ThemeProvider defaultTheme="dark" switchable>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </ThemeProvider>
        </ErrorBoundary>
      )}
    </>
  );
}

export default App;
