import { useNavigate } from '@tanstack/react-router'
import { Globe, MapPin, Tag } from 'lucide-react'
import { Card } from '@/components/ui/card'
import type { SemanticSearchResult } from '@easytrip/shared'

interface SemanticSearchResultsProps {
  items: SemanticSearchResult[]
  onSelect?: (countryName: string) => void
}

function emojiFlag(cca2: string): string {
  // converte código ISO para emoji de bandeira
  const codePoints = cca2
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

const TAG_COLORS: Record<string, string> = {
  Frio: 'background:#1e3a5f;color:#7dd3fc',
  Quente: 'background:#3d2a1e;color:#fca5a5',
  Tropical: 'background:#1e3a2f;color:#86efac',
  'Hemisfério Sul': 'background:#1a1d28;color:#7dd3fc',
  'Hemisfério Norte': 'background:#1a1d28;color:#fca5a5',
  Europa: 'background:#2a1e3a;color:#c4b5fd',
  Ásia: 'background:#3a1e1e;color:#fca5a5',
  África: 'background:#3a2a1e;color:#fdba74',
  Américas: 'background:#1e2a3a;color:#93c5fd',
  Oceania: 'background:#1e3a3a;color:#5eead4',
  Brasil: 'background:#1e3a1e;color:#86efac',
}

function tagStyle(tag: string): React.CSSProperties {
  const preset = TAG_COLORS[tag]
  if (preset) {
    const [bg, color] = preset.split(';')
    return {
      background: bg.split(':')[1],
      color: color.split(':')[1],
      border: '1px solid rgba(255,255,255,0.08)',
    }
  }
  return {
    background: 'rgba(255,255,255,0.05)',
    color: '#7c8194',
    border: '1px solid rgba(255,255,255,0.08)',
  }
}

export function SemanticSearchResults({ items, onSelect }: SemanticSearchResultsProps) {
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-sm" style={{ color: '#7c8194' }}>
        Nenhum país encontrado para essa busca.
      </div>
    )
  }

  function handleClick(name: string) {
    if (onSelect) {
      onSelect(name)
    } else {
      navigate({ to: '/' })
    }
  }

  return (
    <div className="flex flex-col gap-3 mb-6">
      <div className="flex items-center gap-2 text-xs" style={{ color: '#7c8194' }}>
        <Globe size={14} />
        <span>{items.length} resultado{items.length > 1 ? 's' : ''} encontrado{items.length > 1 ? 's' : ''}</span>
      </div>
      {items.map((item) => (
        <Card
          key={item.cca2}
          onClick={() => handleClick(item.name)}
          className="p-4 border-0 cursor-pointer transition-all hover:opacity-90"
          style={{
            background: 'linear-gradient(135deg, #16181f 0%, #1a1d28 100%)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl" title={item.name}>
                {item.flag ? (
                  <img
                    src={item.flag}
                    alt={item.name}
                    className="w-8 h-5 object-cover rounded"
                  />
                ) : (
                  emojiFlag(item.cca2)
                )}
              </span>
              <div>
                <h3
                  className="text-sm font-medium"
                  style={{
                    color: '#f0f2f8',
                    fontFamily: '"Instrument Serif", serif',
                  }}
                >
                  {item.name}
                </h3>
                <div className="flex items-center gap-1 text-xs mt-0.5" style={{ color: '#7c8194' }}>
                  <MapPin size={10} />
                  {item.subregion || item.continent}
                </div>
              </div>
            </div>
          </div>

          {item.matchedTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {item.matchedTags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1"
                  style={tagStyle(tag)}
                >
                  <Tag size={8} />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}
