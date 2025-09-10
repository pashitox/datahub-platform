import Guard from "../components/Guard"
import Navbar from "../components/layout/Navbar"

export default function Dashboard() {
  return (
    <Guard>
      <div className="min-h-screen bg-gray-50 dark:bg-dark-200">
        <Navbar />
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-dark-100 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Bienvenido de vuelta
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Esta es tu área personal protegida.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Guard>
  )
}
