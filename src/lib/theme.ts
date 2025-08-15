export type ThemeDefinition = {
  id: string
  label: string
}

export const THEMES: ThemeDefinition[] = [
  { id: "dark", label: "Dark" },
  { id: "theme-division", label: "Division Orange" },
  { id: "theme-emerald", label: "Emerald" },
  { id: "theme-ocean", label: "Ocean" },
  { id: "theme-royal", label: "Royal" },
  { id: "theme-rose", label: "Rose" },
  { id: "theme-sunrise", label: "Sunrise" },
  { id: "theme-forest", label: "Forest" },
  { id: "theme-amethyst", label: "Amethyst" },
  { id: "theme-cyberpunk", label: "Cyberpunk" },
  { id: "theme-matrix", label: "Matrix" },
  { id: "theme-steel", label: "Steel" },
  { id: "theme-desert", label: "Desert" },
  { id: "theme-aurora", label: "Aurora" },
  { id: "theme-volcanic", label: "Volcanic" },
  { id: "theme-ice", label: "Ice" },
  { id: "theme-cobalt", label: "Cobalt" },
  { id: "theme-violet", label: "Violet" },
  { id: "theme-lime", label: "Lime" },
  { id: "theme-copper", label: "Copper" },
  { id: "theme-crimson", label: "Crimson" },
]

export function setWallpaperVariable(dataUrl: string | null): void {
  const root = document.documentElement
  const value = dataUrl ? `url("${dataUrl}")` : "none"
  root.style.setProperty("--app-wallpaper", value)
}

export function loadAndApplyWallpaperFromSettings(getString: (k: string, d: string) => string, getBool: (k: string, d: boolean) => boolean, keys: { ENABLED: string, DATA: string }): void {
  try {
    const enabled = getBool(keys.ENABLED, false)
    const data = getString(keys.DATA, "")
    if (enabled && data) {
      setWallpaperVariable(data)
    } else {
      setWallpaperVariable(null)
    }
  } catch {
    setWallpaperVariable(null)
  }
}