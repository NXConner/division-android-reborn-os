import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CommandInput } from '@/components/ui/command-input';

interface OutputLine {
  id: number;
  text: string;
}

const helpText = [
  'help - Show available commands',
  'status - Show system status summary',
  'clear - Clear output',
];

export default function TerminalPage() {
  const [output, setOutput] = useState<OutputLine[]>([]);

  const append = (text: string) => setOutput(prev => [{ id: Date.now() + Math.random(), text }, ...prev]);

  const handleCommand = (cmd: string) => {
    const [command] = cmd.trim().split(/\s+/);
    switch (command.toLowerCase()) {
      case 'help':
        helpText.forEach(line => append(line));
        break;
      case 'status':
        append('ISAC OS: ONLINE');
        append('THREATS: 3');
        append('NETWORK: SECURE');
        break;
      case 'clear':
        setOutput([]);
        break;
      default:
        append(`Unknown command: ${command}. Type 'help'.`);
    }
  };

  return (
    <div className="space-y-6">
      <Card variant="tactical">
        <CardHeader className="pb-4">
          <CardTitle>COMMAND TERMINAL</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-h-64 overflow-y-auto border border-border rounded-sm p-3 bg-background-elevated/50">
            <div className="space-y-1 text-xs font-mono">
              {output.length === 0 ? (
                <div className="text-muted-foreground">Type 'help' to see commands.</div>
              ) : (
                output.map(line => (
                  <div key={line.id}>{line.text}</div>
                ))
              )}
            </div>
          </div>
          <CommandInput onCommand={handleCommand} placeholder="Enter command..." />
        </CardContent>
      </Card>
    </div>
  );
}