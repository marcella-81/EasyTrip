import { useState } from 'react'
import type { DestinationResponse } from '@/types/destination'

interface HookState {
  data: DestinationResponse | null
  loading: boolean
  error: string | null
}

export function useDestination() {
  const [state, setState] = useState<HookState>({
    data: null,
    loading: false,
    error: null,
  })

  async function search(destination: string) {
    if (!destination.trim()) return

    setState({ data: null, loading: true, error: null })

    try {
      const res = await fetch(`/api/destination/${encodeURIComponent(destination.trim())}`)
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error((body as { erro?: string })?.erro ?? 'Destino não encontrado.')
      }
      const data: DestinationResponse = await res.json()
      setState({ data, loading: false, error: null })
    } catch (err) {
      setState({
        data: null,
        loading: false,
        error: err instanceof Error ? err.message : 'Erro ao buscar destino.',
      })
    }
  }

  return { ...state, search }
}
