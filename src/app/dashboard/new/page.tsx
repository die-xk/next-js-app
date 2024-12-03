'use client'

import DashboardShell from '@/components/dashboard/DashboardShell'
import NewAnalysisForm from '@/components/dashboard/NewAnalysisForm'
import { AI_PERSONAS, PersonaKey } from '@/lib/openai'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { BrainCircuit, LineChart, ShieldCheck } from 'lucide-react'

const personaIcons = {
  VC: BrainCircuit,
  MARKET: LineChart,
  RISK: ShieldCheck,
}

export default function NewAnalysisPage() {
  const [selectedPersona, setSelectedPersona] = useState<PersonaKey | null>(null)

  return (
    <DashboardShell>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">New Analysis</h1>
            <p className="text-gray-500">Submit your startup idea and select an advisor for feedback.</p>
          </div>
          <NewAnalysisForm selectedPersona={selectedPersona} />
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Choose Your Advisor</h2>
            <p className="text-sm text-gray-500 mb-4">Select one AI advisor for your free analysis:</p>
            
            <div className="space-y-3">
              {Object.entries(AI_PERSONAS).map(([key, persona]) => {
                const Icon = personaIcons[key as PersonaKey]
                return (
                  <div 
                    key={key}
                    onClick={() => setSelectedPersona(key as PersonaKey)}
                    className={cn(
                      "p-4 rounded-lg border transition-all cursor-pointer",
                      "hover:border-indigo-500 hover:shadow-md",
                      selectedPersona === key ? [
                        "border-indigo-500",
                        "bg-indigo-50",
                        "ring-2",
                        "ring-indigo-500/20"
                      ] : "border-gray-200"
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={cn(
                        "p-2 rounded-lg",
                        selectedPersona === key ? "bg-indigo-500 text-white" : "bg-gray-100 text-gray-500"
                      )}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">{persona.role}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {key === 'VC' && 'Evaluates market size, business model, and investment potential'}
                          {key === 'MARKET' && 'Analyzes market trends, competition, and target audience'}
                          {key === 'RISK' && 'Assesses potential challenges and mitigation strategies'}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
              <p className="text-sm text-indigo-800">
                <span className="font-semibold">Pro Tip:</span> Upgrade to get comprehensive feedback from all advisors and unlock follow-up questions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
} 