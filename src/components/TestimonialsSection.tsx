'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const testimonials = [
  {
    content: "StartupLens provided invaluable insights that helped us pivot our business model early, saving us months of potential misdirection.",
    author: "Sarah Chen",
    role: "Founder & CEO",
    company: "TechFlow",
    image: ""
  },
  {
    content: "The multi-perspective analysis gave us a complete 360° view of our startup idea. The VC feedback was particularly eye-opening.",
    author: "Michael Roberts",
    role: "Co-founder",
    company: "GrowthBase",
    image: ""
  },
  {
    content: "Using StartupLens before pitching to investors helped us refine our pitch deck and ultimately secure our seed round.",
    author: "Jessica Wong",
    role: "Founder",
    company: "EduTech Solutions",
    image: ""
  }
]

export default function TestimonialsSection() {
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
            Trusted by Innovative Founders
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            See how StartupLens has helped entrepreneurs validate and improve their ideas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-sm"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">&quot;{testimonial.content}&quot;</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 