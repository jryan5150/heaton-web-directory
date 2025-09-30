'use client'

import { useState } from 'react'
import { Employee } from '@/types/employee'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

interface FigmaEmployeeCardProps {
  employee: Employee
}

export default function FigmaEmployeeCard({ employee }: FigmaEmployeeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Main Card Content */}
      <div
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {employee.firstName} {employee.lastName}
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              {employee.jobTitle || 'Staff'}
            </p>

            <div className="space-y-1">
              <p className="text-sm text-gray-500">
                <span className="font-medium">Department:</span> {employee.department || employee.team}
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-blue-600 hover:text-blue-800">
                  {employee.email}
                </span>
                <span className="text-gray-600">
                  {employee.extensionNumber || 'No ext.'}
                </span>
              </div>
            </div>
          </div>

          <div className="ml-4 flex-shrink-0">
            {isExpanded ? (
              <ChevronUpIcon className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Contact</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <span className="w-16 text-gray-500">Email:</span>
                  <a
                    href={`mailto:${employee.email}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {employee.email}
                  </a>
                </div>
                {employee.extensionNumber && (
                  <div className="flex items-center">
                    <span className="w-16 text-gray-500">Ext:</span>
                    <span className="text-gray-900">{employee.extensionNumber}</span>
                  </div>
                )}
                {employee.did && (
                  <div className="flex items-center">
                    <span className="w-16 text-gray-500">Phone:</span>
                    <a
                      href={`tel:${employee.did}`}
                      className="text-gray-900 hover:text-blue-600"
                    >
                      {employee.did}
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <span className="w-20 text-gray-500">Location:</span>
                  <span className="text-gray-900">{employee.location}</span>
                </div>
                {employee.department && (
                  <div className="flex items-center">
                    <span className="w-20 text-gray-500">Department:</span>
                    <span className="text-gray-900">{employee.department}</span>
                  </div>
                )}
                {employee.team && (
                  <div className="flex items-center">
                    <span className="w-20 text-gray-500">Team:</span>
                    <span className="text-gray-900">{employee.team}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}