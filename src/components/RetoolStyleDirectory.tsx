'use client'

import { useEffect, useState, useMemo } from 'react'
import { Employee } from '@/types/employee'
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

interface RetoolStyleDirectoryProps {
  employees: Employee[]
}

type SortField = 'name' | 'department' | 'location' | 'extension'
type SortDirection = 'asc' | 'desc'

export default function RetoolStyleDirectory({ employees: initialEmployees }: RetoolStyleDirectoryProps) {
  const [employees] = useState(initialEmployees)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  // Get unique locations and departments
  const locations = useMemo(() =>
    ['all', ...Array.from(new Set(employees.map(emp => emp.location))).sort()],
    [employees]
  )
  const departments = useMemo(() =>
    ['all', ...Array.from(new Set(employees.map(emp => emp.department).filter(Boolean))).sort()] as string[],
    [employees]
  )

  // Filter and sort employees
  const filteredAndSortedEmployees = useMemo(() => {
    let filtered = employees

    // Search filter
    if (searchTerm) {
      const query = searchTerm.toLowerCase()
      filtered = filtered.filter(emp =>
        emp.firstName.toLowerCase().includes(query) ||
        emp.lastName.toLowerCase().includes(query) ||
        emp.email?.toLowerCase().includes(query) ||
        emp.department?.toLowerCase().includes(query) ||
        emp.location.toLowerCase().includes(query)
      )
    }

    // Location filter
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(emp => emp.location === selectedLocation)
    }

    // Department filter
    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(emp => emp.department === selectedDepartment)
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      let aVal: string, bVal: string

      switch (sortField) {
        case 'name':
          aVal = `${a.lastName} ${a.firstName}`
          bVal = `${b.lastName} ${b.firstName}`
          break
        case 'department':
          aVal = a.department || ''
          bVal = b.department || ''
          break
        case 'location':
          aVal = a.location
          bVal = b.location
          break
        case 'extension':
          aVal = a.extension || ''
          bVal = b.extension || ''
          break
        default:
          aVal = a.lastName
          bVal = b.lastName
      }

      const comparison = aVal.localeCompare(bVal)
      return sortDirection === 'asc' ? comparison : -comparison
    })

    return sorted
  }, [employees, searchTerm, selectedLocation, selectedDepartment, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowsUpDownIcon className="w-4 h-4 text-gray-400" />
    }
    return sortDirection === 'asc' ? (
      <ChevronUpIcon className="w-4 h-4 text-heaton-blue" />
    ) : (
      <ChevronDownIcon className="w-4 h-4 text-heaton-blue" />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Employee Directory</h1>
              <p className="text-sm text-gray-600 mt-1">
                {filteredAndSortedEmployees.length} of {employees.length} employees
              </p>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <div className="flex-1 min-w-[300px] relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-heaton-blue focus:border-transparent"
              />
            </div>

            {/* Location Filter */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-heaton-blue focus:border-transparent bg-white"
            >
              <option value="all">All Locations</option>
              {locations.slice(1).map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>

            {/* Department Filter */}
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-heaton-blue focus:border-transparent bg-white"
            >
              <option value="all">All Departments</option>
              {departments.slice(1).map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            {/* Clear Filters */}
            {(searchTerm || selectedLocation !== 'all' || selectedDepartment !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedLocation('all')
                  setSelectedDepartment('all')
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-2">
                      Name
                      <SortIcon field="name" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('department')}
                  >
                    <div className="flex items-center gap-2">
                      Department
                      <SortIcon field="department" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('location')}
                  >
                    <div className="flex items-center gap-2">
                      Location
                      <SortIcon field="location" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('extension')}
                  >
                    <div className="flex items-center gap-2">
                      Extension
                      <SortIcon field="extension" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAndSortedEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      <MagnifyingGlassIcon className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p className="text-lg font-medium">No employees found</p>
                      <p className="text-sm mt-1">Try adjusting your search or filters</p>
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedEmployees.map((employee) => (
                    <tr
                      key={employee.id}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedEmployee(employee)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-heaton-blue to-heaton-blue-dark flex items-center justify-center text-white font-semibold text-sm">
                            {employee.firstName[0]}{employee.lastName[0]}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {employee.firstName} {employee.lastName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {employee.department || '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPinIcon className="w-4 h-4 text-gray-400" />
                          {employee.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {employee.email ? (
                          <a
                            href={`mailto:${employee.email}`}
                            className="text-heaton-blue hover:text-heaton-blue-dark hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {employee.email}
                          </a>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {employee.extension ? (
                          <span className="font-mono">{employee.extension}</span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedEmployee(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-heaton-blue to-heaton-blue-dark flex items-center justify-center text-white font-bold text-2xl">
                {selectedEmployee.firstName[0]}{selectedEmployee.lastName[0]}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedEmployee.firstName} {selectedEmployee.lastName}
                </h2>
                {selectedEmployee.department && (
                  <p className="text-gray-600 mt-1">{selectedEmployee.department}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedEmployee(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {selectedEmployee.email && (
                <div className="flex items-center gap-3 text-gray-700">
                  <EnvelopeIcon className="w-5 h-5 text-heaton-blue" />
                  <a
                    href={`mailto:${selectedEmployee.email}`}
                    className="text-heaton-blue hover:underline"
                  >
                    {selectedEmployee.email}
                  </a>
                </div>
              )}

              {selectedEmployee.extension && (
                <div className="flex items-center gap-3 text-gray-700">
                  <PhoneIcon className="w-5 h-5 text-heaton-blue" />
                  <span>Extension: {selectedEmployee.extension}</span>
                </div>
              )}

              {selectedEmployee.location && (
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPinIcon className="w-5 h-5 text-heaton-blue" />
                  <span>{selectedEmployee.location}</span>
                </div>
              )}

              {selectedEmployee.department && (
                <div className="flex items-center gap-3 text-gray-700">
                  <UserGroupIcon className="w-5 h-5 text-heaton-blue" />
                  <span>{selectedEmployee.department}</span>
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3">
              {selectedEmployee.email && (
                <a
                  href={`mailto:${selectedEmployee.email}`}
                  className="flex-1 px-4 py-2 bg-heaton-blue text-white rounded-lg hover:bg-heaton-blue-dark transition-colors text-center font-medium"
                >
                  Send Email
                </a>
              )}
              <button
                onClick={() => setSelectedEmployee(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}