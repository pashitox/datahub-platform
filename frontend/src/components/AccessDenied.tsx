export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          No tienes permisos para acceder a esta página.
        </p>
      </div>
    </div>
  )
}
