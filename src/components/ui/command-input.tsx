import * as React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Terminal, ChevronRight } from "lucide-react"

export interface CommandInputProps {
  onCommand: (command: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  showHistory?: boolean
  maxHistoryLines?: number
}

const CommandInput = React.forwardRef<HTMLDivElement, CommandInputProps>(
  ({ 
    onCommand, 
    placeholder = "Enter command...", 
    className, 
    disabled = false,
    showHistory = true,
    maxHistoryLines = 10,
    ...props 
  }, ref) => {
    const [input, setInput] = useState('')
    const [history, setHistory] = useState<string[]>([])
    const [historyIndex, setHistoryIndex] = useState(-1)
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (input.trim() && !disabled) {
        const newHistory = [input, ...history].slice(0, maxHistoryLines)
        setHistory(newHistory)
        onCommand(input.trim())
        setInput('')
        setHistoryIndex(-1)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (historyIndex < history.length - 1) {
          const newIndex = historyIndex + 1
          setHistoryIndex(newIndex)
          setInput(history[newIndex])
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1
          setHistoryIndex(newIndex)
          setInput(history[newIndex])
        } else if (historyIndex === 0) {
          setHistoryIndex(-1)
          setInput('')
        }
      }
    }

    return (
      <div 
        ref={ref}
        className={cn("tactical-border bg-card/50 rounded-sm", className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center gap-2 p-3 border-b border-border">
          <Terminal className="w-4 h-4 text-primary" />
          <span className="text-xs text-tactical font-mono font-semibold tracking-wider">
            COMMAND INTERFACE
          </span>
          <div className="ml-auto">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse-glow" />
          </div>
        </div>
        
        {/* Command history */}
        {showHistory && history.length > 0 && (
          <div className="max-h-32 overflow-y-auto p-4 border-b border-border">
            <div className="space-y-1 text-xs font-mono">
              {history.slice(0, 5).map((cmd, index) => (
                <div key={index} className="flex items-center gap-2 text-muted-foreground">
                  <ChevronRight className="w-3 h-3 text-primary" />
                  <span className="opacity-80">{cmd}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Input area */}
        <div className="p-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              placeholder={placeholder}
              className={cn(
                "flex-1 terminal-input",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            />
            <div className="flex items-center gap-1">
              <div className="w-2 h-4 bg-primary animate-pulse" />
            </div>
          </form>
          
          {/* Help text */}
          <div className="mt-2 text-xs text-muted-foreground font-mono">
            Use ↑/↓ arrows for history • Press Enter to execute
          </div>
        </div>
        
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="scan-line opacity-20" style={{ animationDelay: '2s' }} />
        </div>
      </div>
    )
  }
)
CommandInput.displayName = "CommandInput"

export { CommandInput }