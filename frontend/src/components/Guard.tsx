"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../hooks/useAuth"

interface GuardProps {
  children: React.ReactNode
  requiredRole?: string
}

export default function Guard({ children, requiredRole }: GuardProps) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login")
      } else if (requiredRole && !user?.roles?.includes(requiredRole)) {
        router.push("/access-denied")
      }
    }
  }, [isAuthenticated, isLoading, user, requiredRole, router])

  if (isLoading) return <div className="flex items-center justify-center min-h-screen">Cargando...</div>
  if (!isAuthenticated) return null
  if (requiredRole && !user?.roles?.includes(requiredRole)) return null

  return <>{children}</>
}
