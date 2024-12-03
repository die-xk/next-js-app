'use client'

import { motion } from 'framer-motion'
import { BrainCircuit, LineChart, ShieldCheck } from 'lucide-react'

const personas = [
  { icon: BrainCircuit, label: 'VC Perspective', color: 'text-purple-600' },
  { icon: LineChart, label: 'Market Analysis', color: 'text-blue-600' },
  { icon: ShieldCheck, label: 'Risk Assessment', color: 'text-emerald-600' }
]

export default function AnalysisLoading() {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center space-y-4"
      >
        <h2 className="text-2xl font-bold">Analyzing Your Startup</h2>
        <p className="text-gray-500">Our AI advisors are reviewing your idea...</p>

        <div className="flex justify-center space-x-8 mt-8">
          {personas.map((persona, index) => (
            <motion.div
              key={persona.label}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [0.8, 1.1, 1],
                opacity: 1
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3
              }}
              className="flex flex-col items-center space-y-2"
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-white shadow-lg ${persona.color}`}>
                <persona.icon className="w-6 h-6" />
              </div>
              <span className="text-sm text-gray-600">{persona.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="h-2 bg-gray-100 rounded-full mt-8 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: 'linear'
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
} 