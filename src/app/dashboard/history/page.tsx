import DashboardShell from '@/components/dashboard/DashboardShell'

export default function HistoryPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analysis History</h1>
          <p className="text-gray-500">Review your previous startup analyses.</p>
        </div>
        {/* We'll implement the history list in the next step */}
      </div>
    </DashboardShell>
  )
} 