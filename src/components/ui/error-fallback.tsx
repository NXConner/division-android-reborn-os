import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export interface ErrorFallbackProps {
  title?: string
  message?: string
}

export function ErrorFallback({ title = "COMPONENT ERROR", message = "A rendering error occurred." }: ErrorFallbackProps) {
  return (
    <Card variant="tactical">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground font-mono">{message}</div>
      </CardContent>
    </Card>
  )
}

export default ErrorFallback