'use client'

import { sampleEmployees } from '@/lib/sampleData'
import AppleDirectoryView from '@/components/AppleDirectoryView'

export default function AppleDemoPage() {
  return <AppleDirectoryView employees={sampleEmployees} />
}