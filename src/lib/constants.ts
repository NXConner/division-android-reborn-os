export const APP_NAME = "ISAC OS"
export const APP_VERSION = "2.47.1"
export const BUILD_ID = "20241215"

export const ROUTES = {
  ROOT: "/",
  AGENTS: "/agents",
  MISSIONS: "/missions",
  MAP: "/map",
  DIAGNOSTICS: "/diagnostics",
  INTEL: "/intel",
  COMMS: "/comms",
  TERMINAL: "/terminal",
  REPORTS: "/reports",
  SETTINGS: "/settings",
} as const

export const SETTINGS_KEYS = {
  SIDEBAR_COMPACT: "isac.sidebarCompact",
  ALERTS_ENABLED: "isac.alerts",
  AUTO_UPDATE: "isac.autoUpdate",
  THEME: "theme",
  WALLPAPER_ENABLED: "isac.wallpaperEnabled",
  WALLPAPER_DATA_URL: "isac.wallpaperDataUrl",
  WALLPAPER_FIT: "isac.wallpaperFit",
  WALLPAPER_POSITION: "isac.wallpaperPosition",
} as const