import * as React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getStringSetting } from "@/lib/settings"
import { SETTINGS_KEYS } from "@/lib/constants"

export interface ThemeToggleProps extends React.HTMLAttributes<HTMLButtonElement> {}

export const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ className, ...props }, ref) => {
    const { theme, setTheme } = useTheme()

    const toggle = () => {
      const saved = getStringSetting(SETTINGS_KEYS.THEME, "dark")
      if (theme === "dark") setTheme(saved === "dark" ? "light" : saved)
      else setTheme("dark")
    }

    const isDark = theme === "dark"

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