'use client'

import { motion } from 'framer-motion'
import { Sparkles, X } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function UpgradeBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const router = useRouter()

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
    >
      <div className="max-w-7xl mx-auto py-2 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <p className="text-sm font-medium">
              <span className="md:hidden">Upgrade for full access!</span>
              <span className="hidden md:inline">
                Get unlimited analyses and access to all AI advisors!
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push('/pricing')}
              className="text-sm px-3 py-1 rounded-md bg-white text-indigo-600 font-medium hover:bg-indigo-50"
            >
              Upgrade
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-indigo-500 rounded-md"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 