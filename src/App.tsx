import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Layout } from "@/components/ui/layout";
import { Suspense, lazy, useEffect, useState } from "react";
import ErrorBoundary from "@/components/ui/error-boundary";
import RouteFallback from "@/components/ui/route-fallback";

const Index = lazy(() => import("./pages/Index"));
const IsacOS = lazy(() => import("./pages/IsacOS"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AgentsPage = lazy(() => import("./pages/AgentsPage"));
const MissionsPage = lazy(() => import("./pages/MissionsPage"));
const MapPage = lazy(() => import("./pages/MapPage"));
const DiagnosticsPage = lazy(() => import("./pages/DiagnosticsPage"));
const IntelPage = lazy(() => import("./pages/IntelPage"));
const CommsPage = lazy(() => import("./pages/CommsPage"));
const TerminalPage = lazy(() => import("./pages/TerminalPage"));
const ReportsPage = lazy(() => import("./pages/ReportsPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));

function Devtools() {
  const [DevtoolsComp, setDevtoolsComp] = useState<null | React.ComponentType>(null)
  useEffect(() => {
    if (import.meta.env.DEV) {
      import("@tanstack/react-query-devtools").then((mod) => {
        setDevtoolsComp(() => (mod as any).ReactQueryDevtools)
      }).catch(() => {})
    }
  }, [])
  return DevtoolsComp ? <DevtoolsComp initialIsOpen={false} /> : null
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ErrorBoundary>
            <Routes>
              <Route
                path="/"
                element={
                  <Layout>
                    <Suspense fallback={<RouteFallback />}>
                      <IsacOS />
                    </Suspense>
                  </Layout>
                }
              />

              <Route
                path="/agents"
                element={
                  <Layout>
                    <Suspense fallback={<RouteFallback />}>
                      <AgentsPage />
                    </Suspense>
                  </Layout>
                }
              />

              <Route
                path="/missions"
                element={
                  <Layout>
                    <Suspense fallback={<RouteFallback />}>
                      <MissionsPage />
                    </Suspense>
                  </Layout>
                }
              />

              <Route
                path="/map"
                element={
                  <Layout>
                    <Suspense fallback={<RouteFallback />}>
                      <MapPage />
                    </Suspense>
                  </Layout>
                }
              />

              <Route
                path="/diagnostics"
                element={
                  <Layout>
                    <Suspense fallback={<RouteFallback />}>
                      <DiagnosticsPage />
                    </Suspense>
                  </Layout>
                }
              />

              <Route
                path="/intel"
                element={
                  <Layout>
                    <Suspense fallback={<RouteFallback />}>
                      <IntelPage />
                    </Suspense>
                  </Layout>
                }
              />

              <Route
                path="/comms"
                element={
                  <Layout>
                    <Suspense fallback={<RouteFallback />}>
                      <CommsPage />
                    </Suspense>
                  </Layout>
                }
              />

              <Route
                path="/terminal"
                element={
                  <Layout>
                    <Suspense fallback={<RouteFallback />}>
                      <TerminalPage />
                    </Suspense>
                  </Layout>
                }
              />

              <Route
                path="/reports"
                element={
                  <Layout>
                    <Suspense fallback={<RouteFallback />}>
                      <ReportsPage />
                    </Suspense>
                  </Layout>
                }
              />

              <Route
                path="/settings"
                element={
                  <Layout>
                    <Suspense fallback={<RouteFallback />}>
                      <SettingsPage />
                    </Suspense>
                  </Layout>
                }
              />

              {/* Legacy route */}
              <Route path="/legacy" element={
                <Suspense fallback={<RouteFallback />}>
                  <Index />
                </Suspense>
              } />

              {/* 404 catch-all */}
              <Route path="*" element={
                <Suspense fallback={<RouteFallback />}>
                  <NotFound />
                </Suspense>
              } />
            </Routes>
          </ErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
    <Devtools />
  </QueryClientProvider>
);

export default App;
