import { Employee } from '@/types/employee'

interface EmployeeCardProps {
  employee: Employee
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-semibold text-lg">
            {employee.firstName[0]}{employee.lastName[0]}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900">
            {employee.firstName} {employee.lastName}
          </h3>
          {employee.jobTitle && (
            <p className="text-sm text-gray-600 mb-2">{employee.jobTitle}</p>
          )}

          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="font-medium w-20">Team:</span>
              <span>{employee.team}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium w-20">Location:</span>
              <span>{employee.location}</span>
            </div>
            {employee.email && (
              <div className="flex items-center">
                <span className="font-medium w-20">Email:</span>
                <a href={`mailto:${employee.email}`} className="text-blue-600 hover:text-blue-800">
                  {employee.email}
                </a>
              </div>
            )}
            {employee.extensionNumber && (
              <div className="flex items-center">
                <span className="font-medium w-20">Ext:</span>
                <span>{employee.extensionNumber}</span>
              </div>
            )}
            {employee.did && (
              <div className="flex items-center">
                <span className="font-medium w-20">DID:</span>
                <a href={`tel:${employee.did}`} className="text-blue-600 hover:text-blue-800">
                  {employee.did}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}