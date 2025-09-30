'use client'

import { useEffect, useState } from 'react'
import { Employee } from '@/types/employee'
import { MagnifyingGlassIcon, FunnelIcon, BuildingOfficeIcon, UserGroupIcon, PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'

interface ElegantDirectoryProps {
  employees: Employee[]
}

export default function ElegantDirectory({ employees: initialEmployees }: ElegantDirectoryProps) {
  const [employees, setEmployees] = useState(initialEmployees)
  const [filteredEmployees, setFilteredEmployees] = useState(initialEmployees)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  // Get unique locations and departments
  const locations = ['all', ...Array.from(new Set(employees.map(emp => emp.location))).sort()]
  const departments = ['all', ...Array.from(new Set(employees.map(emp => emp.department).filter(Boolean))).sort()] as string[]

  // Filter employees
  useEffect(() => {
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

    setFilteredEmployees(filtered)
  }, [searchTerm, selectedLocation, selectedDepartment, employees])

  const getInitials = (employee: Employee) => {
    return `${employee.firstName[0]}${employee.lastName[0]}`.toUpperCase()
  }

  const getGradientClass = (index: number) => {
    const gradients = [
      'from-blue-500 to-blue-600',
      'from-indigo-500 to-indigo-600',
      'from-cyan-500 to-cyan-600',
      'from-teal-500 to-teal-600',
    ]
    return gradients[index % gradients.length]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Logo and Title */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-heaton-blue to-heaton-blue-dark shadow-lg">
                <BuildingOfficeIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Heaton Eye Associates
                </h1>
                <p className="text-sm text-gray-600">Employee Directory</p>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-heaton-blue shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-heaton-blue shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                List
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-heaton-blue/20 focus:border-heaton-blue transition-all"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all"
            >
              <FunnelIcon className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filters</span>
              {(selectedLocation !== 'all' || selectedDepartment !== 'all') && (
                <span className="w-2 h-2 bg-heaton-blue rounded-full"></span>
              )}
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPinIcon className="w-4 h-4 inline mr-1" />
                    Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-heaton-blue/20 focus:border-heaton-blue"
                  >
                    {locations.map(location => (
                      <option key={location} value={location}>
                        {location === 'all' ? 'All Locations' : location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Department Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <UserGroupIcon className="w-4 h-4 inline mr-1" />
                    Department
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-heaton-blue/20 focus:border-heaton-blue"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>
                        {dept === 'all' ? 'All Departments' : dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedLocation !== 'all' || selectedDepartment !== 'all') && (
                <button
                  onClick={() => {
                    setSelectedLocation('all')
                    setSelectedDepartment('all')
                  }}
                  className="mt-3 text-sm text-heaton-blue hover:text-heaton-blue-dark font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredEmployees.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{employees.length}</span> employees
          </div>
        </div>
      </header>

      {/* Employee Grid/List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredEmployees.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <MagnifyingGlassIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No employees found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }
          >
            {filteredEmployees.map((employee, index) => (
              <div
                key={employee.id}
                className={`group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 ${
                  viewMode === 'list' ? 'flex items-center p-4 gap-4' : 'p-6'
                }`}
              >
                {/* Avatar */}
                <div className={`${viewMode === 'list' ? 'flex-shrink-0' : 'flex justify-center mb-4'}`}>
                  <div
                    className={`relative ${
                      viewMode === 'list' ? 'w-16 h-16' : 'w-20 h-20'
                    } rounded-full bg-gradient-to-br ${getGradientClass(index)} flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {getInitials(employee)}
                  </div>
                </div>

                {/* Info */}
                <div className={viewMode === 'list' ? 'flex-1 min-w-0' : 'text-center'}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-heaton-blue transition-colors truncate">
                    {employee.firstName} {employee.lastName}
                  </h3>

                  {employee.department && (
                    <p className="text-sm text-gray-600 mb-2 truncate">{employee.department}</p>
                  )}

                  {/* Contact Info */}
                  <div className={`space-y-2 ${viewMode === 'list' ? 'text-left' : ''}`}>
                    {employee.email && (
                      <a
                        href={`mailto:${employee.email}`}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-heaton-blue transition-colors group/email justify-center sm:justify-start"
                      >
                        <EnvelopeIcon className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{employee.email}</span>
                      </a>
                    )}

                    {employee.extension && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 justify-center sm:justify-start">
                        <PhoneIcon className="w-4 h-4 flex-shrink-0" />
                        <span>Ext. {employee.extension}</span>
                      </div>
                    )}

                    {employee.location && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 justify-center sm:justify-start">
                        <MapPinIcon className="w-4 h-4 flex-shrink-0" />
                        <span>{employee.location}</span>
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
  )
}