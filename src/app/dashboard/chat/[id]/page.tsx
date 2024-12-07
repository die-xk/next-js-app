'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import DashboardShell from '@/components/dashboard/DashboardShell'
import ChatInterface from '@/components/chat/ChatInterface'
import { useAuth } from '@/lib/context/AuthContext'
import { Message } from '@/types/chat'

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { getAuthHeaders } = useAuth()
  const params = useParams()
  const router = useRouter()
  
  // Get the analysis ID from the URL parameters
  const analysisId = params.id as string
  const searchParams = new URLSearchParams(window.location.search)
  const persona = (searchParams.get('persona') || 'VC') as 'VC' | 'MARKET' | 'RISK'

  useEffect(() => {
    if (!analysisId) {
      router.push('/dashboard/conversations')
      return
    }

    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/chat?id=${analysisId}`, {
          headers: getAuthHeaders(),
        })

        if (!response.ok) {
          throw new Error('Failed to fetch chat messages')
        }

        const data = await response.json()
        setMessages(data.messages)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [analysisId])

  const handleSendMessage = async (message: string) => {
    try {
      const response = await fetch(`/api/chat?id=${analysisId}`, {
        method: 'POST',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const data = await response.json()
      setMessages((prev) => [...prev, ...data.messages])
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Chat with AI</h1>
        <ChatInterface 
          persona={persona}
          messages={messages}
          onSendMessage={handleSendMessage}
        />
        {error && (
          <div className="text-center py-12 bg-red-50 rounded-lg">
            <p className="text-red-500">{error}</p>
          </div>
        )}
      </div>
    </DashboardShell>
  )
} 