import Navbar from "../components/layout/Navbar"

export default function Articles() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-200">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Artículos
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Lee nuestros artículos públicos.
        </p>
      </div>
    </div>
  )
}
