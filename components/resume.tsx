import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, FileText } from "lucide-react"

export default function Resume() {
  return (
    <section id="resume" className="py-20 px-4 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Resume</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Download my resume to learn more about my experience, education, and achievements
          </p>
        </div>

        <Card className="max-w-md mx-auto hover:shadow-xl transition-shadow">
          <CardContent className="p-8">
            <div className="mb-6">
              <FileText className="mx-auto mb-4 text-blue-600" size={64} />
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Ravi Kumar Yadav - Resume</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Computer Science Student specializing in AI & ML
              </p>
            </div>

            <div className="space-y-3">
              <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                <Download className="mr-2" size={20} />
                Download Resume (PDF)
              </Button>
              <Button variant="outline" className="w-full bg-transparent" size="lg">
                <FileText className="mr-2" size={20} />
                View Online
              </Button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">Last updated: December 2024</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
