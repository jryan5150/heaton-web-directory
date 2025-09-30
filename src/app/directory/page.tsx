'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { sampleEmployees } from '@/lib/sampleData'
import { Employee } from '@/types/employee'
import DirectoryHeader from '@/components/DirectoryHeader'
import FigmaSearchAndFilters from '@/components/FigmaSearchAndFilters'
import FigmaEmployeeCard from '@/components/FigmaEmployeeCard'
import CSVImport from '@/components/CSVImport'
import DebugCSV from '@/components/DebugCSV'
import { CloudArrowUpIcon } from '@heroicons/react/24/outline'

export default function Directory() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'employees' | 'teams'>('employees')
  const [employees, setEmployees] = useState<Employee[]>(sampleEmployees)
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>(sampleEmployees)
  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [teamFilter, setTeamFilter] = useState('')
  const [showCSVImport, setShowCSVImport] = useState(false)
  const [isImported, setIsImported] = useState(false)

  // useEffect(() => {
  //   if (status === 'unauthenticated') {
  //     router.push('/auth/signin')
  //   }
  // }, [status, router])

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

  const handleCSVImport = (importedEmployees: Employee[]) => {
    setEmployees(importedEmployees)
    setIsImported(true)
    setShowCSVImport(false)
    // Reset filters when new data is imported
    setSearchTerm('')
    setLocationFilter('')
    setTeamFilter('')
  }

  const handleDataUpdate = (newEmployees: Employee[]) => {
    setEmployees(newEmployees)
    setIsImported(false)
    // Reset filters when data is updated
    setSearchTerm('')
    setLocationFilter('')
    setTeamFilter('')
  }

  // if (status === 'loading') {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-lg">Loading...</div>
  //     </div>
  //   )
  // }

  // if (!session) {
  //   return null
  // }

  const uniqueLocations = Array.from(new Set(employees.map(emp => emp.location))).sort()
  const uniqueTeams = Array.from(new Set(employees.map(emp => emp.team))).sort()

  return (
    <div className="min-h-screen bg-gray-50">
      <DebugCSV />
      <DirectoryHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === 'employees' ? (
        <>
          <FigmaSearchAndFilters
            onSearchChange={setSearchTerm}
            onLocationChange={setLocationFilter}
            onTeamChange={setTeamFilter}
            locations={uniqueLocations}
            teams={uniqueTeams}
          />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

            {/* Results Count */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-gray-600">
                    Showing <span className="font-semibold text-gray-900">{filteredEmployees.length}</span> of{' '}
                    <span className="font-semibold text-gray-900">{employees.length}</span> employees
                  </p>
                  {(searchTerm || locationFilter || teamFilter) && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Filtered
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setShowCSVImport(true)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <CloudArrowUpIcon className="w-4 h-4 mr-2" />
                  Import CSV
                </button>
              </div>
            </div>

            {/* Employee Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmployees.map((employee) => (
                <FigmaEmployeeCard key={employee.id} employee={employee} />
              ))}
            </div>

            {/* Empty State */}
            {filteredEmployees.length === 0 && (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No employees found
                </h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search or filter criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setLocationFilter('')
                    setTeamFilter('')
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Clear filters
                </button>
              </div>
            )}
          </main>
        </>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Teams & Departments</h2>
            <p className="text-gray-600">Team management functionality coming soon.</p>
          </div>
        </div>
      )}

      {/* CSV Import Modal */}
      {showCSVImport && (
        <CSVImport
          onImportComplete={handleCSVImport}
          onClose={() => setShowCSVImport(false)}
        />
      )}
    </div>
  )
}