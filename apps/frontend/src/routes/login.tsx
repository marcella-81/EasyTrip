import { Link, useNavigate } from '@tanstack/react-router'
import { LoginForm } from '@/components/LoginForm'

export function LoginPage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-[calc(100vh-57px)] flex items-center justify-center px-4">
      <div
        className="w-full max-w-sm rounded-xl p-6 flex flex-col gap-4"
        style={{
          background: '#16181f',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <h1
          className="text-2xl font-semibold"
          style={{ fontFamily: '"Instrument Serif", serif', color: '#f0f2f8' }}
        >
          Entrar
        </h1>
        <LoginForm onSuccess={() => navigate({ to: '/' })} />
        <p className="text-xs text-center" style={{ color: '#7c8194' }}>
          Sem conta?{' '}
          <Link to="/register" style={{ color: '#4f8ef7' }}>
            Criar agora
          </Link>
        </p>
      </div>
    </div>
  )
}
