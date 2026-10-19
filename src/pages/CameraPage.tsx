import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Copy,
  FolderTree,
  HardDrive,
  Info,
  Keyboard,
  Lightbulb,
  Smartphone,
  Sun,
  TriangleAlert,
} from 'lucide-react'
import {
  cameraTracks,
  editApps,
  exportChecklist,
  exportRoutes,
  exportSpecs,
  lessons,
  proNotes,
  recipes,
} from '../data/camera'
import type { RecipeScene } from '../types'
import { useAppStore } from '../context/store'
import {
  CheckControl,
  Kicker,
  PageIntro,
  ProgressBar,
  SectionHead,
  SegmentedTabs,
  Tag,
} from '../components/ui'
import { percent } from '../lib/utils'

type CameraTab = 'aprender' | 'ajustes' | 'salida'

const tabs: { id: CameraTab; label: string }[] = [
  { id: 'aprender', label: 'Manual' },
  { id: 'ajustes', label: 'Ajustes' },
  { id: 'salida', label: 'Exportar' },
]

const shutterValues: Record<number, string> = {
  24: '1/48',
  25: '1/50',
  30: '1/60',
  50: '1/100',
  60: '1/120',
  120: '1/240',
}

const sceneFilters: { id: 'todas' | RecipeScene; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'día', label: 'Día' },
  { id: 'noche', label: 'Noche' },
  { id: 'retrato', label: 'Retrato' },
  { id: 'viaje', label: 'Viaje' },
  { id: 'comida', label: 'Comida' },
  { id: 'acción', label: 'Acción' },
  { id: 'paisaje', label: 'Paisaje' },
]

function ShutterTool() {
  const [fps, setFps] = useState(25)
  return (
    <div className="shutter-tool">
      <div className="shutter-tool__copy">
        <Kicker>HERRAMIENTA / REGLA DE 180°</Kicker>
        <h2>El shutter no se inventa: se calcula.</h2>
        <p>
          Para un movimiento natural, dispara al doble de los fps. En China, además, prioriza 25 o 50 fps
          para no pelear con luces de 50 Hz.
        </p>
        <div className="fps-options" role="group" aria-label="Elegir fotogramas por segundo">
          {Object.keys(shutterValues).map((value) => {
            const numeric = Number(value)
            return (
              <button
                key={value}
                type="button"
                aria-pressed={fps === numeric}
                className={fps === numeric ? 'is-active' : ''}
                onClick={() => setFps(numeric)}
              >
                {value} <small>fps</small>
              </button>
            )
          })}
        </div>
      </div>
      <div className="shutter-tool__result">
        <span className="shutter-tool__label">SHUTTER IDEAL</span>
        <strong>{shutterValues[fps]}</strong>
        <span className="shutter-tool__note">
          {fps === 120 ? 'Necesita mucha luz. Si falta, baja a 50 fps.' : 'Si hay demasiada luz, añade ND. No subas el shutter.'}
        </span>
      </div>
    </div>
  )
}

