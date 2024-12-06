'use client'

import { motion } from 'framer-motion'
import { PersonaKey } from '@/lib/openai'
import { Brain, ChartBar, Shield } from 'lucide-react'

const analysisSteps = [
  { label: 'Understanding Context', icon: Brain },
  { label: 'Market Analysis', icon: ChartBar },
  { label: 'Risk Assessment', icon: Shield },
]

export default function AnalysisLoading({ selectedPersona }: { selectedPersona: PersonaKey }) {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center space-y-4"
      >
        <h2 className="text-2xl font-bold">Analyzing Your Startup</h2>
        <p className="text-gray-500">Our {selectedPersona} advisor is reviewing your idea...</p>

        <div className="mt-8 space-y-4">
          {analysisSteps.map((step, index) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.5 }}
              className="flex items-center space-x-4"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5
                  }
                }}
                className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center"
              >
                <step.icon className="w-5 h-5 text-indigo-600" />
              </motion.div>
              <span className="text-gray-600">{step.label}</span>
              <motion.div
                className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden"
              >
                <motion.div
                  className="h-full bg-indigo-600"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{
                    duration: 3,
                    delay: index * 0.5,
                    ease: 'easeInOut'
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
} 