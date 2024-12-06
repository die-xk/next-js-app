'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { CalendarClock, Check } from "lucide-react"

interface AnalysisLimitModalProps {
  isOpen: boolean
  onClose: () => void
  nextResetDate: Date
}

export default function AnalysisLimitModal({ isOpen, onClose, nextResetDate }: AnalysisLimitModalProps) {
  const router = useRouter()
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Monthly Analysis Limit Reached</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-600">
            <CalendarClock className="w-5 h-5" />
            <p>Your next free analysis will be available on {formatDate(nextResetDate)}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Upgrade to Pro and get:</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>3 analyses per month</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Access to Market Analysis advisor</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Follow-up questions</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Faster response time (6h)</span>
              </li>
            </ul>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Maybe Later
            </Button>
            <Button onClick={() => router.push('/pricing')}>
              Upgrade to Pro
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 