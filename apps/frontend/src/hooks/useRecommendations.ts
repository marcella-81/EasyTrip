import { useCallback, useEffect, useState } from 'react'
import type { RecommendationItem } from '@easytrip/shared'
import { api } from '@/lib/apiClient'
import { useAuth } from '@/context/AuthContext'

export function useRecommendations(historyKey: number = 0) {
  const { isAuthenticated, token } = useAuth()
  const [items, setItems] = useState<RecommendationItem[]>([])
  const [loading, setLoading] = useState(false)

  const reload = useCallback(async () => {
    if (!isAuthenticated) {
      setItems([])
      return
    }
    setLoading(true)
    try {
      const list = await api<RecommendationItem[]>('/api/recommendations')
      setItems(list)
    } catch {
      setItems([])
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated])

  useEffect(() => {
    reload()
  }, [reload, token, historyKey])

  return { items, loading, reload }
}
