import { Outlet } from '@tanstack/react-router'
import { AuthProvider } from '@/context/AuthContext'
import { TopBar } from '@/components/TopBar'

export function RootLayout() {
  return (
    <AuthProvider>
      <TopBar />
      <Outlet />
    </AuthProvider>
  )
}
