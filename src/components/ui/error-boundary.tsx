import * as React from "react"

export interface ErrorBoundaryProps {
  fallback?: React.ReactNode
  onError?: (error: Error, info: React.ErrorInfo) => void
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.props.onError?.(error, info)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div role="alert" className="p-4 border border-destructive/40 rounded-sm bg-background-elevated">
          <div className="text-destructive font-mono text-sm">An unexpected error occurred.</div>
          <div className="text-xs text-muted-foreground mt-1 break-all">{this.state.error?.message}</div>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary