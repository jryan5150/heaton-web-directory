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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-heaton rounded-2xl flex items-center justify-center shadow-modern-lg mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-2xl font-heading">H</span>
          </div>
          <div className="text-lg text-heaton-gray animate-pulse">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-300/20 to-cyan-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="max-w-4xl w-full text-center">
          {/* Animated Brand Logo */}
          <div className="relative mb-12">
            <div className="w-24 h-24 bg-gradient-heaton rounded-3xl flex items-center justify-center shadow-modern-lg mx-auto mb-8 animate-bounce-slow">
              <span className="text-white font-bold text-4xl font-heading drop-shadow-sm">H</span>
            </div>
            <div className="absolute -inset-4 bg-gradient-heaton rounded-full blur-md opacity-30 animate-pulse"></div>
          </div>

          {/* Enhanced Hero Content */}
          <div className="space-y-8 mb-16">
            <div className="space-y-4">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-heaton-gray font-heading tracking-tight animate-fade-in">
                HEATON
              </h1>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-heaton-blue font-heading tracking-tight animate-fade-in-delay">
                DIRECTORY
              </h2>
            </div>
            <p className="text-xl sm:text-2xl text-heaton-gray-light font-medium max-w-2xl mx-auto leading-relaxed animate-fade-in-delay-2">
              Your gateway to seamless communication within the Heaton organization
            </p>
          </div>

          {/* Enhanced Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-modern border border-white/50 hover:shadow-modern-lg transition-all duration-300 hover:-translate-y-2 animate-slide-up">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-heaton-gray mb-3 font-heading">SMART SEARCH</h3>
              <p className="text-heaton-gray-light leading-relaxed">Advanced search capabilities to find employees by name, team, location, or role instantly</p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-modern border border-white/50 hover:shadow-modern-lg transition-all duration-300 hover:-translate-y-2 animate-slide-up-delay">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-heaton-gray mb-3 font-heading">DIRECT CONTACT</h3>
              <p className="text-heaton-gray-light leading-relaxed">Complete contact information including extensions, direct phone lines, and email addresses</p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-modern border border-white/50 hover:shadow-modern-lg transition-all duration-300 hover:-translate-y-2 animate-slide-up-delay-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-heaton-gray mb-3 font-heading">MOBILE READY</h3>
              <p className="text-heaton-gray-light leading-relaxed">Responsive design optimized for desktop, tablet, and mobile devices with touch-friendly interface</p>
            </div>
          </div>

          {/* Enhanced CTA Section */}
          <div className="space-y-6 animate-fade-in-delay-3">
            <div className="relative">
              <Link
                href="/auth/signin"
                className="relative group btn-modern bg-gradient-heaton text-white hover:shadow-modern-lg focus:ring-blue-500 inline-flex items-center space-x-3 text-xl font-semibold px-12 py-5 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Access Directory</span>
                <svg className="relative z-10 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
            <div className="flex items-center justify-center space-x-2 text-heaton-gray-light">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Secure authentication required</span>
            </div>
          </div>

          {/* Subtle Stats Section */}
          <div className="mt-20 pt-12 border-t border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="animate-fade-in-delay-4">
                <div className="text-2xl font-bold text-heaton-blue font-heading">10+</div>
                <div className="text-sm text-heaton-gray-light">Employees</div>
              </div>
              <div className="animate-fade-in-delay-4">
                <div className="text-2xl font-bold text-heaton-blue font-heading">4</div>
                <div className="text-sm text-heaton-gray-light">Locations</div>
              </div>
              <div className="animate-fade-in-delay-4">
                <div className="text-2xl font-bold text-heaton-blue font-heading">6</div>
                <div className="text-sm text-heaton-gray-light">Teams</div>
              </div>
              <div className="animate-fade-in-delay-4">
                <div className="text-2xl font-bold text-heaton-blue font-heading">24/7</div>
                <div className="text-sm text-heaton-gray-light">Access</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}