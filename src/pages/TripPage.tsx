import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDot,
  ClipboardCheck,
  Compass,
  MapPin,
  Plane,
} from 'lucide-react'
import { tripChapters, tripDays, preflightChecklist, consentPhrases } from '../data/trip'
import { useAppStore } from '../context/store'
import {
  CheckControl,
  Kicker,
  PageIntro,
  ProgressBar,
  SectionHead,
  Tag,
} from '../components/ui'
import { getTripStatus, percent } from '../lib/utils'

const roleLabels = {
  ancla: 'ANCLA',
  detalle: 'DETALLE',
  gente: 'GENTE',
  sonido: 'SONIDO',
  transición: 'TRANSICIÓN',
} as const

export function TripPage() {
  const { state, setTripStart, toggleCheck } = useAppStore()
  const trip = getTripStatus(state.tripStart)
  const totalShots = tripDays.reduce((sum, day) => sum + day.shots.length, 0)
  const completedShots = state.completedShots.length
  const doneChecks = preflightChecklist.filter((item) => state.checks[item.id]).length
  const completedDays = tripDays.filter((day) => day.shots.every((shot) => state.completedShots.includes(shot.id))).length

  return (
    <div className="page trip-page">
      <PageIntro
        kicker={`EXPEDICIÓN 01 / CHINA / ${tripDays.length} DÍAS`}
        title={
          <>
            Una ruta. <em>No un álbum.</em>
          </>
        }
        lede={`${totalShots} planos pensados para contar un viaje, no para llenar una tarjeta. Cada día tiene una historia, una luz y una restricción.`}
      />

      <section className="trip-setup">
        <div className="trip-setup__grid">
          <div className="trip-setup__copy">
            <Kicker tone="light">TU PRIMER DÍA EN CHINA</Kicker>
            <h2>{trip.phase === 'sin-fecha' ? 'Ponle fecha al primer día.' : trip.label}</h2>
            <p>
              {trip.phase === 'sin-fecha'
                ? 'Cuando pongas tu primer día en China, la app sabrá en qué día del plan estás y qué toca grabar.'
                : trip.sublabel}
            </p>
          </div>
          <label className="date-field date-field--dark">
            <span>
              <CalendarDays size={15} aria-hidden="true" /> Primer día en China
            </span>
            <input
              type="date"
              value={state.tripStart ?? ''}
              onChange={(event) => setTripStart(event.target.value)}
            />
          </label>
        </div>

        <div className="trip-setup__progress">
          <div className="trip-setup__row">
            <span>
              <strong>{completedShots}</strong> / {totalShots} planos
            </span>
            <span>
              <strong>{completedDays}</strong> / {tripDays.length} días completos
            </span>
          </div>
          <ProgressBar value={percent(completedShots, totalShots)} tone="acid" label="Progreso de rodaje" />
        </div>

        <div className="trip-setup__route">
          <Plane size={15} aria-hidden="true" />
          <span>Cantón</span>
          <i />
          <span>Shenzhen</span>
          <i />
          <span>Yangshuo</span>
          <i />
          <span>Guilin</span>
          <i />
          <span>Shanghái</span>
          <i />
          <span>Suzhou</span>
          <i />
          <span>Hangzhou</span>
          <i />
          <span>Chongqing</span>
          <i />
          <span>Vuelta</span>
        </div>
      </section>

      <details className="preflight">
        <summary>
          <div className="preflight__head">
            <span className="preflight__icon">
              <ClipboardCheck size={19} aria-hidden="true" />
            </span>
            <div>
              <h2>Antes de volar</h2>
              <p>Logística, permisos y un flujo probado. La parte aburrida salva el viaje.</p>
            </div>
            <div className="preflight__count">
              <strong>{doneChecks}/{preflightChecklist.length}</strong>
              <ChevronDown size={18} aria-hidden="true" />
            </div>
          </div>
          <div className="preflight__bar">
            <ProgressBar value={percent(doneChecks, preflightChecklist.length)} label="Preparación del viaje" />
          </div>
        </summary>
        <div className="preflight__body">
          {preflightChecklist.map((item) => {
            const checked = !!state.checks[item.id]
            return (
              <div className={`check-row ${checked ? 'is-checked' : ''}`} key={item.id}>
                <CheckControl
                  checked={checked}
                  onToggle={() => toggleCheck(item.id)}
                  label={checked ? `Desmarcar: ${item.label}` : `Marcar: ${item.label}`}
                  size="sm"
                />
                <button type="button" className="check-row__label" onClick={() => toggleCheck(item.id)}>
                  {item.label}
                </button>
              </div>
            )
          })}

          <div className="consent-block">
            <div className="consent-block__head">
              <Compass size={17} aria-hidden="true" />
              <div>
                <h3>Grabar con respeto</h3>
                <p>Si la persona dice no, la toma no existe. Estas frases te ayudan a preguntar.</p>
              </div>
            </div>
            {consentPhrases.map((phrase) => (
              <div className="phrase-row" key={phrase.spanish}>
                <div>
                  <span>{phrase.spanish}</span>
                  <small>{phrase.pinyin}</small>
                </div>
                <strong lang="zh-Hans">{phrase.chinese}</strong>
              </div>
            ))}
          </div>
        </div>
      </details>

      <SectionHead
        index="01"
        title="Plan de rodaje"
        aside={
          <span className="section-note">
            <CircleDot size={12} aria-hidden="true" /> {completedDays}/{tripDays.length} días
          </span>
        }
      />

      <div className="chapter-list">
        {tripChapters.map((chapter) => {
          const chapterDays = tripDays.filter((day) => day.chapter === chapter.id)
          const chapterTotal = chapterDays.reduce((sum, day) => sum + day.shots.length, 0)
          const chapterDone = chapterDays.reduce(
            (sum, day) => sum + day.shots.filter((shot) => state.completedShots.includes(shot.id)).length,
            0,
          )
          return (
            <section className="chapter" key={chapter.id}>
              <div className="chapter__head">
                <span className="chapter__number">{chapter.number}</span>
                <div className="chapter__title">
                  <div>
                    <h2>{chapter.title}</h2>
                    <span>{chapter.days}</span>
                  </div>
                  <p>{chapter.description}</p>
                </div>
                <div className="chapter__progress">
                  <span>{chapterDone}/{chapterTotal}</span>
                  <ProgressBar value={percent(chapterDone, chapterTotal)} label={`Progreso de ${chapter.title}`} />
                </div>
              </div>

              <div className="day-list">
                {chapterDays.map((day) => {
                  const dayDone = day.shots.filter((shot) => state.completedShots.includes(shot.id)).length
                  const allDone = dayDone === day.shots.length
                  const isToday = trip.currentDay === day.day
                  return (
                    <Link
                      to={`/rodar/dia/${day.day}`}
                      className={`day-card ${allDone ? 'is-complete' : ''} ${isToday ? 'is-today' : ''}`}
                      key={day.day}
                    >
                      <div className="day-card__number">
                        <span>DÍA</span>
                        <strong>{String(day.day).padStart(2, '0')}</strong>
                      </div>
                      <div className="day-card__main">
                        <div className="day-card__meta">
                          <span className="day-card__city">
                            <MapPin size={12} aria-hidden="true" /> {day.city}
                          </span>
                          {isToday ? <Tag tone="orange">HOY</Tag> : null}
                          {allDone ? (
                            <span className="day-card__complete">
                              <Check size={12} aria-hidden="true" /> Completo
                            </span>
                          ) : null}
                        </div>
                        <h3>{day.title}</h3>
                        <p>{day.premise}</p>
                        <div className="day-card__footer">
                          <span>{day.shots.length} planos</span>
                          <div className="day-card__mini-progress">
                            <span style={{ width: `${percent(dayDone, day.shots.length)}%` }} />
                          </div>
                          <span>{dayDone}/{day.shots.length}</span>
                          <div className="day-card__roles">
                            {day.shots.slice(0, 3).map((shot) => (
                              <span key={shot.id} className={`role-dot role-dot--${shot.role}`} title={roleLabels[shot.role]} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <ArrowRight size={18} className="day-card__arrow" aria-hidden="true" />
                    </Link>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>

      <div className="route-note">
        <span className="route-note__stamp">RUTA REAL</span>
        <p>
          Cantón (2) → Shenzhen (4) → Yangshuo (2) → Guilin (1) → Shanghái (4) → Suzhou (1) →
          Hangzhou (1) → Chongqing (12 h) → vuelo. El día 1 ya es Cantón; el 16, la escala en Chongqing; el
          17, la llegada a casa. Si cambias fechas o trenes, conserva la lógica: apertura, inmersión, fricción,
          aire y regreso.
        </p>
      </div>
    </div>
  )
}
