import { useState } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AppHeader } from '@/components/AppHeader'
import { DestinationCard } from '@/components/DestinationCard'
import { DestinationSkeleton } from '@/components/DestinationSkeleton'
import { RecommendationsStrip } from '@/components/RecommendationsStrip'
import { SearchBar } from '@/components/SearchBar'
import { SearchHistory } from '@/components/SearchHistory'
import { SemanticSearchResults } from '@/components/SemanticSearchResults'
import { useDestination } from '@/hooks/useDestination'
import { useRecommendations } from '@/hooks/useRecommendations'
import { useSearchHistory } from '@/hooks/useSearchHistory'
import { useSemanticSearch } from '@/hooks/useSemanticSearch'

export function HomePage() {
  const [semanticMode, setSemanticMode] = useState(false)
  const { data, loading, error, search } = useDestination()
  const {
    data: semanticData,
    loading: semanticLoading,
    error: semanticError,
    search: semanticSearch,
    clear: clearSemantic,
  } = useSemanticSearch()
  const { history, add, clear } = useSearchHistory()
  const { items: recs } = useRecommendations()

  function handleSearch(query: string) {
    add(query)
    if (semanticMode) {
      clearSemantic()
      semanticSearch(query)
    } else {
      search(query)
    }
  }

  function handleSemanticModeChange(enabled: boolean) {
    setSemanticMode(enabled)
    // limpa resultados ao trocar modo
    if (!enabled && semanticData) {
      clearSemantic()
    }
  }

  function handleSelectFromSemantic(countryName: string) {
    // ao clicar num resultado semântico, faz busca completa
    search(countryName)
    clearSemantic()
    setSemanticMode(false)
  }

  const isLoading = semanticMode ? semanticLoading : loading
  const searchError = semanticMode ? semanticError : error

  return (
    <div className="min-h-[calc(100vh-57px)] flex flex-col items-center justify-start px-4 pt-16 pb-16">
      <div className="w-full max-w-xl">
        <AppHeader />
        <SearchBar
          onSearch={handleSearch}
          disabled={isLoading}
          semanticMode={semanticMode}
          onSemanticModeChange={handleSemanticModeChange}
        />

        {!semanticMode && (
          <>
            <SearchHistory history={history} onSelect={handleSearch} onClear={clear} />
            <RecommendationsStrip items={recs} onSelect={handleSearch} />
          </>
        )}

        {isLoading && <DestinationSkeleton />}

        {searchError && (
          <Alert
            className="border-0"
            style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.25)',
              color: '#f87171',
            }}
          >
            <AlertDescription className="text-sm">{searchError}</AlertDescription>
          </Alert>
        )}

        {semanticMode && semanticData && (
          <SemanticSearchResults
            items={semanticData}
            onSelect={handleSelectFromSemantic}
          />
        )}

        {!semanticMode && data && <DestinationCard data={data} />}
      </div>
    </div>
  )
}
