import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TacticalSwitch } from '@/components/ui/tactical-switch';
import { getBooleanSetting, setBooleanSetting, emitCustomEvent, ISAC_EVENTS } from '@/lib/settings';
import { SETTINGS_KEYS } from '@/lib/constants';

export default function SettingsPage() {
  const [alerts, setAlerts] = useState(getBooleanSetting(SETTINGS_KEYS.ALERTS_ENABLED, true));
  const [autoUpdate, setAutoUpdate] = useState(getBooleanSetting(SETTINGS_KEYS.AUTO_UPDATE, true));
  const [compactSidebar, setCompactSidebar] = useState(getBooleanSetting(SETTINGS_KEYS.SIDEBAR_COMPACT, false));

  useEffect(() => {
    setBooleanSetting(SETTINGS_KEYS.ALERTS_ENABLED, alerts);
  }, [alerts]);

  useEffect(() => {
    setBooleanSetting(SETTINGS_KEYS.AUTO_UPDATE, autoUpdate);
  }, [autoUpdate]);

  useEffect(() => {
    setBooleanSetting(SETTINGS_KEYS.SIDEBAR_COMPACT, compactSidebar);
    emitCustomEvent(ISAC_EVENTS.UPDATE_SIDEBAR, compactSidebar);
  }, [compactSidebar]);

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