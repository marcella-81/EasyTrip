import { useState, type KeyboardEvent } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SearchBarProps {
  onSearch: (query: string) => void
  disabled?: boolean
}

export function SearchBar({ onSearch, disabled }: SearchBarProps) {
  const [value, setValue] = useState('')

  function handleSearch() {
    if (value.trim()) onSearch(value.trim())
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="flex gap-2 mb-8">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Digite o nome do país em inglês..."
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
          background: 'linear-gradient(135deg, #4f8ef7, #7dd3fc)',
          color: '#fff',
        }}
      >
        Buscar
      </Button>
    </div>
  )
}
