import { Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useSearchHistory } from '@/hooks/useSearchHistory'
import { getCountryFlag } from '@/lib/flags'

export function ProfileHistoryList() {
  const { entries, removeById, clear } = useSearchHistory()

  return (
    <Card
      className="border-0"
      style={{
        background: '#16181f',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h3
            className="text-lg font-semibold"
            style={{ color: '#f0f2f8', fontFamily: '"Playfair Display", serif' }}
          >
            Histórico de pesquisas
          </h3>
          <p className="text-xs" style={{ color: '#7c8194' }}>
            {entries.length}/8
          </p>
        </div>
        {entries.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clear}
            className="gap-1"
            style={{ color: '#7c8194' }}
          >
            <Trash2 size={12} /> Limpar
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <p className="text-sm" style={{ color: '#7c8194' }}>
            Ainda sem pesquisas.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {entries.map((entry) => (
              <li
                key={entry.id}
                className="flex items-center justify-between text-sm rounded-md px-3 py-2"
                style={{ background: '#1e2029' }}
              >
                <span className="flex items-center gap-2" style={{ color: '#f0f2f8' }}>
                  <span>{getCountryFlag(entry.countryName)}</span>
                  <span>{entry.countryName}</span>
                </span>
                <button
                  type="button"
                  onClick={() => removeById(entry.id)}
                  className="cursor-pointer hover:text-red-400"
                  style={{ color: '#7c8194' }}
                  aria-label={`Remover ${entry.countryName}`}
                >
                  <X size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
