import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import '@fontsource-variable/manrope'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import './styles.css'
import App from './App'

const UPDATE_CHECK_INTERVAL = 5 * 60 * 1000

registerSW({
  immediate: true,
  onRegisteredSW(_swUrl, registration) {
    if (!registration) return
    const checkForUpdates = () => {
      if (document.visibilityState !== 'visible') return
      registration.update().catch(() => {
        // Sin conexión o servidor caído: se reintenta en la próxima comprobación.
      })
    }
    document.addEventListener('visibilitychange', checkForUpdates)
    window.addEventListener('focus', checkForUpdates)
    window.setInterval(checkForUpdates, UPDATE_CHECK_INTERVAL)
  },
  onRegisterError(error) {
    console.error('No se pudo registrar el service worker', error)
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
