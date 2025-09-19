'use client'
import Guard from "@/components/layout/Guard"
import Navbar from "@/components/layout/Navbar"

export default function Profile() {
  return (
    <Guard>
      <Navbar />
      <main className="p-8">
        <h1 className="text-2xl font-bold">Perfil</h1>
        <p>Aquí puedes editar tu información personal.</p>
      </main>
    </Guard>
  )
}
