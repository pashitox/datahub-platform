'use client'
import Guard from "@/components/layout/Guard"
import Navbar from "@/components/layout/Navbar"

export default function Settings() {
  return (
    <Guard>
      <Navbar />
      <main className="p-8">
        <h1 className="text-2xl font-bold">Configuraciones</h1>
        <p>Ajusta las preferencias de tu cuenta.</p>
      </main>
    </Guard>
  )
}
