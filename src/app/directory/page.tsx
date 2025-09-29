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
    <div className="min-h-screen bg-gray-50">
      <DirectoryHeader />

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <SearchAndFilters
          onSearchChange={setSearchTerm}
          onLocationChange={setLocationFilter}
          onTeamChange={setTeamFilter}
          locations={uniqueLocations}
          teams={uniqueTeams}
        />

        {/* Results Summary */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <p className="text-sm font-medium text-heaton-gray">
              <span className="font-bold text-heaton-blue">{filteredEmployees.length}</span> of {employees.length} employees
            </p>
            {(searchTerm || locationFilter || teamFilter) && (
              <div className="flex items-center space-x-2 text-xs text-heaton-gray-light">
                <span>•</span>
                <span>Filtered results</span>
              </div>
            )}
          </div>
        </div>

        {/* Employee Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>

        {/* Empty State */}
        {filteredEmployees.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-heaton-gray font-heading mb-2">
              No employees found
            </h3>
            <p className="text-heaton-gray-light max-w-md mx-auto">
              Try adjusting your search terms or filters to find the employees you're looking for.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}