function LearnTab() {
  const { state, toggleLesson } = useAppStore()
  const completed = state.completedLessons.length

  return (
    <div className="camera-panel">
      <div className="manual-status">
        <div>
          <span className="eyebrow">DOMINIO DEL MANUAL</span>
          <strong>
            {completed} de {lessons.length} lecciones
          </strong>
        </div>
        <span className="manual-status__percent">{percent(completed, lessons.length)}%</span>
      </div>
      <ProgressBar value={percent(completed, lessons.length)} label="Lecciones completadas" />

      <div className="camera-lab-note">
        <Info size={18} aria-hidden="true" />
        <p>
          No hace falta memorizar menús. Aprende los cinco gestos, tres ajustes y una forma de mirar. El resto
          se aprende grabando.
        </p>
      </div>

      {cameraTracks.map((track) => {
        const trackLessons = lessons.filter((lesson) => lesson.track === track.id)
        const trackDone = trackLessons.filter((lesson) => state.completedLessons.includes(lesson.id)).length
        return (
          <section className="lesson-group" key={track.id}>
            <div className="lesson-group__head">
              <span className="lesson-group__number">{track.number}</span>
              <div>
                <h2>{track.title}</h2>
                <p>{track.subtitle}</p>
              </div>
              <span className="lesson-group__count">
                {trackDone}/{trackLessons.length}
              </span>
            </div>

            <div className="lesson-list">
              {trackLessons.map((lesson) => {
                const done = state.completedLessons.includes(lesson.id)
                return (
                  <details className={`lesson ${done ? 'is-done' : ''}`} key={lesson.id}>
                    <summary>
                      <span className="lesson__number">{lesson.number}</span>
                      <span className="lesson__summary">
                        <span className="lesson__title">{lesson.title}</span>
                        <span className="lesson__short">{lesson.short}</span>
                      </span>
                      <span className="lesson__meta">
                        <span className="lesson__time">
                          <Clock3 size={12} aria-hidden="true" /> {lesson.minutes} min
                        </span>
                        {done ? (
                          <span className="done-mark" title="Dominado">
                            <Check size={14} strokeWidth={3} aria-hidden="true" />
                          </span>
                        ) : (
                          <ChevronDown size={18} aria-hidden="true" className="lesson__chevron" />
                        )}
                      </span>
                    </summary>
                    <div className="lesson__body">
                      <div className="lesson__why">
                        <span className="label">POR QUÉ IMPORTA</span>
                        <p>{lesson.why}</p>
                      </div>
                      <ol className="step-list">
                        {lesson.steps.map((step, index) => (
                          <li key={step}>
                            <span>{String(index + 1).padStart(2, '0')}</span>
                            <p>{step}</p>
                          </li>
                        ))}
                      </ol>
                      <div className="tip-card">
                        <Lightbulb size={17} aria-hidden="true" />
                        <p>{lesson.tip}</p>
                      </div>
                      <div className="practice-row">
                        <div>
                          <span className="label">PRÁCTICA DE CAMPO</span>
                          <p>{lesson.practice}</p>
                        </div>
                        <button
                          type="button"
                          className={`btn btn--small ${done ? 'btn--primary' : 'btn--outline'}`}
                          onClick={() => toggleLesson(lesson.id)}
                        >
                          <Check size={14} aria-hidden="true" /> {done ? 'Dominado' : 'Marcar'}
                        </button>
                      </div>
                    </div>
                  </details>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}

function SettingsTab() {
  const [scene, setScene] = useState<'todas' | RecipeScene>('todas')
  const visibleRecipes = recipes.filter((recipe) => scene === 'todas' || recipe.scene === scene)

  return (
    <div className="camera-panel">
      <ShutterTool />

      <div className="china-callout">
        <span className="china-callout__stamp">50</span>
        <div>
          <strong>China va a 50 Hz.</strong>
          <p>
            Antes de grabar, fija el anti-flicker en 50 Hz y usa 25 o 50 fps. Es el ajuste que evita bandas
            en mercados, estaciones y restaurantes.
          </p>
        </div>
      </div>

      <SectionHead
        index="01"
        title="Recetas de campo"
        aside={<span className="section-note">{visibleRecipes.length} ajustes</span>}
      />
      <div className="filter-row" role="group" aria-label="Filtrar recetas por escena">
        {sceneFilters.map((filter) => (
          <button
            type="button"
            key={filter.id}
            className={`filter-chip ${scene === filter.id ? 'is-active' : ''}`}
            aria-pressed={scene === filter.id}
            onClick={() => setScene(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="recipe-list">
        {visibleRecipes.map((recipe) => (
          <details className="recipe" key={recipe.id}>
            <summary>
              <div className="recipe__head">
                <div>
                  <div className="recipe__meta">
                    <Tag tone={recipe.priority === 'pro' ? 'orange' : recipe.priority === 'base' ? 'acid' : 'outline'}>
                      {recipe.priority === 'base' ? 'BASE' : recipe.priority === 'pro' ? 'PRO' : 'EXPERIMENTO'}
                    </Tag>
                    <span>{recipe.scene.toUpperCase()}</span>
                  </div>
                  <h3>{recipe.title}</h3>
                  <p>{recipe.subtitle}</p>
                </div>
                <ChevronDown size={19} aria-hidden="true" className="recipe__chevron" />
              </div>
            </summary>
            <div className="recipe__body">
              <div className="settings-grid">
                {Object.entries(recipe.settings).map(([key, value]) => (
                  <div className="setting-cell" key={key}>
                    <span>{key}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
              <div className="recipe__reason">
                <span className="label">POR QUÉ FUNCIONA</span>
                <p>{recipe.why}</p>
              </div>
              <div className="recipe__warning">
                <TriangleAlert size={16} aria-hidden="true" />
                <p>{recipe.watchOut}</p>
              </div>
            </div>
          </details>
        ))}
      </div>

      <SectionHead index="02" title="Vocabulario Pro" />
      <div className="pro-grid">
        {proNotes.map((note) => (
          <article className="pro-note" key={note.term}>
            <h3>{note.term}</h3>
            <p>{note.text}</p>
          </article>
        ))}
      </div>

      <div className="auto-pro-card">
        <div className="auto-pro-card__icon">
          <Keyboard size={22} aria-hidden="true" />
        </div>
        <div>
          <h3>Regla para no equivocarte</h3>
          <p>
            Escena irrepetible → Auto. Secuencia con varios planos → Pro y bloquea exposición. No mezcles los
            dos modos en un mismo bloque narrativo.
          </p>
        </div>
      </div>
    </div>
  )
}

function ExportTab() {
  const { state, toggleCheck } = useAppStore()
  const done = exportChecklist.filter((item) => state.checks[item.id]).length
  const [copied, setCopied] = useState(false)

  async function copyNaming() {
    try {
      await navigator.clipboard.writeText('D03_BJ_0027_hutong_amanecer.mp4')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="camera-panel">
      <div className="export-intro">
        <div>
          <Kicker>SALIDA / DEL SENSOR AL FEED</Kicker>
          <h2>Tu video no termina al pulsar stop.</h2>
          <p>
            Copiar, seleccionar, revelar, montar, exportar. Si falla un paso, no se nota en la cámara: se nota
            cuando ya no puedes volver.
          </p>
        </div>
        <div className="export-intro__stat">
          <strong>{done}/{exportChecklist.length}</strong>
          <span>checklist</span>
        </div>
      </div>

      <div className="export-routes">
        {exportRoutes.map((route) => (
          <article className="export-route" key={route.id}>
            <div className="export-route__top">
              <div className="export-route__icon">
                {route.id === 'telefono' ? <Smartphone size={20} /> : <HardDrive size={20} />}
              </div>
              <div>
                <h3>{route.title}</h3>
                <p>{route.bestFor}</p>
              </div>
              <Tag tone="outline">{route.time}</Tag>
            </div>
            <ol className="route-steps">
              {route.steps.map((step) => (
                <li key={step}>
                  <span className="route-steps__dot" aria-hidden="true" />
                  <p>{step}</p>
                </li>
              ))}
            </ol>
            <div className="route-warning">
              <TriangleAlert size={15} aria-hidden="true" />
              <p>{route.warning}</p>
            </div>
          </article>
        ))}
      </div>

      <SectionHead index="01" title="Checklist de salida" aside={`${done} de ${exportChecklist.length}`} />
      <div className="checklist-card">
        <div className="checklist-card__progress">
          <ProgressBar value={percent(done, exportChecklist.length)} label="Checklist de exportación" />
        </div>
        {exportChecklist.map((item) => {
          const checked = !!state.checks[item.id]
          return (
            <div className={`check-row ${checked ? 'is-checked' : ''}`} key={item.id}>
              <CheckControl
                checked={checked}
                onToggle={() => toggleCheck(item.id)}
                label={checked ? `Desmarcar: ${item.label}` : `Marcar: ${item.label}`}
                size="sm"
              />
              <button type="button" onClick={() => toggleCheck(item.id)} className="check-row__label">
                {item.label}
              </button>
            </div>
          )
        })}
      </div>

      <SectionHead index="02" title="Sistema de archivos" />
      <div className="clip-system">
        <div className="clip-system__head">
          <FolderTree size={18} aria-hidden="true" />
          <span>Nombres que se entienden sin abrir el archivo</span>
        </div>
        <pre>
          <code>{`TUTO_CHINA_2026/
├── 00_RAW/
│   ├── D01_PEKIN/
│   └── D02_PEKIN/
├── 01_SELECTS/
├── 02_AUDIO/
├── 03_PROJECTS/
├── 04_EXPORTS/
└── 05_ARCHIVE/`}</code>
        </pre>
        <div className="naming-row">
          <code>{'{DÍA}_{CIUDAD}_{NÚMERO}_{LUGAR}_{MOMENTO}.mp4'}</code>
          <button type="button" className="copy-button" onClick={() => void copyNaming()}>
            {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copiado' : 'Copiar ejemplo'}
          </button>
        </div>
        <p className="clip-system__example">D03_BJ_0027_hutong_amanecer.mp4</p>
      </div>

      <div className="export-specs">
        <div className="export-specs__head">
          <Sun size={18} aria-hidden="true" />
          <h3>Exporta para la pantalla, no para el número.</h3>
        </div>
        {exportSpecs.map((spec) => (
          <div className="spec-row" key={spec.label}>
            <span>{spec.label}</span>
            <strong>{spec.value}</strong>
          </div>
        ))}
      </div>

      <SectionHead index="03" title="Editar desde el móvil" />
      <div className="app-grid">
        {editApps.map((app) => (
          <article className="app-card" key={app.name}>
            <div className="app-card__top">
              <h3>{app.name}</h3>
              <Tag tone="outline">{app.price}</Tag>
            </div>
            <p className="app-card__best">{app.best}</p>
            <p>{app.note}</p>
          </article>
        ))}
      </div>

      <div className="dlog-warning">
        <span className="dlog-warning__icon">LOG</span>
        <div>
          <strong>D-Log M: decide antes de salir.</strong>
          <p>
            Si vas a editar y revelar, graba D-Log M 10-bit. Si vas a publicar desde el móvil con prisa, graba
            Normal. No vuelvas de China con archivos que tu flujo no puede terminar.
          </p>
        </div>
      </div>

      <a
        className="btn btn--dark export-anchor"
        href="https://www.dji.com/osmo-pocket-3/downloads"
        target="_blank"
        rel="noreferrer"
      >
        Manual oficial de DJI <ArrowRight size={15} aria-hidden="true" />
      </a>
    </div>
  )
}

export function CameraPage() {
  const [params, setParams] = useSearchParams()
  const rawTab = params.get('tab')
  const tab: CameraTab = rawTab === 'ajustes' || rawTab === 'salida' ? rawTab : 'aprender'

  function changeTab(next: CameraTab) {
    if (next === 'aprender') setParams({}, { replace: true })
    else setParams({ tab: next }, { replace: true })
  }

  return (
    <div className="page camera-page">
      <PageIntro
        kicker="MANUAL DE CAMPO / OSMO POCKET 3"
        title={
          <>
            La cámara no es el problema. <em>La falta de repeticiones.</em>
          </>
        }
        lede="Catorce lecciones cortas, recetas concretas y un flujo de salida para grabar sin pensar en menús."
      />

      <div className="camera-tabs-wrap">
        <SegmentedTabs options={tabs} value={tab} onChange={changeTab} label="Secciones de cámara" />
      </div>

      {tab === 'aprender' ? <LearnTab /> : null}
      {tab === 'ajustes' ? <SettingsTab /> : null}
      {tab === 'salida' ? <ExportTab /> : null}
    </div>
  )
}
