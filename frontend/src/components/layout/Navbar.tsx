'use client'
import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { Moon, Sun, LogOut, User, Settings, Bell, Menu, X } from "lucide-react"
import { useTheme } from "@/hooks/useTheme"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const { isDarkMode, toggle } = useTheme() // <--- aquí usamos el hook

  return (
    <nav className="bg-white dark:bg-dark-200 shadow-sm border-b border-gray-200 dark:border-dark-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              DataHub
            </Link>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="px-3 py-2 text-sm font-medium">
                  Dashboard
                </Link>
                <button onClick={toggle} className="p-2 rounded-lg">
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button className="p-2">
                  <Bell size={20} />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <span>{user?.firstName}</span>
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-300 rounded-md shadow-lg py-1 z-50">
                      <Link href="/profile" className="block px-4 py-2 text-sm">
                        Profile
                      </Link>
                      <Link href="/settings" className="block px-4 py-2 text-sm">
                        Settings
                      </Link>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button onClick={toggle} className="p-2 rounded-lg">
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <Link href="/login" className="px-3 py-2 text-sm font-medium">
                  Sign in
                </Link>
                <Link href="/register" className="px-4 py-2 bg-primary-600 text-white rounded-md">
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
