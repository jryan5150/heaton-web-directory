'use client'

interface DirectoryHeaderProps {
  activeTab: 'employees' | 'teams'
  onTabChange: (tab: 'employees' | 'teams') => void
}

export default function DirectoryHeader({ activeTab, onTabChange }: DirectoryHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <div className="w-6 h-6 bg-white rounded-sm opacity-90"></div>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              Heaton Eye Directory
            </h1>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-8">
            <button
              onClick={() => onTabChange('employees')}
              className={`px-1 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'employees'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Employee
            </button>
            <button
              onClick={() => onTabChange('teams')}
              className={`px-1 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'teams'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Department
            </button>
          </nav>

          {/* Right side spacer */}
          <div className="w-24"></div>
        </div>
      </div>
    </header>
  )
}