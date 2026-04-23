import { Link, useNavigate } from '@tanstack/react-router'
import { LogOut, User as UserIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'

export function TopBar() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate({ to: '/' })
  }

  return (
    <header
      className="sticky top-0 z-10 border-b"
      style={{
        background: 'rgba(14,15,20,0.85)',
        backdropFilter: 'blur(12px)',
        borderColor: 'rgba(255,255,255,0.07)',
      }}
    >
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl">✈️</span>
          <span
            className="text-lg font-semibold"
            style={{
              background: 'linear-gradient(135deg, #4f8ef7, #7dd3fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            EasyTrip
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link to="/profile">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                  style={{ color: '#f0f2f8' }}
                >
                  <UserIcon size={14} />
                  <span className="hidden sm:inline">{user?.email}</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="gap-2"
                style={{ color: '#7c8194' }}
              >
                <LogOut size={14} />
                Sair
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" style={{ color: '#7c8194' }}>
                  Entrar
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  size="sm"
                  style={{
                    background: 'linear-gradient(135deg, #4f8ef7, #7dd3fc)',
                    color: '#0e0f14',
                  }}
                >
                  Criar conta
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
