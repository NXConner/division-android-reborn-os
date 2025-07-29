import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/ui/layout";
import Index from "./pages/Index";
import IsacOS from "./pages/IsacOS";
import TacticalMap from "./components/isac/TacticalMap";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main ISAC OS Interface */}
          <Route path="/" element={
            <Layout>
              <IsacOS />
            </Layout>
          } />
          
          {/* Individual Section Routes */}
          <Route path="/agents" element={
            <Layout>
              <div className="space-y-6">
                <h1 className="text-2xl font-tactical font-bold tracking-wider text-tactical">
                  DIVISION AGENTS
                </h1>
                <p className="text-muted-foreground">
                  Comprehensive agent management and tracking interface coming soon...
                </p>
              </div>
            </Layout>
          } />
          
          <Route path="/missions" element={
            <Layout>
              <div className="space-y-6">
                <h1 className="text-2xl font-tactical font-bold tracking-wider text-tactical">
                  MISSION BOARD
                </h1>
                <p className="text-muted-foreground">
                  Advanced mission management system coming soon...
                </p>
              </div>
            </Layout>
          } />
          
          <Route path="/map" element={
            <Layout>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-tactical font-bold tracking-wider text-tactical">
                      TACTICAL MAP INTERFACE
                    </h1>
                    <p className="text-muted-foreground font-mono">
                      Real-time tactical mapping with 10 integrated mapping services • Live threat tracking • Zone control monitoring
                    </p>
                  </div>
                </div>
                <TacticalMap />
              </div>
            </Layout>
          } />
          
          <Route path="/diagnostics" element={
            <Layout>
              <div className="space-y-6">
                <h1 className="text-2xl font-tactical font-bold tracking-wider text-tactical">
                  SYSTEM DIAGNOSTICS
                </h1>
                <p className="text-muted-foreground">
                  Comprehensive system diagnostics interface coming soon...
                </p>
              </div>
            </Layout>
          } />
          
          <Route path="/intel" element={
            <Layout>
              <div className="space-y-6">
                <h1 className="text-2xl font-tactical font-bold tracking-wider text-tactical">
                  INTELLIGENCE
                </h1>
                <p className="text-muted-foreground">
                  Intelligence gathering and analysis system coming soon...
                </p>
              </div>
            </Layout>
          } />
          
          <Route path="/comms" element={
            <Layout>
              <div className="space-y-6">
                <h1 className="text-2xl font-tactical font-bold tracking-wider text-tactical">
                  COMMUNICATIONS
                </h1>
                <p className="text-muted-foreground">
                  Agent communications hub coming soon...
                </p>
              </div>
            </Layout>
          } />
          
          <Route path="/terminal" element={
            <Layout>
              <div className="space-y-6">
                <h1 className="text-2xl font-tactical font-bold tracking-wider text-tactical">
                  COMMAND TERMINAL
                </h1>
                <p className="text-muted-foreground">
                  Direct system access terminal coming soon...
                </p>
              </div>
            </Layout>
          } />
          
          <Route path="/reports" element={
            <Layout>
              <div className="space-y-6">
                <h1 className="text-2xl font-tactical font-bold tracking-wider text-tactical">
                  MISSION REPORTS
                </h1>
                <p className="text-muted-foreground">
                  Detailed mission analytics and reporting coming soon...
                </p>
              </div>
            </Layout>
          } />
          
          <Route path="/settings" element={
            <Layout>
              <div className="space-y-6">
                <h1 className="text-2xl font-tactical font-bold tracking-wider text-tactical">
                  SYSTEM CONFIGURATION
                </h1>
                <p className="text-muted-foreground">
                  System configuration and preferences coming soon...
                </p>
              </div>
            </Layout>
          } />

          {/* Legacy routes for compatibility */}
          <Route path="/legacy" element={<Index />} />
          
          {/* 404 catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
