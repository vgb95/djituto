import { Link, Navigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Gauge,
  Lightbulb,
  Mic2,
  Shield,
  SlidersHorizontal,
  Sun,
} from 'lucide-react'
import { tripChapters, tripDays } from '../data/trip'
import { useAppStore } from '../context/store'
import { CheckControl, Kicker, ProgressBar } from '../components/ui'
import { percent } from '../lib/utils'

const roleLabels = {
  ancla: 'ANCLA',
  detalle: 'DETALLE',
  gente: 'GENTE',
  sonido: 'SONIDO',
  transición: 'TRANSICIÓN',
} as const

export function DayPage() {
  const { day: dayParam } = useParams()
  const dayNumber = Number(dayParam)
  const day = tripDays.find((item) => item.day === dayNumber)
  const { state, toggleShot, setNote } = useAppStore()

  if (!day) return <Navigate to="/rodar" replace />

  const shots = day.shots
  const chapter = tripChapters.find((item) => item.id === day.chapter)
  const completed = shots.filter((shot) => state.completedShots.includes(shot.id)).length
  const allDone = completed === shots.length
  const previous = tripDays.find((item) => item.day === day.day - 1)
  const next = tripDays.find((item) => item.day === day.day + 1)
  const note = state.notes[String(day.day)] ?? ''

  function toggleAll() {
    for (const shot of shots) {
      const done = state.completedShots.includes(shot.id)
      if (allDone ? done : !done) toggleShot(shot.id)
    }
  }

  return (
    <div className="page day-page">
      <Link to="/rodar" className="back-link">
        <ArrowLeft size={15} aria-hidden="true" /> Plan de rodaje
      </Link>

      <header className="day-hero">
        <div className="day-hero__main">
          <Kicker>
            DÍA {String(day.day).padStart(2, '0')} / {tripDays.length} · {chapter?.title.toUpperCase()}
          </Kicker>
          <p className="day-hero__city">{day.city}</p>
          <h1>{day.title}</h1>
          <p className="day-hero__premise">{day.premise}</p>
        </div>
        <div className="day-hero__stamp" aria-hidden="true">
          <span>DÍA</span>
          <strong>{String(day.day).padStart(2, '0')}</strong>
          <i>CHINA / {tripDays.length}</i>
        </div>
      </header>

      <div className="day-progress-row">
        <div className="day-progress-row__text">
          <span>
            <strong>{completed}</strong> de {day.shots.length} planos
          </span>
          <div className="day-progress-row__bar">
            <ProgressBar value={percent(completed, day.shots.length)} label="Planos completados del día" />
          </div>
        </div>
        <button
          type="button"
          className={`btn btn--small ${allDone ? 'btn--primary' : 'btn--outline'}`}
          onClick={toggleAll}
        >
          {allDone ? <Check size={14} /> : null}
          {allDone ? 'Día completo' : 'Marcar todo'}
        </button>
      </div>

      <div className="brief-grid">
        <article className="brief-card brief-card--light">
          <span className="brief-card__icon">
            <Sun size={18} aria-hidden="true" />
          </span>
          <div>
            <span className="label">LUZ</span>
            <p>{day.light}</p>
          </div>
        </article>
        <article className="brief-card brief-card--constraint">
          <span className="brief-card__icon">
            <Shield size={18} aria-hidden="true" />
          </span>
          <div>
            <span className="label">RESTRICCIÓN CREATIVA</span>
            <p>{day.constraint}</p>
          </div>
        </article>
      </div>

      <div className="section-mini-head">
        <span className="section-head__index">01</span>
        <h2>Los {day.shots.length} planos</h2>
        <span>Marca cada uno al grabarlo.</span>
      </div>

      <div className="shot-list">
        {day.shots.map((shot, index) => {
          const done = state.completedShots.includes(shot.id)
          return (
            <article className={`shot ${done ? 'is-done' : ''}`} key={shot.id}>
              <div className="shot__top">
                <CheckControl
                  checked={done}
                  onToggle={() => toggleShot(shot.id)}
                  label={done ? `Desmarcar plano: ${shot.title}` : `Marcar plano: ${shot.title}`}
                />
                <div className="shot__titles">
                  <div className="shot__meta">
                    <span className={`role-tag role-tag--${shot.role}`}>{roleLabels[shot.role]}</span>
                    <span className="shot__window">{shot.window}</span>
                  </div>
                  <h3>{shot.title}</h3>
                </div>
                <span className="shot__index">{String(index + 1).padStart(2, '0')}</span>
              </div>

              <div className="shot__content">
                <div className="shot__copy">
                  <span className="label">POR QUÉ</span>
                  <p>{shot.why}</p>
                </div>
                <div className="shot__copy">
                  <span className="label">CÓMO</span>
                  <p>{shot.how}</p>
                </div>
                <div className="shot__settings">
                  <SlidersHorizontal size={15} aria-hidden="true" />
                  <span>{shot.settings}</span>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <div className="day-notes-grid">
        <article className="day-note-card">
          <span className="day-note-card__icon">
            <Mic2 size={18} aria-hidden="true" />
          </span>
          <div>
            <span className="label">SONIDO DEL DÍA</span>
            <p>{day.sound}</p>
          </div>
        </article>
        <article className="day-note-card">
          <span className="day-note-card__icon">
            <Lightbulb size={18} aria-hidden="true" />
          </span>
          <div>
            <span className="label">IDEA DE MONTAJE</span>
            <p>{day.edit}</p>
          </div>
        </article>
      </div>

      <section className="field-note">
        <div className="field-note__head">
          <div>
            <Kicker>CUADERNO DE CAMPO</Kicker>
            <h2>Tu nota del día {String(day.day).padStart(2, '0')}</h2>
          </div>
          <span className="field-note__save">Se guarda en este dispositivo</span>
        </div>
        <textarea
          value={note}
          onChange={(event) => setNote(day.day, event.target.value)}
          placeholder="Qué luz había, quién te habló, qué no salió, qué quieres recordar mañana..."
          rows={6}
          aria-label={`Nota del día ${day.day}`}
        />
      </section>

      <div className="day-done-card">
        <span className="day-done-card__icon">
          <Gauge size={20} aria-hidden="true" />
        </span>
        <div>
          <h3>{allDone ? 'Día completo. Mañana hay otra historia.' : 'No hace falta grabarlo todo.'}</h3>
          <p>
            {allDone
              ? 'Marca la nota, comprueba el backup y descansa. El material ya existe.'
              : 'Si solo puedes hacer tres planos, haz el ancla, el sonido y uno de gente. Con eso hay capítulo.'}
          </p>
        </div>
        {!allDone ? (
          <button type="button" className="btn btn--small btn--acid" onClick={toggleAll}>
            Marcar todo <Check size={14} />
          </button>
        ) : null}
      </div>

      <nav className="day-nav" aria-label="Navegación entre días">
        {previous ? (
          <Link to={`/rodar/dia/${previous.day}`} className="day-nav__link">
            <ArrowLeft size={16} aria-hidden="true" />
            <span>
              <small>Anterior</small>
              <strong>Día {String(previous.day).padStart(2, '0')}</strong>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/rodar/dia/${next.day}`} className="day-nav__link day-nav__link--next">
            <span>
              <small>Siguiente</small>
              <strong>Día {String(next.day).padStart(2, '0')}</strong>
            </span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        ) : (
          <Link to="/crear?tab=editar" className="day-nav__link day-nav__link--next">
            <span>
              <small>Ahora toca</small>
              <strong>Editar</strong>
            </span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        )}
      </nav>
    </div>
  )
}
