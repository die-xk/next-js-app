import DashboardShell from '@/components/dashboard/DashboardShell'

export default function ConversationsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Conversations</h1>
          <p className="text-gray-500">Your ongoing discussions with AI advisors.</p>
        </div>
        {/* We'll implement the conversations list in the next step */}
      </div>
    </DashboardShell>
  )
} 