import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Aperture,
  Bookmark,
  Check,
  Download,
  Flame,
  Lock,
  Map,
  NotebookPen,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Trophy,
  Upload,
  Wifi,
} from 'lucide-react'
import { lessons } from '../data/camera'
import { tripDays } from '../data/trip'
import { useAppStore } from '../context/store'
import {
  DataStat,
  EmptyState,
  Kicker,
  PageIntro,
  ProgressBar,
  Ring,
  SectionHead,
  Tag,
} from '../components/ui'
import { InstallCard } from '../components/InstallCard'
import { percent } from '../lib/utils'

export function ProgressPage() {
  const {
    state,
    streak,
    exportState,
    importState,
    resetState,
  } = useAppStore()
  const fileInput = useRef<HTMLInputElement>(null)
  const [backupMessage, setBackupMessage] = useState('')
  const totalShots = tripDays.reduce((sum, day) => sum + day.shots.length, 0)
  const lessonPercent = percent(state.completedLessons.length, lessons.length)
  const shotPercent = percent(state.completedShots.length, totalShots)
  const completedDays = tripDays.filter((day) =>
    day.shots.every((shot) => state.completedShots.includes(shot.id)),
  ).length
  const notes = Object.entries(state.notes)
    .filter(([, value]) => value.trim())
    .sort((a, b) => Number(a[0]) - Number(b[0]))
  const dayComplete = completedDays > 0
  const setupDone = state.completedLessons.includes('setup')
  const allLessonsDone = state.completedLessons.length === lessons.length
  const allShotsDone = state.completedShots.length === totalShots

  const seriesStatement =
    state.profile.obsession.trim() && state.profile.scene.trim() && state.profile.promise.trim()
      ? `Una serie sobre «${state.profile.obsession.trim()}», grabada en «${state.profile.scene.trim()}», donde cada capítulo existe para ${state.profile.promise.trim()}.`
      : ''

  const offerStatement =
    state.profile.offerWho.trim() && state.profile.offerResult.trim() && state.profile.offerFormat.trim()
      ? `Ayudo a ${state.profile.offerWho.trim()} a ${state.profile.offerResult.trim()} con ${state.profile.offerFormat.trim()}.`
      : ''

  const achievements = [
    {
      id: 'setup',
      title: 'Setup listo',
      description: 'Tarjeta, formato y 50 Hz bajo control.',
      icon: <ShieldCheck size={19} />,
      unlocked: setupDone,
    },
    {
      id: 'first-shot',
      title: 'Primer plano',
      description: 'Ya hay material tuyo en el mundo.',
      icon: <Aperture size={19} />,
      unlocked: state.completedShots.length >= 1,
    },
    {
      id: 'ten-shots',
      title: 'Ojo de campo',
      description: 'Diez planos marcados. El siguiente ya no es el primero.',
      icon: <Map size={19} />,
      unlocked: state.completedShots.length >= 10,
    },
    {
      id: 'week',
      title: 'Semana en pie',
      description: 'Siete días seguidos abriendo el cuaderno.',
      icon: <Flame size={19} />,
      unlocked: streak >= 7,
    },
    {
      id: 'three-ideas',
      title: 'Tres ángulos',
      description: 'Tres ideas guardadas para no depender de la inspiración.',
      icon: <Bookmark size={19} />,
      unlocked: state.savedIdeas.length >= 3,
    },
    {
      id: 'manual-7',
      title: 'Manual vivo',
      description: 'Siete lecciones dominadas.',
      icon: <Check size={19} />,
      unlocked: state.completedLessons.length >= 7,
    },
    {
      id: 'day-done',
      title: 'Un día entero',
      description: 'Todos los planos de una jornada.',
      icon: <Trophy size={19} />,
      unlocked: dayComplete,
    },
    {
      id: 'notebook',
      title: 'Cuaderno abierto',
      description: 'Tres notas de campo escritas.',
      icon: <NotebookPen size={19} />,
      unlocked: notes.length >= 3,
    },
    {
      id: 'all-lessons',
      title: 'Cámara dominada',
      description: 'Las catorce lecciones, sin atajos.',
      icon: <Sparkles size={19} />,
      unlocked: allLessonsDone,
    },
    {
      id: 'all-shots',
      title: 'La ruta completa',
      description: `${totalShots} planos. Una historia que ya existe.`,
      icon: <Trophy size={19} />,
      unlocked: allShotsDone,
    },
  ]

  const unlockedCount = achievements.filter((achievement) => achievement.unlocked).length

  async function handleImport(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const text = await file.text()
      const parsed = JSON.parse(text) as unknown
      const ok = importState(parsed)
      setBackupMessage(ok ? 'Backup restaurado. Tus datos están de vuelta.' : 'Ese archivo no parece un backup de TUTO.')
    } catch {
      setBackupMessage('No he podido leer el archivo. Comprueba que sea un JSON de TUTO.')
    } finally {
      event.target.value = ''
    }
  }

  function handleReset() {
    const confirmed = window.confirm(
      '¿Reiniciar todo tu progreso? Se borrarán lecciones, planos, ideas y notas de este dispositivo. Exporta un backup antes si lo necesitas.',
    )
    if (!confirmed) return
    resetState()
    setBackupMessage('Progreso reiniciado. Hoy empieza otra vez.')
  }

  return (
    <div className="page progress-page">
      <PageIntro
        kicker="PROGRESO / TU CAMPO BASE"
        title={
          <>
            Lo que no se mira, <em>no se repite.</em>
          </>
        }
        lede="No es una competición. Es la memoria de lo que ya sabes hacer y de lo que te falta por probar."
      />

      <section className="progress-hero">
        <div className="progress-hero__rings">
          <Ring value={lessonPercent} label={`${lessonPercent}%`} sublabel="manual" />
          <Ring value={shotPercent} label={`${shotPercent}%`} sublabel="rodaje" tone="ink" />
        </div>
        <div className="progress-hero__copy">
          <Kicker>ESTADO DE CAMPO</Kicker>
          <h2>
            {allShotsDone
              ? 'Ruta completa. Ahora empieza lo difícil: elegir.'
              : completedDays > 0
                ? `${completedDays} de ${tripDays.length} días tienen todos sus planos.`
                : 'Aún no has marcado un plano. El primero es el único que cuesta.'}
          </h2>
          <p>
            {state.completedLessons.length} lecciones dominadas · {state.completedShots.length} planos ·{' '}
            {state.savedIdeas.length} ideas · {notes.length} notas.
          </p>
          <div className="progress-hero__bar">
            <ProgressBar value={shotPercent} label="Progreso de rodaje" />
          </div>
        </div>
      </section>

      <div className="stat-strip stat-strip--four">
        <DataStat value={streak} label={streak === 1 ? 'día seguido' : 'días seguidos'} accent />
        <DataStat value={state.completedLessons.length} label="lecciones" />
        <DataStat value={state.completedShots.length} label="planos" />
        <DataStat value={state.savedIdeas.length} label="ideas" />
      </div>

      <SectionHead
        index="01"
        title="Logros de campo"
        aside={<span className="section-note">{unlockedCount}/{achievements.length}</span>}
      />
      <div className="achievements-grid">
        {achievements.map((achievement) => (
          <article
            className={`achievement ${achievement.unlocked ? 'is-unlocked' : ''}`}
            key={achievement.id}
          >
            <span className="achievement__icon">
              {achievement.unlocked ? achievement.icon : <Lock size={17} aria-hidden="true" />}
            </span>
            <div>
              <h3>{achievement.title}</h3>
              <p>{achievement.description}</p>
            </div>
            {achievement.unlocked ? (
              <span className="achievement__check">
                <Check size={13} strokeWidth={3} aria-hidden="true" />
              </span>
            ) : null}
          </article>
        ))}
      </div>

      <SectionHead index="02" title="Tu cuaderno" />
      <div className="profile-cards">
        <article className="profile-card">
          <div className="profile-card__head">
            <span className="profile-card__icon">
              <Sparkles size={18} aria-hidden="true" />
            </span>
            <Tag tone="orange">SERIE</Tag>
          </div>
          <h3>{seriesStatement ? 'Tu serie guardada' : 'Todavía no hay serie.'}</h3>
          <p>
            {seriesStatement ||
              'Una serie te da una razón para volver a grabar. Defínela en tres campos y vuelve cuando tengas dudas.'}
          </p>
          <Link to="/crear" className="inline-link">
            {seriesStatement ? 'Editar mi serie' : 'Construir mi serie'}{' '}
            <Sparkles size={14} aria-hidden="true" />
          </Link>
        </article>

        <article className="profile-card">
          <div className="profile-card__head">
            <span className="profile-card__icon">
              <Trophy size={18} aria-hidden="true" />
            </span>
            <Tag tone="acid">OFERTA</Tag>
          </div>
          <h3>{offerStatement ? 'Tu oferta guardada' : 'Tu segunda vía empieza con una frase.'}</h3>
          <p>
            {offerStatement ||
              'No es una marca personal. Es una promesa de trabajo: para quién, qué resultado y en qué formato.'}
          </p>
          <Link to="/crear?tab=ingresos" className="inline-link">
            {offerStatement ? 'Editar mi oferta' : 'Definir mi oferta'}{' '}
            <ArrowRightIcon />
          </Link>
        </article>
      </div>

      <SectionHead
        index="03"
        title="Notas de campo"
        aside={<span className="section-note">{notes.length} días</span>}
      />
      {notes.length === 0 ? (
        <EmptyState icon={<NotebookPen size={22} />} title="El cuaderno está en blanco.">
          <p>
            Abre un día del plan y escribe una línea al terminar. No para publicar: para no olvidar lo que la
            cámara no captó.
          </p>
          <Link to="/rodar" className="inline-link">
            Abrir plan de rodaje <Map size={14} aria-hidden="true" />
          </Link>
        </EmptyState>
      ) : (
        <div className="notes-list">
          {notes.map(([day, note]) => {
            const tripDay = tripDays.find((item) => String(item.day) === day)
            return (
              <Link to={`/rodar/dia/${day}`} className="note-preview" key={day}>
                <span className="note-preview__day">D{String(day).padStart(2, '0')}</span>
                <div>
                  <h3>{tripDay?.title ?? `Día ${day}`}</h3>
                  <p>{note}</p>
                </div>
                <Sparkles size={15} aria-hidden="true" />
              </Link>
            )
          })}
        </div>
      )}

      <SectionHead index="04" title="Tu app, tus datos" />
      <div className="data-card">
        <div className="data-card__head">
          <span className="data-card__icon">
            <ShieldCheck size={20} aria-hidden="true" />
          </span>
          <div>
            <h3>Todo se queda en este dispositivo.</h3>
            <p>
              No hay cuentas ni servidores. Tus notas, progreso e ideas se guardan en el navegador. Si cambias de
              móvil o borras datos, necesitas un backup.
            </p>
          </div>
        </div>
        <div className="data-actions">
          <button type="button" className="btn btn--small btn--dark" onClick={exportState}>
            <Download size={14} aria-hidden="true" /> Exportar backup
          </button>
          <button type="button" className="btn btn--small" onClick={() => fileInput.current?.click()}>
            <Upload size={14} aria-hidden="true" /> Importar
          </button>
          <button type="button" className="btn btn--small btn--ghost" onClick={handleReset}>
            <RotateCcw size={14} aria-hidden="true" /> Reiniciar
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="application/json,.json"
            onChange={(event) => void handleImport(event)}
            className="visually-hidden"
            aria-label="Importar backup de TUTO"
          />
        </div>
        {backupMessage ? <p className="inline-feedback">{backupMessage}</p> : null}
      </div>

      <InstallCard compact />

      <div className="offline-note">
        <Wifi size={17} aria-hidden="true" />
        <p>
          <strong>Modo offline real.</strong> Una vez abierta e instalada, la PWA cachea el manual, el plan y tus
          datos. En China puedes consultar los ajustes sin conexión. Tus notas se guardan igual.
        </p>
      </div>
    </div>
  )
}

function ArrowRightIcon() {
  return <Sparkles size={14} aria-hidden="true" />
}
