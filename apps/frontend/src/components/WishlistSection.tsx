import { X } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useWishlist } from '@/hooks/useWishlist'
import { getCountryFlag } from '@/lib/flags'

export function WishlistSection() {
  const { items, remove } = useWishlist()

  return (
    <Card
      className="border-0"
      style={{
        background: '#16181f',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <CardHeader>
        <h3
          className="text-lg font-semibold"
          style={{ color: '#f0f2f8', fontFamily: '"Instrument Serif", serif' }}
        >
          Favoritos
        </h3>
        <p className="text-xs" style={{ color: '#7c8194' }}>
          {items.length} país{items.length === 1 ? '' : 'es'}
        </p>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-sm" style={{ color: '#7c8194' }}>
            Adicione países da página de busca.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <span
                key={item.cca2}
                className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full"
                style={{
                  background: '#1e2029',
                  color: '#f0f2f8',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <span>{getCountryFlag(item.countryName)}</span>
                <span>{item.countryName}</span>
                <button
                  type="button"
                  onClick={() => remove(item.cca2)}
                  className="cursor-pointer hover:text-red-400"
                  style={{ color: '#7c8194' }}
                  aria-label={`Remover ${item.countryName}`}
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
