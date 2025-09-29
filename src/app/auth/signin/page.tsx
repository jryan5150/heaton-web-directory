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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-heaton rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
            <span className="text-white font-bold text-2xl font-heading">H</span>
          </div>
          <h2 className="text-3xl font-bold text-heaton-gray font-heading">
            WELCOME BACK
          </h2>
          <p className="mt-2 text-heaton-gray-light font-medium">
            Sign in to access the Heaton employee directory
          </p>
        </div>

        {/* Sign In Form */}
        <div className="bg-white rounded-xl shadow-modern-lg border border-gray-100 overflow-hidden">
          <form className="p-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-heaton-gray mb-2">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="input-modern"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-heaton-gray mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="input-modern"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-modern bg-heaton-blue text-white hover:bg-heaton-blue-dark focus:ring-blue-500 w-full"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="bg-blue-50 border-t border-blue-100 p-6">
            <h3 className="text-sm font-semibold text-heaton-gray mb-3">Demo Credentials</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-2 bg-white rounded-lg border">
                <span className="text-heaton-gray">
                  <strong>Admin:</strong> admin / password123
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white rounded-lg border">
                <span className="text-heaton-gray">
                  <strong>User:</strong> user / user123
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}