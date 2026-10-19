import { createContext, useContext } from 'react'
import type { AppState, CreatorProfile, SavedIdea } from '../types'

export interface AppStore {
  state: AppState
  streak: number
  toggleLesson: (id: string) => void
  toggleShot: (id: string) => void
  toggleMission: (key: string) => void
  toggleCheck: (id: string) => void
  setNote: (day: number, value: string) => void
  setTripStart: (value: string | null) => void
  saveIdea: (idea: Omit<SavedIdea, 'id' | 'createdAt'>) => boolean
  removeIdea: (id: string) => void
  updateProfile: (patch: Partial<CreatorProfile>) => void
  exportState: () => void
  importState: (value: unknown) => boolean
  resetState: () => void
}

export const StoreContext = createContext<AppStore | null>(null)

export function useAppStore(): AppStore {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useAppStore debe usarse dentro de AppStoreProvider')
  return context
}
