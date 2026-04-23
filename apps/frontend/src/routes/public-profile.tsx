import { useParams } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { ArrowLeft, MapPin } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import {
  Avatar,
  AvatarFallback,
} from '@/components/ui/avatar'
import { AuthRequiredDialog } from '@/components/AuthRequiredDialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ContinentBarChart } from '@/components/charts/ContinentBarChart'
import { ContinentStatsCard } from '@/components/ContinentStatsCard'
import { WorldMapCard } from '@/components/charts/WorldMapCard'
import { WorldPercentChart } from '@/components/charts/WorldPercentChart'
import { useAuth } from '@/context/AuthContext'
import { usePublicProfile } from '@/hooks/usePublicProfile'
import { getCountryFlag } from '@/lib/flags'

export function PublicProfilePage() {
  const { id } = useParams({ from: '/profile/$id' })
  const { isAuthenticated, loading: authLoading } = useAuth()
  const [authModalOpen, setAuthModalOpen] = useState(false)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) setAuthModalOpen(true)
  }, [authLoading, isAuthenticated])

  const { data, isLoading } = usePublicProfile(id)

  if (authLoading) {
    return (
      <div className="px-4 py-16 text-center" style={{ color: '#7c8194' }}>
        Carregando...
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <>
        <div className="min-h-[calc(100vh-57px)] flex items-center justify-center px-4">
          <div className="max-w-md text-center">
            <h1
              className="text-3xl font-semibold mb-2"
              style={{
                fontFamily: '"Playfair Display", serif',
                color: '#f0f2f8',
              }}
            >
              Conteúdo protegido
            </h1>
            <p className="text-sm" style={{ color: '#7c8194' }}>
              Crie uma conta para ver o perfil compartilhado.
            </p>
          </div>
        </div>
        <AuthRequiredDialog
          open={authModalOpen}
          onOpenChange={setAuthModalOpen}
          title="Faça login para ver este perfil"
          description="Este link leva a um perfil de viagens no EasyTrip. Crie uma conta para descobrir países, estatísticas e recomendações."
        />
      </>
    )
  }

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div
          className="h-40 rounded-xl animate-pulse"
          style={{ background: '#16181f' }}
        />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-center">
        <p className="text-sm mb-4" style={{ color: '#7c8194' }}>
          Perfil não encontrado.
        </p>
        <Link to="/">
          <Button variant="outline">Voltar</Button>
        </Link>
      </div>
    )
  }

  const initials = data.email.slice(0, 2).toUpperCase()

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col gap-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm w-fit"
        style={{ color: '#7c8194' }}
      >
        <ArrowLeft size={14} /> Voltar
      </Link>

      <Card
        className="border-0"
        style={{
          background: '#16181f',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h1
              className="text-2xl font-semibold"
              style={{
                fontFamily: '"Playfair Display", serif',
                color: '#f0f2f8',
              }}
            >
              {data.email}
            </h1>
            <p className="text-xs" style={{ color: '#7c8194' }}>
              No EasyTrip desde{' '}
              {new Date(data.createdAt).toLocaleDateString('pt-BR')}
            </p>
            <div className="flex gap-4 mt-2 text-xs" style={{ color: '#7c8194' }}>
              <span>
                <strong style={{ color: '#f0f2f8' }}>{data.totalVisited}</strong>{' '}
                visitados
              </span>
              <span>
                <strong style={{ color: '#f0f2f8' }}>{data.totalWishlist}</strong>{' '}
                na wishlist
              </span>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
        <WorldPercentChart totalVisited={data.totalVisited} />
        <ContinentBarChart perContinent={data.perContinent} />
      </div>

      <WorldMapCard visited={data.visited} heading="Mapa de viagens" />

      <ContinentStatsCard data={data} heading="Pegada global" />

      <Card
        className="border-0"
        style={{
          background: '#16181f',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <CardHeader>
          <h2
            className="text-lg font-semibold"
            style={{
              fontFamily: '"Playfair Display", serif',
              color: '#f0f2f8',
            }}
          >
            Países visitados
          </h2>
        </CardHeader>
        <CardContent>
          {data.visited.length === 0 ? (
            <p className="text-sm" style={{ color: '#7c8194' }}>
              Ainda sem países visitados.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {data.visited.map((v) => (
                <span
                  key={v.cca2}
                  className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full"
                  style={{
                    background: '#1e2029',
                    color: '#f0f2f8',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <span>{getCountryFlag(v.countryName)}</span>
                  <span>{v.countryName}</span>
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card
        className="border-0"
        style={{
          background: '#16181f',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <CardHeader>
          <h2
            className="text-lg font-semibold flex items-center gap-2"
            style={{
              fontFamily: '"Playfair Display", serif',
              color: '#f0f2f8',
            }}
          >
            <MapPin size={16} color="#7dd3fc" /> Quero visitar
          </h2>
        </CardHeader>
        <CardContent>
          {data.wishlist.length === 0 ? (
            <p className="text-sm" style={{ color: '#7c8194' }}>
              Wishlist vazia.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {data.wishlist.map((w) => (
                <span
                  key={w.cca2}
                  className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full"
                  style={{
                    background: '#1e2029',
                    color: '#f0f2f8',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <span>{getCountryFlag(w.countryName)}</span>
                  <span>{w.countryName}</span>
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
