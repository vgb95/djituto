import { tripDays } from '../data/trip'

export function toISODate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function todayKey(): string {
  return toISODate(new Date())
}

export function parseISODate(value: string): Date {
  return new Date(`${value}T12:00:00`)
}

export function daysBetween(startISO: string, endISO: string): number {
  const start = parseISODate(startISO)
  const end = parseISODate(endISO)
  return Math.round((end.getTime() - start.getTime()) / 86_400_000)
}

export function formatLongDate(date = new Date()): string {
  const value = new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(date)
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function formatShortDate(value: string): string {
  const date = parseISODate(value)
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function getDayOfYear(date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  return Math.floor(diff / 86_400_000)
}

export function streakFromDays(activeDays: string[]): number {
  const unique = new Set(activeDays)
  let cursor = new Date()
  if (!unique.has(toISODate(cursor))) {
    cursor.setDate(cursor.getDate() - 1)
    if (!unique.has(toISODate(cursor))) return 0
  }
  let streak = 0
  while (unique.has(toISODate(cursor))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

export interface TripStatus {
  hasDate: boolean
  phase: 'sin-fecha' | 'antes' | 'en-curso' | 'terminado'
  daysUntil: number | null
  currentDay: number | null
  label: string
  sublabel: string
}

export function getTripStatus(startISO: string | null): TripStatus {
  if (!startISO) {
    return {
      hasDate: false,
      phase: 'sin-fecha',
      daysUntil: null,
      currentDay: null,
      label: 'Sin fecha todavía',
      sublabel: 'Añade tu primer día en China para activar el plan diario.',
    }
  }
  const today = todayKey()
  const diff = daysBetween(startISO, today)
  if (diff < 0) {
    const days = Math.abs(diff)
    return {
      hasDate: true,
      phase: 'antes',
      daysUntil: days,
      currentDay: null,
      label: days === 1 ? 'Falta 1 día' : `Faltan ${days} días`,
      sublabel: 'Prepara la cámara, la tarjeta y el backup. No grabes más de la cuenta.',
    }
  }
  if (diff < tripDays.length) {
    return {
      hasDate: true,
      phase: 'en-curso',
      daysUntil: 0,
      currentDay: diff + 1,
      label: `Día ${diff + 1} de ${tripDays.length}`,
      sublabel: 'Estás dentro del viaje. Graba, copia y duerme.',
    }
  }
  return {
    hasDate: true,
    phase: 'terminado',
    daysUntil: 0,
    currentDay: tripDays.length,
    label: 'Viaje completado',
    sublabel: 'Ahora empieza la segunda parte: seleccionar, editar y publicar.',
  }
}

export function percent(value: number, total: number): number {
  if (total <= 0) return 0
  return Math.round((value / total) * 100)
}

export function plural(count: number, singular: string, pluralForm: string): string {
  return `${count} ${count === 1 ? singular : pluralForm}`
}

export function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export function downloadJSON(data: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}
