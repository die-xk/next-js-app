'use client'

import { motion } from 'framer-motion'
import { Building2, Users2, Gem, Globe2 } from 'lucide-react'
import { useState } from 'react'
import JobModal from '@/components/careers/JobModal'

interface JobRole {
  title: string
  location: string
  type: string
  description: string
  requirements?: string[]
  responsibilities?: string[]
}

const values = [
  {
    icon: Users2,
    title: "Collaborative Culture",
    description: "Work with passionate individuals who share your drive for innovation and excellence."
  },
  {
    icon: Gem,
    title: "Impact Driven",
    description: "Help thousands of entrepreneurs validate and improve their startup ideas."
  },
  {
    icon: Globe2,
    title: "Remote First",
    description: "Work from anywhere in the world with flexible hours and a healthy work-life balance."
  },
  {
    icon: Building2,
    title: "Growth Focused",
    description: "Continuous learning opportunities and clear career progression paths."
  }
]

const openPositions = [
  {
    department: "Engineering",
    roles: [
      {
        title: "Senior Full Stack Engineer",
        location: "Remote",
        type: "Full-time",
        description: "Join our core team to build and scale our AI-powered startup analysis platform.",
        requirements: [
          "5+ years of experience with React, Node.js, and TypeScript",
          "Experience with Next.js and serverless architectures",
          "Strong understanding of AI/ML concepts and integration",
          "History of building scalable, production-grade applications",
          "Experience with cloud platforms (AWS/GCP/Azure)"
        ],
        responsibilities: [
          "Lead development of new features for our AI analysis platform",
          "Architect and implement scalable backend solutions",
          "Collaborate with AI engineers to integrate machine learning models",
          "Mentor junior developers and contribute to technical decisions",
          "Ensure code quality through testing and code reviews"
        ]
      },
      {
        title: "Machine Learning Engineer",
        location: "Remote",
        type: "Full-time",
        description: "Help improve our AI models and develop new features for startup analysis.",
        requirements: [
          "3+ years of experience in ML/AI development",
          "Strong background in NLP and language models",
          "Experience with PyTorch or TensorFlow",
          "Understanding of modern LLM architectures",
          "Background in production ML systems"
        ],
        responsibilities: [
          "Develop and optimize AI models for startup analysis",
          "Implement and fine-tune language models",
          "Create robust evaluation frameworks",
          "Collaborate with full-stack team on AI integration",
          "Research and implement new AI capabilities"
        ]
      }
    ]
  },
  {
    department: "Product",
    roles: [
      {
        title: "Product Manager",
        location: "Remote",
        type: "Full-time",
        description: "Drive product strategy and work closely with engineering to deliver value to founders."
      }
    ]
  },
  {
    department: "Marketing",
    roles: [
      {
        title: "Content Marketing Manager",
        location: "Remote",
        type: "Full-time",
        description: "Create compelling content that helps entrepreneurs understand and validate their ideas."
      }
    ]
  }
]

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<any>(null)

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Join Our Mission
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Help us empower the next generation of entrepreneurs with AI-driven insights and validation.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
          <p className="mt-4 text-lg text-gray-600">
            What drives us and shapes our culture
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <value.icon className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Updated jobs section with better mobile layout */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900">Open Positions</h2>
          <p className="mt-4 text-lg text-gray-600">
            Join our team and make an impact
          </p>
        </motion.div>

        <div className="space-y-8">
          {openPositions.map((department, index) => (
            <motion.div
              key={department.department}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {department.department}
              </h3>
              <div className="grid gap-4">
                {department.roles.map((role) => (
                  <div
                    key={role.title}
                    onClick={() => setSelectedJob(role)}
                    className="bg-white p-6 rounded-xl shadow-sm hover:border-indigo-500 border-2 border-transparent transition-colors cursor-pointer"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">
                          {role.title}
                        </h4>
                        <p className="text-gray-600 text-sm sm:text-base">
                          {role.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm whitespace-nowrap">
                          {role.location}
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm whitespace-nowrap">
                          {role.type}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <JobModal
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        job={selectedJob}
      />
    </main>
  )
} 