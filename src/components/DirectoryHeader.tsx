'use client'

import { signOut, useSession } from 'next-auth/react'
import { UserCircleIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline'

export default function DirectoryHeader() {
  const { data: session } = useSession()

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-modern border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex-1 animate-slide-in-left">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="w-14 h-14 bg-gradient-heaton rounded-2xl flex items-center justify-center shadow-modern hover-lift">
                  <span className="text-white font-bold text-xl font-heading drop-shadow-sm">H</span>
                </div>
                <div className="absolute inset-0 bg-gradient-heaton rounded-2xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl lg:text-3xl font-bold text-heaton-gray font-heading tracking-tight hover:text-heaton-blue transition-colors duration-300">
                  HEATON EMPLOYEE DIRECTORY
                </h1>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <p className="text-sm text-heaton-gray-light font-medium">
                    Find contact information for all employees
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 animate-slide-in-right">
            {session?.user && (
              <>
                <div className="hidden sm:flex items-center space-x-3 bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl px-4 py-3 shadow-sm hover-lift">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                    <UserCircleIcon className="w-5 h-5 text-heaton-blue" />
                  </div>
                  <div>
                    <p className="text-xs text-heaton-gray-light font-bold uppercase tracking-wider">
                      Welcome
                    </p>
                    <p className="text-sm font-semibold text-heaton-gray">
                      {session.user.name}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => signOut()}
                  className="relative group btn-modern bg-gradient-heaton text-white hover:shadow-modern-lg focus:ring-blue-500 flex items-center space-x-2 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <ArrowRightEndOnRectangleIcon className="relative z-10 w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="relative z-10 hidden sm:inline">Sign Out</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}