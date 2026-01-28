import React, { useState, useEffect, memo } from "react"
import { Github, Instagram, Mail, ExternalLink, Sparkles } from "lucide-react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import AOS from "aos"
import "aos/dist/aos.css"

/* ===================== SMALL COMPONENTS ===================== */

const StatusBadge = memo(() => (
  <div data-aos="zoom-in" data-aos-delay="400">
    <div className="relative inline-block">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--red-main)] to-[var(--red-soft)] blur opacity-30 rounded-full"></div>
      <div className="relative px-4 py-2 rounded-full bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--border-soft)]">
        <span className="bg-gradient-to-r from-[var(--red-soft)] to-white bg-clip-text text-transparent text-sm font-medium flex items-center">
          <Sparkles className="w-4 h-4 mr-2 text-[var(--red-soft)]" />
          Ready to Innovate
        </span>
      </div>
    </div>
  </div>
))

const MainTitle = memo(() => (
  <div data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative block">
        <span className="absolute -inset-2 bg-[var(--glow-red)] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
          Frontend
        </span>
      </span>
      <span className="relative block mt-2">
        <span className="absolute -inset-2 bg-[var(--glow-red)] blur-2xl opacity-25"></span>
        <span className="relative bg-gradient-to-r from-[var(--red-main)] to-[var(--red-soft)] bg-clip-text text-transparent">
          Developer
        </span>
      </span>
    </h1>
  </div>
))

const TechStack = memo(({ tech }) => (
  <div className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-[var(--border-soft)] text-sm text-gray-300">
    {tech}
  </div>
))

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="relative w-[160px] group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--red-main)] to-[var(--red-soft)] blur opacity-40 rounded-xl"></div>
      <div className="relative h-11 bg-[var(--glass-bg)] rounded-lg border border-[var(--border-soft)]">
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm">
          <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent font-medium">
            {text}
          </span>
          <Icon className="w-4 h-4 text-gray-200" />
        </span>
      </div>
    </button>
  </a>
))

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="relative p-3 group">
      <div className="absolute inset-0 bg-[var(--glow-red)] blur opacity-30 rounded-xl"></div>
      <div className="relative rounded-xl bg-[var(--glass-bg)] border border-[var(--border-soft)] p-2">
        <Icon className="w-5 h-5 text-gray-300 group-hover:text-white transition" />
      </div>
    </button>
  </a>
))

/* ===================== MAIN HOME ===================== */

const WORDS = ["Network & Telecom Student", "Tech Enthusiast"]
const TECH_STACK = ["React", "Javascript", "Node.js", "Tailwind"]
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/celloajah" },
  { icon: Instagram, link: "https://www.instagram.com/cello.manik" }
]

const Home = () => {
  const [text, setText] = useState("")
  const [charIndex, setCharIndex] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    AOS.init({ once: true, offset: 10 })
  }, [])

  useEffect(() => {
    const currentWord = WORDS[wordIndex]
    const timeout = setTimeout(() => {
      if (typing) {
        if (charIndex < currentWord.length) {
          setText(prev => prev + currentWord[charIndex])
          setCharIndex(prev => prev + 1)
        } else {
          setTyping(false)
        }
      } else {
        if (charIndex > 0) {
          setText(prev => prev.slice(0, -1))
          setCharIndex(prev => prev - 1)
        } else {
          setWordIndex((wordIndex + 1) % WORDS.length)
          setTyping(true)
        }
      }
    }, typing ? 100 : 50)

    return () => clearTimeout(timeout)
  }, [charIndex, typing, wordIndex])

  return (
    <section className="min-h-screen overflow-hidden px-[5%] lg:px-[10%]" id="Home">
      <div className="container mx-auto min-h-screen flex flex-col lg:flex-row items-center justify-center gap-16">

        {/* LEFT */}
        <div className="w-full lg:w-1/2 space-y-6">
          <StatusBadge />
          <MainTitle />

          <div className="flex items-center h-8">
            <span className="text-xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
              {text}
            </span>
            <span className="w-[3px] h-6 bg-[var(--red-main)] ml-1 animate-pulse"></span>
          </div>

          <p className="text-gray-400 max-w-xl">
            Menciptakan Website Yang Inovatif, Fungsional, dan User-Friendly untuk Solusi Digital.
          </p>

          <div className="flex flex-wrap gap-3">
            {TECH_STACK.map((tech, i) => (
              <TechStack key={i} tech={tech} />
            ))}
          </div>

          <div className="flex gap-3">
            <CTAButton href="#Portofolio" text="Projects" icon={ExternalLink} />
            <CTAButton href="#Contact" text="Contact" icon={Mail} />
          </div>

          <div className="flex gap-4">
            {SOCIAL_LINKS.map((s, i) => (
              <SocialLink key={i} {...s} />
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-lg">
            <div className="absolute inset-0 bg-[var(--glow-red)] blur-3xl opacity-20 rounded-full"></div>
            <DotLottieReact src="Animation - 1733236381489.json" loop autoplay />
          </div>
        </div>

      </div>
    </section>
  )
}

export default memo(Home)
