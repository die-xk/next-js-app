'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { BrainCircuit, LineChart, ShieldCheck } from 'lucide-react'

const personaIcons = {
  VC: BrainCircuit,
  MARKET: LineChart,
  RISK: ShieldCheck,
}

interface Message {
  id: string
  role: 'user' | 'ai'
  content: string
  timestamp?: string
}

interface ChatInterfaceProps {
  persona: keyof typeof personaIcons
  messages?: Message[]
  onSendMessage?: (message: string) => void
}

export default function ChatInterface({ 
  persona, 
  messages = [], 
  onSendMessage 
}: ChatInterfaceProps) {
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const Icon = personaIcons[persona]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || isLoading) return

    setIsLoading(true)
    try {
      onSendMessage?.(newMessage)
      setNewMessage('')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-sm border">
      {/* Chat Header */}
      <div className="p-4 border-b flex items-center space-x-3">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Icon className="w-5 h-5 text-gray-500" />
        </div>
        <div>
          <h3 className="font-medium">Chat with {persona} Advisor</h3>
          <p className="text-sm text-gray-500">Ask follow-up questions about your analysis</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                {message.timestamp && (
                  <p className={`text-xs mt-1 ${
                    message.role === 'user' ? 'text-indigo-100' : 'text-gray-500'
                  }`}>
                    {new Date(message.timestamp).toLocaleString()}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center space-x-3">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <div className="animate-spin">
                <Send className="w-5 h-5 text-gray-500" />
              </div>
            ) : (
              <Send className="w-5 h-5 text-gray-500" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
} 