'use client'

import { useState } from 'react'
import { parseCSVFile } from '@/lib/csvImport'

export default function DebugCSV() {
  const [isOpen, setIsOpen] = useState(false)
  const [testResult, setTestResult] = useState<string>('')

  const runCSVTest = async () => {
    try {
      setTestResult('Testing CSV import...')

      // Create test CSV content
      const csvContent = 'Name,Email,Extension,Team,Location\nJohn Smith,john.smith@heaton.com,1001,Engineering,Tyler\nSarah Johnson,sarah.johnson@heaton.com,1002,Marketing,Athens'

      // Create File object
      const file = new File([csvContent], 'test.csv', { type: 'text/csv' })

      // Test the import function
      const result = await parseCSVFile(file)

      setTestResult(`
Success: ${result.success}
Data Count: ${result.data.length}
Errors: ${result.errors.join(', ') || 'None'}
Warnings: ${result.warnings.join(', ') || 'None'}
${result.data.length > 0 ? `Sample: ${JSON.stringify(result.data[0], null, 2)}` : ''}
      `.trim())
    } catch (error) {
      setTestResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600"
      >
        Debug CSV
      </button>
    )
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-sm">CSV Import Debug</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
      <div className="text-xs space-y-2">
        <div>
          <p><strong>CSV Import Status:</strong> Ready</p>
          <p><strong>Validation:</strong> Name only required</p>
          <p><strong>Expected Format:</strong> Name,Email,Extension,Team,Location</p>
        </div>

        <button
          onClick={runCSVTest}
          className="w-full bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
        >
          Test CSV Import
        </button>

        {testResult && (
          <div className="bg-gray-100 p-2 rounded text-xs">
            <pre className="whitespace-pre-wrap">{testResult}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
