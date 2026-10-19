import { useEffect, type ReactNode } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Aperture, Download, Map, Sparkles, SunMedium, TrendingUp, WifiOff } from 'lucide-react'
import { BrandMark } from './BrandMark'
import { usePwaInstall } from '../hooks/usePwaInstall'
import { useOnline } from '../hooks/useOnline'

const navItems = [
  { to: '/', label: 'Hoy', icon: SunMedium, end: true },
  { to: '/camara', label: 'Cámara', icon: Aperture, end: false },
  { to: '/rodar', label: 'Rodar', icon: Map, end: false },
  { to: '/crear', label: 'Crear', icon: Sparkles, end: false },
  { to: '/progreso', label: 'Progreso', icon: TrendingUp, end: false },
]

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation()
  const online = useOnline()
  const { canInstall, install } = usePwaInstall()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="site-header__inner">
          <Link to="/" className="brand" aria-label="TUTO, ir a Hoy">
            <BrandMark size={30} />
            <span className="brand__name">TUTO</span>
            <span className="brand__meta">POCKET 3 / FIELD OS</span>
          </Link>
          <div className="header-actions">
            {!online ? (
              <span className="offline-pill" title="Estás sin conexión. El contenido sigue disponible.">
                <WifiOff size={13} aria-hidden="true" />
                Offline
              </span>
            ) : (
              <span className="live-dot" title="Contenido guardado en este dispositivo">
                <span aria-hidden="true" />
                Local
              </span>
            )}
            {canInstall ? (
              <button
                type="button"
                className="icon-button icon-button--small"
                onClick={() => void install()}
                aria-label="Instalar TUTO en este dispositivo"
                title="Instalar TUTO"
              >
                <Download size={17} aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </div>
      </header>

      <main className="site-main">{children}</main>

      <nav className="bottom-nav" aria-label="Navegación principal">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}
          >
            <span className="bottom-nav__icon">
              <Icon size={21} strokeWidth={2} aria-hidden="true" />
            </span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
