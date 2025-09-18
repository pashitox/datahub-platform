import Guard from '../components/layout/Guard'
import { useAuth } from '../hooks/useAuth'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <Guard requireAuth={true}>
      <div className="min-h-screen bg-gray-50 dark:bg-dark-300">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 dark:border-dark-200 rounded-lg p-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome, {user?.firstName}!
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You have successfully logged into your DataHub account.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-dark-200 rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Profile Information
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Name:</strong> {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Email:</strong> {user?.email}
                  </p>
                </div>

                <div className="bg-white dark:bg-dark-200 rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Account Status
                  </h2>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Active
                  </div>
                </div>

                <div className="bg-white dark:bg-dark-200 rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Quick Actions
                  </h2>
                  <div className="space-y-2">
                    <button className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300">
                      Edit Profile
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300">
                      Change Password
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300">
                      View Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Guard>
  )
}
