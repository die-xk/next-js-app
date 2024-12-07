'use client'

import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface JobModalProps {
  isOpen: boolean
  onClose: () => void
  job: {
    title: string
    location: string
    type: string
    description: string
    requirements: string[]
    responsibilities: string[]
  }
}

export default function JobModal({ isOpen, onClose, job }: JobModalProps) {
  if (!isOpen) return null

  const handleApply = () => {
    const subject = encodeURIComponent(`Application for ${job.title} position`)
    const body = encodeURIComponent(`I am interested in the ${job.title} position at StartupLens.`)
    window.location.href = `mailto:hr@modiai.net?subject=${subject}&body=${body}`
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black bg-opacity-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="relative w-full sm:max-w-2xl rounded-t-xl sm:rounded-xl bg-white p-4 sm:p-6 shadow-lg"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>

              {/* Content */}
              <div className="space-y-4 sm:space-y-6 mt-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 pr-8">{job.title}</h2>
                  <div className="mt-2 flex flex-wrap gap-2 sm:gap-3">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm">
                      {job.location}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                      {job.type}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">About the Role</h3>
                  <p className="text-sm sm:text-base text-gray-600">{job.description}</p>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Requirements</h3>
                  <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-600">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Responsibilities</h3>
                  <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-600">
                    {job.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 sm:pt-6 border-t sticky bottom-0 bg-white">
                  <button
                    onClick={handleApply}
                    className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-colors"
                  >
                    Apply for this Position
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
} 