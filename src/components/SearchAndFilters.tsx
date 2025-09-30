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
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-modern border border-white/50 overflow-hidden mb-8 animate-scale-in">
      {/* Main Search Bar */}
      <div className="p-6 pb-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-6 w-6 text-heaton-gray-light group-focus-within:text-heaton-blue transition-colors duration-300" />
          </div>
          <input
            type="text"
            placeholder="Search employees by name or email..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="input-modern pl-14 pr-4 text-lg h-16 focus-ring-modern border-2 border-transparent focus:border-heaton-blue/20"
          />
          {search && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <button
                onClick={() => handleSearchChange('')}
                className="text-heaton-gray-light hover:text-heaton-blue transition-colors duration-200 p-1 rounded-lg hover:bg-blue-50"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filter Toggle */}
      <div className="px-6 pb-4">
        <button
          onClick={() => setIsFilterExpanded(!isFilterExpanded)}
          className="group flex items-center space-x-3 text-heaton-blue hover:text-heaton-blue-dark font-semibold transition-all duration-300 hover-scale p-2 rounded-lg hover:bg-blue-50/50"
        >
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
            <FunnelIcon className={`w-4 h-4 transition-transform duration-300 ${isFilterExpanded ? 'rotate-180' : ''}`} />
          </div>
          <span className="text-sm font-medium">
            {isFilterExpanded ? 'Hide Filters' : 'Show Filters'}
          </span>
          {hasActiveFilters && (
            <span className="bg-gradient-heaton text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm animate-pulse-glow">
              {[location, team].filter(Boolean).length}
            </span>
          )}
        </button>
      </div>

      {/* Expanded Filters */}
      {isFilterExpanded && (
        <div className="border-t border-white/20 bg-blue-50/30 backdrop-blur-sm animate-slide-up">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-stagger">
              {/* Location Filter */}
              <div className="animate-scale-in">
                <label className="flex items-center space-x-3 text-sm font-bold text-heaton-gray mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center">
                    <MapPinIcon className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span>Location</span>
                </label>
                <select
                  value={location}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  className="input-modern focus-ring-modern border-2 border-transparent focus:border-emerald-300/50"
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
              <div className="animate-scale-in">
                <label className="flex items-center space-x-3 text-sm font-bold text-heaton-gray mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                    <UserGroupIcon className="w-4 h-4 text-heaton-blue" />
                  </div>
                  <span>Team</span>
                </label>
                <select
                  value={team}
                  onChange={(e) => handleTeamChange(e.target.value)}
                  className="input-modern focus-ring-modern border-2 border-transparent focus:border-blue-300/50"
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
              <div className="flex items-end animate-scale-in">
                <button
                  onClick={clearFilters}
                  disabled={!hasActiveFilters}
                  className="group btn-modern bg-white/70 backdrop-blur-sm border border-gray-200 text-heaton-gray hover:bg-red-50 hover:border-red-200 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 w-full justify-center transition-all duration-300 hover-lift"
                >
                  <XMarkIcon className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                  <span>Clear All</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="border-t border-white/20 px-6 py-4 bg-blue-50/50 backdrop-blur-sm animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-heaton-blue rounded-full animate-pulse"></div>
                <span className="text-sm font-bold text-heaton-gray">Active filters:</span>
              </div>
              <div className="flex items-center space-x-2">
                {location && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/80 backdrop-blur-sm border border-emerald-200 text-emerald-700 shadow-sm hover-scale">
                    <MapPinIcon className="w-3 h-3 mr-1" />
                    {location}
                  </span>
                )}
                {team && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/80 backdrop-blur-sm border border-blue-200 text-heaton-blue shadow-sm hover-scale">
                    <UserGroupIcon className="w-3 h-3 mr-1" />
                    {team}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={clearFilters}
              className="text-xs text-heaton-blue hover:text-red-600 font-bold hover-scale transition-colors duration-300"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  )
}