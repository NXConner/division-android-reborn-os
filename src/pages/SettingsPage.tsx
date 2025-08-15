import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TacticalSwitch } from '@/components/ui/tactical-switch';
import { getBooleanSetting, setBooleanSetting, emitCustomEvent, ISAC_EVENTS, getStringSetting, setStringSetting } from '@/lib/settings';
import { SETTINGS_KEYS } from '@/lib/constants';
import { THEMES, setWallpaperVariable } from '@/lib/theme';

export default function SettingsPage() {
  const [alerts, setAlerts] = useState(getBooleanSetting(SETTINGS_KEYS.ALERTS_ENABLED, true));
  const [autoUpdate, setAutoUpdate] = useState(getBooleanSetting(SETTINGS_KEYS.AUTO_UPDATE, true));
  const [compactSidebar, setCompactSidebar] = useState(getBooleanSetting(SETTINGS_KEYS.SIDEBAR_COMPACT, false));

  const [theme, setTheme] = useState(getStringSetting(SETTINGS_KEYS.THEME, 'dark'))
  const [wallpaperEnabled, setWallpaperEnabled] = useState(getBooleanSetting(SETTINGS_KEYS.WALLPAPER_ENABLED, false))
  const [wallpaperDataUrl, setWallpaperDataUrl] = useState(getStringSetting(SETTINGS_KEYS.WALLPAPER_DATA_URL, ''))

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

  useEffect(() => {
    setStringSetting(SETTINGS_KEYS.THEME, theme)
    const root = document.documentElement
    const classes = THEMES.map(t => t.id)
    // remove all theme classes first
    root.classList.remove(...classes)
    if (theme !== 'dark') root.classList.add(theme)
  }, [theme])

  useEffect(() => {
    setBooleanSetting(SETTINGS_KEYS.WALLPAPER_ENABLED, wallpaperEnabled)
    if (!wallpaperEnabled) {
      setWallpaperVariable(null)
    } else if (wallpaperDataUrl) {
      setWallpaperVariable(wallpaperDataUrl)
    }
  }, [wallpaperEnabled])

  useEffect(() => {
    setStringSetting(SETTINGS_KEYS.WALLPAPER_DATA_URL, wallpaperDataUrl)
    if (wallpaperEnabled && wallpaperDataUrl) setWallpaperVariable(wallpaperDataUrl)
  }, [wallpaperDataUrl, wallpaperEnabled])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = String(reader.result || '')
      setWallpaperDataUrl(dataUrl)
      setWallpaperEnabled(true)
    }
    reader.readAsDataURL(file)
  }

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

      <Card variant="tactical">
        <CardHeader className="pb-4">
          <CardTitle>APPEARANCE</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="text-xs text-muted-foreground mb-2">Theme</div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {THEMES.map(t => (
                <button
                  key={t.id}
                  className={`px-3 py-2 rounded-sm border ${theme === t.id ? 'border-primary text-primary' : 'border-border text-foreground/90'} hover:border-primary/50 text-left`}
                  onClick={() => setTheme(t.id)}
                >
                  <div className="font-semibold text-sm">{t.label}</div>
                  <div className="text-xs text-muted-foreground">{t.id}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-border" />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Wallpaper</div>
                <div className="text-xs text-muted-foreground">Upload a custom background image</div>
              </div>
              <TacticalSwitch label="Enabled" checked={wallpaperEnabled} onCheckedChange={setWallpaperEnabled} />
            </div>
            <div className="flex items-center gap-3">
              <input type="file" accept="image/*" onChange={handleUpload} className="text-xs" />
              {wallpaperDataUrl && (
                <button className="px-2 py-1 text-xs rounded-sm border border-border hover:border-destructive/50" onClick={() => { setWallpaperDataUrl(''); setWallpaperEnabled(false); }}>
                  Clear
                </button>
              )}
            </div>
            {wallpaperDataUrl && (
              <div className="mt-2">
                <div className="text-xs text-muted-foreground mb-1">Preview</div>
                <img src={wallpaperDataUrl} alt="Wallpaper preview" className="max-h-40 rounded-sm border border-border" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}