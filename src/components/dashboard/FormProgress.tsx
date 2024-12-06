'use client'

interface FormProgressProps {
  formData: {
    title: string
    description: string
    targetMarket: string
    businessModel: string
    challenges: string
  }
}

export default function FormProgress({ formData }: FormProgressProps) {
  const fields = [
    { key: 'title', label: 'Startup Name' },
    { key: 'description', label: 'Description' },
    { key: 'targetMarket', label: 'Target Market' },
    { key: 'businessModel', label: 'Business Model' },
    { key: 'challenges', label: 'Challenges' }
  ]

  const completedFields = fields.filter(field => 
    formData[field.key as keyof typeof formData]?.trim().length > 0
  ).length

  const progress = (completedFields / fields.length) * 100

  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>{completedFields} of {fields.length} completed</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
} 