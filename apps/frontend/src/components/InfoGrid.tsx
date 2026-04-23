import type { CountryInfo } from '@easytrip/shared'

interface InfoGridProps {
  info: CountryInfo
}

interface InfoItemProps {
  label: string
  value: string
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs uppercase tracking-wider font-medium" style={{ color: '#7c8194' }}>
        {label}
      </span>
      <span className="text-sm font-medium" style={{ color: '#f0f2f8' }}>
        {value}
      </span>
    </div>
  )
}

export function InfoGrid({ info }: InfoGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <InfoItem label="Capital" value={info.capital} />
      <InfoItem label="Idioma" value={info.idioma} />
      <InfoItem label="Moeda" value={`${info.moeda} · ${info.codigoMoeda}`} />
      <InfoItem label="População" value={info.populacao} />
    </div>
  )
}
