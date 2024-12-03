'use client'

import { motion } from 'framer-motion'
import { 
  BrainCircuit,
  Users,
  LineChart,
  ShieldCheck,
  MessagesSquare
} from 'lucide-react'

const steps = [
  {
    icon: BrainCircuit,
    title: "Share Your Idea",
    description: "Describe your startup idea in detail - your vision, target market, and unique value proposition.",
    color: "text-purple-600"
  },
  {
    icon: Users,
    title: "Meet Your Advisors",
    description: "Get matched with AI personas specialized in different aspects of business analysis.",
    color: "text-indigo-600"
  },
  {
    icon: LineChart,
    title: "Receive Analysis",
    description: "Get comprehensive feedback from multiple perspectives - VC, Market Research, Risk Analysis, and more.",
    color: "text-blue-600"
  },
  {
    icon: MessagesSquare,
    title: "Interactive Chat",
    description: "Dive deeper into each perspective through focused conversations with each AI advisor.",
    color: "text-cyan-600"
  }
]

const mockChat = [
  {
    role: "VC Investor",
    message: "Your target market size of $50B is compelling, but I'd like to see more detail on your go-to-market strategy...",
    avatar: ShieldCheck
  },
  {
    role: "Market Researcher",
    message: "Based on current trends, your timing is optimal. However, consider these three key competitors...",
    avatar: LineChart
  }
]

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Get expert feedback on your startup idea in minutes
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`${step.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-opacity-10`}>
                <step.icon className={`w-6 h-6 ${step.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Demo Chat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600">
            <h3 className="text-xl font-semibold text-white">
              Live Feedback Demo
            </h3>
          </div>
          <div className="p-6 space-y-6">
            {mockChat.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex items-start space-x-4"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <message.avatar className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 mb-1">
                    {message.role}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {message.message}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 