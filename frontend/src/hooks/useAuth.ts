'use client'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation" // <- importante para redirigir

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter() // <- inicializamos el router

  // Cargar usuario desde localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) setUser(JSON.parse(savedUser))
    setIsLoading(false)
  }, [])

  // Función de login
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) throw new Error((await res.json()).message || "Login failed")
      const data = await res.json()

      localStorage.setItem("token", data.access_token)
      localStorage.setItem("user", JSON.stringify(data.user))
      setUser(data.user)

      setIsLoading(false)
      return data.user
    } catch (err: any) {
      setError(err.message)
      setIsLoading(false)
      throw err
    }
  }

  // Función de logout
  const logout = () => {
    setUser(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/") // <- redirige al home después de cerrar sesión
  }

  const isAuthenticated = !!user

  return { user, isAuthenticated, isLoading, error, login, logout }
}
