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

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <SearchAndFilters
          onSearchChange={setSearchTerm}
          onLocationChange={setLocationFilter}
          onTeamChange={setTeamFilter}
          locations={uniqueLocations}
          teams={uniqueTeams}
        />

        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredEmployees.length} of {employees.length} employees
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No employees found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  )
}