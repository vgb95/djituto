import { Download, Share, Smartphone } from 'lucide-react'
import { useState } from 'react'
import { usePwaInstall } from '../hooks/usePwaInstall'

export function InstallCard({ compact = false }: { compact?: boolean }) {
  const { canInstall, isIOS, isStandalone, install } = usePwaInstall()
  const [message, setMessage] = useState('')

  if (isStandalone) {
    return (
      <div className={`install-card install-card--installed ${compact ? 'install-card--compact' : ''}`}>
        <div className="install-card__icon">
          <Smartphone size={20} aria-hidden="true" />
        </div>
        <div>
          <strong>TUTO ya vive en tu pantalla de inicio.</strong>
          <p>El plan, las recetas y tus notas funcionan sin conexión.</p>
        </div>
      </div>
    )
  }

  async function handleInstall() {
    const result = await install()
    if (result === 'dismissed') setMessage('Puedes instalarla cuando quieras desde el menú del navegador.')
    if (result === 'unavailable' && isIOS) setMessage('En iPhone: Compartir > Añadir a pantalla de inicio.')
    if (result === 'unavailable' && !isIOS) setMessage('Abre el menú del navegador y elige “Instalar aplicación”.')
  }

  return (
    <div className={`install-card ${compact ? 'install-card--compact' : ''}`}>
      <div className="install-card__icon">
        <Download size={20} aria-hidden="true" />
      </div>
      <div className="install-card__body">
        <div>
          <strong>Lleva TUTO contigo, incluso sin datos.</strong>
          <p>
            {isIOS
              ? 'En iPhone: Compartir > Añadir a pantalla de inicio.'
              : 'Instálala como app y ábrela desde la pantalla de inicio.'}
          </p>
        </div>
        {canInstall ? (
          <button type="button" className="btn btn--small btn--dark" onClick={() => void handleInstall()}>
            Instalar
          </button>
        ) : (
          <button type="button" className="btn btn--small" onClick={() => void handleInstall()}>
            <Share size={14} aria-hidden="true" /> Cómo instalar
          </button>
        )}
        {message ? <p className="install-card__message">{message}</p> : null}
      </div>
    </div>
  )
}
