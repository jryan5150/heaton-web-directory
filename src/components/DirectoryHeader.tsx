'use client'

import { signOut, useSession } from 'next-auth/react'
import { UserCircleIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline'

export default function DirectoryHeader() {
  const { data: session } = useSession()

  return (
    <header className="bg-white shadow-modern border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-heaton rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg font-heading">H</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-heaton-gray font-heading tracking-tight">
                  HEATON EMPLOYEE DIRECTORY
                </h1>
                <p className="text-sm text-heaton-gray-light font-medium">
                  Find contact information for all employees
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {session?.user && (
              <>
                <div className="hidden sm:flex items-center space-x-3 bg-gray-50 rounded-lg px-4 py-2">
                  <UserCircleIcon className="w-5 h-5 text-heaton-blue" />
                  <div>
                    <p className="text-xs text-heaton-gray-light font-medium uppercase tracking-wide">
                      Welcome
                    </p>
                    <p className="text-sm font-semibold text-heaton-gray">
                      {session.user.name}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => signOut()}
                  className="btn-modern bg-heaton-blue text-white hover:bg-heaton-blue-dark focus:ring-blue-500 flex items-center space-x-2"
                >
                  <ArrowRightEndOnRectangleIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}