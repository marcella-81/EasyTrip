import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SearchHistoryProps {
  history: string[]
  onSelect: (query: string) => void
  onClear: () => void
}

export function SearchHistory({ history, onSelect, onClear }: SearchHistoryProps) {
  if (history.length === 0) return null

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs uppercase tracking-wider font-medium" style={{ color: '#7c8194' }}>
          Histórico
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="h-6 px-2 gap-1 text-xs cursor-pointer hover:text-red-400"
          style={{ color: '#7c8194' }}
        >
          <Trash2 size={12} />
          Limpar
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.map((item) => (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className="text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer"
            style={{
              background: '#1e2029',
              color: '#7c8194',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#f0f2f8'
              e.currentTarget.style.borderColor = 'rgba(79,142,247,0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#7c8194'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}
