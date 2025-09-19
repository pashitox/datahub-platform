export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 dark:bg-dark-200 py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 dark:text-gray-300">
        &copy; {new Date().getFullYear()} DataHub. Todos los derechos reservados.
      </div>
    </footer>
  )
}
