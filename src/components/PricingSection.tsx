'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useRouter } from 'next/navigation'

const plans = [
  {
    name: "Basic",
    price: "Free",
    features: [
      "1 Startup Idea Analysis",
      "VC Perspective",
      "Market Research Analysis",
      "Basic Risk Assessment",
      "24h Response Time"
    ],
    popular: false,
    buttonText: "Start Free"
  },
  {
    name: "Pro",
    price: "$49",
    features: [
      "3 Startup Ideas Analysis",
      "All Basic Features",
      "Product Strategy",
      "Customer Persona Analysis",
      "Priority 6h Response",
      "Follow-up Questions"
    ],
    popular: true,
    buttonText: "Get Started"
  },
  {
    name: "Enterprise",
    price: "$199",
    features: [
      "Unlimited Ideas Analysis",
      "All Pro Features",
      "Custom AI Personas",
      "Dedicated Support",
      "1h Response Time",
      "Export Reports"
    ],
    popular: false,
    buttonText: "Contact Sales"
  }
]

export default function PricingSection() {
  const router = useRouter()

  const handlePlanSelect = (planName: string) => {
    router.push(`/payment?plan=${planName.toLowerCase()}`)
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the perfect plan for your startup journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative rounded-2xl ${
                plan.popular 
                  ? 'border-2 border-indigo-600 shadow-xl' 
                  : 'border border-gray-200 shadow-sm'
              } p-8 flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -translate-y-1/2 px-3 py-1 bg-indigo-600 text-white text-sm font-medium rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.price !== "Free" && (
                    <span className="ml-1 text-gray-500">/month</span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-indigo-600 mr-3" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handlePlanSelect(plan.name)}
                className={`mt-8 w-full py-3 px-4 rounded-md font-medium ${
                  plan.popular
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                } transition-colors`}
              >
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 