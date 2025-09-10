import Guard from "../../components/Guard"
import Navbar from "../../components/layout/Navbar"

export default function AdminDashboard() {
  return (
    <Guard requiredRole="admin">
      <div className="min-h-screen bg-gray-50 dark:bg-dark-200">
        <Navbar />
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Panel de Administración
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Esta área es solo para administradores.
          </p>
        </div>
      </div>
    </Guard>
  )
}
