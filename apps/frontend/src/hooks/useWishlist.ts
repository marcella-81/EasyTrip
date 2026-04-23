import { useCallback, useEffect, useState } from 'react'
import type { WishlistItem } from '@easytrip/shared'
import { api } from '@/lib/apiClient'
import { useAuth } from '@/context/AuthContext'

interface AddInput {
  cca2: string
  countryName: string
  continent: string
}

export function useWishlist() {
  const { isAuthenticated, token } = useAuth()
  const [items, setItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(false)

  const reload = useCallback(async () => {
    if (!isAuthenticated) {
      setItems([])
      return
    }
    setLoading(true)
    try {
      const list = await api<WishlistItem[]>('/api/wishlist')
      setItems(list)
    } catch {
      setItems([])
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated])

  useEffect(() => {
    reload()
  }, [reload, token])

  async function add(input: AddInput) {
    const item = await api<WishlistItem>('/api/wishlist', {
      method: 'POST',
      body: JSON.stringify({
        cca2: input.cca2.toUpperCase(),
        countryName: input.countryName,
        continent: input.continent,
      }),
    })
    setItems((prev) => [item, ...prev])
    return item
  }

  async function remove(cca2: string) {
    const upper = cca2.toUpperCase()
    setItems((prev) => prev.filter((i) => i.cca2 !== upper))
    try {
      await api(`/api/wishlist/${upper}`, { method: 'DELETE' })
    } catch {
      reload()
    }
  }

  return { items, loading, add, remove, reload }
}
