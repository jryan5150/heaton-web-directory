'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon, MapPinIcon, UserGroupIcon, XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline'

interface SearchAndFiltersProps {
  onSearchChange: (search: string) => void
  onLocationChange: (location: string) => void
  onTeamChange: (team: string) => void
  locations: string[]
  teams: string[]
}

export default function SearchAndFilters({
  onSearchChange,
  onLocationChange,
  onTeamChange,
  locations,
  teams
}: SearchAndFiltersProps) {
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [team, setTeam] = useState('')
  const [isFilterExpanded, setIsFilterExpanded] = useState(false)

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onSearchChange(value)
  }

  const handleLocationChange = (value: string) => {
    setLocation(value)
    onLocationChange(value)
  }

  const handleTeamChange = (value: string) => {
    setTeam(value)
    onTeamChange(value)
  }

  const clearFilters = () => {
    setSearch('')
    setLocation('')
    setTeam('')
    onSearchChange('')
    onLocationChange('')
    onTeamChange('')
  }

  const hasActiveFilters = search || location || team

  return (
    <div className="bg-white rounded-xl shadow-modern border border-gray-100 overflow-hidden mb-8">
      {/* Main Search Bar */}
      <div className="p-6 pb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-heaton-gray-light" />
          </div>
          <input
            type="text"
            placeholder="Search employees by name or email..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="input-modern pl-12 pr-4 text-lg h-14"
          />
        </div>
      </div>

      {/* Filter Toggle */}
      <div className="px-6 pb-4">
        <button
          onClick={() => setIsFilterExpanded(!isFilterExpanded)}
          className="flex items-center space-x-2 text-heaton-blue hover:text-heaton-blue-dark font-medium transition-colors"
        >
          <FunnelIcon className="w-4 h-4" />
          <span className="text-sm font-medium">
            {isFilterExpanded ? 'Hide Filters' : 'Show Filters'}
          </span>
          {hasActiveFilters && (
            <span className="bg-heaton-blue text-white text-xs px-2 py-1 rounded-full">
              {[location, team].filter(Boolean).length}
            </span>
          )}
        </button>
      </div>

      {/* Expanded Filters */}
      {isFilterExpanded && (
        <div className="border-t border-gray-100 bg-gray-50">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Location Filter */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-heaton-gray mb-3">
                  <MapPinIcon className="w-4 h-4 text-heaton-blue" />
                  <span>Location</span>
                </label>
                <select
                  value={location}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  className="input-modern"
                >
                  <option value="">All Locations</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Team Filter */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-heaton-gray mb-3">
                  <UserGroupIcon className="w-4 h-4 text-heaton-blue" />
                  <span>Team</span>
                </label>
                <select
                  value={team}
                  onChange={(e) => handleTeamChange(e.target.value)}
                  className="input-modern"
                >
                  <option value="">All Teams</option>
                  {teams.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  disabled={!hasActiveFilters}
                  className="btn-modern bg-gray-200 text-heaton-gray hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 w-full justify-center"
                >
                  <XMarkIcon className="w-4 h-4" />
                  <span>Clear All</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="border-t border-gray-100 px-6 py-3 bg-blue-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-heaton-gray">Active filters:</span>
              <div className="flex items-center space-x-2">
                {location && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-heaton-blue">
                    <MapPinIcon className="w-3 h-3 mr-1" />
                    {location}
                  </span>
                )}
                {team && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-heaton-blue">
                    <UserGroupIcon className="w-3 h-3 mr-1" />
                    {team}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={clearFilters}
              className="text-xs text-heaton-blue hover:text-heaton-blue-dark font-medium"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  )
}