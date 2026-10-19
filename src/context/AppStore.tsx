import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { AppState, CreatorProfile, SavedIdea } from '../types'
import { streakFromDays, toISODate, todayKey } from '../lib/utils'
import { StoreContext, type AppStore } from './store'

const STORAGE_KEY = 'tuto-pocket-os-v1'

const defaultProfile: CreatorProfile = {
  obsession: '',
  scene: '',
  promise: '',
  offerWho: '',
  offerResult: '',
  offerFormat: '',
  incomeGoal: 500,
  avgTicket: 250,
}

const defaultState: AppState = {
  version: 1,
  completedLessons: [],
  completedShots: [],
  savedIdeas: [],
  notes: {},
  tripStart: null,
  completedMissions: [],
  activeDays: [],
  checks: {},
  profile: defaultProfile,
}

function stringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return [...new Set(value.filter((item): item is string => typeof item === 'string'))]
}

function stringRecord(value: unknown): Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  return Object.fromEntries(
    Object.entries(value).filter((entry): entry is [string, string] => typeof entry[1] === 'string'),
  )
}

function booleanRecord(value: unknown): Record<string, boolean> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  return Object.fromEntries(
    Object.entries(value).filter((entry): entry is [string, boolean] => entry[1] === true),
  )
}

function normalizeProfile(value: unknown): CreatorProfile {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return defaultProfile
  const raw = value as Record<string, unknown>
  const numeric = (input: unknown, fallback: number) =>
    typeof input === 'number' && Number.isFinite(input) && input >= 0 ? input : fallback
  const text = (input: unknown) => (typeof input === 'string' ? input : '')
  return {
    obsession: text(raw.obsession),
    scene: text(raw.scene),
    promise: text(raw.promise),
    offerWho: text(raw.offerWho),
    offerResult: text(raw.offerResult),
    offerFormat: text(raw.offerFormat),
    incomeGoal: numeric(raw.incomeGoal, defaultProfile.incomeGoal),
    avgTicket: numeric(raw.avgTicket, defaultProfile.avgTicket),
  }
}

function normalizeSavedIdeas(value: unknown): SavedIdea[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((idea): idea is Record<string, unknown> => !!idea && typeof idea === 'object')
    .filter((idea) => typeof idea.id === 'string' && typeof idea.title === 'string')
    .map((idea) => ({
      id: String(idea.id),
      title: String(idea.title),
      premise: typeof idea.premise === 'string' ? idea.premise : '',
      format: typeof idea.format === 'string' ? idea.format : '',
      source:
        idea.source === 'brief' || idea.source === 'serie' || idea.source === 'propia'
          ? idea.source
          : 'propia',
      createdAt: typeof idea.createdAt === 'string' ? idea.createdAt : new Date().toISOString(),
    }))
}

function hydrateState(value: unknown): AppState | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const raw = value as Record<string, unknown>
  return {
    version: 1,
    completedLessons: stringArray(raw.completedLessons),
    completedShots: stringArray(raw.completedShots),
    savedIdeas: normalizeSavedIdeas(raw.savedIdeas),
    notes: stringRecord(raw.notes),
    tripStart: typeof raw.tripStart === 'string' ? raw.tripStart : null,
    completedMissions: stringArray(raw.completedMissions),
    activeDays: stringArray(raw.activeDays),
    checks: booleanRecord(raw.checks),
    profile: normalizeProfile(raw.profile),
  }
}

function withToday(state: AppState): AppState {
  const today = toISODate(new Date())
  if (state.activeDays.includes(today)) return state
  return { ...state, activeDays: [...state.activeDays, today] }
}

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return withToday(defaultState)
    return withToday(hydrateState(JSON.parse(raw)) ?? defaultState)
  } catch {
    return withToday(defaultState)
  }
}

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(loadState)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // El almacenamiento puede estar lleno o bloqueado; la app sigue funcionando en memoria.
    }
  }, [state])

  const toggleInArray = useCallback((key: 'completedLessons' | 'completedShots', id: string) => {
    setState((prev) => {
      const exists = prev[key].includes(id)
      return {
        ...prev,
        [key]: exists ? prev[key].filter((item) => item !== id) : [...prev[key], id],
      }
    })
  }, [])

  const toggleLesson = useCallback((id: string) => toggleInArray('completedLessons', id), [toggleInArray])
  const toggleShot = useCallback((id: string) => toggleInArray('completedShots', id), [toggleInArray])

  const toggleMission = useCallback((key: string) => {
    setState((prev) => {
      const exists = prev.completedMissions.includes(key)
      return {
        ...prev,
        completedMissions: exists
          ? prev.completedMissions.filter((item) => item !== key)
          : [...prev.completedMissions, key],
      }
    })
  }, [])

  const toggleCheck = useCallback((id: string) => {
    setState((prev) => {
      const next = { ...prev.checks }
      if (next[id]) delete next[id]
      else next[id] = true
      return { ...prev, checks: next }
    })
  }, [])

  const setNote = useCallback((day: number, value: string) => {
    setState((prev) => {
      const notes = { ...prev.notes }
      if (value.trim()) notes[String(day)] = value
      else delete notes[String(day)]
      return { ...prev, notes }
    })
  }, [])

  const setTripStart = useCallback((value: string | null) => {
    setState((prev) => ({ ...prev, tripStart: value || null }))
  }, [])

  const saveIdea = useCallback(
    (idea: Omit<SavedIdea, 'id' | 'createdAt'>) => {
      const normalized = idea.title.trim().toLowerCase()
      if (!normalized) return false
      if (state.savedIdeas.some((saved) => saved.title.trim().toLowerCase() === normalized)) {
        return false
      }
      const saved: SavedIdea = {
        ...idea,
        id: `saved-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        createdAt: new Date().toISOString(),
      }
      setState((prev) => ({ ...prev, savedIdeas: [saved, ...prev.savedIdeas] }))
      return true
    },
    [state.savedIdeas],
  )

  const removeIdea = useCallback((id: string) => {
    setState((prev) => ({ ...prev, savedIdeas: prev.savedIdeas.filter((idea) => idea.id !== id) }))
  }, [])

  const updateProfile = useCallback((patch: Partial<CreatorProfile>) => {
    setState((prev) => ({ ...prev, profile: { ...prev.profile, ...patch } }))
  }, [])

  const exportState = useCallback(() => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `tuto-backup-${todayKey()}.json`
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    URL.revokeObjectURL(url)
  }, [state])

  const importState = useCallback((value: unknown) => {
    const hydrated = hydrateState(value)
    if (!hydrated) return false
    const today = toISODate(new Date())
    if (!hydrated.activeDays.includes(today)) hydrated.activeDays.push(today)
    setState(hydrated)
    return true
  }, [])

  const resetState = useCallback(() => {
    const today = toISODate(new Date())
    setState({ ...defaultState, activeDays: [today], profile: defaultProfile })
  }, [])

  const streak = useMemo(() => streakFromDays(state.activeDays), [state.activeDays])

  const value = useMemo<AppStore>(
    () => ({
      state,
      streak,
      toggleLesson,
      toggleShot,
      toggleMission,
      toggleCheck,
      setNote,
      setTripStart,
      saveIdea,
      removeIdea,
      updateProfile,
      exportState,
      importState,
      resetState,
    }),
    [
      state,
      streak,
      toggleLesson,
      toggleShot,
      toggleMission,
      toggleCheck,
      setNote,
      setTripStart,
      saveIdea,
      removeIdea,
      updateProfile,
      exportState,
      importState,
      resetState,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
