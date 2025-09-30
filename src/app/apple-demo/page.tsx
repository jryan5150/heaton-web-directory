'use client'

import { sampleEmployees } from '@/lib/sampleData'
import ElegantDirectory from '@/components/ElegantDirectory'

export default function AppleDemoPage() {
  return <ElegantDirectory employees={sampleEmployees} />
}