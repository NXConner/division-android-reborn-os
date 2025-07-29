import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statusIndicatorVariants = cva(
  "inline-flex items-center justify-center rounded-full border-2 transition-all duration-300",
  {
    variants: {
      status: {
        operational: "bg-success border-success animate-pulse-glow",
        warning: "bg-warning border-warning animate-status-blink",
        critical: "bg-destructive border-destructive animate-status-blink",
        offline: "bg-muted border-muted-foreground",
        unknown: "bg-primary border-primary animate-pulse-glow",
        secure: "bg-success border-success",
        compromised: "bg-destructive border-destructive animate-interference",
        scanning: "bg-info border-info animate-radar-sweep",
      },
      size: {
        sm: "w-2 h-2",
        md: "w-3 h-3",
        lg: "w-4 h-4",
        xl: "w-6 h-6",
      }
    },
    defaultVariants: {
      status: "unknown",
      size: "md",
    },
  }
)

export interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusIndicatorVariants> {
  label?: string
}

const StatusIndicator = React.forwardRef<HTMLDivElement, StatusIndicatorProps>(
  ({ className, status, size, label, ...props }, ref) => {
    return (
      <div className="inline-flex items-center gap-2">
        <div
          ref={ref}
          className={cn(statusIndicatorVariants({ status, size }), className)}
          {...props}
        />
        {label && (
          <span className="text-xs font-mono text-muted-foreground">
            {label}
          </span>
        )}
      </div>
    )
  }
)
StatusIndicator.displayName = "StatusIndicator"

export { StatusIndicator, statusIndicatorVariants }