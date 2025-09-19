import Navbar from "@/components/layout/Navbar"

export default function AccessDenied() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-[80vh]">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-red-500">Acceso denegado</h1>
          <p>Debes iniciar sesión o tener permisos para ver esta página.</p>
        </div>
      </div>
    </>
  )
}
