import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const holographicPanelVariants = cva(
  "relative backdrop-blur-md border rounded-sm transition-all duration-300",
  {
    variants: {
      variant: {
        default: "holographic-panel",
        intense: "holographic-panel animate-hologram-flicker border-primary/50",
        stable: "bg-gradient-to-br from-card/90 to-card/60 border-primary/30",
        ghost: "bg-gradient-to-br from-card/40 to-card/20 border-primary/20",
      },
      size: {
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface HolographicPanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof holographicPanelVariants> {
  scanLines?: boolean
  gridOverlay?: boolean
}

const HolographicPanel = React.forwardRef<HTMLDivElement, HolographicPanelProps>(
  ({ className, variant, size, scanLines = true, gridOverlay = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(holographicPanelVariants({ variant, size }), className)}
        {...props}
      >
        {/* Holographic scan lines */}
        {scanLines && (
          <div className="holographic-scanlines" />
        )}
        
        {/* Grid overlay */}
        {gridOverlay && (
          <div className="absolute inset-0 bg-neural-grid opacity-20 pointer-events-none" />
        )}
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-primary/40" />
        <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-primary/40" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-primary/40" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-primary/40" />
      </div>
    )
  }
)
HolographicPanel.displayName = "HolographicPanel"

export { HolographicPanel, holographicPanelVariants }