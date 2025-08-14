export const ISAC_EVENTS = {
  UPDATE_SIDEBAR: "isac:updateSidebar",
} as const

export function getBooleanSetting(key: string, defaultValue: boolean): boolean {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return defaultValue
    return raw === "true"
  } catch {
    return defaultValue
  }
}

export function setBooleanSetting(key: string, value: boolean): void {
  try {
    localStorage.setItem(key, String(value))
  } catch {
    // ignore
  }
}

export function emitCustomEvent<T = unknown>(name: string, detail: T): void {
  try {
    window.dispatchEvent(new CustomEvent<T>(name, { detail }))
  } catch {
    // ignore
  }
}