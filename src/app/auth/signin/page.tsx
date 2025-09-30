'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid credentials')
      } else {
        router.push('/directory')
      }
    } catch (error) {
      setError('An error occurred during sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-300/10 to-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Enhanced Header with Animation */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="relative mb-8">
              <div className="w-20 h-20 bg-gradient-heaton rounded-3xl flex items-center justify-center shadow-modern-lg mx-auto mb-6 animate-bounce-slow">
                <span className="text-white font-bold text-3xl font-heading drop-shadow-sm">H</span>
              </div>
              <div className="absolute -inset-4 bg-gradient-heaton rounded-full blur-md opacity-20 animate-pulse"></div>
            </div>
            <h1 className="text-4xl font-bold text-heaton-gray font-heading tracking-tight mb-2">
              WELCOME BACK
            </h1>
            <p className="text-lg text-heaton-gray-light font-medium">
              Sign in to access the Heaton employee directory
            </p>
          </div>

          {/* Enhanced Sign In Form with Glassmorphism */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-modern-lg border border-white/50 overflow-hidden animate-slide-up">
            <form className="p-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                  <label htmlFor="username" className="block text-sm font-semibold text-heaton-gray mb-3">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-heaton-gray-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      className="input-modern pl-10 text-lg"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  <label htmlFor="password" className="block text-sm font-semibold text-heaton-gray mb-3">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-heaton-gray-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="input-modern pl-10 text-lg"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium animate-fade-in">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <button
                  type="submit"
                  disabled={loading}
                  className="relative group btn-modern bg-gradient-heaton text-white hover:shadow-modern-lg focus:ring-blue-500 w-full text-lg font-semibold py-4 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {loading ? (
                    <div className="relative z-10 flex items-center justify-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="relative z-10 flex items-center justify-center space-x-2">
                      <span>Sign In</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  )}
                </button>
              </div>
            </form>

            {/* Enhanced Demo Credentials Section */}
            <div className="bg-blue-50/60 backdrop-blur-sm border-t border-blue-100/50 p-6 animate-fade-in-delay">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-heaton-gray font-heading">Demo Access</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="group bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-white/50 hover:bg-white/90 transition-all duration-200 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      <span className="text-heaton-gray font-medium">
                        <strong className="text-heaton-blue">Admin:</strong> admin / password123
                      </span>
                    </div>
                  </div>
                </div>
                <div className="group bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-white/50 hover:bg-white/90 transition-all duration-200 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-heaton-gray font-medium">
                        <strong className="text-heaton-blue">User:</strong> user / user123
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-8 text-center animate-fade-in-delay-2">
            <div className="flex items-center justify-center space-x-2 text-heaton-gray-light">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Secure authentication system</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}