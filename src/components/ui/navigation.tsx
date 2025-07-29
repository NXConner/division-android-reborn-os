import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { 
  Shield, 
  Users, 
  Map, 
  Activity, 
  Terminal, 
  Settings, 
  FileText,
  Target,
  Radio,
  Database
} from "lucide-react"

const navigationVariants = cva(
  "flex items-center gap-3 px-4 py-3 rounded-sm font-mono text-sm transition-all duration-300",
  {
    variants: {
      variant: {
        default: "text-muted-foreground hover:text-foreground hover:bg-accent/50",
        active: "text-primary bg-primary/10 border border-primary/30 shadow-tactical",
        ghost: "text-muted-foreground hover:text-foreground",
      },
      size: {
        default: "px-4 py-3",
        sm: "px-3 py-2 text-xs",
        lg: "px-6 py-4 text-base",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface NavigationItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  path: string
  description?: string
  badge?: string
  disabled?: boolean
}

const navigationItems: NavigationItem[] = [
  {
    id: "overview",
    label: "TACTICAL OVERVIEW",
    icon: Shield,
    path: "/",
    description: "Main tactical interface and system status"
  },
  {
    id: "agents",
    label: "DIVISION AGENTS",
    icon: Users,
    path: "/agents",
    description: "Agent management and tracking"
  },
  {
    id: "missions",
    label: "MISSION BOARD",
    icon: Target,
    path: "/missions",
    description: "Active missions and objectives"
  },
  {
    id: "tactical-map",
    label: "TACTICAL MAP",
    icon: Map,
    path: "/map",
    description: "Real-time zone monitoring"
  },
  {
    id: "diagnostics",
    label: "SYSTEM DIAGNOSTICS",
    icon: Activity,
    path: "/diagnostics",
    description: "System health and performance"
  },
  {
    id: "intel",
    label: "INTELLIGENCE",
    icon: Database,
    path: "/intel",
    description: "Collected data and analysis"
  },
  {
    id: "comms",
    label: "COMMUNICATIONS",
    icon: Radio,
    path: "/comms",
    description: "Agent communications hub"
  },
  {
    id: "terminal",
    label: "COMMAND TERMINAL",
    icon: Terminal,
    path: "/terminal",
    description: "Direct system access"
  },
  {
    id: "reports",
    label: "MISSION REPORTS",
    icon: FileText,
    path: "/reports",
    description: "Detailed mission analytics"
  },
  {
    id: "settings",
    label: "SYSTEM CONFIG",
    icon: Settings,
    path: "/settings",
    description: "System configuration and preferences"
  }
]

export interface NavigationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof navigationVariants> {
  compact?: boolean
  showLabels?: boolean
  onNavigate?: (item: NavigationItem) => void
}

const Navigation = React.forwardRef<HTMLDivElement, NavigationProps>(
  ({ className, compact = false, showLabels = true, onNavigate, ...props }, ref) => {
    const location = useLocation()
    
    const getCurrentItem = () => {
      return navigationItems.find(item => item.path === location.pathname) || navigationItems[0]
    }

    const currentItem = getCurrentItem()

    return (
      <div
        ref={ref}
        className={cn("space-y-1", className)}
        {...props}
      >
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = item.path === location.pathname
          const variant = isActive ? "active" : "default"

          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => onNavigate?.(item)}
              className={cn(
                navigationVariants({ variant }),
                item.disabled && "opacity-50 cursor-not-allowed pointer-events-none",
                compact && "justify-center",
                "group relative"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 flex-shrink-0",
                isActive && "animate-pulse-glow"
              )} />
              
              {(!compact || showLabels) && (
                <div className="flex-1 min-w-0">
                  <div className="font-semibold tracking-wider">
                    {item.label}
                  </div>
                  {item.description && !compact && (
                    <div className="text-xs text-muted-foreground mt-0.5 opacity-80">
                      {item.description}
                    </div>
                  )}
                </div>
              )}

              {item.badge && (
                <div className="px-2 py-0.5 text-xs font-mono bg-primary text-primary-foreground rounded-sm">
                  {item.badge}
                </div>
              )}

              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full animate-pulse-glow" />
              )}

              {/* Tooltip for compact mode */}
              {compact && (
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-card border border-border rounded-sm p-2 shadow-tactical min-w-48">
                    <div className="font-semibold text-sm text-primary">{item.label}</div>
                    {item.description && (
                      <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
                    )}
                  </div>
                </div>
              )}
            </Link>
          )
        })}
      </div>
    )
  }
)
Navigation.displayName = "Navigation"

export { Navigation, navigationItems, type NavigationItem }