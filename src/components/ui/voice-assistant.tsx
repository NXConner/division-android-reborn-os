import * as React from "react"
import { Mic, Square, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { HolographicPanel } from "@/components/ui/holographic-panel"
import { playIsacChime } from "@/lib/audio"

interface VoiceAssistantProps {
  onCommand?: (text: string) => void
  onTranscript?: (text: string) => void
}

type SpeechRecognitionType = typeof window extends any
  ? (Window & typeof globalThis & { webkitSpeechRecognition?: any })["webkitSpeechRecognition"]
  : any

export function VoiceAssistant({ onCommand, onTranscript }: VoiceAssistantProps) {
  const [listening, setListening] = React.useState(false)
  const [transcript, setTranscript] = React.useState("")
  const recognitionRef = React.useRef<any>(null)

  React.useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SR) {
      const rec: any = new SR()
      rec.lang = 'en-US'
      rec.continuous = true
      rec.interimResults = true
      rec.onresult = (event: any) => {
        let text = ""
        for (let i = event.resultIndex; i < event.results.length; i++) {
          text += event.results[i][0].transcript
        }
        setTranscript(text)
        onTranscript?.(text)
      }
      rec.onend = () => setListening(false)
      recognitionRef.current = rec
    }
  }, [onTranscript])

  const start = async () => {
    try {
      if (recognitionRef.current && !listening) {
        await playIsacChime()
        recognitionRef.current.start()
        setListening(true)
      }
    } catch {}
  }

  const stop = () => {
    try {
      if (recognitionRef.current && listening) {
        recognitionRef.current.stop()
        setListening(false)
        const finalText = transcript.trim()
        if (finalText) onCommand?.(finalText)
      }
    } catch {}
  }

  return (
    <HolographicPanel variant="stable" className="space-y-3 shd-hex-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-primary" />
          <h3 className="text-tactical text-sm font-bold tracking-wider">ISAC VOICE INTERFACE</h3>
        </div>
        <div className="flex items-center gap-2">
          {!listening ? (
            <Button variant="tactical" size="sm" onClick={start} aria-label="Start listening">
              <Mic className="w-4 h-4" />
              Listen
            </Button>
          ) : (
            <Button variant="destructive" size="sm" onClick={stop} aria-label="Stop listening">
              <Square className="w-4 h-4" />
              Stop
            </Button>
          )}
        </div>
      </div>
      <Textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        placeholder="Speak or type a command..."
        className="min-h-24"
      />
    </HolographicPanel>
  )
}

export default VoiceAssistant