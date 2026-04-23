import { Compass, Globe2, Sparkles } from 'lucide-react'

export function AppHeader() {
  return (
    <header className="text-center mb-10 flex flex-col items-center gap-3">
      <div
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs"
        style={{
          background: 'rgba(79,142,247,0.1)',
          border: '1px solid rgba(79,142,247,0.25)',
          color: '#7dd3fc',
        }}
      >
        <Sparkles size={12} /> descubra o próximo destino
      </div>
      <h1
        className="text-4xl sm:text-5xl font-semibold leading-tight"
        style={{
          background: 'linear-gradient(135deg, #4f8ef7, #7dd3fc, #c4b5fd)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontFamily: '"Playfair Display", serif',
        }}
      >
        Explore o mundo,<br />um país por vez.
      </h1>
      <p
        className="text-sm max-w-md"
        style={{ color: '#7c8194' }}
      >
        Pesquise qualquer destino e veja clima, moeda e cultura em segundos. Marque
        visitados, salve favoritos e receba recomendações.
      </p>
      <div className="flex items-center gap-3 text-xs mt-2" style={{ color: '#7c8194' }}>
        <span className="flex items-center gap-1">
          <Globe2 size={12} /> 250+ países
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <Compass size={12} /> recomendações ao vivo
        </span>
      </div>
    </header>
  )
}
