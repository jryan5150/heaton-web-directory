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
  BuildingOffice2Icon
} from '@heroicons/react/24/outline'

interface ProfessionalDirectoryProps {
  employees: Employee[]
}

export default function ProfessionalDirectory({ employees: initialEmployees }: ProfessionalDirectoryProps) {
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
    <div style={{
      minHeight: '100vh',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      backgroundColor: 'var(--background-color)',
      '--background-color': '#f5f7fa',
      '--sidebar-bg': '#ffffff',
      '--card-bg': '#ffffff',
      '--primary-text': '#1a202c',
      '--secondary-text': '#718096',
      '--accent-color': '#3182ce',
      '--accent-hover': '#2c5aa0',
      '--border-color': '#e2e8f0',
      '--shadow-sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      '--shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      '--shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    } as React.CSSProperties}>
      {/* Header */}
      <header style={{
        backgroundColor: 'var(--sidebar-bg)',
        borderBottom: '1px solid var(--border-color)',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{
          padding: '0 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '4rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                display: 'none',
                padding: '0.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              className="mobile-menu-btn"
            >
              {sidebarOpen ? (
                <XMarkIcon style={{ width: '1.5rem', height: '1.5rem', color: 'var(--secondary-text)' }} />
              ) : (
                <Bars3Icon style={{ width: '1.5rem', height: '1.5rem', color: 'var(--secondary-text)' }} />
              )}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                background: 'linear-gradient(135deg, #3182ce 0%, #2c5aa0 100%)',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <BuildingOffice2Icon style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
              </div>
              <div>
                <h1 style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--primary-text)',
                  margin: 0,
                  lineHeight: 1.2
                }}>
                  Heaton Eye Associates
                </h1>
                <p style={{
                  fontSize: '0.75rem',
                  color: 'var(--secondary-text)',
                  margin: 0
                }} className="header-subtitle">
                  Employee Directory
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              fontSize: '0.875rem',
              color: 'var(--secondary-text)'
            }} className="employee-count">
              {filteredEmployees.length} employees
            </div>
            <button
              onClick={async () => {
                await fetch('/api/auth/logout', { method: 'POST' })
                window.location.href = '/login'
              }}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--accent-color)',
                backgroundColor: 'transparent',
                border: '1px solid var(--accent-color)',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-color)'
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = 'var(--accent-color)'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', position: 'relative' }}>
        {/* Sidebar */}
        <aside
          className="sidebar"
          style={{
            width: '20rem',
            backgroundColor: 'var(--sidebar-bg)',
            borderRight: '1px solid var(--border-color)',
            height: 'calc(100vh - 4rem)',
            position: 'sticky',
            top: '4rem',
            overflowY: 'auto',
            transition: 'transform 0.3s ease-in-out',
            zIndex: 30
          }}
        >
          <div style={{ padding: '1.5rem' }}>
            {/* Search */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--primary-text)',
                marginBottom: '0.5rem'
              }}>
                Search
              </label>
              <div style={{ position: 'relative' }}>
                <MagnifyingGlassIcon style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '1.25rem',
                  height: '1.25rem',
                  color: 'var(--secondary-text)',
                  pointerEvents: 'none'
                }} />
                <input
                  type="text"
                  placeholder="Search by name, extension..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    paddingLeft: '2.5rem',
                    paddingRight: '1rem',
                    paddingTop: '0.625rem',
                    paddingBottom: '0.625rem',
                    fontSize: '0.875rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.5rem',
                    backgroundColor: '#fafbfc',
                    transition: 'all 0.2s',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--accent-color)'
                    e.target.style.boxShadow = '0 0 0 3px rgba(49, 130, 206, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-color)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>
            </div>

            {/* Filters Section */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--secondary-text)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '1rem',
                marginTop: 0
              }}>
                Filters
              </h3>

              {/* Department Filter */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--primary-text)',
                  marginBottom: '0.5rem'
                }}>
                  Department
                </label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.625rem 1rem',
                    fontSize: '0.875rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.5rem',
                    backgroundColor: '#fafbfc',
                    color: 'var(--primary-text)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--accent-color)'
                    e.target.style.boxShadow = '0 0 0 3px rgba(49, 130, 206, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-color)'
                    e.target.style.boxShadow = 'none'
                  }}
                >
                  <option value="all">All Departments</option>
                  {departments.slice(1).map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--primary-text)',
                  marginBottom: '0.5rem'
                }}>
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.625rem 1rem',
                    fontSize: '0.875rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.5rem',
                    backgroundColor: '#fafbfc',
                    color: 'var(--primary-text)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--accent-color)'
                    e.target.style.boxShadow = '0 0 0 3px rgba(49, 130, 206, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-color)'
                    e.target.style.boxShadow = 'none'
                  }}
                >
                  <option value="all">All Locations</option>
                  {locations.slice(1).map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Directory Stats */}
            <div style={{
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-color)'
            }}>
              <h3 style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--secondary-text)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.75rem',
                marginTop: 0
              }}>
                Directory Stats
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.875rem',
                  color: 'var(--secondary-text)'
                }}>
                  <span>Total Employees</span>
                  <span style={{ fontWeight: 600, color: 'var(--primary-text)' }}>{employees.length}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.875rem',
                  color: 'var(--secondary-text)'
                }}>
                  <span>Showing</span>
                  <span style={{ fontWeight: 600, color: 'var(--accent-color)' }}>{filteredEmployees.length}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.875rem',
                  color: 'var(--secondary-text)'
                }}>
                  <span>Departments</span>
                  <span style={{ fontWeight: 600, color: 'var(--primary-text)' }}>{departments.length - 1}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.875rem',
                  color: 'var(--secondary-text)'
                }}>
                  <span>Locations</span>
                  <span style={{ fontWeight: 600, color: 'var(--primary-text)' }}>{locations.length - 1}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
            style={{
              display: 'none',
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 20,
              top: '4rem'
            }}
          />
        )}

        {/* Main Content */}
        <main style={{
          flex: 1,
          padding: '2rem',
          minHeight: 'calc(100vh - 4rem)'
        }}>
          {filteredEmployees.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 1rem'
            }}>
              <div style={{
                width: '5rem',
                height: '5rem',
                margin: '0 auto 1rem',
                borderRadius: '50%',
                backgroundColor: '#f7fafc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MagnifyingGlassIcon style={{ width: '2.5rem', height: '2.5rem', color: 'var(--secondary-text)' }} />
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--primary-text)',
                marginBottom: '0.5rem'
              }}>
                No employees found
              </h3>
              <p style={{
                color: 'var(--secondary-text)',
                marginBottom: '1.5rem'
              }}>
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="employee-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '1.5rem'
            }}>
              {filteredEmployees.map((employee) => (
                <div
                  key={employee.id}
                  className="employee-card"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderRadius: '0.75rem',
                    padding: '1.5rem',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid var(--border-color)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'default'
                  }}
                >
                  {/* Avatar - Left Aligned */}
                  <div style={{
                    width: '4.5rem',
                    height: '4.5rem',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3182ce 0%, #2c5aa0 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    marginBottom: '1rem'
                  }}>
                    {employee.firstName[0]}{employee.lastName[0]}
                  </div>

                  {/* Employee Name & Extension - Left Aligned */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <h2 style={{
                      fontSize: '1.375rem',
                      fontWeight: 700,
                      color: 'var(--primary-text)',
                      margin: '0 0 0.375rem 0',
                      lineHeight: 1.2
                    }}>
                      {employee.firstName} {employee.lastName}
                    </h2>
                    {employee.extension && (
                      <div style={{
                        fontSize: '1.125rem',
                        fontWeight: 700,
                        color: 'var(--accent-color)',
                        marginBottom: '0.375rem',
                        fontFamily: 'monospace'
                      }}>
                        Ext. {employee.extension}
                      </div>
                    )}
                  </div>

                  {/* Contact Info - Centered */}
                  <div style={{
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}>
                    {employee.title && (
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: 'var(--secondary-text)',
                        marginBottom: '0.25rem'
                      }}>
                        {employee.title}
                      </div>
                    )}
                    {employee.department && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.875rem',
                        color: 'var(--primary-text)'
                      }}>
                        <UserGroupIcon style={{ width: '1rem', height: '1rem', color: 'var(--accent-color)', flexShrink: 0 }} />
                        <span>{employee.department}</span>
                      </div>
                    )}
                    {employee.team && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.8125rem',
                        color: 'var(--primary-text)'
                      }}>
                        <UserGroupIcon style={{ width: '0.875rem', height: '0.875rem', color: 'var(--accent-color)', flexShrink: 0 }} />
                        <span>Team: {employee.team}</span>
                      </div>
                    )}
                    {employee.email && (
                      <a
                        href={`mailto:${employee.email}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.875rem',
                          color: 'var(--accent-color)',
                          textDecoration: 'none',
                          transition: 'color 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'var(--accent-hover)'
                          e.currentTarget.style.textDecoration = 'underline'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--accent-color)'
                          e.currentTarget.style.textDecoration = 'none'
                        }}
                      >
                        <EnvelopeIcon style={{ width: '1rem', height: '1rem', flexShrink: 0 }} />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '250px' }}>
                          {employee.email}
                        </span>
                      </a>
                    )}
                    {employee.phoneNumber && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.875rem',
                        color: 'var(--secondary-text)'
                      }}>
                        <PhoneIcon style={{ width: '1rem', height: '1rem', color: 'var(--accent-color)', flexShrink: 0 }} />
                        <span style={{ fontFamily: 'monospace' }}>{employee.phoneNumber}</span>
                      </div>
                    )}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.875rem',
                      color: 'var(--secondary-text)'
                    }}>
                      <MapPinIcon style={{ width: '1rem', height: '1rem', color: 'var(--accent-color)', flexShrink: 0 }} />
                      <span>{employee.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Embedded CSS for responsive behavior and hover effects */}
      <style jsx>{`
        @media (max-width: 1023px) {
          .sidebar {
            position: fixed !important;
            top: 4rem !important;
            left: 0;
            transform: translateX(${sidebarOpen ? '0' : '-100%'});
            box-shadow: ${sidebarOpen ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none'};
          }
          .sidebar-overlay {
            display: ${sidebarOpen ? 'block' : 'none'} !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }

        .employee-card:hover {
          transform: scale(1.02);
          box-shadow: var(--shadow-lg);
          border-color: var(--accent-color);
        }

        @media (max-width: 640px) {
          .employee-grid {
            grid-template-columns: 1fr !important;
          }
          .header-subtitle {
            display: none;
          }
          .employee-count {
            display: none;
          }
        }

        @media (max-width: 768px) {
          main {
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  )
}