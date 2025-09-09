import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../components/layout/Navbar'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Redirigir al login por ahora
    router.push('/login')
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-200">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            DataHub Platform
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Redirigiendo al login...
          </p>
        </div>
      </div>
    </div>
  )
}
