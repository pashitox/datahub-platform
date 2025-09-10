"use client"
import { useAuth } from "../hooks/useAuth"
import { useEffect } from "react"
import { useRouter } from "next/router"

interface GuardProps {
  children: React.ReactNode
  requiredRole?: string
}

export default function Guard({ children, requiredRole }: GuardProps) {
  const { isAuthenticated, user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
    
    if (!isLoading && isAuthenticated && requiredRole) {
      const hasRole = user?.roles?.includes(requiredRole)
      if (!hasRole) {
        router.push("/access-denied")
      }
    }
  }, [isAuthenticated, isLoading, user, requiredRole, router])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  if (requiredRole && !user?.roles?.includes(requiredRole)) {
    return null
  }

  return <>{children}</>
}
