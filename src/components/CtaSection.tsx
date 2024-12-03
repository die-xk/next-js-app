'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function CtaSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-10 md:py-16 sm:px-12 lg:px-16"
        >
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Ready to validate your startup idea?
            </h2>
            <p className="mt-4 text-lg text-indigo-100">
              Join thousands of founders who've used StartupLens to refine and validate their startup ideas.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <button className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-indigo-600 font-medium hover:bg-opacity-90 transition-colors">
                <Sparkles className="w-5 h-5 mr-2" />
                Get Started Free
              </button>
              <button className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-white text-white font-medium hover:bg-white hover:text-indigo-600 transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute inset-0 bg-[linear-gradient(30deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(150deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]"></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 