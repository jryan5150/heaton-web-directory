import { getAllEmployees } from '@/lib/database'
import RetoolStyleDirectory from '@/components/RetoolStyleDirectory'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HeatonDirectoryPage() {
  // Load employees from database
  const employees = await getAllEmployees()

  return <RetoolStyleDirectory employees={employees} />
}