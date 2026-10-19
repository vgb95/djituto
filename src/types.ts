export type TrackId = 'base' | 'manual' | 'color' | 'movimiento'

export interface Lesson {
  id: string
  track: TrackId
  number: string
  title: string
  short: string
  minutes: number
  why: string
  steps: string[]
  tip: string
  practice: string
}

export interface CameraTrack {
  id: TrackId
  number: string
  title: string
  subtitle: string
}

export type RecipeScene = 'día' | 'noche' | 'retrato' | 'viaje' | 'comida' | 'acción' | 'paisaje'

export interface Recipe {
  id: string
  title: string
  subtitle: string
  scene: RecipeScene
  priority: 'base' | 'pro' | 'experimento'
  settings: {
    formato: string
    shutter: string
    iso: string
    balance: string
    color: string
    enfoque: string
    audio: string
  }
  why: string
  watchOut: string
}

export interface IdeaBrief {
  id: string
  title: string
  tag: string
  premise: string
  why: string
  opening: string
  beats: string[]
  constraint: string
  format: string
}

export interface SavedIdea {
  id: string
  title: string
  premise: string
  format: string
  source: 'brief' | 'serie' | 'propia'
  createdAt: string
}

export interface SeriesIdea {
  id: string
  title: string
  logline: string
  format: string
  why: string
  episodes: string[]
}

export type ShotRole = 'ancla' | 'detalle' | 'gente' | 'sonido' | 'transición'

export interface TripShot {
  id: string
  role: ShotRole
  title: string
  window: string
  why: string
  how: string
  settings: string
}

export type TripChapter = 'apertura' | 'inmersión' | 'fricción' | 'aire' | 'regreso'

export interface TripDay {
  day: number
  city: string
  title: string
  chapter: TripChapter
  premise: string
  light: string
  constraint: string
  shots: TripShot[]
  sound: string
  edit: string
}

export interface DailyMission {
  id: string
  title: string
  detail: string
  minutes: number
  tag: string
  link: string
  action: string
}

export interface CreatorProfile {
  obsession: string
  scene: string
  promise: string
  offerWho: string
  offerResult: string
  offerFormat: string
  incomeGoal: number
  avgTicket: number
}

export interface AppState {
  version: 1
  completedLessons: string[]
  completedShots: string[]
  savedIdeas: SavedIdea[]
  notes: Record<string, string>
  tripStart: string | null
  completedMissions: string[]
  activeDays: string[]
  checks: Record<string, boolean>
  profile: CreatorProfile
}
