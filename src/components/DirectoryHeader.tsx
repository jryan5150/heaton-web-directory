'use client'

import { signOut, useSession } from 'next-auth/react'

export default function DirectoryHeader() {
  const { data: session } = useSession()

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Heaton Employee Directory
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Find contact information for all employees
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {session?.user && (
              <>
                <span className="text-sm text-gray-600">
                  Welcome, {session.user.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}