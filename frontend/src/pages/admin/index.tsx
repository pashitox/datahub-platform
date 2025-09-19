'use client'
import Guard from "@/components/layout/Guard"
import Navbar from "@/components/layout/Navbar"

export default function AdminDashboard() {
  return (
    <Guard roles={["admin"]}>
      <Navbar />
      <main className="p-8">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <p>Solo usuarios con rol admin pueden ver esta sección.</p>
      </main>
    </Guard>
  )
}
