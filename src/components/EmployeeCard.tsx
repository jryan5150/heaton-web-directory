import { Employee } from '@/types/employee'
import { PhoneIcon, EnvelopeIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline'

interface EmployeeCardProps {
  employee: Employee
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-modern hover:shadow-modern-lg transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] border border-white/50 overflow-hidden relative">
      {/* Subtle hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

      {/* Enhanced Header with animated gradient */}
      <div className="relative h-24 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 group-hover:from-blue-400/40 group-hover:to-indigo-400/40 transition-all duration-500"></div>

        {/* Decorative elements */}
        <div className="absolute top-2 right-2 w-16 h-16 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-all duration-500"></div>
        <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/10 rounded-full blur-lg group-hover:bg-white/20 transition-all duration-500"></div>

        {/* Enhanced Avatar */}
        <div className="absolute -bottom-10 left-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-white to-gray-50 rounded-3xl flex items-center justify-center shadow-xl border-4 border-white group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110">
              <span className="text-heaton-blue font-bold text-2xl font-heading drop-shadow-sm">
                {employee.firstName[0]}{employee.lastName[0]}
              </span>
            </div>
            {/* Avatar glow effect */}
            <div className="absolute inset-0 bg-gradient-heaton rounded-3xl blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10"></div>
          </div>
        </div>

        {/* Status indicator */}
        <div className="absolute top-4 right-4">
          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg"></div>
        </div>
      </div>

      {/* Enhanced Content Section */}
      <div className="relative pt-14 pb-8 px-6">
        {/* Name and Title Section */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-heaton-gray font-heading mb-2 group-hover:text-heaton-blue transition-colors duration-300">
            {employee.firstName} {employee.lastName}
          </h3>
          {employee.jobTitle && (
            <div className="inline-flex items-center bg-blue-50/80 backdrop-blur-sm border border-blue-100/50 rounded-full px-3 py-1 mb-2">
              <p className="text-heaton-blue font-semibold text-xs uppercase tracking-wider">
                {employee.jobTitle}
              </p>
            </div>
          )}
          {employee.department && (
            <p className="text-heaton-gray-light text-sm font-medium">
              {employee.department}
            </p>
          )}
        </div>

        {/* Enhanced Contact Information */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4 group/item p-3 rounded-xl hover:bg-blue-50/50 transition-all duration-300">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center group-hover/item:from-blue-200 group-hover/item:to-blue-300 transition-all duration-300 shadow-sm">
              <UserGroupIcon className="w-5 h-5 text-heaton-blue" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-heaton-gray-light font-bold uppercase tracking-wider mb-1">Team</p>
              <p className="text-sm text-heaton-gray font-semibold">{employee.team}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 group/item p-3 rounded-xl hover:bg-blue-50/50 transition-all duration-300">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center group-hover/item:from-emerald-200 group-hover/item:to-emerald-300 transition-all duration-300 shadow-sm">
              <MapPinIcon className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-heaton-gray-light font-bold uppercase tracking-wider mb-1">Location</p>
              <p className="text-sm text-heaton-gray font-semibold">{employee.location}</p>
            </div>
          </div>

          {employee.email && (
            <div className="flex items-center space-x-4 group/item p-3 rounded-xl hover:bg-blue-50/50 transition-all duration-300 cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center group-hover/item:from-purple-200 group-hover/item:to-purple-300 transition-all duration-300 shadow-sm">
                <EnvelopeIcon className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-heaton-gray-light font-bold uppercase tracking-wider mb-1">Email</p>
                <a
                  href={`mailto:${employee.email}`}
                  className="text-sm text-heaton-blue hover:text-heaton-blue-dark font-semibold transition-colors break-all group-hover/item:underline"
                >
                  {employee.email}
                </a>
              </div>
            </div>
          )}

          {/* Enhanced Phone Information */}
          {(employee.extensionNumber || employee.did) && (
            <div className="flex items-center space-x-4 group/item p-3 rounded-xl hover:bg-blue-50/50 transition-all duration-300">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center group-hover/item:from-orange-200 group-hover/item:to-orange-300 transition-all duration-300 shadow-sm">
                <PhoneIcon className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-heaton-gray-light font-bold uppercase tracking-wider mb-1">Phone</p>
                <div className="space-y-1">
                  {employee.extensionNumber && (
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center bg-gray-100 text-heaton-gray text-xs font-medium px-2 py-1 rounded-md">
                        Ext: {employee.extensionNumber}
                      </span>
                    </div>
                  )}
                  {employee.did && (
                    <a
                      href={`tel:${employee.did}`}
                      className="text-sm text-heaton-blue hover:text-heaton-blue-dark font-semibold transition-colors block group-hover/item:underline"
                    >
                      {employee.did}
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions Footer */}
        <div className="mt-6 pt-4 border-t border-gray-100/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-heaton-gray-light font-medium">Available</span>
            </div>
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {employee.email && (
                <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors duration-200" title="Send Email">
                  <EnvelopeIcon className="w-4 h-4 text-heaton-blue" />
                </button>
              )}
              {employee.did && (
                <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors duration-200" title="Call">
                  <PhoneIcon className="w-4 h-4 text-heaton-blue" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}