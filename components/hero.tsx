import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Ravi Kumar Yadav
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-6">
            Aspiring Data Scientist & AI Developer
          </p>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            2nd-year Computer Science student passionate about Artificial Intelligence, Machine Learning, and building
            innovative solutions that make a difference.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="#projects">View My Work</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#contact">Get In Touch</Link>
          </Button>
        </div>

        <div className="flex justify-center gap-6">
          <Link href="https://github.com/Yadavji5739v" className="text-slate-600 hover:text-blue-600 transition-colors">
            <Github size={24} />
          </Link>
          <Link
            href="https://linkedin.com/in/ravi-kumar-yadav"
            className="text-slate-600 hover:text-blue-600 transition-colors"
          >
            <Linkedin size={24} />
          </Link>
          <Link href="mailto:ravi.yadav@example.com" className="text-slate-600 hover:text-blue-600 transition-colors">
            <Mail size={24} />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-slate-400" size={32} />
      </div>
    </section>
  )
}
