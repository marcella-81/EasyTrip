import { Alert, AlertDescription } from '@/components/ui/alert'
import { AppHeader } from '@/components/AppHeader'
import { DestinationCard } from '@/components/DestinationCard'
import { DestinationSkeleton } from '@/components/DestinationSkeleton'
import { RecommendationsStrip } from '@/components/RecommendationsStrip'
import { SearchBar } from '@/components/SearchBar'
import { SearchHistory } from '@/components/SearchHistory'
import { useDestination } from '@/hooks/useDestination'
import { useRecommendations } from '@/hooks/useRecommendations'
import { useSearchHistory } from '@/hooks/useSearchHistory'

export function HomePage() {
  const { data, loading, error, search } = useDestination()
  const { history, add, clear } = useSearchHistory()
  const { items: recs } = useRecommendations(history.length)

  function handleSearch(query: string) {
    add(query)
    search(query)
  }

  return (
    <div className="min-h-[calc(100vh-57px)] flex flex-col items-center justify-start px-4 pt-16 pb-16">
      <div className="w-full max-w-xl">
        <AppHeader />
        <SearchBar onSearch={handleSearch} disabled={loading} />
        <SearchHistory history={history} onSelect={handleSearch} onClear={clear} />
        <RecommendationsStrip items={recs} onSelect={handleSearch} />

        {loading && <DestinationSkeleton />}

        {error && (
          <Alert
            className="border-0"
            style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.25)',
              color: '#f87171',
            }}
          >
            <AlertDescription className="text-sm">{error}</AlertDescription>
          </Alert>
        )}

        {data && <DestinationCard data={data} />}
      </div>
    </div>
  )
}
