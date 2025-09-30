'use client'

import { sampleEmployees } from '@/lib/sampleData'
import ModernDirectory from '@/components/ModernDirectory'

export default function AppleDemoPage() {
  return <ModernDirectory employees={sampleEmployees} />
}