interface DetailRowProps {
  label: string
  value: string
  mono?: boolean
}

export function DetailRow({ label, value, mono = false }: DetailRowProps) {
  return (
    <div className="flex flex-col items-start gap-0.5 sm:flex-row sm:items-center sm:gap-3">
      <span className="text-xs font-medium tracking-wide text-slate-500 uppercase md:min-w-44">
        {label}
      </span>
      <span
        className={
          mono ? "font-mono text-sm text-slate-800" : "text-sm text-slate-800"
        }
      >
        {value}
      </span>
    </div>
  )
}
