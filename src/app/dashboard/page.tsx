import { redirect } from 'next/navigation'
import DashboardShell from '@/components/dashboard/DashboardShell'

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-500">Welcome to your startup analysis dashboard.</p>
        </div>

        {/* We'll add dashboard content here in the next step */}
      </div>
    </DashboardShell>
  )
} 