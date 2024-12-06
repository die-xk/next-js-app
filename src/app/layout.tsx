import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from '@/lib/context/AuthContext'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StartupLens - AI-Powered Startup Feedback",
  description: "Get instant feedback on your startup idea from multiple expert perspectives",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="frame-ancestors 'self' https://buy.paddle.com https://checkout.paddle.com"
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
