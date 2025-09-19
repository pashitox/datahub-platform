import Guard from '@/components/Guard'

export default function AdminDashboardPage() {
  return (
    <Guard requiredRole="admin">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p>Solo accesible para usuarios con rol administrador.</p>
      </div>
    </Guard>
  )
}
