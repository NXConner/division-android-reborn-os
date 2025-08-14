import * as React from "react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/ui/navigation"
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react"
import StatusBar from "@/components/isac/StatusBar"
import ThemeToggle from "@/components/ui/theme-toggle"
import { APP_NAME, APP_VERSION, BUILD_ID, SETTINGS_KEYS } from "@/lib/constants"
import { getBooleanSetting, setBooleanSetting, ISAC_EVENTS } from "@/lib/settings"

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ children, className, ...props }, ref) => {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [sidebarCompact, setSidebarCompact] = useState(false)

    useEffect(() => {
      setSidebarCompact(getBooleanSetting(SETTINGS_KEYS.SIDEBAR_COMPACT, false))
    }, [])

    useEffect(() => {
      setBooleanSetting(SETTINGS_KEYS.SIDEBAR_COMPACT, sidebarCompact)
    }, [sidebarCompact])

    useEffect(() => {
      const handler = (e: Event) => {
        const custom = e as CustomEvent<boolean>
        setSidebarCompact(Boolean(custom.detail))
      }
      window.addEventListener(ISAC_EVENTS.UPDATE_SIDEBAR, handler as EventListener)
      return () => window.removeEventListener(ISAC_EVENTS.UPDATE_SIDEBAR, handler as EventListener)
    }, [])

    return (
      <div
        ref={ref}
        className={cn("min-h-screen bg-background text-foreground", className)}
        {...props}
      >
        {/* Status Bar */}
        <StatusBar />

        <div className="flex h-[calc(100vh-7rem)]">
          {/* Sidebar */}
          <div
            className={cn(
              "relative bg-background-elevated border-r border-border transition-all duration-300 flex flex-col",
              sidebarOpen ? (sidebarCompact ? "w-20" : "w-80") : "w-0",
              !sidebarOpen && "overflow-hidden"
            )}
          >
            {/* Sidebar Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              {!sidebarCompact && sidebarOpen && (
                <div>
                  <h2 className="text-tactical text-lg font-bold tracking-wider">
                    NAVIGATION
                  </h2>
                  <p className="text-xs text-muted-foreground font-mono">
                    TACTICAL INTERFACE
                  </p>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarCompact(!sidebarCompact)}
                  className="h-8 w-8"
                  disabled={!sidebarOpen}
                >
                  {sidebarCompact ? (
                    <ChevronRight className="h-4 w-4" />
                  ) : (
                    <ChevronLeft className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto p-4">
              <Navigation 
                compact={sidebarCompact} 
                showLabels={!sidebarCompact}
              />
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-border">
              {!sidebarCompact && (
                <div className="text-xs text-muted-foreground font-mono space-y-1">
                  <div>{APP_NAME} v{APP_VERSION}</div>
                  <div>BUILD {BUILD_ID}</div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    <span>SYSTEM ONLINE</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Bar */}
            <div className="h-16 bg-background-elevated border-b border-border flex items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="h-8 w-8"
                >
                  {sidebarOpen ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <Menu className="h-4 w-4" />
                  )}
                </Button>
                
                <div className="h-6 w-px bg-border" />
                
                <div>
                  <h1 className="text-lg font-tactical font-bold tracking-wider text-tactical">
                    TACTICAL OPERATIONS CENTER
                  </h1>
                  <p className="text-xs text-muted-foreground font-mono">
                    INTEGRATED COMMAND & CONTROL
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Quick Actions */}
                <div className="flex items-center gap-2">
                  <div className="text-xs text-muted-foreground font-mono">
                    QUICK ACCESS:
                  </div>
                  <Button variant="tactical" size="sm">
                    EMERGENCY
                  </Button>
                  <Button variant="outline" size="sm">
                    BACKUP
                  </Button>
                </div>
                <div className="h-6 w-px bg-border" />
                <ThemeToggle />
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto">
              <div className="p-6">
                {children}
              </div>
            </div>
          </div>
        </div>

        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Tactical Grid Overlay */}
          <div className="absolute inset-0 bg-tactical-grid opacity-[0.02]" />
          
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary/10" />
          <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-primary/10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-primary/10" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-primary/10" />
          
          {/* Scanning Lines */}
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-tactical-scan" />
          <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-tactical-scan" style={{ animationDelay: '1.5s' }} />
        </div>
      </div>
    )
  }
)
Layout.displayName = "Layout"

export { Layout }