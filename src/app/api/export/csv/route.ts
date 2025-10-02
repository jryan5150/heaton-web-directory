import { NextRequest, NextResponse } from 'next/server'
import { getAllEmployees } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const { employees: filteredEmployees } = await request.json()

    // If no filtered employees provided, get all
    const employees = filteredEmployees && filteredEmployees.length > 0
      ? filteredEmployees
      : await getAllEmployees()

    // Create CSV header
    const headers = [
      'First Name',
      'Last Name',
      'Extension',
      'Email',
      'Phone Number',
      'Department',
      'Title',
      'Team',
      'Location'
    ]

    // Create CSV rows
    const rows = employees.map((emp: any) => [
      emp.firstName || '',
      emp.lastName || '',
      emp.extension || '',
      emp.email || '',
      emp.phoneNumber || '',
      emp.department || '',
      emp.title || '',
      emp.team || '',
      emp.location || ''
    ])

    // Combine header and rows
    const csvContent = [
      headers.join(','),
      ...rows.map((row: string[]) =>
        row.map((cell: string) => {
          // Escape quotes and wrap in quotes if contains comma
          const escaped = String(cell).replace(/"/g, '""')
          return escaped.includes(',') || escaped.includes('\n')
            ? `"${escaped}"`
            : escaped
        }).join(',')
      )
    ].join('\n')

    // Add BOM for Excel compatibility
    const bom = '\uFEFF'
    const csvWithBom = bom + csvContent

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0]
    const filename = `heaton-eye-directory-${timestamp}.csv`

    // Return CSV file
    return new NextResponse(csvWithBom, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('CSV export error:', error)
    return NextResponse.json(
      { error: 'Failed to generate CSV' },
      { status: 500 }
    )
  }
}
