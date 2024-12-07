'use client'

import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.05) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
        {/* Animated Stars/Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 bg-gray-400 rounded-full"
              initial={{
                opacity: 0.1,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Main headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
          >
            <span className="block mb-2">Get Expert Feedback</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-900">
              On Your Startup Idea
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4"
          >
            Receive instant, comprehensive feedback on your startup idea from multiple expert perspectives - VC, Market Research, Risk Analysis, and more.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center px-4"
          >
            <button className="w-full sm:w-auto px-8 py-4 text-base font-medium rounded-lg shadow-lg text-white bg-gray-900 hover:bg-gray-800 transform transition-all hover:-translate-y-1">
              Get Started
            </button>
            <button className="w-full sm:w-auto px-8 py-4 text-base font-medium rounded-lg text-gray-900 bg-white border-2 border-gray-200 hover:border-gray-300 transform transition-all hover:-translate-y-1">
              Learn More
            </button>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 flex flex-wrap justify-center gap-3 px-4"
          >
            {['VC Perspective', 'Market Analysis', 'Risk Assessment', 'Product Strategy'].map((feature) => (
              <div
                key={feature}
                className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 text-sm text-gray-600 shadow-sm"
              >
                {feature}
              </div>
            ))}
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3 px-4"
          >
            {[
              { label: 'Expert Perspectives', value: '5+' },
              { label: 'Startups Analyzed', value: '1000+' },
              { label: 'Time Saved', value: '100h+' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="text-base text-gray-500">{stat.label}</dt>
                <dd className="text-3xl font-extrabold text-gray-900">{stat.value}</dd>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
} 