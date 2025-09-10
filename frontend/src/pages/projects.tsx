import Navbar from "../components/layout/Navbar"

export default function Projects() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-200">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Proyectos Públicos
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Explora nuestros proyectos públicos.
        </p>
      </div>
    </div>
  )
}
