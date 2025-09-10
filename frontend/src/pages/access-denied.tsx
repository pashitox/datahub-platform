export default function AccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-200">
      <div className="text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Acceso Restringido
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          No tienes permisos para acceder a esta página.
        </p>
        <button 
          onClick={() => window.location.href = "/"}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  )
}
