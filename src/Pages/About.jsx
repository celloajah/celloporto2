import React, { useEffect, memo, useMemo } from "react"
import { FileText, Code, Award, Globe, ArrowUpRight, Sparkles } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"
/* eslint-disable */

const AboutPage = () => {
  useEffect(() => {
    AOS.init({ once: false })
  }, [])

  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]")
    const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]")

    const startDate = new Date("2021-11-06")
    const today = new Date()
    const experience =
      today.getFullYear() -
      startDate.getFullYear() -
      (today <
      new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate())
        ? 1
        : 0)

    return {
      totalProjects: storedProjects.length,
      totalCertificates: storedCertificates.length,
      YearExperience: experience,
    }
  }, [])

  return (
    <div className="pb-[10%] text-white px-[5%] lg:px-[10%] mt-10" id="About">
      {/* HEADER */}
      <div className="text-center lg:mb-8 mb-2">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text 
        bg-gradient-to-r from-red-500 via-rose-500 to-pink-500">
          About Me
        </h2>

        <p className="mt-2 text-gray-300 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-red-400" />
          Transforming ideas into digital experiences
          <Sparkles className="w-5 h-5 text-red-400" />
        </p>
      </div>

      {/* MAIN */}
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6 relative z-20">
          <h2 className="text-4xl lg:text-5xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
              Hello, I'm
            </span>
            <span className="block mt-2 text-gray-200">
              Marcello Julien Manik
            </span>
          </h2>

          <p className="text-lg text-gray-400 leading-relaxed text-justify">
            Seorang Tamatan RPL yang berfokus pada Front-End Development dan
            menciptakan pengalaman digital modern dan efektif.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://drive.google.com/file/d/1WQ8-VbqwXWypIQQkWcJXOv6H79QyaatM/view?usp=sharing" target="_blank" rel="noreferrer">
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r 
              from-red-500 to-pink-500 shadow-[0_0_25px_rgba(239,68,68,0.45)]
              hover:scale-105 transition">
                <FileText className="inline w-5 h-5 mr-2" />
                Download CV
              </button>
            </a>

            <a href="#Portofolio">
              <button className="px-6 py-3 rounded-lg border border-red-500/50
              text-red-400 hover:bg-red-500/10 transition">
                <Code className="inline w-5 h-5 mr-2" />
                View Projects
              </button>
            </a>
          </div>
        </div>

        {/* IMAGE */}
        <div className="relative">
          <div className="absolute -inset-6 opacity-30 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r 
            from-red-600 via-rose-500 to-pink-600 rounded-full blur-2xl" />
          </div>

          <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden
          shadow-[0_0_45px_rgba(239,68,68,0.45)] relative z-10">
            <img src="/Photo.jpg" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* STATS (CLICKABLE + NEON) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {[
          {
            icon: Code,
            value: totalProjects,
            label: "Total Projects",
            desc: "See my projects",
            link: "#Portofolio",
          },
          {
            icon: Award,
            value: totalCertificates,
            label: "Certificates",
            desc: "View achievements",
            link: "#Portofolio",
          },
          {
            icon: Globe,
            value: YearExperience,
            label: "Years of Experience",
            desc: "My journey",
            link: "#About",
          },
        ].map((item, i) => (
          <a
            key={i}
            href={item.link}
            className="group relative block"
          >
            {/* NEON BORDER */}
            <div className="absolute -inset-[2px] rounded-2xl 
            bg-gradient-to-r from-red-500 via-pink-500 to-red-500
            opacity-0 blur-md transition group-hover:opacity-100" />

            <div className="relative bg-black/60 backdrop-blur-xl rounded-2xl p-6
            border border-red-500/20 transition-all duration-300
            group-hover:-translate-y-2
            group-hover:shadow-[0_0_45px_rgba(239,68,68,0.65)]">

              <div className="flex items-center justify-between mb-4">
                <item.icon className="w-9 h-9 text-red-400" />
                <span className="text-4xl font-bold text-white">
                  {item.value}
                </span>
              </div>

              <p className="text-sm uppercase tracking-wider text-gray-300">
                {item.label}
              </p>

              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-400">{item.desc}</p>
                <ArrowUpRight className="w-4 h-4 text-red-400" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default memo(AboutPage)
