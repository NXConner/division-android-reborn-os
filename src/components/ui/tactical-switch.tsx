import * as React from "react"
import { cn } from "@/lib/utils"

export interface TacticalSwitchProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'tactical' | 'danger'
  className?: string
}

const TacticalSwitch = React.forwardRef<HTMLButtonElement, TacticalSwitchProps>(
  ({ checked, onCheckedChange, label, disabled = false, size = 'md', variant = 'default', className, ...props }, ref) => {
    const sizeClasses = {
      sm: { container: "w-8 h-4", thumb: "w-3 h-3", translate: "translate-x-4" },
      md: { container: "w-10 h-5", thumb: "w-4 h-4", translate: "translate-x-5" },
      lg: { container: "w-12 h-6", thumb: "w-5 h-5", translate: "translate-x-6" },
    }

    const variantClasses = {
      default: {
        on: "bg-primary/20 border-primary",
        off: "bg-secondary border-border",
        thumb: "bg-primary shadow-glow"
      },
      tactical: {
        on: "bg-success/20 border-success",
        off: "bg-secondary border-border",
        thumb: "bg-success shadow-glow"
      },
      danger: {
        on: "bg-destructive/20 border-destructive",
        off: "bg-secondary border-border", 
        thumb: "bg-destructive shadow-glow"
      }
    }

    const { container, thumb, translate } = sizeClasses[size]
    const colors = variantClasses[variant]

    return (
      <div className={cn("flex items-center space-x-3", className)}>
        <button
          ref={ref}
          onClick={() => !disabled && onCheckedChange(!checked)}
          disabled={disabled}
          className={cn(
            "relative rounded-full border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            container,
            checked ? colors.on : colors.off,
            disabled && "opacity-50 cursor-not-allowed"
          )}
          {...props}
        >
          <div
            className={cn(
              "absolute rounded-full transition-all duration-300 top-0.5 transform",
              thumb,
              checked 
                ? `${translate} ${colors.thumb}` 
                : "translate-x-0.5 bg-muted-foreground"
            )}
          />
          
          {/* Active indicator glow */}
          {checked && !disabled && (
            <div className="absolute inset-0 rounded-full animate-pulse-glow opacity-30" />
          )}
        </button>
        
        {label && (
          <span className={cn(
            "text-sm font-mono text-foreground select-none",
            disabled && "text-muted-foreground"
          )}>
            {label}
          </span>
        )}
      </div>
    )
  }
)
TacticalSwitch.displayName = "TacticalSwitch"

export { TacticalSwitch }