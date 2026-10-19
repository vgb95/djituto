import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookmarkPlus,
  Camera,
  Check,
  Clock3,
  Map,
  RefreshCw,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { useAppStore } from '../context/store'
import { dailyMissions, ideaBriefs } from '../data/creator'
import { lessons } from '../data/camera'
import { tripDays } from '../data/trip'
import {
  formatLongDate,
  getDayOfYear,
  getTripStatus,
  percent,
  todayKey,
} from '../lib/utils'
import { CheckControl, DataStat, Kicker, SectionHead, Tag } from '../components/ui'
import { InstallCard } from '../components/InstallCard'

export function HomePage() {
  const { state, streak, toggleMission, saveIdea, setTripStart } = useAppStore()
  const [ideaIndex, setIdeaIndex] = useState(() => getDayOfYear() % ideaBriefs.length)
  const [feedback, setFeedback] = useState('')
  const mission = dailyMissions[getDayOfYear() % dailyMissions.length]
  const missionKey = `${todayKey()}:${mission.id}`
  const missionDone = state.completedMissions.includes(missionKey)
  const idea = ideaBriefs[ideaIndex]
  const ideaSaved = state.savedIdeas.some(
    (saved) => saved.title.trim().toLowerCase() === idea.title.trim().toLowerCase(),
  )
  const totalShots = useMemo(() => tripDays.reduce((sum, day) => sum + day.shots.length, 0), [])
  const trip = getTripStatus(state.tripStart)
  const lessonPercent = percent(state.completedLessons.length, lessons.length)
  const shotPercent = percent(state.completedShots.length, totalShots)

  function handleSaveIdea() {
    const added = saveIdea({
      title: idea.title,
      premise: idea.premise,
      format: idea.format,
      source: 'brief',
    })
    setFeedback(added ? 'Guardada en tu cuaderno.' : 'Ya estaba en tu cuaderno.')
  }

  function nextIdea() {
    setIdeaIndex((current) => (current + 1) % ideaBriefs.length)
    setFeedback('')
  }

  return (
    <div className="page home-page">
      <header className="home-header">
        <div className="home-header__meta">
          <Kicker>{formatLongDate()}</Kicker>
          <span className="field-number">FIELD NOTE / {String(getDayOfYear()).padStart(3, '0')}</span>
        </div>
        <h1 className="home-title">
          Hoy se rueda<span>.</span>
        </h1>
        <p className="home-subtitle">
          No necesitas más equipo. Necesitas repetir hasta tener mirada.
        </p>
      </header>

      <section className="trip-hero" aria-labelledby="trip-hero-title">
        <div className="trip-hero__orbits" aria-hidden="true">
          <span />
          <span />
          <span />
          <i />
        </div>
        <div className="trip-hero__top">
          <span className="trip-hero__kicker">EXPEDICIÓN 01 / CHINA</span>
          <span className="trip-hero__code">CN–17</span>
        </div>

        <div className="trip-hero__body">
          <div className="trip-hero__number">
            {trip.phase === 'antes' && trip.daysUntil ? String(trip.daysUntil).padStart(2, '0') : null}
            {trip.phase === 'en-curso' && trip.currentDay ? String(trip.currentDay).padStart(2, '0') : null}
            {trip.phase !== 'antes' && trip.phase !== 'en-curso' ? '17' : null}
            <span>
              {trip.phase === 'antes'
                ? 'días para despegar'
                : trip.phase === 'en-curso'
                  ? 'de 17 días'
                  : trip.phase === 'terminado'
                    ? 'días de viaje'
                    : 'días de viaje'}
            </span>
          </div>
          <div className="trip-hero__copy">
            <h2 id="trip-hero-title">
              {trip.phase === 'sin-fecha' ? 'La historia empieza antes del billete.' : trip.label}
            </h2>
            <p>
              {trip.phase === 'sin-fecha'
                ? 'Ruta base de 17 días, 85 planos y una pregunta: ¿qué merece ser recordado?'
                : trip.sublabel}
            </p>
            {!trip.hasDate ? (
              <label className="hero-date">
                <span>Fecha de salida</span>
                <input
                  type="date"
                  value={state.tripStart ?? ''}
                  onChange={(event) => setTripStart(event.target.value)}
                />
              </label>
            ) : (
              <div className="trip-hero__progress">
                <span>
                  {state.completedShots.length}/{totalShots} planos
                </span>
                <div className="progress progress--acid">
                  <span style={{ width: `${shotPercent}%` }} />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="trip-hero__footer">
          <div className="route-ribbon" aria-label="Ruta base">
            <span>Pekín</span>
            <i />
            <span>Xi’an</span>
            <i />
            <span>Chengdu</span>
            <i />
            <span>Chongqing</span>
            <i />
            <span>Zhangjiajie</span>
            <i />
            <span>Shanghái</span>
          </div>
          <Link to="/rodar" className="trip-hero__link">
            Abrir plan <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className={`mission-card ${missionDone ? 'is-done' : ''}`} aria-labelledby="mission-title">
        <div className="mission-card__top">
          <span className="mission-card__label">
            <Sparkles size={14} aria-hidden="true" /> MISIÓN DE HOY
          </span>
          <span className="mission-card__time">
            <Clock3 size={13} aria-hidden="true" /> {mission.minutes} min
          </span>
        </div>
        <div className="mission-card__body">
          <h2 id="mission-title">{mission.title}</h2>
          <p>{mission.detail}</p>
          <div className="mission-card__footer">
            <div className="mission-card__check">
              <CheckControl
                checked={missionDone}
                onToggle={() => toggleMission(missionKey)}
                label={missionDone ? 'Desmarcar misión de hoy' : 'Marcar misión de hoy como hecha'}
              />
              <span>{missionDone ? 'Hecha hoy' : mission.tag}</span>
            </div>
            <Link to={mission.link} className="btn btn--dark btn--small">
              {mission.action} <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <div className="stat-strip">
        <DataStat value={streak} label={streak === 1 ? 'día seguido' : 'días seguidos'} accent />
        <DataStat value={`${lessonPercent}%`} label="dominio cámara" />
        <DataStat value={`${state.completedShots.length}/${totalShots}`} label="planos hechos" />
      </div>

      <SectionHead
        index="01"
        title="Tu ángulo de hoy"
        aside={
          <Link to="/crear?tab=ideas" className="text-link">
            Más ideas <ArrowRight size={13} aria-hidden="true" />
          </Link>
        }
      />
      <article className="idea-card">
        <div className="idea-card__meta">
          <Tag tone="orange">{idea.tag}</Tag>
          <span>ÁNGULO {String(ideaIndex + 1).padStart(2, '0')}</span>
        </div>
        <h3>{idea.title}</h3>
        <p>{idea.premise}</p>
        <p className="idea-card__format">{idea.format}</p>
        <div className="idea-card__actions">
          <button
            type="button"
            className={`btn btn--small ${ideaSaved ? 'btn--ghost' : 'btn--outline'}`}
            onClick={handleSaveIdea}
            disabled={ideaSaved}
          >
            {ideaSaved ? <Check size={14} aria-hidden="true" /> : <BookmarkPlus size={14} aria-hidden="true" />}
            {ideaSaved ? 'Guardada' : 'Guardar'}
          </button>
          <button type="button" className="btn btn--ghost btn--small" onClick={nextIdea}>
            <RefreshCw size={14} aria-hidden="true" /> Otra idea
          </button>
        </div>
        {feedback ? <p className="inline-feedback">{feedback}</p> : null}
      </article>

      <SectionHead index="02" title="Tres puertas" />
      <div className="door-grid">
        <Link to="/rodar" className="door-card">
          <span className="door-card__icon">
            <Map size={19} aria-hidden="true" />
          </span>
          <span>
            <strong>Prepara China</strong>
            <small>17 días · 85 planos</small>
          </span>
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link to="/camara?tab=salida" className="door-card">
          <span className="door-card__icon">
            <Camera size={19} aria-hidden="true" />
          </span>
          <span>
            <strong>Exportar sin perder nada</strong>
            <small>Del archivo al feed</small>
          </span>
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link to="/crear?tab=ingresos" className="door-card">
          <span className="door-card__icon">
            <TrendingUp size={19} aria-hidden="true" />
          </span>
          <span>
            <strong>Construir la segunda vía</strong>
            <small>Oferta, clientes, energía</small>
          </span>
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>

      <blockquote className="home-manifesto">
        “Tu trabajo no es producir más. Es notar lo que otros pasan por alto.”
        <cite>Regla de campo / 01</cite>
      </blockquote>

      <InstallCard compact />
    </div>
  )
}
