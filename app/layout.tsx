import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ravi Kumar Yadav - AI & ML Developer",
  description:
    "Portfolio of Ravi Kumar Yadav, a 2nd-year Computer Science student specializing in Artificial Intelligence and Machine Learning",
  keywords: ["AI", "Machine Learning", "Computer Science", "Portfolio", "Data Science", "Ravi Kumar Yadav"],
  authors: [{ name: "Ravi Kumar Yadav" }],
  openGraph: {
    title: "Ravi Kumar Yadav - AI & ML Developer",
    description: "Portfolio of Ravi Kumar Yadav, aspiring Data Scientist & AI Developer",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
