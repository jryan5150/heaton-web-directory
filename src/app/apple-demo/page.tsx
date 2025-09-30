'use client'

import { sampleEmployees } from '@/lib/sampleData'
import ProfessionalDirectory from '@/components/ProfessionalDirectory'

export default function AppleDemoPage() {
  return <ProfessionalDirectory employees={sampleEmployees} />
}