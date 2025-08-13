import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TacticalSwitch } from '@/components/ui/tactical-switch';

export default function SettingsPage() {
  const [alerts, setAlerts] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [compactSidebar, setCompactSidebar] = useState(false);

  return (
    <div className="space-y-6">
      <Card variant="tactical">
        <CardHeader className="pb-4">
          <CardTitle>SYSTEM CONFIGURATION</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <TacticalSwitch label="Enable Alerts" checked={alerts} onCheckedChange={setAlerts} />
          <TacticalSwitch label="Auto Update" checked={autoUpdate} onCheckedChange={setAutoUpdate} />
          <TacticalSwitch label="Compact Sidebar" checked={compactSidebar} onCheckedChange={setCompactSidebar} />
        </CardContent>
      </Card>
    </div>
  );
}