import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  ArrowRight,
  BatteryMedium,
  Bookmark,
  BookmarkPlus,
  Check,
  ChevronDown,
  CircleDollarSign,
  FileText,
  Lightbulb,
  RefreshCw,
  Sparkles,
  Target,
  Trash2,
  TrendingUp,
  Zap,
} from 'lucide-react'
import {
  creatorPrinciples,
  editBeats,
  energyRules,
  energyTiers,
  formatPillars,
  ideaBriefs,
  incomeMetrics,
  incomePhases,
  incomeRules,
  mobileWorkflow,
  publishChecklist,
  seriesIdeas,
  thirtyDayPlan,
} from '../data/creator'
import { useAppStore } from '../context/store'
import {
  CheckControl,
  EmptyState,
  Kicker,
  PageIntro,
  ProgressBar,
  SectionHead,
  SegmentedTabs,
  Tag,
} from '../components/ui'
import { getDayOfYear, percent } from '../lib/utils'

type CreatorTab = 'sistema' | 'ideas' | 'editar' | 'ingresos'

const tabs: { id: CreatorTab; label: string }[] = [
  { id: 'sistema', label: 'Sistema' },
  { id: 'ideas', label: 'Ideas' },
  { id: 'editar', label: 'Editar' },
  { id: 'ingresos', label: 'Ingresos' },
]

const currency = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

