'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard')

  return (
    <>
      {!isDashboard && <Navbar />}
      <main className={!isDashboard ? "pt-16" : undefined}>
        {children}
      </main>
    </>
  )
} 