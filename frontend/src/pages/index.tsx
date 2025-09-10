import { useEffect } from "react"
import { useRouter } from "next/router"
import Navbar from "../components/layout/Navbar"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Redirigir al dashboard si está autenticado
    const token = localStorage.getItem("token")
    if (token) {
      router.push("/dashboard")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-200">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Bienvenido a DataHub
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Tu plataforma personal para gestionar proyectos y contenido.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-dark-100 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">Proyectos</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Gestiona tus proyectos personales y profesionales.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-100 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">Artículos</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Crea y comparte contenido valioso.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-100 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Accede a tus estadísticas y métricas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
