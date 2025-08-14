import * as React from "react"
import { Mic, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import VoiceAssistant from "@/components/ui/voice-assistant"
import IsacVoice from "@/components/ui/isac-voice"

export function VoiceLauncher() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="tactical" size="icon" aria-label="Open ISAC voice">
            <Mic className="w-4 h-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[420px] border-l border-border">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-primary" />
              ISAC VOICE CENTER
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <VoiceAssistant onCommand={(t) => console.log('Command:', t)} />
            <IsacVoice />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default VoiceLauncher