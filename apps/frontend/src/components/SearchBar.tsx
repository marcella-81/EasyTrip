import { useState, type KeyboardEvent } from 'react'
import { Sparkles } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SearchBarProps {
  onSearch: (query: string) => void
  disabled?: boolean
  semanticMode?: boolean
  onSemanticModeChange?: (enabled: boolean) => void
}

export function SearchBar({
  onSearch,
  disabled,
  semanticMode = false,
  onSemanticModeChange,
}: SearchBarProps) {
  const [value, setValue] = useState('')

  function handleSearch() {
    if (value.trim()) onSearch(value.trim())
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSearch()
  }

  const placeholder = semanticMode
    ? 'Busque por atributos: país frio, fala português, América do Sul...'
    : 'Digite o nome do país em inglês...'

  return (
    <div className="flex flex-col gap-3 mb-6">
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 h-11 text-sm border-0 focus-visible:ring-1 focus-visible:ring-[#4f8ef7]"
          style={{
            background: '#16181f',
            color: '#f0f2f8',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        />
        <Button
          onClick={handleSearch}
          disabled={disabled || !value.trim()}
          className="h-11 px-6 font-medium text-sm border-0 cursor-pointer"
          style={{
            background: semanticMode
              ? 'linear-gradient(135deg, #7dd3fc, #4f8ef7)'
              : 'linear-gradient(135deg, #4f8ef7, #7dd3fc)',
            color: '#fff',
          }}
        >
          Buscar
        </Button>
      </div>

      {onSemanticModeChange && (
        <label
          className="flex items-center gap-2 text-xs cursor-pointer select-none self-start"
          style={{ color: semanticMode ? '#7dd3fc' : '#7c8194' }}
        >
          <input
            type="checkbox"
            checked={semanticMode}
            onChange={(e) => {
              onSemanticModeChange(e.target.checked)
              setValue('')
            }}
            className="cursor-pointer"
          />
          <Sparkles size={12} />
          <span>Busca inteligente</span>
        </label>
      )}
    </div>
  )
}
