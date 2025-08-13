import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Layout } from "@/components/ui/layout";
import Index from "./pages/Index";
import IsacOS from "./pages/IsacOS";
import NotFound from "./pages/NotFound";
import AgentsPage from "./pages/AgentsPage";
import MissionsPage from "./pages/MissionsPage";
import MapPage from "./pages/MapPage";
import DiagnosticsPage from "./pages/DiagnosticsPage";
import IntelPage from "./pages/IntelPage";
import CommsPage from "./pages/CommsPage";
import TerminalPage from "./pages/TerminalPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
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
                <AgentsPage />
              </Layout>
            } />
            
            <Route path="/missions" element={
              <Layout>
                <MissionsPage />
              </Layout>
            } />
            
            <Route path="/map" element={
              <Layout>
                <MapPage />
              </Layout>
            } />
            
            <Route path="/diagnostics" element={
              <Layout>
                <DiagnosticsPage />
              </Layout>
            } />
            
            <Route path="/intel" element={
              <Layout>
                <IntelPage />
              </Layout>
            } />
            
            <Route path="/comms" element={
              <Layout>
                <CommsPage />
              </Layout>
            } />
            
            <Route path="/terminal" element={
              <Layout>
                <TerminalPage />
              </Layout>
            } />
            
            <Route path="/reports" element={
              <Layout>
                <ReportsPage />
              </Layout>
            } />
            
            <Route path="/settings" element={
              <Layout>
                <SettingsPage />
              </Layout>
            } />

            {/* Legacy routes for compatibility */}
            <Route path="/legacy" element={<Index />} />
            
            {/* 404 catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
