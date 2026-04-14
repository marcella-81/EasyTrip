import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { InfoGrid } from '@/components/InfoGrid'
import { WeatherRow } from '@/components/WeatherRow'
import { ExchangeHighlight } from '@/components/ExchangeHighlight'
import { getCountryFlag } from '@/lib/flags'
import type { DestinationResponse } from '@/types/destination'

interface DestinationCardProps {
  data: DestinationResponse
}

export function DestinationCard({ data }: DestinationCardProps) {
  const { destino, informacoesDoPais, clima, cambio, geradoEm } = data
  const flag = getCountryFlag(destino)

  return (
    <Card
      className="animate-fade-up border-0 overflow-hidden"
      style={{ background: '#16181f', borderColor: 'rgba(255,255,255,0.07)', borderWidth: 1, borderStyle: 'solid' }}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: '#1e2029' }}
            >
              {flag}
            </div>
            <div>
              <h2
                className="text-2xl font-semibold leading-tight"
                style={{ fontFamily: '"Playfair Display", serif', color: '#f0f2f8' }}
              >
                {destino}
              </h2>
              <p className="text-xs uppercase tracking-widest mt-0.5" style={{ color: '#7c8194' }}>
                {informacoesDoPais.continente}
              </p>
            </div>
          </div>
          <Badge
            variant="secondary"
            className="text-xs mt-1 flex-shrink-0"
            style={{ background: '#1e2029', color: '#7c8194', borderColor: 'rgba(255,255,255,0.07)' }}
          >
            {informacoesDoPais.continente}
          </Badge>
        </div>
      </CardHeader>

      <Separator style={{ background: 'rgba(255,255,255,0.07)' }} />

      <CardContent className="pt-5 flex flex-col gap-4">
        <InfoGrid info={informacoesDoPais} />
        <ExchangeHighlight cambio={cambio} />
        <WeatherRow clima={clima} capital={informacoesDoPais.capital} />
        <p className="text-xs text-right" style={{ color: '#7c8194' }}>
          Atualizado em {geradoEm}
        </p>
      </CardContent>
    </Card>
  )
}
