export function AppHeader() {
  return (
    <header className="text-center mb-10">
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-3xl">✈️</span>
        <h1
          className="text-4xl font-semibold"
          style={{
            background: 'linear-gradient(135deg, #4f8ef7, #7dd3fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          EasyTrip
        </h1>
      </div>
      <p className="text-sm" style={{ color: '#7c8194' }}>
        Explore o mundo com um clique
      </p>
    </header>
  )
}
