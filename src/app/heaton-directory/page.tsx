import { getAllEmployees } from '@/lib/database'
import ElegantDirectory from '@/components/ElegantDirectory'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HeatonDirectoryPage() {
  // Load employees from database
  const employees = await getAllEmployees()

  return <ElegantDirectory employees={employees} />
}