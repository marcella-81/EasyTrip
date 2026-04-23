import { Link, useNavigate } from '@tanstack/react-router'
import { RegisterForm } from '@/components/RegisterForm'

export function RegisterPage() {
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
          style={{ fontFamily: '"Playfair Display", serif', color: '#f0f2f8' }}
        >
          Criar conta
        </h1>
        <RegisterForm onSuccess={() => navigate({ to: '/' })} />
        <p className="text-xs text-center" style={{ color: '#7c8194' }}>
          Já tem conta?{' '}
          <Link to="/login" style={{ color: '#4f8ef7' }}>
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}
