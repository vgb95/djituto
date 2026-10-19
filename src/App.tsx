import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppStoreProvider } from './context/AppStore'
import { AppShell } from './components/AppShell'
import { HomePage } from './pages/HomePage'
import { CameraPage } from './pages/CameraPage'
import { TripPage } from './pages/TripPage'
import { DayPage } from './pages/DayPage'
import { CreatePage } from './pages/CreatePage'
import { ProgressPage } from './pages/ProgressPage'

export default function App() {
  return (
    <HashRouter>
      <AppStoreProvider>
        <AppShell>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/camara" element={<CameraPage />} />
            <Route path="/rodar" element={<TripPage />} />
            <Route path="/rodar/dia/:day" element={<DayPage />} />
            <Route path="/crear" element={<CreatePage />} />
            <Route path="/progreso" element={<ProgressPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppShell>
      </AppStoreProvider>
    </HashRouter>
  )
}
