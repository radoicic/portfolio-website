import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Code, Brain, Target } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">About Me</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Passionate about leveraging technology to solve real-world problems through AI and data science
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              I'm Ravi Kumar Yadav, currently pursuing my Bachelor's degree in Computer Science with a specialization in
              Artificial Intelligence and Machine Learning. My journey in tech began with a fascination for
              problem-solving through code, which has evolved into a deep passion for creating intelligent systems that
              can learn and adapt.
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              As a dedicated student and aspiring developer, I spend my time building projects that bridge the gap
              between theoretical AI concepts and real-world applications. I'm particularly interested in machine
              learning algorithms, data analysis, and developing web applications that showcase AI capabilities.
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              When I'm not coding, you'll find me exploring the latest research papers, participating in hackathons, or
              working on personal projects that combine my love for AI with practical applications. I believe in
              continuous learning and staying updated with the rapidly evolving tech landscape.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <GraduationCap className="mx-auto mb-4 text-blue-600" size={48} />
                <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Education</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">CS - AI & ML</p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <Code className="mx-auto mb-4 text-green-600" size={48} />
                <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Development</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Full Stack</p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <Brain className="mx-auto mb-4 text-purple-600" size={48} />
                <h3 className="font-semibold text-slate-800 dark:text-white mb-2">AI & ML</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Research</p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <Target className="mx-auto mb-4 text-red-600" size={48} />
                <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Goals</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Innovation</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
