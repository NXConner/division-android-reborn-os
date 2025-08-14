import * as React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface ThemeToggleProps extends React.HTMLAttributes<HTMLButtonElement> {}

export const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ className, ...props }, ref) => {
    const { theme, setTheme } = useTheme()
    const isDark = theme === "dark"

    const toggle = () => setTheme(isDark ? "light" : "dark")

    return (
      <Button
        ref={ref}
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Toggle theme"
        title="Toggle theme"
        onClick={toggle}
        className={className}
        {...props}
      >
        {isDark ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Button>
    )
  }
)

ThemeToggle.displayName = "ThemeToggle"

export default ThemeToggle