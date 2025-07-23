"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"

interface RawProject {
  title: string
  description: string
  github?: string
  live?: string
}

interface Project {
  title: string
  description: string
  link: string
}

export default function ProjectsFetcher() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          "https://raw.githubusercontent.com/Yadavji5739v/Portfolio_project/main/projects.json",
        )

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`)
        }

        const data: RawProject[] = await response.json()

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format: Expected an array of projects")
        }

        const validProjects = data
          .filter((project) => project.title && project.description && (project.github || project.live))
          .map((project) => ({
            title: project.title,
            description: project.description,
            link: project.live || project.github || "#",
          }))

        if (validProjects.length === 0) {
          throw new Error("No valid projects found in the data")
        }

        setProjects(validProjects)
      } catch (err) {
        console.error("Error fetching projects:", err)
        setError(err instanceof Error ? err.message : "An unexpected error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">My Projects</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Fetching my latest projects from GitHub...
          </p>
        </div>
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
          <p className="text-slate-600 dark:text-slate-300 text-lg">Loading projects...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">My Projects</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Something went wrong while loading projects
          </p>
        </div>
        <div className="flex flex-col items-center justify-center py-20">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
            <div className="flex items-center mb-4">
              <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400 mr-2" />
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Error Loading Projects</h3>
            </div>
            <p className="text-red-700 dark:text-red-300 mb-4">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            My Projects
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Here are some of the projects I've been working on. Each one represents a unique challenge and learning experience.
          </p>
          <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Showing {projects.length} project{projects.length !== 1 ? "s" : ""}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700"
            >
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed line-clamp-4">
                  {project.description}
                </p>
                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors group-hover:bg-blue-700"
                >
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    View Project
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Data fetched from{" "}
            <Link
              href="https://github.com/Yadavji5739v/Portfolio_project"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              GitHub Repository
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
