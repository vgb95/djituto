import type { ReactNode } from 'react'
import { Check } from 'lucide-react'

export function Kicker({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'light' }) {
  return (
    <p className={`kicker ${tone === 'light' ? 'kicker--light' : ''}`}>
      <span className="kicker__dot" aria-hidden="true" />
      {children}
    </p>
  )
}

export function PageIntro({
  kicker,
  title,
  lede,
}: {
  kicker: ReactNode
  title: ReactNode
  lede?: ReactNode
}) {
  return (
    <header className="page-intro">
      <Kicker>{kicker}</Kicker>
      <h1 className="page-title">{title}</h1>
      {lede ? <p className="lede">{lede}</p> : null}
    </header>
  )
}

export function SectionHead({
  index,
  title,
  aside,
}: {
  index?: string
  title: ReactNode
  aside?: ReactNode
}) {
  return (
    <div className="section-head">
      <div className="section-head__title">
        {index ? <span className="section-head__index">{index}</span> : null}
        <h2>{title}</h2>
      </div>
      {aside ? <div className="section-head__aside">{aside}</div> : null}
    </div>
  )
}

export function ProgressBar({
  value,
  tone = 'ink',
  label,
}: {
  value: number
  tone?: 'ink' | 'acid' | 'orange'
  label?: string
}) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div
      className={`progress progress--${tone}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      aria-label={label ?? 'Progreso'}
    >
      <span style={{ width: `${clamped}%` }} />
    </div>
  )
}

export function Ring({
  value,
  label,
  sublabel,
  size = 132,
  tone = 'acid',
}: {
  value: number
  label: string
  sublabel?: string
  size?: number
  tone?: 'acid' | 'ink'
}) {
  const clamped = Math.max(0, Math.min(100, value))
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (clamped / 100) * circumference
  return (
    <div className={`ring ring--${tone}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden="true">
        <circle cx="60" cy="60" r={radius} className="ring__track" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          className="ring__value"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 60 60)"
        />
      </svg>
      <div className="ring__label">
        <strong>{label}</strong>
        {sublabel ? <span>{sublabel}</span> : null}
      </div>
    </div>
  )
}

export interface TabOption<T extends string> {
  id: T
  label: string
}

export function SegmentedTabs<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: TabOption<T>[]
  value: T
  onChange: (value: T) => void
  label: string
}) {
  return (
    <div className="segmented" role="tablist" aria-label={label}>
      {options.map((option) => (
        <button
          type="button"
          role="tab"
          aria-selected={value === option.id}
          className={value === option.id ? 'is-active' : ''}
          key={option.id}
          onClick={() => onChange(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export function CheckControl({
  checked,
  onToggle,
  label,
  size = 'md',
}: {
  checked: boolean
  onToggle: () => void
  label: string
  size?: 'sm' | 'md'
}) {
  return (
    <button
      type="button"
      className={`check-control check-control--${size} ${checked ? 'is-checked' : ''}`}
      aria-pressed={checked}
      aria-label={label}
      onClick={onToggle}
    >
      <Check size={size === 'sm' ? 14 : 17} strokeWidth={3} aria-hidden="true" />
    </button>
  )
}

export function Tag({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'acid' | 'orange' | 'dark' | 'outline' }) {
  return <span className={`tag tag--${tone}`}>{children}</span>
}

export function EmptyState({
  icon,
  title,
  children,
}: {
  icon: ReactNode
  title: string
  children?: ReactNode
}) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">{icon}</div>
      <h3>{title}</h3>
      {children ? <div className="empty-state__body">{children}</div> : null}
    </div>
  )
}

export function DataStat({
  value,
  label,
  accent,
}: {
  value: string | number
  label: string
  accent?: boolean
}) {
  return (
    <div className={`data-stat ${accent ? 'data-stat--accent' : ''}`}>
      <span className="data-stat__value">{value}</span>
      <span className="data-stat__label">{label}</span>
    </div>
  )
}
