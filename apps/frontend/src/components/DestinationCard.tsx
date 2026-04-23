import { Check, Heart, Plus } from 'lucide-react'
import { useMemo } from 'react'
import type { DestinationResponse } from '@easytrip/shared'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { InfoGrid } from '@/components/InfoGrid'
import { WeatherRow } from '@/components/WeatherRow'
import { ExchangeHighlight } from '@/components/ExchangeHighlight'
import { useAuth } from '@/context/AuthContext'
import { useVisited } from '@/hooks/useVisited'
import { useWishlist } from '@/hooks/useWishlist'
import { getCountryCode, getCountryFlag } from '@/lib/flags'

interface DestinationCardProps {
  data: DestinationResponse
}

export function DestinationCard({ data }: DestinationCardProps) {
  const { destino, informacoesDoPais, clima, cambio, geradoEm } = data
  const flag = getCountryFlag(destino)
  const { isAuthenticated } = useAuth()
  const wishlist = useWishlist()
  const visited = useVisited()

  const cca2 = useMemo(() => getCountryCode(destino), [destino])
  const inWishlist = cca2 ? wishlist.items.some((i) => i.cca2 === cca2) : false
  const inVisited = cca2 ? visited.items.some((i) => i.cca2 === cca2) : false

  async function toggleWishlist() {
    if (!cca2) return
    if (inWishlist) {
      await wishlist.remove(cca2)
    } else {
      await wishlist.add({
        cca2,
        countryName: destino,
        continent: informacoesDoPais.continente,
      })
    }
  }

  async function toggleVisited() {
    if (!cca2) return
    if (inVisited) {
      await visited.remove(cca2)
    } else {
      await visited.add({
        cca2,
        countryName: destino,
        continent: informacoesDoPais.continente,
      })
    }
  }

  return (
    <Card
      className="animate-fade-up border-0 overflow-hidden"
      style={{
        background: '#16181f',
        borderColor: 'rgba(255,255,255,0.07)',
        borderWidth: 1,
        borderStyle: 'solid',
      }}
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
                style={{ fontFamily: '"Instrument Serif", serif', color: '#f0f2f8' }}
              >
                {destino}
              </h2>
              <p
                className="text-xs uppercase tracking-widest mt-0.5"
                style={{ color: '#7c8194' }}
              >
                {informacoesDoPais.continente}
              </p>
            </div>
          </div>
          <Badge
            variant="secondary"
            className="text-xs mt-1 flex-shrink-0"
            style={{
              background: '#1e2029',
              color: '#7c8194',
              borderColor: 'rgba(255,255,255,0.07)',
            }}
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

        {isAuthenticated && cca2 && (
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={inWishlist ? 'secondary' : 'outline'}
              onClick={toggleWishlist}
              className="gap-1 cursor-pointer"
            >
              <Heart
                size={14}
                fill={inWishlist ? '#f87171' : 'none'}
                color={inWishlist ? '#f87171' : undefined}
              />
              {inWishlist ? 'Nos favoritos' : 'Adicionar aos favoritos'}
            </Button>
            <Button
              size="sm"
              variant={inVisited ? 'secondary' : 'outline'}
              onClick={toggleVisited}
              className="gap-1 cursor-pointer"
            >
              {inVisited ? <Check size={14} /> : <Plus size={14} />}
              {inVisited ? 'Visitado' : 'Marquei como visitado'}
            </Button>
          </div>
        )}

        <p className="text-xs text-right" style={{ color: '#7c8194' }}>
          Atualizado em {geradoEm}
        </p>
      </CardContent>
    </Card>
  )
}
