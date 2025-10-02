import { NextRequest, NextResponse } from 'next/server'
import { getAllEmployees } from '@/lib/database'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export async function POST(request: NextRequest) {
  try {
    const { employees: filteredEmployees } = await request.json()

    // If no filtered employees provided, get all
    const employees = filteredEmployees && filteredEmployees.length > 0
      ? filteredEmployees
      : await getAllEmployees()

    // Create PDF document
    const doc = new jsPDF('landscape', 'mm', 'a4')

    // Add Heaton Eye branding header
    const pageWidth = doc.internal.pageSize.getWidth()

    // Title
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(49, 130, 206) // Heaton blue
    doc.text('Heaton Eye Associates', pageWidth / 2, 15, { align: 'center' })

    // Subtitle
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100, 100, 100)
    doc.text('Employee Directory', pageWidth / 2, 22, { align: 'center' })

    // Date and count
    doc.setFontSize(9)
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    doc.text(`Generated: ${currentDate}`, 14, 30)
    doc.text(`Total Employees: ${employees.length}`, pageWidth - 14, 30, { align: 'right' })

    // Prepare table data
    const tableData = employees.map((emp: any) => [
      `${emp.firstName} ${emp.lastName}`,
      emp.extension || '—',
      emp.email || '—',
      emp.department || '—',
      emp.team || '—',
      emp.location || '—'
    ])

    // Add table
    autoTable(doc, {
      startY: 35,
      head: [['Name', 'Extension', 'Email', 'Department', 'Team', 'Location']],
      body: tableData,
      theme: 'striped',
      headStyles: {
        fillColor: [49, 130, 206], // Heaton blue
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold',
        halign: 'left'
      },
      bodyStyles: {
        fontSize: 9,
        textColor: [50, 50, 50]
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250] // Light gray
      },
      columnStyles: {
        0: { cellWidth: 50 }, // Name
        1: { cellWidth: 25 }, // Extension
        2: { cellWidth: 60 }, // Email
        3: { cellWidth: 40 }, // Department
        4: { cellWidth: 35 }, // Team
        5: { cellWidth: 35 }  // Location
      },
      margin: { top: 35, left: 14, right: 14 },
      didDrawPage: (data: any) => {
        // Footer on each page
        const pageCount = doc.internal.pages.length - 1
        const currentPage = doc.getCurrentPageInfo().pageNumber

        doc.setFontSize(8)
        doc.setTextColor(150, 150, 150)
        doc.text(
          `Page ${currentPage} of ${pageCount}`,
          pageWidth / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: 'center' }
        )

        doc.text(
          '© Heaton Eye Associates',
          pageWidth - 14,
          doc.internal.pageSize.getHeight() - 10,
          { align: 'right' }
        )
      }
    })

    // Generate PDF buffer
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'))

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0]
    const filename = `heaton-eye-directory-${timestamp}.pdf`

    // Return PDF file
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('PDF export error:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
}
