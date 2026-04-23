import type { ExchangeInfo } from '@easytrip/shared'

interface ExchangeHighlightProps {
  cambio: ExchangeInfo
}

export function ExchangeHighlight({ cambio }: ExchangeHighlightProps) {
  if (cambio.moedaOrigem === 'BRL') return null

  return (
    <div
      className="rounded-xl p-4 flex items-center gap-3"
      style={{
        background: 'linear-gradient(135deg, rgba(79,142,247,0.12), rgba(125,211,252,0.08))',
        border: '1px solid rgba(79,142,247,0.2)',
      }}
    >
      <span className="text-xl">💱</span>
      <div>
        <p className="text-xs uppercase tracking-wider font-medium mb-0.5" style={{ color: '#7c8194' }}>
          Câmbio para Real
        </p>
        <p
          className="text-sm font-semibold"
          style={{
            background: 'linear-gradient(135deg, #4f8ef7, #7dd3fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {cambio.cotacaoEmBRL}
        </p>
      </div>
    </div>
  )
}