function SystemTab() {
  const { state, updateProfile, saveIdea } = useAppStore()
  const profile = state.profile
  const [seriesFeedback, setSeriesFeedback] = useState('')
  const statement =
    profile.obsession.trim() && profile.scene.trim() && profile.promise.trim()
      ? `Una serie sobre «${profile.obsession.trim()}», grabada en «${profile.scene.trim()}», donde cada capítulo existe para ${profile.promise.trim()}.`
      : ''

  function saveSeries() {
    if (!statement) return
    const added = saveIdea({
      title: profile.obsession.trim(),
      premise: statement,
      format: 'Serie recurrente',
      source: 'serie',
    })
    setSeriesFeedback(added ? 'Serie guardada en tu cuaderno.' : 'Ya tienes una serie guardada con ese título.')
  }

  return (
    <div className="creator-panel">
      <section className="creator-manifesto">
        <Kicker tone="light">NO ES UNA FÓRMULA / ES UN FILTRO</Kicker>
        <blockquote>
          “Si tu video se puede grabar en cualquier ciudad, probablemente no sea una historia: es un fondo de
          pantalla.”
        </blockquote>
        <p>
          No vas a encontrar aquí el gancho de moda ni la rutina de las 5 AM. Vas a encontrar un sistema para
          mirar, grabar y sostener una voz cuando la energía no acompañe.
        </p>
      </section>

      <SectionHead
        index="01"
        title="Principios de campo"
        aside={<span className="section-note">6 reglas</span>}
      />
      <div className="principle-grid">
        {creatorPrinciples.map((principle) => (
          <article className="principle" key={principle.number}>
            <span className="principle__number">{principle.number}</span>
            <h3>{principle.title}</h3>
            <p>{principle.text}</p>
          </article>
        ))}
      </div>

      <SectionHead index="02" title="Construye tu serie" />
      <div className="series-builder">
        <div className="series-builder__intro">
          <span className="series-builder__icon">
            <Target size={20} aria-hidden="true" />
          </span>
          <div>
            <h3>Una obsesión, una escena, una promesa.</h3>
            <p>
              No hace falta un nicho. Haz una lista de lo que ya te obsesiona y conviértelo en una serie que
              puedas repetir sin inventar cada día.
            </p>
          </div>
        </div>
        <div className="form-grid form-grid--three">
          <label>
            <span>01 · Tu obsesión</span>
            <input
              value={profile.obsession}
              onChange={(event) => updateProfile({ obsession: event.target.value })}
              placeholder="El detalle que no puedes dejar de mirar"
              maxLength={140}
            />
          </label>
          <label>
            <span>02 · La escena</span>
            <input
              value={profile.scene}
              onChange={(event) => updateProfile({ scene: event.target.value })}
              placeholder="Dónde ocurre siempre"
              maxLength={140}
            />
          </label>
          <label>
            <span>03 · La promesa</span>
            <input
              value={profile.promise}
              onChange={(event) => updateProfile({ promise: event.target.value })}
              placeholder="Qué entiende quien lo ve"
              maxLength={160}
            />
          </label>
        </div>
        <div className="series-output">
          <span className="label">TU SERIE EN UNA FRASE</span>
          <p>{statement || 'Rellena los tres campos. La serie aparece aquí; no hay respuestas correctas.'}</p>
          <button
            type="button"
            className="btn btn--small btn--dark"
            disabled={!statement}
            onClick={saveSeries}
          >
            <BookmarkPlus size={14} aria-hidden="true" /> Guardar mi serie
          </button>
        </div>
        {seriesFeedback ? <p className="inline-feedback">{seriesFeedback}</p> : null}
      </div>

      <SectionHead index="03" title="Tres velocidades" />
      <div className="format-grid">
        {formatPillars.map((pillar, index) => (
          <article className={`format-card format-card--${index + 1}`} key={pillar.title}>
            <span className="format-card__label">{pillar.label}</span>
            <h3>{pillar.title}</h3>
            <p>{pillar.text}</p>
            <span className="format-card__ideal">{pillar.ideal}</span>
          </article>
        ))}
      </div>

      <SectionHead index="04" title="Energía, no motivación" />
      <div className="energy-intro">
        <Zap size={20} aria-hidden="true" />
        <p>
          Tu ventaja no es tener más horas: es proteger las pocas que tienes. Diseña la semana según la energía
          disponible, no según lo que te gustaría ser capaz de hacer.
        </p>
      </div>
      <div className="energy-grid">
        {energyTiers.map((tier) => (
          <article className="energy-card" key={tier.id}>
            <span className="energy-card__letter">{tier.letter}</span>
            <div>
              <h3>{tier.title}</h3>
              <p className="energy-card__when">{tier.when}</p>
              <p>{tier.tasks}</p>
              <div className="energy-card__rule">
                <BatteryMedium size={15} aria-hidden="true" />
                <span>{tier.rule}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="rule-list">
        {energyRules.map((rule, index) => (
          <div className="rule-row" key={rule}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <p>{rule}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function IdeaMachine() {
  const { state, saveIdea, removeIdea } = useAppStore()
  const [index, setIndex] = useState(() => getDayOfYear() % ideaBriefs.length)
  const [feedback, setFeedback] = useState('')
  const idea = ideaBriefs[index]
  const saved = state.savedIdeas.some(
    (item) => item.title.trim().toLowerCase() === idea.title.trim().toLowerCase(),
  )

  function nextIdea() {
    setIndex((current) => (current + 1) % ideaBriefs.length)
    setFeedback('')
  }

  function handleSave() {
    const added = saveIdea({
      title: idea.title,
      premise: idea.premise,
      format: idea.format,
      source: 'brief',
    })
    setFeedback(added ? 'Guardada en tu cuaderno.' : 'Ya estaba guardada.')
  }

  return (
    <>
      <article className="idea-feature">
        <div className="idea-feature__top">
          <Tag tone="orange">{idea.tag}</Tag>
          <span>ÁNGULO {String(index + 1).padStart(2, '0')} / {ideaBriefs.length}</span>
        </div>
        <h2>{idea.title}</h2>
        <p className="idea-feature__premise">{idea.premise}</p>

        <div className="idea-feature__opening">
          <span className="label">PRIMER PLANO</span>
          <p>{idea.opening}</p>
        </div>

        <div className="idea-beats">
          <span className="label">TRES MOVIMIENTOS</span>
          {idea.beats.map((beat, beatIndex) => (
            <div className="idea-beat" key={beat}>
              <span>{String(beatIndex + 1).padStart(2, '0')}</span>
              <p>{beat}</p>
            </div>
          ))}
        </div>

        <div className="idea-feature__details">
          <div>
            <span className="label">POR QUÉ FUNCIONA</span>
            <p>{idea.why}</p>
          </div>
          <div>
            <span className="label">RESTRICCIÓN</span>
            <p>{idea.constraint}</p>
          </div>
        </div>

        <div className="idea-feature__footer">
          <span>{idea.format}</span>
          <div className="button-row">
            <button type="button" className="btn btn--small btn--dark" onClick={handleSave} disabled={saved}>
              {saved ? <Check size={14} /> : <BookmarkPlus size={14} />}
              {saved ? 'Guardada' : 'Guardar idea'}
            </button>
            <button type="button" className="btn btn--small btn--ghost" onClick={nextIdea}>
              <RefreshCw size={14} /> Siguiente
            </button>
          </div>
        </div>
        {feedback ? <p className="inline-feedback">{feedback}</p> : null}
      </article>

      <SectionHead
        index="01"
        title="Series que aguantan capítulos"
        aside={<span className="section-note">8 territorios</span>}
      />
      <div className="series-library">
        {seriesIdeas.map((serie, serieIndex) => (
          <details className="series-card" key={serie.id}>
            <summary>
              <span className="series-card__number">{String(serieIndex + 1).padStart(2, '0')}</span>
              <div className="series-card__summary">
                <h3>{serie.title}</h3>
                <p>{serie.logline}</p>
              </div>
              <ChevronDown size={18} aria-hidden="true" />
            </summary>
            <div className="series-card__body">
              <div className="series-card__meta">
                <Tag tone="outline">{serie.format}</Tag>
              </div>
              <p>{serie.why}</p>
              <div className="episode-list">
                <span className="label">PRIMEROS EPISODIOS</span>
                {serie.episodes.map((episode) => (
                  <div key={episode}>
                    <ArrowRight size={13} aria-hidden="true" />
                    <span>{episode}</span>
                  </div>
                ))}
              </div>
            </div>
          </details>
        ))}
      </div>

      <SectionHead
        index="02"
        title="Tu cuaderno de ideas"
        aside={<span className="section-note">{state.savedIdeas.length} guardadas</span>}
      />
      {state.savedIdeas.length === 0 ? (
        <EmptyState icon={<Bookmark size={22} />} title="Todavía no has guardado nada.">
          <p>Guarda un ángulo que te intrigue. El objetivo no es tener razón: es tener material para volver.</p>
        </EmptyState>
      ) : (
        <div className="saved-list">
          {state.savedIdeas.map((savedIdea) => (
            <article className="saved-idea" key={savedIdea.id}>
              <div className="saved-idea__top">
                <Tag tone={savedIdea.source === 'serie' ? 'acid' : 'outline'}>
                  {savedIdea.source === 'serie' ? 'SERIE' : 'ÁNGULO'}
                </Tag>
                <button
                  type="button"
                  className="icon-button icon-button--ghost"
                  onClick={() => removeIdea(savedIdea.id)}
                  aria-label={`Eliminar idea: ${savedIdea.title}`}
                >
                  <Trash2 size={15} aria-hidden="true" />
                </button>
              </div>
              <h3>{savedIdea.title}</h3>
              <p>{savedIdea.premise}</p>
              <span>{savedIdea.format}</span>
            </article>
          ))}
        </div>
      )}
    </>
  )
}

function IdeasTab() {
  return (
    <div className="creator-panel">
      <SectionHead
        index="00"
        title="Máquina de ángulos"
        aside={<span className="section-note">1 idea, no 20</span>}
      />
      <IdeaMachine />
    </div>
  )
}

function EditTab() {
  const { state, toggleCheck } = useAppStore()
  const done = publishChecklist.filter((item) => state.checks[item.id]).length

  return (
    <div className="creator-panel">
      <div className="edit-intro">
        <div>
          <Kicker>MONTAJE / 45 MINUTOS EN EL MÓVIL</Kicker>
          <h2>La historia se decide antes del primer corte.</h2>
          <p>
            Un buen montaje no es el que tiene más efectos. Es el que elimina todo lo que no sostiene la
            historia. Esta estructura te sirve para revisar, no para clonar.
          </p>
        </div>
        <span className="edit-intro__mark">06</span>
      </div>

      <SectionHead index="01" title="Anatomía de un corte" />
      <div className="beats-timeline">
        {editBeats.map((beat) => (
          <article className="beat-card" key={beat.number}>
            <span className="beat-card__number">{beat.number}</span>
            <div>
              <h3>{beat.title}</h3>
              <p>{beat.description}</p>
              <div className="beat-card__example">
                <Lightbulb size={14} aria-hidden="true" />
                <span>{beat.example}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <SectionHead index="02" title="Flujo móvil · 45 min" />
      <div className="workflow-list">
        {mobileWorkflow.map((step) => (
          <article className="workflow-step" key={step.number}>
            <div className="workflow-step__number">{step.number}</div>
            <div>
              <h3>{step.title}</h3>
              <ul>
                {step.steps.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <SectionHead index="03" title="Gestiona los clips" />
      <div className="clip-management">
        <div className="clip-management__head">
          <FileText size={18} aria-hidden="true" />
          <h3>Un archivo no es un montón de archivos.</h3>
        </div>
        <pre>
          <code>{`TUTO_CHINA_2026/
├── 00_RAW/
│   └── D01_PEKIN/
├── 01_SELECTS/
├── 02_AUDIO/
├── 03_PROJECTS/
├── 04_EXPORTS/
└── 05_ARCHIVE/`}</code>
        </pre>
        <div className="naming-row">
          <code>D03_BJ_0027_hutong_amanecer.mp4</code>
        </div>
        <ul className="bullet-list">
          <li>Día, ciudad, número de clip, lugar y momento. La carpeta te dice qué es antes de abrirla.</li>
          <li>Nunca edites desde la tarjeta. Copia, verifica dos veces y luego monta.</li>
          <li>Una carpeta de selects por día. El resto es archivo, no fracaso.</li>
        </ul>
      </div>

      <SectionHead index="04" title="Antes de publicar" aside={`${done}/${publishChecklist.length}`} />
      <div className="publish-card">
        <div className="publish-card__head">
          <div>
            <h3>La prueba del móvil</h3>
            <p>Si no pasa estas ocho preguntas, no está listo. No es perfeccionismo: es respeto por el espectador.</p>
          </div>
          <span className="publish-card__count">{percent(done, publishChecklist.length)}%</span>
        </div>
        <ProgressBar value={percent(done, publishChecklist.length)} label="Checklist de publicación" />
        {publishChecklist.map((item) => {
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
        <Link to="/camara?tab=salida" className="inline-link">
          Ver checklist de exportación <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

function IncomeTab() {
  const { state, updateProfile } = useAppStore()
  const profile = state.profile
  const offer =
    profile.offerWho.trim() && profile.offerResult.trim() && profile.offerFormat.trim()
      ? `Ayudo a ${profile.offerWho.trim()} a ${profile.offerResult.trim()} con ${profile.offerFormat.trim()}.`
      : ''
  const clients = useMemo(() => {
    if (profile.avgTicket <= 0) return 0
    return Math.ceil(profile.incomeGoal / profile.avgTicket)
  }, [profile.incomeGoal, profile.avgTicket])

  return (
    <div className="creator-panel">
      <section className="income-hero">
        <Kicker tone="light">SEGUNDA VÍA / NEGOCIO</Kicker>
        <h2>No necesitas 100.000 seguidores. Necesitas clientes.</h2>
        <p>
          La audiencia distribuye. La oferta paga. Son dos motores distintos y conviene no confundirlos. Tu
          viaje puede ser el portfolio; el negocio empieza cuando alguien paga por una transformación concreta.
        </p>
        <div className="income-hero__pillars">
          <div>
            <span>01</span>
            <strong>Prueba pública</strong>
            <p>Piezas que demuestran que sabes mirar y terminar.</p>
          </div>
          <div>
            <span>02</span>
            <strong>Oferta clara</strong>
            <p>Una promesa concreta para un cliente concreto.</p>
          </div>
          <div>
            <span>03</span>
            <strong>Repetición</strong>
            <p>Un sistema que no dependa de tu inspiración.</p>
          </div>
        </div>
      </section>

      <SectionHead index="01" title="Tu oferta en una frase" />
      <div className="offer-builder">
        <div className="form-grid">
          <label>
            <span>¿Para quién?</span>
            <input
              value={profile.offerWho}
              onChange={(event) => updateProfile({ offerWho: event.target.value })}
              placeholder="Restaurantes de barrio, hostales, guías..."
            />
          </label>
          <label>
            <span>¿Qué resultado?</span>
            <input
              value={profile.offerResult}
              onChange={(event) => updateProfile({ offerResult: event.target.value })}
              placeholder="tener 3 videos verticales al mes"
            />
          </label>
          <label>
            <span>¿En qué formato?</span>
            <input
              value={profile.offerFormat}
              onChange={(event) => updateProfile({ offerFormat: event.target.value })}
              placeholder="una serie de 3 piezas editadas y subtituladas"
            />
          </label>
        </div>
        <div className="offer-output">
          <span className="label">TU OFERTA</span>
          <p>{offer || 'La frase aparecerá aquí. Hazla concreta: quién, qué cambia y en qué formato.'}</p>
          {offer ? (
            <button
              type="button"
              className="btn btn--small"
              onClick={() => void navigator.clipboard?.writeText(offer)}
            >
              Copiar
            </button>
          ) : null}
        </div>
      </div>

      <SectionHead index="02" title="Calculadora de segunda vía" />
      <div className="income-calculator">
        <div className="income-calculator__form">
          <label>
            <span>Objetivo mensual</span>
            <div className="money-input">
              <span>€</span>
              <input
                type="number"
                min={0}
                step={50}
                inputMode="numeric"
                value={profile.incomeGoal || ''}
                onChange={(event) => updateProfile({ incomeGoal: Number(event.target.value) || 0 })}
              />
            </div>
          </label>
          <label>
            <span>Ticket medio por cliente</span>
            <div className="money-input">
              <span>€</span>
              <input
                type="number"
                min={0}
                step={50}
                inputMode="numeric"
                value={profile.avgTicket || ''}
                onChange={(event) => updateProfile({ avgTicket: Number(event.target.value) || 0 })}
              />
            </div>
          </label>
        </div>
        <div className="income-calculator__result">
          <span className="income-calculator__label">CLIENTES AL MES</span>
          <strong>{clients || '—'}</strong>
          <p>
            {clients > 0
              ? `Para llegar a ${currency.format(profile.incomeGoal)} con un ticket de ${currency.format(profile.avgTicket)}.`
              : 'Introduce un objetivo y un ticket mayor que cero.'}
          </p>
          <small>No es una promesa de ingresos. Es una forma de dimensionar la oferta y el tiempo.</small>
        </div>
      </div>

      <SectionHead index="03" title="La escalera" />
      <div className="income-phases">
        {incomePhases.map((phase) => (
          <article className="income-phase" key={phase.number}>
            <div className="income-phase__head">
              <span>{phase.number}</span>
              <div>
                <h3>{phase.phase}</h3>
                <small>{phase.horizon}</small>
              </div>
              <Tag tone="outline">{phase.goal}</Tag>
            </div>
            <ul>
              {phase.actions.map((action) => (
                <li key={action}>
                  <ArrowRight size={13} aria-hidden="true" /> {action}
                </li>
              ))}
            </ul>
            <p className="income-phase__warning">{phase.warning}</p>
          </article>
        ))}
      </div>

      <SectionHead index="04" title="Primeros 30 días" />
      <div className="thirty-plan">
        {thirtyDayPlan.map((block) => (
          <article className="thirty-block" key={block.days}>
            <span className="thirty-block__days">{block.days}</span>
            <div>
              <h3>{block.title}</h3>
              <ul>
                {block.tasks.map((task) => (
                  <li key={task}>{task}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <SectionHead index="05" title="Lo que sí importa" />
      <div className="metrics-grid">
        {incomeMetrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <TrendingUp size={16} aria-hidden="true" />
            <h3>{metric.label}</h3>
            <p>{metric.why}</p>
          </article>
        ))}
      </div>

      <div className="income-rules">
        <div className="income-rules__head">
          <CircleDollarSign size={20} aria-hidden="true" />
          <h2>Reglas para no vender tu tiempo por nada</h2>
        </div>
        {incomeRules.map((rule, index) => (
          <div className="rule-row" key={rule}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <p>{rule}</p>
          </div>
        ))}
      </div>

      <div className="income-disclaimer">
        <Sparkles size={16} aria-hidden="true" />
        <p>
          Esto no es asesoramiento financiero. Es un sistema de trabajo creativo. Los ingresos dependen de tu
          contexto, tu oferta y tu constancia; no de una promesa de algoritmo.
        </p>
      </div>
    </div>
  )
}

export function CreatePage() {
  const [params, setParams] = useSearchParams()
  const rawTab = params.get('tab')
  const tab: CreatorTab =
    rawTab === 'ideas' || rawTab === 'editar' || rawTab === 'ingresos' ? rawTab : 'sistema'

  function changeTab(next: CreatorTab) {
    if (next === 'sistema') setParams({}, { replace: true })
    else setParams({ tab: next }, { replace: true })
  }

  return (
    <div className="page create-page">
      <PageIntro
        kicker="CREADOR / SISTEMA DE CAMPO"
        title={
          <>
            Tu firma <em>antes que el algoritmo.</em>
          </>
        }
        lede="Una forma de mirar, una serie que aguante, un flujo de edición y una segunda vía que no dependa de volverte viral."
      />

      <div className="camera-tabs-wrap">
        <SegmentedTabs options={tabs} value={tab} onChange={changeTab} label="Secciones de creador" />
      </div>

      {tab === 'sistema' ? <SystemTab /> : null}
      {tab === 'ideas' ? <IdeasTab /> : null}
      {tab === 'editar' ? <EditTab /> : null}
      {tab === 'ingresos' ? <IncomeTab /> : null}
    </div>
  )
}
