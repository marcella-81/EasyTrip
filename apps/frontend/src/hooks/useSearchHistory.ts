import { useCallback, useEffect, useState } from 'react'
import type { SearchHistoryEntry } from '@easytrip/shared'
import { api } from '@/lib/apiClient'
import { useAuth } from '@/context/AuthContext'
import { useLocalHistory } from './useLocalHistory'

interface SearchHistoryHook {
  history: string[]
  entries: SearchHistoryEntry[]
  add: (query: string) => void
  clear: () => void
  removeById: (id: string) => void
  reload: () => void
}

export function useSearchHistory(): SearchHistoryHook {
  const { isAuthenticated, token } = useAuth()
  const local = useLocalHistory()
  const [entries, setEntries] = useState<SearchHistoryEntry[]>([])

  const reload = useCallback(async () => {
    if (!isAuthenticated) {
      setEntries([])
      return
    }
    try {
      const list = await api<SearchHistoryEntry[]>('/api/history')
      setEntries(list)
    } catch {
      setEntries([])
    }
  }, [isAuthenticated])

  useEffect(() => {
    reload()
  }, [reload, token])

  if (!isAuthenticated) {
    return {
      history: local.history,
      entries: [],
      add: local.add,
      clear: local.clear,
      removeById: () => {},
      reload,
    }
  }

  async function add(query: string) {
    try {
      const entry = await api<SearchHistoryEntry>('/api/history', {
        method: 'POST',
        body: JSON.stringify({ query }),
      })
      setEntries((prev) => {
        const dedup = prev.filter(
          (p) => p.countryName.toLowerCase() !== entry.countryName.toLowerCase(),
        )
        return [entry, ...dedup].slice(0, 8)
      })
    } catch {
      // silenciosamente ignora país não encontrado
    }
  }

  async function clear() {
    try {
      await api('/api/history', { method: 'DELETE' })
      setEntries([])
    } catch {
      // ignore
    }
  }

  async function removeById(id: string) {
    try {
      await api(`/api/history/${id}`, { method: 'DELETE' })
      setEntries((prev) => prev.filter((e) => e.id !== id))
    } catch {
      // ignore
    }
  }

  return {
    history: entries.map((e) => e.countryName),
    entries,
    add,
    clear,
    removeById,
    reload,
  }
}
