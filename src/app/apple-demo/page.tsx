'use client'

import { sampleEmployees } from '@/lib/sampleData'
import RetoolStyleDirectory from '@/components/RetoolStyleDirectory'

export default function AppleDemoPage() {
  return <RetoolStyleDirectory employees={sampleEmployees} />
}