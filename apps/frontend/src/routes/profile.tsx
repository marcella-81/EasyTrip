import { Navigate } from '@tanstack/react-router'
import { ContinentStatsCard } from '@/components/ContinentStatsCard'
import { ProfileHistoryList } from '@/components/ProfileHistoryList'
import { VisitedSection } from '@/components/VisitedSection'
import { WishlistSection } from '@/components/WishlistSection'
import { useAuth } from '@/context/AuthContext'

export function ProfilePage() {
  const { isAuthenticated, loading, user } = useAuth()

  if (loading) {
    return (
      <div className="px-4 py-16 text-center" style={{ color: '#7c8194' }}>
        Carregando...
      </div>
    )
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 flex flex-col gap-6">
      <header>
        <h1
          className="text-3xl font-semibold"
          style={{ fontFamily: '"Playfair Display", serif', color: '#f0f2f8' }}
        >
          Meu perfil
        </h1>
        <p className="text-sm" style={{ color: '#7c8194' }}>
          {user?.email}
        </p>
      </header>

      <ContinentStatsCard />

      <div className="grid gap-4 md:grid-cols-2">
        <WishlistSection />
        <VisitedSection />
      </div>

      <ProfileHistoryList />
    </div>
  )
}
