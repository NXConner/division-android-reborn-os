import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { StatusIndicator } from "./status-indicator"

const liveMetricVariants = cva(
  "tactical-border rounded-sm bg-card/50 transition-all duration-300",
  {
    variants: {
      status: {
        good: "border-success/30",
        warning: "border-warning/30",
        critical: "border-destructive/30 animate-pulse",
        unknown: "border-border",
      },
      size: {
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
      }
    },
    defaultVariants: {
      status: "unknown",
      size: "md",
    },
  }
)

export interface LiveMetricProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof liveMetricVariants> {
  label: string
  value: number
  unit: string
  trend?: 'up' | 'down' | 'stable'
  previousValue?: number
  precision?: number
  threshold?: {
    good: number
    warning: number
  }
  animated?: boolean
}

const LiveMetric = React.forwardRef<HTMLDivElement, LiveMetricProps>(
  ({ 
    className, 
    status: statusProp, 
    size, 
    label, 
    value, 
    unit, 
    trend, 
    previousValue,
    precision = 1,
    threshold,
    animated = true,
    ...props 
  }, ref) => {
    // Auto-determine status based on threshold if not provided
    const autoStatus = React.useMemo(() => {
      if (statusProp) return statusProp
      if (!threshold) return 'unknown'
      
      if (value >= threshold.good) return 'good'
      if (value >= threshold.warning) return 'warning'
      return 'critical'
    }, [value, threshold, statusProp])

    // Auto-determine trend if not provided but previousValue exists
    const autoTrend = React.useMemo(() => {
      if (trend) return trend
      if (previousValue === undefined) return undefined
      
      if (value > previousValue) return 'up'
      if (value < previousValue) return 'down'
      return 'stable'
    }, [value, previousValue, trend])

    const statusColors = {
      good: 'text-success',
      warning: 'text-warning',
      critical: 'text-destructive',
      unknown: 'text-primary',
    }

    const trendIcons = {
      up: TrendingUp,
      down: TrendingDown,
      stable: Minus,
    }

    const trendColors = {
      up: 'text-success',
      down: 'text-destructive',
      stable: 'text-muted-foreground',
    }

    const TrendIcon = autoTrend ? trendIcons[autoTrend] : null

    return (
      <div
        ref={ref}
        className={cn(liveMetricVariants({ status: autoStatus, size }), className)}
        {...props}
      >
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-mono font-medium tracking-wider uppercase">
              {label}
            </span>
            <StatusIndicator status={autoStatus} size="sm" />
          </div>
          
          {/* Value */}
          <div className="flex items-baseline gap-2">
            <span 
              className={cn(
                "text-2xl font-mono font-bold tabular-nums transition-all duration-300",
                statusColors[autoStatus],
                animated && "animate-data-flow"
              )}
            >
              {value.toFixed(precision)}
            </span>
            <span className="text-sm text-muted-foreground font-mono">
              {unit}
            </span>
            
            {/* Trend indicator */}
            {TrendIcon && (
              <div className={cn("flex items-center", trendColors[autoTrend!])}>
                <TrendIcon className="w-4 h-4" />
              </div>
            )}
          </div>
          
          {/* Additional info */}
          {previousValue !== undefined && (
            <div className="text-xs text-muted-foreground font-mono">
              Previous: {previousValue.toFixed(precision)} {unit}
              {Math.abs(value - previousValue) > 0 && (
                <span className={cn("ml-2", trendColors[autoTrend!])}>
                  ({value > previousValue ? '+' : ''}{(value - previousValue).toFixed(precision)})
                </span>
              )}
            </div>
          )}
        </div>
        
        {/* Background pulse for critical status */}
        {autoStatus === 'critical' && (
          <div className="absolute inset-0 bg-destructive/5 rounded-sm animate-pulse" />
        )}
      </div>
    )
  }
)
LiveMetric.displayName = "LiveMetric"

export { LiveMetric, liveMetricVariants }