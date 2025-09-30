import { loadHeatonEmployeesFromPath } from '@/lib/importHeatonData'
import AppleDirectoryView from '@/components/AppleDirectoryView'
import path from 'path'

export const dynamic = 'force-dynamic'

export default async function HeatonDirectoryPage() {
  // Load employees from CSV file
  const csvPath = path.join(process.cwd(), 'Heaton_Directory_Nextiva_Format.csv')
  const employees = await loadHeatonEmployeesFromPath(csvPath)

  return <AppleDirectoryView employees={employees} />
}