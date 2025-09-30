'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { sampleEmployees } from '@/lib/sampleData'
import { Employee } from '@/types/employee'
import DirectoryHeader from '@/components/DirectoryHeader'
import SearchAndFilters from '@/components/SearchAndFilters'
import EmployeeCard from '@/components/EmployeeCard'

export default function Directory() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [employees, setEmployees] = useState<Employee[]>(sampleEmployees)
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>(sampleEmployees)
  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [teamFilter, setTeamFilter] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    let filtered = employees

    if (searchTerm) {
      filtered = filtered.filter(employee =>
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (locationFilter) {
      filtered = filtered.filter(employee => employee.location === locationFilter)
    }

    if (teamFilter) {
      filtered = filtered.filter(employee => employee.team === teamFilter)
    }

    setFilteredEmployees(filtered)
  }, [employees, searchTerm, locationFilter, teamFilter])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const uniqueLocations = Array.from(new Set(employees.map(emp => emp.location))).sort()
  const uniqueTeams = Array.from(new Set(employees.map(emp => emp.team))).sort()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-300/10 to-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <DirectoryHeader />

        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Enhanced Search Section */}
          <div className="mb-8 animate-fade-in">
            <SearchAndFilters
              onSearchChange={setSearchTerm}
              onLocationChange={setLocationFilter}
              onTeamChange={setTeamFilter}
              locations={uniqueLocations}
              teams={uniqueTeams}
            />
          </div>

          {/* Results Summary with Animation */}
          <div className="mb-8 animate-slide-up">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-modern border border-white/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gradient-heaton rounded-full animate-pulse"></div>
                    <p className="text-lg font-semibold text-heaton-gray font-heading">
                      <span className="text-2xl font-bold text-heaton-blue">{filteredEmployees.length}</span>
                      <span className="text-heaton-gray-light ml-1">of {employees.length} employees</span>
                    </p>
                  </div>
                  {(searchTerm || locationFilter || teamFilter) && (
                    <div className="flex items-center space-x-2 bg-blue-100 text-heaton-blue px-3 py-1 rounded-full text-sm font-medium">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      <span>Filtered view</span>
                    </div>
                  )}
                </div>

                <div className="hidden sm:flex items-center space-x-4 text-sm text-heaton-gray-light">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span>Live directory</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Employee Grid with Staggered Animation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {filteredEmployees.map((employee, index) => (
              <div
                key={employee.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <EmployeeCard employee={employee} />
              </div>
            ))}
          </div>

          {/* Enhanced Empty State */}
          {filteredEmployees.length === 0 && (
            <div className="text-center py-20 animate-fade-in">
              <div className="relative mb-8">
                <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6 shadow-modern">
                  <svg className="w-16 h-16 text-heaton-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-heaton rounded-full blur-md opacity-20 animate-pulse"></div>
              </div>
              <h3 className="text-2xl font-bold text-heaton-gray font-heading mb-4">
                No employees found
              </h3>
              <p className="text-heaton-gray-light max-w-lg mx-auto text-lg leading-relaxed mb-8">
                We couldn't find anyone matching your search criteria. Try adjusting your filters or search terms.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setLocationFilter('')
                  setTeamFilter('')
                }}
                className="btn-modern bg-heaton-blue text-white hover:bg-heaton-blue-dark focus:ring-blue-500 inline-flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Reset Filters</span>
              </button>
            </div>
          )}

          {/* Stats Footer */}
          {filteredEmployees.length > 0 && (
            <div className="mt-16 pt-8 border-t border-white/20 animate-fade-in-delay">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-modern border border-white/50">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-heaton-blue font-heading">{uniqueLocations.length}</div>
                    <div className="text-sm text-heaton-gray-light">Locations</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-heaton-blue font-heading">{uniqueTeams.length}</div>
                    <div className="text-sm text-heaton-gray-light">Teams</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-heaton-blue font-heading">{employees.length}</div>
                    <div className="text-sm text-heaton-gray-light">Total Employees</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-heaton-blue font-heading">100%</div>
                    <div className="text-sm text-heaton-gray-light">Coverage</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}