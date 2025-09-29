import { Employee } from '@/types/employee'
import { PhoneIcon, EnvelopeIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline'

interface EmployeeCardProps {
  employee: Employee
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-modern hover:shadow-modern-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
      {/* Header with gradient background */}
      <div className="bg-gradient-heaton h-20 relative">
        <div className="absolute -bottom-8 left-6">
          <div className="w-16 h-16 avatar-professional rounded-2xl flex items-center justify-center shadow-lg border-4 border-white">
            <span className="text-white font-bold text-xl font-heading">
              {employee.firstName[0]}{employee.lastName[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-12 pb-6 px-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-heaton-gray font-heading mb-1">
            {employee.firstName} {employee.lastName}
          </h3>
          {employee.jobTitle && (
            <p className="text-heaton-blue font-medium text-sm uppercase tracking-wide">
              {employee.jobTitle}
            </p>
          )}
          {employee.department && (
            <p className="text-heaton-gray-light text-xs mt-1">
              {employee.department}
            </p>
          )}
        </div>

        {/* Contact Information Grid */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <UserGroupIcon className="w-4 h-4 text-heaton-blue" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-heaton-gray-light font-medium uppercase tracking-wide">Team</p>
              <p className="text-sm text-heaton-gray font-medium">{employee.team}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <MapPinIcon className="w-4 h-4 text-heaton-blue" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-heaton-gray-light font-medium uppercase tracking-wide">Location</p>
              <p className="text-sm text-heaton-gray font-medium">{employee.location}</p>
            </div>
          </div>

          {employee.email && (
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <EnvelopeIcon className="w-4 h-4 text-heaton-blue" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-heaton-gray-light font-medium uppercase tracking-wide">Email</p>
                <a
                  href={`mailto:${employee.email}`}
                  className="text-sm text-heaton-blue hover:text-heaton-blue-dark font-medium transition-colors break-all"
                >
                  {employee.email}
                </a>
              </div>
            </div>
          )}

          {/* Phone Information */}
          {(employee.extensionNumber || employee.did) && (
            <div className="flex items-center space-x-3 group">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <PhoneIcon className="w-4 h-4 text-heaton-blue" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-heaton-gray-light font-medium uppercase tracking-wide">Phone</p>
                <div className="space-y-1">
                  {employee.extensionNumber && (
                    <p className="text-sm text-heaton-gray">
                      <span className="font-medium">Ext:</span> {employee.extensionNumber}
                    </p>
                  )}
                  {employee.did && (
                    <a
                      href={`tel:${employee.did}`}
                      className="text-sm text-heaton-blue hover:text-heaton-blue-dark font-medium transition-colors block"
                    >
                      {employee.did}
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}