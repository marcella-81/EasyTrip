import type { RecommendationItem } from '@easytrip/shared'
import { getCountryFlag } from '@/lib/flags'

interface RecommendationsStripProps {
  items: RecommendationItem[]
  onSelect: (countryName: string) => void
}

const REASON_LABEL: Record<RecommendationItem['reason'], string> = {
  border: 'fronteira',
  subregion: 'região',
}

export function RecommendationsStrip({ items, onSelect }: RecommendationsStripProps) {
  if (items.length === 0) return null
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-xs uppercase tracking-wider font-medium"
          style={{ color: '#7c8194' }}
        >
          Recomendados
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item.cca2}
            type="button"
            onClick={() => onSelect(item.countryName)}
            className="text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer inline-flex items-center gap-1.5"
            style={{
              background: '#1e2029',
              color: '#f0f2f8',
              border: '1px solid rgba(79,142,247,0.25)',
            }}
          >
            <span>{getCountryFlag(item.countryName)}</span>
            <span>{item.countryName}</span>
            <span
              className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded"
              style={{
                background: 'rgba(79,142,247,0.15)',
                color: '#7dd3fc',
              }}
            >
              {REASON_LABEL[item.reason]}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
