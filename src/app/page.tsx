'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/directory')
    }
  }, [session, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Brand Logo */}
        <div className="w-20 h-20 bg-gradient-heaton rounded-3xl flex items-center justify-center shadow-modern-lg mx-auto mb-8">
          <span className="text-white font-bold text-3xl font-heading">H</span>
        </div>

        {/* Hero Content */}
        <div className="space-y-6 mb-12">
          <h1 className="text-5xl sm:text-6xl font-bold text-heaton-gray font-heading tracking-tight">
            HEATON
            <br />
            <span className="text-heaton-blue">DIRECTORY</span>
          </h1>
          <p className="text-xl text-heaton-gray-light font-medium max-w-lg mx-auto leading-relaxed">
            Access contact information for all employees in the Heaton organization
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-modern border border-gray-100">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-heaton-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-heaton-gray mb-2">Search</h3>
            <p className="text-sm text-heaton-gray-light">Find employees by name, team, or location</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-modern border border-gray-100">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-heaton-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="font-semibold text-heaton-gray mb-2">Contact</h3>
            <p className="text-sm text-heaton-gray-light">Extensions, DIDs, and email addresses</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-modern border border-gray-100">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-heaton-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-heaton-gray mb-2">Mobile</h3>
            <p className="text-sm text-heaton-gray-light">Optimized for all devices</p>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <Link
            href="/auth/signin"
            className="btn-modern bg-heaton-blue text-white hover:bg-heaton-blue-dark focus:ring-blue-500 inline-flex items-center space-x-2 text-lg px-8 py-4"
          >
            <span>Access Directory</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="text-sm text-heaton-gray-light">
            Secure authentication required
          </p>
        </div>
      </div>
    </main>
  )
}