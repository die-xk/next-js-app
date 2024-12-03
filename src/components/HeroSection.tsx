'use client'

import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(226 232 240 / 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
        {/* Animated Stars/Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 bg-indigo-400 rounded-full"
              initial={{
                opacity: 0.1,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                opacity: [0.1, 0.5, 0.1],
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Main headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
          >
            <span className="block">Get Expert Feedback</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              On Your Startup Idea
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto"
          >
            Receive instant, comprehensive feedback on your startup idea from multiple expert perspectives - VC, Market Research, Risk Analysis, and more.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform transition-all hover:scale-105">
              Get Started
            </button>
            <button className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transform transition-all hover:scale-105">
              Learn More
            </button>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 flex flex-wrap justify-center gap-4"
          >
            {['VC Perspective', 'Market Analysis', 'Risk Assessment', 'Product Strategy'].map((feature, index) => (
              <div
                key={feature}
                className="px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-gray-200 text-sm text-gray-600"
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
            className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3"
          >
            {[
              { label: 'Expert Perspectives', value: '5+' },
              { label: 'Startups Analyzed', value: '1000+' },
              { label: 'Time Saved', value: '100h+' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="text-base text-gray-500">{stat.label}</dt>
                <dd className="text-3xl font-extrabold text-indigo-600">{stat.value}</dd>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
} 