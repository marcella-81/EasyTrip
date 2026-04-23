import type { WeatherInfo } from '@easytrip/shared'

const WEATHER_EMOJIS: Record<string, string> = {
  clear: '☀️',
  clouds: '☁️',
  rain: '🌧️',
  drizzle: '🌦️',
  thunderstorm: '⛈️',
  snow: '❄️',
  mist: '🌫️',
  fog: '🌫️',
  haze: '🌫️',
}

function getWeatherEmoji(descricao: string): string {
  const lower = descricao.toLowerCase()
  for (const [key, emoji] of Object.entries(WEATHER_EMOJIS)) {
    if (lower.includes(key)) return emoji
  }
  return '🌤️'
}

interface WeatherRowProps {
  clima: WeatherInfo | null
  capital: string
}

export function WeatherRow({ clima, capital }: WeatherRowProps) {
  if (!clima) return null

  return (
    <div
      className="rounded-xl p-4 flex items-start gap-3"
      style={{ background: '#1e2029' }}
    >
      <span className="text-2xl leading-none mt-0.5">{getWeatherEmoji(clima.descricao)}</span>
      <div className="flex-1 min-w-0">
        <p className="text-xs uppercase tracking-wider font-medium mb-1" style={{ color: '#7c8194' }}>
          Clima em {capital}
        </p>
        <p className="text-sm font-semibold" style={{ color: '#f0f2f8' }}>
          {clima.temperatura} · {clima.descricao}
        </p>
        <p className="text-xs mt-0.5" style={{ color: '#7c8194' }}>
          Sensação {clima.sensacao} · Umidade {clima.umidade}
        </p>
      </div>
    </div>
  )
}
