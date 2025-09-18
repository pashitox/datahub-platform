import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../hooks/useAuth'

interface GuardProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export default function Guard({ children, requireAuth = true }: GuardProps) {
  const { isAuthenticated, isLoading, checkAuth } = useAuth()
  const router = useRouter()

  // 🔐 Verificar token en localStorage además del estado Redux
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token && !isAuthenticated) {
      checkAuth()
    }
  }, [])

  useEffect(() => {
    if (!isLoading) {
      checkAuth()
    }
  }, [])

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        router.push('/login')
      } else if (!requireAuth && isAuthenticated) {
        router.push('/dashboard')
      }
    }
  }, [isAuthenticated, isLoading, requireAuth, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if ((requireAuth && !isAuthenticated) || (!requireAuth && isAuthenticated)) {
    return null
  }

  return <>{children}</>
}
