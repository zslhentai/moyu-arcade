export function readRecord(game: string): number { try { const n = Number(localStorage.getItem(`moyu:v1:${game}`)); return Number.isFinite(n) && n >= 0 ? n : 0; } catch { return 0; } }
export function saveRecord(game: string, value: number): boolean { try { localStorage.setItem(`moyu:v1:${game}`, String(value)); return true; } catch { return false; } }
