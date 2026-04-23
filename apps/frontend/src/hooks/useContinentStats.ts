import { useCallback, useEffect, useState } from 'react'
import type { StatsResponse } from '@easytrip/shared'
import { api } from '@/lib/apiClient'
import { useAuth } from '@/context/AuthContext'

export function useContinentStats(dependency: number = 0) {
  const { isAuthenticated, token } = useAuth()
  const [data, setData] = useState<StatsResponse | null>(null)
  const [loading, setLoading] = useState(false)

  const reload = useCallback(async () => {
    if (!isAuthenticated) {
      setData(null)
      return
    }
    setLoading(true)
    try {
      const res = await api<StatsResponse>('/api/stats/continents')
      setData(res)
    } catch {
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated])

  useEffect(() => {
    reload()
  }, [reload, token, dependency])

  return { data, loading, reload }
}
