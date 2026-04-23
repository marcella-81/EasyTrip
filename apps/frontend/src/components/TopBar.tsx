import { Link, useNavigate } from '@tanstack/react-router'
import { LogOut, Plane } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'

export function TopBar() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate({ to: '/' })
  }

  const initials = user?.email.slice(0, 2).toUpperCase() ?? '??'

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
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #4f8ef7, #7dd3fc)',
            }}
          >
            <Plane size={16} color="#0e0f14" />
          </div>
          <span
            className="text-lg font-semibold tracking-tight"
            style={{
              fontFamily: '"Instrument Serif", serif',
              color: '#f0f2f8',
            }}
          >
            EasyTrip
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                </Avatar>
                <span
                  className="text-sm hidden sm:inline"
                  style={{ color: '#f0f2f8' }}
                >
                  {user?.email.split('@')[0]}
                </span>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="gap-2"
                style={{ color: '#7c8194' }}
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Sair</span>
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
