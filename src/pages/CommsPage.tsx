import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CommandInput } from '@/components/ui/command-input';

interface Message {
  id: number;
  text: string;
  timestamp: string;
}

export default function CommsPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const handleCommand = (cmd: string) => {
    const ts = new Date().toLocaleTimeString();
    setMessages(prev => [{ id: Date.now(), text: cmd, timestamp: ts }, ...prev]);
  };

  return (
    <div className="space-y-6">
      <Card variant="tactical">
        <CardHeader className="pb-4">
          <CardTitle>COMMUNICATIONS</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-h-64 overflow-y-auto border border-border rounded-sm p-3 bg-background-elevated/50">
            <div className="space-y-2 text-xs font-mono">
              {messages.length === 0 ? (
                <div className="text-muted-foreground">No messages yet.</div>
              ) : (
                messages.map(m => (
                  <div key={m.id} className="flex items-center justify-between">
                    <span>{m.text}</span>
                    <span className="text-muted-foreground">{m.timestamp}</span>
                  </div>
                ))
              )}
            </div>
          </div>
          <CommandInput onCommand={handleCommand} placeholder="Transmit message..." />
        </CardContent>
      </Card>
    </div>
  );
}