import * as React from "react"
import { Volume2, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HolographicPanel } from "@/components/ui/holographic-panel"

export interface IsacVoiceProps {
  text?: string
  rate?: number
  pitch?: number
}

export function IsacVoice({ text = "ISAC online. Systems nominal.", rate = 0.95, pitch = 1.2 }: IsacVoiceProps) {
  const [speaking, setSpeaking] = React.useState(false)

  const speak = React.useCallback(() => {
    try {
      const synth = window.speechSynthesis
      if (!synth) return
      // Cancel any ongoing speech
      synth.cancel()
      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = 'en-US'
      utter.rate = rate
      utter.pitch = pitch
      utter.onstart = () => setSpeaking(true)
      utter.onend = () => setSpeaking(false)
      synth.speak(utter)
    } catch {
      // ignore
    }
  }, [text, rate, pitch])

  const pause = () => {
    try { window.speechSynthesis?.pause() } catch {}
  }
  const resume = () => {
    try { window.speechSynthesis?.resume() } catch {}
  }

  return (
    <HolographicPanel variant="stable" className="space-y-3 shd-hex-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-primary" />
          <h3 className="text-tactical text-sm font-bold tracking-wider">ISAC VOICE</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="tactical" size="sm" onClick={speak} aria-label="Speak">
            <Play className="w-4 h-4" />
            Speak
          </Button>
          {speaking ? (
            <Button variant="outline" size="sm" onClick={pause} aria-label="Pause">
              <Pause className="w-4 h-4" />
              Pause
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={resume} aria-label="Resume">
              <Play className="w-4 h-4" />
              Resume
            </Button>
          )}
        </div>
      </div>
      <div className="text-xs text-muted-foreground font-mono">
        {text}
      </div>
    </HolographicPanel>
  )
}

export default IsacVoice