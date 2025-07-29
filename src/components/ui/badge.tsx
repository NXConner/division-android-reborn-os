import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs font-mono font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        success: "border-transparent bg-success text-success-foreground hover:bg-success/80",
        warning: "border-transparent bg-warning text-warning-foreground hover:bg-warning/80",
        info: "border-transparent bg-info text-info-foreground hover:bg-info/80",
        outline: "text-foreground border-border",
        tactical: "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20",
        // Agent status badges
        agent_active: "border-transparent bg-success text-success-foreground animate-pulse-glow",
        agent_rogue: "border-transparent bg-destructive text-destructive-foreground animate-status-blink",
        agent_mia: "border-transparent bg-warning text-warning-foreground",
        agent_kia: "border-transparent bg-muted text-muted-foreground",
        // System status badges
        operational: "border-transparent bg-success text-success-foreground",
        compromised: "border-transparent bg-destructive text-destructive-foreground animate-status-blink",
        unknown: "border-transparent bg-primary text-primary-foreground",
        // Priority badges
        priority_low: "border-transparent bg-muted text-muted-foreground",
        priority_medium: "border-transparent bg-warning text-warning-foreground",
        priority_high: "border-transparent bg-primary text-primary-foreground",
        priority_critical: "border-transparent bg-destructive text-destructive-foreground animate-pulse-glow",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
