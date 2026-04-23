import type { StatsPerContinent } from '@easytrip/shared'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useContinentStats } from '@/hooks/useContinentStats'

const CONTINENT_LABEL_PT: Record<string, string> = {
  Africa: 'África',
  Antarctica: 'Antártida',
  Asia: 'Ásia',
  Europe: 'Europa',
  'North America': 'América do Norte',
  Oceania: 'Oceania',
  'South America': 'América do Sul',
}

interface ContinentStatsCardProps {
  data?: { totalVisited: number; perContinent: StatsPerContinent[] } | null
  heading?: string
}

export function ContinentStatsCard({ data, heading }: ContinentStatsCardProps = {}) {
  const self = useContinentStats()
  const stats = data ?? self.data

  return (
    <Card
      className="border-0"
      style={{
        background: '#16181f',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <CardHeader>
        <h2
          className="text-xl font-semibold"
          style={{ color: '#f0f2f8', fontFamily: '"Instrument Serif", serif' }}
        >
          {heading ?? 'Países visitados por continente'}
        </h2>
        <p className="text-xs" style={{ color: '#7c8194' }}>
          Total: {stats?.totalVisited ?? 0}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {!stats && self.isLoading && (
          <p style={{ color: '#7c8194' }}>Carregando...</p>
        )}
        {stats?.perContinent.map((row) => (
          <div key={row.continent} className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-xs">
              <span style={{ color: '#f0f2f8' }}>
                {CONTINENT_LABEL_PT[row.continent] ?? row.continent}
              </span>
              <span style={{ color: '#7c8194' }}>
                {row.visited}/{row.total} ({row.percent}%)
              </span>
            </div>
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ background: '#1e2029' }}
              role="progressbar"
              aria-valuenow={row.percent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${row.continent} ${row.percent}%`}
            >
              <div
                className="h-full"
                style={{
                  width: `${Math.min(100, row.percent)}%`,
                  background: 'linear-gradient(90deg, #4f8ef7, #7dd3fc)',
                }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
