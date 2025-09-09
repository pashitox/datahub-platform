// frontend/src/components/layout/Navbar.tsx
'use client'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../hooks/useTheme'
import { Moon, Sun, LogOut, User } from 'lucide-react'

export default function Navbar() {
  const { isAuthenticated, user } = useAuth()
  const { isDarkMode, toggle } = useTheme()

  return (
    <nav className="bg-white dark:bg-dark-200 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            DataHub
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggle}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <User size={18} className="text-gray-600 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {user?.email}
                </span>
              </div>
              <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Login
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors">
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}