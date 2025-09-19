'use client'
import { ReactNode, useEffect } from "react"
import { useRouter } from "next/router"
import { useAuth } from "@/hooks/useAuth"

interface GuardProps {
  children: ReactNode
  roles?: string[]
}

export default function Guard({ children, roles }: GuardProps) {
  const { isAuthenticated, user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login")
      } else if (roles && !roles.includes(user?.role)) {
        router.push("/access-denied")
      }
    }
  }, [isAuthenticated, isLoading, user, roles, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 dark:text-gray-300">Cargando...</p>
      </div>
    )
  }

  return <>{children}</>
}
