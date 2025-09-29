'use client'

import { useState } from 'react'

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

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by name..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <select
            id="location"
            value={location}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="team" className="block text-sm font-medium text-gray-700 mb-2">
            Team
          </label>
          <select
            id="team"
            value={team}
            onChange={(e) => handleTeamChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Teams</option>
            {teams.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={clearFilters}
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  )
}