"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ThemeProvider } from "@/components/theme-provider"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import {
  Moon,
  Sun,
  Download,
  Mail,
  Linkedin,
  ExternalLink,
  Code,
  Database,
  Cloud,
  Settings,
  Calendar,
  GraduationCap,
  Award,
  Send,
  Menu,
  X,
  Github,
  Building2,
  TrendingUp,
  Shield,
} from "lucide-react"
import { useTheme } from "next-themes"

// Enhanced scroll animation hook that triggers every time on scroll down
function useScrollAnimation(threshold = 0.1, skipInitialAnimation = false) {
  const [isVisible, setIsVisible] = useState(skipInitialAnimation)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // For elements that should be visible on initial load
    if (skipInitialAnimation) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Always update visibility based on intersection
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold, skipInitialAnimation])

  return [ref, isVisible] as const
}

// Simplified animated wrapper component - only entry animations
function AnimatedSection({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  threshold = 0.1,
  skipInitialAnimation = false,
}: {
  children: React.ReactNode
  className?: string
  animation?: "fade-up" | "fade-left" | "fade-right" | "fade-in" | "scale-up" | "slide-up" | "rotate-in"
  delay?: number
  threshold?: number
  skipInitialAnimation?: boolean
}) {
  const [ref, isVisible] = useScrollAnimation(threshold, skipInitialAnimation)

  const getAnimationClasses = () => {
    const baseTransition = "transition-all duration-700 ease-out"

    if (isVisible) {
      return `${baseTransition} opacity-100 translate-y-0 translate-x-0 scale-100 rotate-0`
    }

    // Hidden state - initial position based on animation type
    switch (animation) {
      case "fade-up":
        return `${baseTransition} opacity-0 translate-y-16`
      case "fade-left":
        return `${baseTransition} opacity-0 translate-x-16`
      case "fade-right":
        return `${baseTransition} opacity-0 -translate-x-16`
      case "scale-up":
        return `${baseTransition} opacity-0 scale-90`
      case "slide-up":
        return `${baseTransition} opacity-0 translate-y-12`
      case "rotate-in":
        return `${baseTransition} opacity-0 rotate-6 scale-90`
      default:
        return `${baseTransition} opacity-0`
    }
  }

  return (
    <div
      ref={ref}
      className={`${getAnimationClasses()} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// Simplified staggered animation
function StaggeredAnimation({
  children,
  staggerDelay = 100,
  animation = "fade-up",
  skipInitialAnimation = false,
}: {
  children: React.ReactNode[]
  staggerDelay?: number
  animation?: "fade-up" | "fade-left" | "fade-right" | "fade-in" | "scale-up" | "slide-up" | "rotate-in"
  skipInitialAnimation?: boolean
}) {
  return (
    <>
      {children.map((child, index) => (
        <AnimatedSection
          key={index}
          delay={index * staggerDelay}
          animation={animation}
          threshold={0.15}
          skipInitialAnimation={skipInitialAnimation}
        >
          {child}
        </AnimatedSection>
      ))}
    </>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full hover:bg-muted/50 hover:scale-110 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  )
}

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Expertise" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Portfolio" },
    { href: "#contact", label: "Contact" },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border/40 shadow-lg"
          : "bg-background/80 backdrop-blur-sm border-b border-border/20"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button
            onClick={() => scrollToSection("#home")}
            className="font-semibold text-xl tracking-tight hover:text-primary transition-all duration-300 hover:scale-105"
          >
            Lucas Wang
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-all duration-300 hover:scale-105"
              >
                {item.label}
              </button>
            ))}
            <div className="ml-4 pl-4 border-l border-border/40">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="hover:scale-110 transition-all duration-300"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/40 animate-in slide-in-from-top-2 duration-300">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left py-3 px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-all duration-300 hover:translate-x-2"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

function HeroSection() {
  const { toast } = useToast()

  const handleDownloadResume = () => {
    window.open("Lucas_Resume.pdf", "_blank")
    toast({
      title: "Resume Download",
      description: "Opening resume in a new tab...",
      duration: 3000,
    })
  }

  const handleContactClick = () => {
    const element = document.querySelector("#contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-16">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero content is immediately visible on page load */}
          <AnimatedSection animation="scale-up" className="mb-8" skipInitialAnimation={true}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-slate-100 dark:via-slate-300 dark:to-slate-100 bg-clip-text text-transparent">
                Lucas Wang
              </span>
            </h1>
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-muted-foreground">
                Senior Blockchain & Web3 Developer
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200} skipInitialAnimation={true}>
            <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Building scalable, secure, and decentralized Web3 solutions with over 8 years of expertise in blockchain
              architecture, DeFi protocols, and smart contract development.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="slide-up" delay={400} skipInitialAnimation={true}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                className="px-8 py-3 text-base font-medium hover:scale-105 transition-all duration-300"
                onClick={handleDownloadResume}
              >
                <Download className="h-5 w-5 mr-2" />
                Download Resume
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-3 text-base font-medium bg-transparent hover:scale-105 transition-all duration-300"
                onClick={handleContactClick}
              >
                <Mail className="h-5 w-5 mr-2" />
                Get In Touch
              </Button>
            </div>
          </AnimatedSection>

          {/* Stats with staggered animation - visible on load */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <StaggeredAnimation staggerDelay={150} animation="scale-up" skipInitialAnimation={true}>
              {[
                { number: "10+", label: "Years Experience" },
                { number: "$20M+", label: "Funds Raised" },
                { number: "50+", label: "Projects Delivered" },
              ].map((stat, index) => (
                <div key={index} className="text-center hover:scale-110 transition-all duration-300 cursor-default">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </StaggeredAnimation>
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">About Me</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="fade-right" className="order-2 lg:order-1 space-y-6">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  As a Senior Blockchain & Web3 Developer with over 8 years of specialized experience, I architect and
                  develop cutting-edge decentralized solutions that bridge traditional finance with the future of Web3.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  My expertise spans across Solidity, Rust, and modern backend technologies, with deep specialization in
                  Solana and Ethereum ecosystems. I've successfully led the development of multiple DeFi protocols, NFT
                  marketplaces, and cross-chain solutions that have collectively raised millions in funding.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  I'm passionate about creating innovative blockchain solutions that prioritize security, scalability,
                  and exceptional user experience, always staying at the forefront of emerging Web3 technologies.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6">
                <StaggeredAnimation staggerDelay={200} animation="scale-up">
                  {[
                    { icon: Shield, title: "Security First", subtitle: "Smart Contract Audits" },
                    { icon: TrendingUp, title: "Scalable Solutions", subtitle: "High Performance" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 hover:scale-105 transition-all duration-300"
                    >
                      <div className="p-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-all duration-300">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">{item.title}</div>
                        <div className="text-sm text-muted-foreground">{item.subtitle}</div>
                      </div>
                    </div>
                  ))}
                </StaggeredAnimation>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-left" className="order-1 lg:order-2 flex justify-center">
              <div className="relative hover:scale-105 transition-all duration-500">
                <div className="w-80 h-80 rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
                  <img
                    src="lucas_image.jpeg"
                    alt="Lucas Wang - Senior Blockchain Developer"
                    className="w-full h-full object-cover hover:scale-110 transition-all duration-700"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20 animate-pulse"></div>
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-20 animate-pulse"></div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillsSection() {
  const skillCategories = [
    {
      title: "Blockchain Development",
      icon: <Code className="h-6 w-6" />,
      description: "Smart contracts, DeFi protocols, and blockchain architecture",
      skills: [
        "Solidity",
        "Rust",
        "Solana",
        "EVM",
        "ZKPs",
        "Smart Contracts",
        "Move",
        "Hyperledger Fabric",
        "Anchor",
        "Web3.js",
        "Ether.js",
        "Oracles",
        "Remix",
        "Hardhat",
        "Truffle",
        "OpenZeppelin",
      ],
    },
    {
      title: "Frontend Development",
      icon: <ExternalLink className="h-6 w-6" />,
      description: "Modern web applications and user interfaces",
      skills: ["React.js", "Next.js", "TypeScript", "HTML", "CSS", "JavaScript"],
    },
    {
      title: "Backend Engineering",
      icon: <Database className="h-6 w-6" />,
      description: "Server-side development and API design",
      skills: ["Node.js", "Python", "Golang", "Django"],
    },
    {
      title: "Cloud & Infrastructure",
      icon: <Cloud className="h-6 w-6" />,
      description: "Scalable cloud solutions and database management",
      skills: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Redis", "MongoDB", "PostgreSQL", "MySQL"],
    },
    {
      title: "DevOps & Methodology",
      icon: <Settings className="h-6 w-6" />,
      description: "Development practices and project management",
      skills: ["CI/CD", "Agile", "Scrum", "Unit Testing", "Git", "Jenkins"],
    },
  ]

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Technical Expertise</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive skill set spanning blockchain development, modern web technologies, and enterprise-grade
              infrastructure.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <StaggeredAnimation staggerDelay={150} animation="rotate-in">
              {skillCategories.map((category, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-500 border-border/50 hover:-translate-y-2 hover:rotate-1"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                        {category.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold">{category.title}</CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="text-xs font-medium px-3 py-1 bg-muted/50 hover:bg-muted transition-all duration-200 hover:scale-105 cursor-default"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </StaggeredAnimation>
          </div>
        </div>
      </div>
    </section>
  )
}

function ExperienceSection() {
  const experiences = [
    {
      company: "NextBlock",
      period: "Feb 2022–Present",
      role: "Senior Blockchain Developer",
      description:
        "DEX on Solana fork (Rust + Anchor), NFT marketplace, bots, sniper tools. Integrated React.js frontend with Web3.js. Built DeFi protocols (Uniswap, Aave, Compound).",
      website: "https://nextblock.io",
      achievements: [
        "Led development of Solana-based DEX",
        "Built automated trading bots",
        "Integrated DeFi protocols",
      ],
    },
    {
      company: "WFO",
      period: "May 2023–Sep 2023",
      role: "Technical Lead",
      description:
        "NFT marketplace for extreme sports. Team lead (7 members), built tokenomics. Used Move for Aptos/Sui; Rust for bot optimization.",
      website: "https://wfo.com",
      achievements: ["Led team of 7 developers", "Designed tokenomics model", "Implemented Move language solutions"],
    },
    {
      company: "FundMyContract",
      period: "Jan 2019–Nov 2021",
      role: "Full Stack Developer",
      description: "React + Node.js stack. CI/CD with Jenkins and AWS. Used Elasticsearch, AWS CloudWatch.",
      website: "https://fundmycontract.com",
      achievements: ["Built full-stack dApps", "Implemented CI/CD pipelines", "Managed AWS infrastructure"],
    },
    {
      company: "Upwork",
      period: "Oct 2014–Dec 2018",
      role: "Blockchain Consultant",
      description: "ICOs/STOs, staking contracts, EVM bots. Built with Solidity, Vue, Django. P2P tools with IPFS.",
      website: "https://upwork.com",
      achievements: ["Developed ICO/STO platforms", "Created staking mechanisms", "Built P2P tools with IPFS"],
    },
  ]

  return (
    <section id="experience" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Professional Experience</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground">
              A proven track record of delivering innovative blockchain solutions across diverse industries.
            </p>
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-primary/20"></div>
            <StaggeredAnimation staggerDelay={200} animation="fade-left">
              {experiences.map((exp, index) => (
                <div key={index} className="relative pl-20 pb-12 last:pb-0">
                  <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg animate-pulse"></div>
                  <Card className="hover:shadow-xl transition-all duration-500 border-border/50 hover:-translate-y-1 hover:rotate-1">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-xl font-semibold flex items-center gap-3">
                            <Building2 className="h-5 w-5 text-primary" />
                            {exp.company}
                          </CardTitle>
                          <div className="text-primary font-medium">{exp.role}</div>
                          <CardDescription className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4" />
                            {exp.period}
                          </CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => window.open(exp.website, "_blank")}
                          className="h-8 w-8 hover:bg-muted/50 hover:scale-110 transition-all duration-300"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-foreground">Key Achievements:</div>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, i) => (
                            <li
                              key={i}
                              className="text-sm text-muted-foreground flex items-center gap-2 hover:translate-x-2 transition-all duration-300"
                            >
                              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </StaggeredAnimation>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  const { toast } = useToast()

const projects = [
  {
    title: "Gempad",
    description: "Multi-chain launchpad; developed presale, voting, staking logic. Raised ~$20M in 2023.",
    image: "/projects/gempad.png",
    link: "https://gempad.app/",
    github: "https://github.com/your-repo",
    tags: ["DeFi", "Multi-chain", "Staking"],
    funding: "$20M+",
  },
  {
    title: "Shardstarter",
    description: "Launchpad on Shardeum; developed IDO, bridge, staking.",
    image: "/projects/shardstarter.webp",
    link: "https://dapp.shardstarter.io",
    github: "https://github.com/shardstarter",
    tags: ["IDO", "Bridge", "Shardeum"],
    funding: "Series A",
  },
  {
    title: "XDEX",
    description: "First DEX on Solana-forked X1 chain; built using Anchor.",
    image: "/projects/xdex.png",
    link: "https://testnet.xdex.xyz/",
    github: "https://github.com/xdex",
    tags: ["DEX", "Solana", "Rust"],
    funding: "Bootstrap",
  },
  {
    title: "Apexswap",
    description: "DEX aggregator on Avalanche; whale trading up to $80k.",
    image: "/projects/apexswap.png",
    link: "https://apexswap1.netlify.app/swap",
    github: "https://github.com/apexswap",
    tags: ["Aggregator", "Avalanche", "Trading"],
    funding: "Revenue+",
  },
  {
    title: "Quantex",
    description: "Cross-chain swap for 50+ cryptocurrencies; fast swaps in <5 mins.",
    image: "/projects/quantex.png",
    link: "https://www.myquantex.com/",
    github: "https://github.com/quantex",
    tags: ["Cross-chain", "Swap", "Multi-asset"],
    funding: "Seed",
  },
]


  const handleProjectClick = (project: any) => {
    window.open(project.link, "_blank")
    toast({
      title: "Opening Project",
      description: `Redirecting to ${project.title}...`,
      duration: 3000,
    })
  }

  const handleGithubClick = (e: React.MouseEvent, githubUrl: string) => {
    e.stopPropagation()
    window.open(githubUrl, "_blank")
  }

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Featured Projects</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Showcasing innovative blockchain solutions that have collectively raised millions and served thousands of
              users.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <StaggeredAnimation staggerDelay={200} animation="scale-up">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-700 border-border/50 overflow-hidden hover:-translate-y-3 hover:rotate-2 cursor-pointer"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 bg-white/90 hover:bg-white hover:scale-110 transition-all duration-200"
                        onClick={(e) => handleGithubClick(e, project.github)}
                      >
                        <Github className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        className="h-8 w-8 bg-primary/90 hover:bg-primary hover:scale-110 transition-all duration-200"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleProjectClick(project)
                        }}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary/90 text-primary-foreground font-medium animate-pulse">
                        {project.funding}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="outline"
                          className="text-xs hover:scale-105 transition-transform duration-200"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="pt-2">
                      <Button
                        className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleProjectClick(project)
                        }}
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Live Project
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </StaggeredAnimation>
          </div>
        </div>
      </div>
    </section>
  )
}

function EducationSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Education & Certifications</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            <StaggeredAnimation staggerDelay={300} animation="rotate-in">
              {[
                {
                  icon: GraduationCap,
                  title: "Education",
                  subtitle: "Academic Foundation",
                  content: (
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Master of Computer Science</h3>
                      <p className="text-muted-foreground mb-1">University of Toronto</p>
                      <p className="text-sm text-muted-foreground">2010–2014</p>
                    </div>
                  ),
                },
                {
                  icon: Award,
                  title: "Certifications",
                  subtitle: "Professional Credentials",
                  content: (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold">Professional Software Engineering Master Certification</h3>
                        <p className="text-sm text-muted-foreground">(PSEMC)</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Scrum Master Certified</h3>
                        <p className="text-sm text-muted-foreground">(SMC)</p>
                      </div>
                    </div>
                  ),
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-all duration-500 border-border/50 hover:-translate-y-2 hover:rotate-1"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl text-primary hover:scale-110 hover:rotate-12 transition-all duration-300">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-xl font-semibold">{item.title}</div>
                        <div className="text-sm text-muted-foreground">{item.subtitle}</div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">{item.content}</CardContent>
                </Card>
              ))}
            </StaggeredAnimation>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
        duration: 5000,
      })

      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleEmailClick = () => {
    window.location.href = "mailto:lucaswang9211@gmail.com"
  }

  const handleLinkedInClick = () => {
    window.open("https://linkedin.com/in/lucas-techinnovator", "_blank")
  }

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Let's Work Together</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to discuss your next blockchain project? I'm always interested in innovative opportunities and
              collaborations.
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-16">
            <AnimatedSection animation="fade-right" className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Get In Touch</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Whether you're looking to build a new DeFi protocol, launch an NFT marketplace, or need expert
                  consultation on blockchain architecture, I'm here to help bring your vision to life.
                </p>
              </div>

              <div className="space-y-6">
                <StaggeredAnimation staggerDelay={200} animation="slide-up">
                  {[
                    {
                      icon: Mail,
                      title: "Email",
                      subtitle: "lucaswang9211@gmail.com",
                      onClick: handleEmailClick,
                    },
                    {
                      icon: Linkedin,
                      title: "LinkedIn",
                      subtitle: "in/lucas-techinnovator",
                      onClick: handleLinkedInClick,
                    },
                  ].map((contact, index) => (
                    <button
                      key={index}
                      onClick={contact.onClick}
                      className="flex items-center gap-4 w-full p-4 rounded-xl hover:bg-muted/50 transition-all duration-300 group hover:scale-105 hover:translate-x-2"
                    >
                      <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                        <contact.icon className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">{contact.title}</div>
                        <div className="text-muted-foreground">{contact.subtitle}</div>
                      </div>
                    </button>
                  ))}
                </StaggeredAnimation>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-left">
              <Card className="border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Send a Message</CardTitle>
                  <CardDescription>Fill out the form below and I'll get back to you within 24 hours.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Input
                        placeholder="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="h-12 transition-all duration-200 focus:scale-105"
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="h-12 transition-all duration-200 focus:scale-105"
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Tell me about your project..."
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        required
                        disabled={isSubmitting}
                        className="transition-all duration-200 focus:scale-105"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-medium hover:scale-105 transition-all duration-300"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const currentYear = new Date().getFullYear()

  const handleEmailClick = () => {
    window.location.href = "mailto:lucaswang9211@gmail.com"
  }

  const handleLinkedInClick = () => {
    window.open("https://linkedin.com/in/lucas-techinnovator", "_blank")
  }

  const handleGithubClick = () => {
    window.open("https://github.com/lucaswang-dev", "_blank")
  }

  return (
    <footer className="py-12 border-t border-border/40 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fade-up">
            <div className="flex flex-col items-center space-y-6">
              <div className="flex gap-4">
                <StaggeredAnimation staggerDelay={150} animation="scale-up">
                  {[
                    { icon: Github, onClick: handleGithubClick, label: "GitHub" },
                    { icon: Linkedin, onClick: handleLinkedInClick, label: "LinkedIn" },
                    { icon: Mail, onClick: handleEmailClick, label: "Email" },
                  ].map((social, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="icon"
                      onClick={social.onClick}
                      aria-label={social.label}
                      className="h-12 w-12 rounded-xl hover:bg-muted/50 hover:scale-110 hover:rotate-12 transition-all duration-300"
                    >
                      <social.icon className="h-5 w-5" />
                    </Button>
                  ))}
                </StaggeredAnimation>
              </div>
              <div className="text-center text-muted-foreground">
                <p className="font-medium">&copy; {currentYear} Lucas Wang. Built with ❤️ and Web3.</p>
                <p className="text-sm mt-2">Crafting the future of decentralized technology.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </footer>
  )
}

export default function Portfolio() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background">
        <Navigation />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
        <Footer />
        <Toaster />
      </div>
    </ThemeProvider>
  )
}
