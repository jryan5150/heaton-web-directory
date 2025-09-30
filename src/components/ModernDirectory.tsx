'use client'

import { useEffect, useState } from 'react'
import { Employee } from '@/types/employee'
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  UserGroupIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline'

interface ModernDirectoryProps {
  employees: Employee[]
}

export default function ModernDirectory({ employees: initialEmployees }: ModernDirectoryProps) {
  const [employees] = useState(initialEmployees)
  const [filteredEmployees, setFilteredEmployees] = useState(initialEmployees)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Get unique values
  const departments = ['all', ...Array.from(new Set(employees.map(e => e.department).filter(Boolean))).sort()]
  const locations = ['all', ...Array.from(new Set(employees.map(e => e.location))).sort()]

  // Filter employees
  useEffect(() => {
    let filtered = employees

    if (searchTerm) {
      const query = searchTerm.toLowerCase()
      filtered = filtered.filter(emp =>
        emp.firstName.toLowerCase().includes(query) ||
        emp.lastName.toLowerCase().includes(query) ||
        emp.extension?.toLowerCase().includes(query) ||
        emp.department?.toLowerCase().includes(query) ||
        emp.location.toLowerCase().includes(query) ||
        emp.email?.toLowerCase().includes(query)
      )
    }

    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(emp => emp.department === selectedDepartment)
    }

    if (selectedLocation !== 'all') {
      filtered = filtered.filter(emp => emp.location === selectedLocation)
    }

    setFilteredEmployees(filtered)
  }, [searchTerm, selectedDepartment, selectedLocation, employees])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {sidebarOpen ? (
                  <XMarkIcon className="w-6 h-6 text-gray-600" />
                ) : (
                  <Bars3Icon className="w-6 h-6 text-gray-600" />
                )}
              </button>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-heaton-blue to-heaton-blue-dark rounded-lg flex items-center justify-center">
                  <BuildingOfficeIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Heaton Eye Associates</h1>
                  <p className="text-xs text-gray-600 hidden sm:block">Employee Directory</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 hidden sm:inline">
                {filteredEmployees.length} employees
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ top: '64px' }}
        >
          <div className="h-full overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Search Directory
                </label>
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, extension, etc."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-heaton-blue focus:border-transparent transition-all"
                  />
                </div>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="mt-2 text-xs text-heaton-blue hover:text-heaton-blue-dark"
                  >
                    Clear search
                  </button>
                )}
              </div>

              {/* Department Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <UserGroupIcon className="w-4 h-4 inline mr-1" />
                  Filter by Department
                </label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-heaton-blue focus:border-transparent transition-all"
                >
                  <option value="all">All Departments</option>
                  {departments.slice(1).map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPinIcon className="w-4 h-4 inline mr-1" />
                  Filter by Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-heaton-blue focus:border-transparent transition-all"
                >
                  <option value="all">All Locations</option>
                  {locations.slice(1).map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Active Filters */}
              {(selectedDepartment !== 'all' || selectedLocation !== 'all' || searchTerm) && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-700">Active Filters</span>
                    <button
                      onClick={() => {
                        setSearchTerm('')
                        setSelectedDepartment('all')
                        setSelectedLocation('all')
                      }}
                      className="text-xs text-heaton-blue hover:text-heaton-blue-dark"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="space-y-2">
                    {searchTerm && (
                      <div className="flex items-center justify-between text-sm bg-blue-50 px-3 py-2 rounded-lg">
                        <span className="text-gray-700">Search: "{searchTerm}"</span>
                        <button onClick={() => setSearchTerm('')} className="text-gray-500 hover:text-gray-700">
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    {selectedDepartment !== 'all' && (
                      <div className="flex items-center justify-between text-sm bg-blue-50 px-3 py-2 rounded-lg">
                        <span className="text-gray-700">{selectedDepartment}</span>
                        <button onClick={() => setSelectedDepartment('all')} className="text-gray-500 hover:text-gray-700">
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    {selectedLocation !== 'all' && (
                      <div className="flex items-center justify-between text-sm bg-blue-50 px-3 py-2 rounded-lg">
                        <span className="text-gray-700">{selectedLocation}</span>
                        <button onClick={() => setSelectedLocation('all')} className="text-gray-500 hover:text-gray-700">
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Directory Stats</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Total Employees:</span>
                    <span className="font-semibold text-gray-900">{employees.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Showing:</span>
                    <span className="font-semibold text-heaton-blue">{filteredEmployees.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Departments:</span>
                    <span className="font-semibold text-gray-900">{departments.length - 1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Locations:</span>
                    <span className="font-semibold text-gray-900">{locations.length - 1}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            style={{ top: '64px' }}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {filteredEmployees.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <MagnifyingGlassIcon className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No employees found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedDepartment('all')
                  setSelectedLocation('all')
                }}
                className="px-6 py-2 bg-heaton-blue text-white rounded-lg hover:bg-heaton-blue-dark transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {filteredEmployees.map((employee) => (
                <div
                  key={employee.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-heaton-blue transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    {/* Avatar & Name */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-heaton-blue to-heaton-blue-dark flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {employee.firstName[0]}{employee.lastName[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-bold text-gray-900 truncate">
                          {employee.firstName} {employee.lastName}
                        </h2>
                        {employee.title && (
                          <p className="text-sm text-gray-600 truncate">{employee.title}</p>
                        )}
                      </div>
                    </div>

                    {/* Info Grid */}
                    <div className="space-y-3 mb-4">
                      {employee.department && (
                        <div className="flex items-center gap-2 text-sm">
                          <UserGroupIcon className="w-4 h-4 text-heaton-blue flex-shrink-0" />
                          <span className="text-gray-700 truncate">{employee.department}</span>
                        </div>
                      )}
                      {employee.team && (
                        <div className="flex items-center gap-2 text-sm">
                          <UserGroupIcon className="w-4 h-4 text-heaton-blue flex-shrink-0" />
                          <span className="text-gray-700 truncate">{employee.team}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm">
                        <MapPinIcon className="w-4 h-4 text-heaton-blue flex-shrink-0" />
                        <span className="text-gray-700">{employee.location}</span>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="pt-4 border-t border-gray-100 space-y-2">
                      {employee.email && (
                        <a
                          href={`mailto:${employee.email}`}
                          className="flex items-center gap-2 text-sm text-heaton-blue hover:text-heaton-blue-dark transition-colors group"
                        >
                          <EnvelopeIcon className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate group-hover:underline">{employee.email}</span>
                        </a>
                      )}
                      {employee.extension && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <PhoneIcon className="w-4 h-4 flex-shrink-0" />
                          <span>Ext. <span className="font-mono font-semibold">{employee.extension}</span></span>
                        </div>
                      )}
                      {employee.phoneNumber && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <PhoneIcon className="w-4 h-4 flex-shrink-0" />
                          <span className="font-mono">{employee.phoneNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}