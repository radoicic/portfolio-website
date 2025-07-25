"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark" // ensures site loads in dark mode
      enableSystem={true} // optional: allow system theme
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
