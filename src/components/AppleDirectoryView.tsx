'use client'

import { useEffect, useState } from 'react'
import { Employee } from '@/types/employee'
import { initializeLiveSearch, prepareEmployeeCards } from '@/lib/searchFilter'

interface AppleDirectoryViewProps {
  employees: Employee[]
}

export default function AppleDirectoryView({ employees }: AppleDirectoryViewProps) {
  const [searchResultsCount, setSearchResultsCount] = useState(employees.length)

  useEffect(() => {
    // Prepare employee cards for efficient searching
    prepareEmployeeCards('.employee-card')

    // Initialize live search
    const cleanup = initializeLiveSearch(
      'employee-search',
      '.employee-card',
      (searchTerm, visibleCount) => {
        setSearchResultsCount(visibleCount)
      }
    )

    // Cleanup on unmount
    return cleanup
  }, [employees])

  const getInitials = (employee: Employee) => {
    const firstInitial = employee.firstName?.[0] || ''
    const lastInitial = employee.lastName?.[0] || ''
    return `${firstInitial}${lastInitial}`.toUpperCase()
  }

  return (
    <div className="directory-container">
      {/* Header */}
      <header className="directory-header">
        <div className="header-content">
          <div className="flex items-center gap-md" style={{ marginBottom: '8px' }}>
            <h1 className="header-title" style={{ margin: 0 }}>Heaton Eye Associates</h1>
          </div>
          <p className="header-subtitle">
            Employee Directory
          </p>

          {/* Search Bar */}
          <div className="search-container">
            <div className="search-wrapper">
              {/* Search Icon */}
              <svg
                className="search-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              {/* Search Input */}
              <input
                id="employee-search"
                type="text"
                className="search-input"
                placeholder="Search by name or title..."
                autoComplete="off"
              />

              {/* Clear Button */}
              <button
                className="search-clear"
                onClick={() => {
                  const input = document.getElementById('employee-search') as HTMLInputElement
                  if (input) {
                    input.value = ''
                    input.dispatchEvent(new Event('input', { bubbles: true }))
                  }
                }}
                aria-label="Clear search"
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between" style={{ marginTop: '12px' }}>
              <p className="text-sm text-secondary">
                Showing {searchResultsCount} of {employees.length} employees
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="directory-main">
        {/* Employee Grid */}
        <div className="employee-grid">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="employee-card"
              data-search-text={`${employee.firstName} ${employee.lastName} ${employee.title || ''} ${employee.team || ''} ${employee.location || ''}`.toLowerCase()}
            >
              {/* Avatar */}
              {employee.photoUrl ? (
                <img
                  src={employee.photoUrl}
                  alt={`${employee.firstName} ${employee.lastName}`}
                  className="employee-avatar"
                />
              ) : (
                <div className="employee-avatar-placeholder">
                  {getInitials(employee)}
                </div>
              )}

              {/* Employee Info */}
              <div className="employee-info">
                <h3 className="employee-name">
                  {employee.firstName} {employee.lastName}
                </h3>
                {employee.title && (
                  <p className="employee-title">{employee.title}</p>
                )}
                {employee.team && (
                  <p className="employee-department">{employee.team}</p>
                )}
              </div>

              {/* Contact Details */}
              {(employee.email || employee.extension || employee.location) && (
                <div className="employee-details">
                  {employee.email && (
                    <div className="employee-detail-item">
                      <svg className="employee-detail-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="employee-email">{employee.email}</span>
                    </div>
                  )}
                  {employee.extension && (
                    <div className="employee-detail-item">
                      <svg className="employee-detail-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>Ext. {employee.extension}</span>
                    </div>
                  )}
                  {employee.location && (
                    <div className="employee-detail-item">
                      <svg className="employee-detail-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="employee-location">{employee.location}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Contact Button */}
              {employee.email && (
                <a
                  href={`mailto:${employee.email}`}
                  className="employee-contact-btn"
                >
                  Contact
                </a>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}