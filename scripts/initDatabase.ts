/**
 * Initialize database with employee data from CSV
 */

import { loadHeatonEmployeesFromPath } from '../src/lib/importHeatonData'
import { saveEmployees } from '../src/lib/database'
import path from 'path'

async function initDatabase() {
  try {
    console.log('Loading employees from CSV...')

    const csvPath = path.join(process.cwd(), 'Heaton_Directory_Nextiva_Format.csv')
    const employees = await loadHeatonEmployeesFromPath(csvPath)

    console.log(`Loaded ${employees.length} employees`)

    console.log('Saving to database...')
    await saveEmployees(employees)

    console.log('✓ Database initialized successfully!')
    console.log(`Total employees: ${employees.length}`)

    // Show breakdown by location
    const locations = employees.reduce((acc, emp) => {
      acc[emp.location] = (acc[emp.location] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    console.log('\nEmployees by location:')
    Object.entries(locations)
      .sort(([, a], [, b]) => b - a)
      .forEach(([location, count]) => {
        console.log(`  ${location}: ${count}`)
      })

  } catch (error) {
    console.error('Error initializing database:', error)
    process.exit(1)
  }
}

initDatabase()