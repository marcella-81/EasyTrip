import { Navigate } from '@tanstack/react-router'
import { Globe2, Heart, MapPin, TrendingUp } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ContinentBarChart } from '@/components/charts/ContinentBarChart'
import { ContinentStatsCard } from '@/components/ContinentStatsCard'
import { ProfileHistoryList } from '@/components/ProfileHistoryList'
import { ShareProfileButton } from '@/components/ShareProfileButton'
import { VisitedSection } from '@/components/VisitedSection'
import { WishlistSection } from '@/components/WishlistSection'
import { WorldMapCard } from '@/components/charts/WorldMapCard'
import { WorldPercentChart } from '@/components/charts/WorldPercentChart'
import { useAuth } from '@/context/AuthContext'
import { useContinentStats } from '@/hooks/useContinentStats'
import { useVisited } from '@/hooks/useVisited'
import { useWishlist } from '@/hooks/useWishlist'

export function ProfilePage() {
  const { isAuthenticated, loading, user } = useAuth()
  const stats = useContinentStats()
  const visited = useVisited()
  const wishlist = useWishlist()

  if (loading) {
    return (
      <div className="px-4 py-16 text-center" style={{ color: '#7c8194' }}>
        Carregando...
      </div>
    )
  }
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />
  }

  const initials = user.email.slice(0, 2).toUpperCase()
  const totalVisited = stats.data?.totalVisited ?? visited.items.length

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col gap-6">
      <Card
        className="border-0"
        style={{
          background: 'linear-gradient(135deg, #16181f 0%, #1a1d28 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h1
                className="text-2xl font-semibold"
                style={{
                  fontFamily: '"Instrument Serif", serif',
                  color: '#f0f2f8',
                }}
              >
                {user.email}
              </h1>
              <p className="text-xs" style={{ color: '#7c8194' }}>
                Membro desde{' '}
                {new Date(user.createdAt).toLocaleDateString('pt-BR', {
                  month: 'long',
                  year: 'numeric',
                })}
                {user.role === 'ADMIN' && ' · administrador'}
              </p>
            </div>
          </div>
          <ShareProfileButton userId={user.id} />
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-3">
          <QuickStat
            icon={<TrendingUp size={16} color="#7dd3fc" />}
            label="Visitados"
            value={totalVisited}
          />
          <QuickStat
            icon={<Heart size={16} color="#f87171" />}
            label="Favoritos"
            value={wishlist.items.length}
          />
          <QuickStat
            icon={<MapPin size={16} color="#4f8ef7" />}
            label="Continentes"
            value={
              stats.data?.perContinent.filter((c) => c.visited > 0).length ?? 0
            }
          />
        </CardContent>
      </Card>

      <Tabs defaultValue="overview">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="overview" className="gap-1">
            <Globe2 size={14} /> Visão geral
          </TabsTrigger>
          <TabsTrigger value="map">Mapa</TabsTrigger>
          <TabsTrigger value="wishlist">Favoritos</TabsTrigger>
          <TabsTrigger value="visited">Visitados</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="flex flex-col gap-4">
          <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
            <WorldPercentChart totalVisited={totalVisited} />
            {stats.data && (
              <ContinentBarChart perContinent={stats.data.perContinent} />
            )}
          </div>
          <ContinentStatsCard />
        </TabsContent>

        <TabsContent value="map">
          <WorldMapCard visited={visited.items} />
        </TabsContent>

        <TabsContent value="wishlist">
          <WishlistSection />
        </TabsContent>

        <TabsContent value="visited">
          <VisitedSection />
        </TabsContent>

        <TabsContent value="history">
          <ProfileHistoryList />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function QuickStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: number
}) {
  return (
    <div
      className="flex flex-col items-start gap-1 p-3 rounded-lg"
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      <div className="flex items-center gap-1 text-xs" style={{ color: '#7c8194' }}>
        {icon} {label}
      </div>
      <span
        className="text-2xl font-semibold"
        style={{ color: '#f0f2f8', fontFamily: '"Instrument Serif", serif' }}
      >
        {value}
      </span>
    </div>
  )
}
