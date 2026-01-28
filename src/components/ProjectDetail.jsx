import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, ExternalLink, Github, Code2, Star,
  ChevronRight, Layers, Layout, Globe, Package, Cpu, Code,
} from "lucide-react";
import Swal from 'sweetalert2';

/* ================= ICON MAP ================= */
const TECH_ICONS = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  Javascript: Code,
  HTML: Code,
  CSS: Code,
  default: Package,
};

/* ================= TECH BADGE ================= */
const TechBadge = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS.default;

  return (
    <div
      className="relative group px-4 py-2 rounded-xl cursor-pointer
      bg-red-500/10 border border-red-500/20
      hover:border-red-500/60
      hover:shadow-[0_0_18px_rgba(255,0,80,0.45)]
      transition-all duration-300"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-red-500/30 to-pink-500/30 blur opacity-0 group-hover:opacity-100 transition" />
      <div className="relative flex items-center gap-2 text-red-300">
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium">{tech}</span>
      </div>
    </div>
  );
};

/* ================= FEATURE ITEM ================= */
const FeatureItem = ({ feature }) => (
  <li
    className="group flex items-start gap-3 p-3 rounded-xl
    bg-white/5 border border-white/10
    hover:border-red-500/40
    hover:shadow-[0_0_15px_rgba(255,0,80,0.25)]
    transition-all"
  >
    <span className="mt-2 w-2 h-2 rounded-full bg-gradient-to-r from-red-400 to-pink-400 group-hover:scale-125 transition" />
    <span className="text-gray-300 group-hover:text-white">
      {feature}
    </span>
  </li>
);

/* ================= PROJECT STATS ================= */
const ProjectStats = ({ project }) => {
  const techCount = project?.TechStack?.length || 0;
  const featureCount = project?.Features?.length || 0;

  return (
    <div className="grid grid-cols-2 gap-4">
      {[
        { icon: Code2, value: techCount, label: "Total Tech" },
        { icon: Layers, value: featureCount, label: "Key Features" },
      ].map((item, i) => (
        <div
          key={i}
          className="relative group p-4 rounded-xl
          bg-white/5 border border-red-500/20
          hover:border-red-500/50
          hover:shadow-[0_0_20px_rgba(255,0,80,0.35)]
          transition-all"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500/30 to-pink-500/30 blur opacity-0 group-hover:opacity-100" />
          <div className="relative flex items-center gap-3">
            <item.icon className="w-6 h-6 text-red-400" />
            <div>
              <div className="text-xl font-bold text-red-300">{item.value}</div>
              <div className="text-xs text-gray-400">{item.label}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ================= GITHUB HANDLER ================= */
const handleGithubClick = (githubLink) => {
  if (githubLink === 'Private') {
    Swal.fire({
      icon: 'info',
      title: 'Source Code Private',
      text: 'Maaf, source code proyek ini bersifat privat.',
      confirmButtonColor: '#ef4444',
      background: '#030014',
      color: '#fff',
    });
    return false;
  }
  return true;
};

/* ================= MAIN ================= */
const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const stored = JSON.parse(localStorage.getItem("projects")) || [];
    const found = stored.find(p => String(p.id) === id);
    if (found) {
      setProject({
        ...found,
        Features: found.Features || [],
        TechStack: found.TechStack || [],
      });
    }
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030014]">
        <div className="w-16 h-16 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] px-[5%] py-12 text-white">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-xl
        bg-white/5 border border-white/10
        hover:border-red-500/40 hover:shadow-[0_0_12px_rgba(255,0,80,0.3)]
        transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
        {project.Title}
      </h1>

      <p className="mt-4 text-gray-300 max-w-3xl">
        {project.Description}
      </p>

      <div className="mt-8">
        <ProjectStats project={project} />
      </div>

      <div className="mt-8 flex gap-4 flex-wrap">
        <a
          href={project.Link}
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500
          hover:shadow-[0_0_25px_rgba(255,0,80,0.5)] transition"
        >
          <ExternalLink className="inline w-4 h-4 mr-2" />
          Live Demo
        </a>

        <a
          href={project.Github}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => !handleGithubClick(project.Github) && e.preventDefault()}
          className="px-6 py-3 rounded-xl border border-red-500/40 text-red-400
          hover:bg-red-500/10 hover:shadow-[0_0_20px_rgba(255,0,80,0.35)]
          transition"
        >
          <Github className="inline w-4 h-4 mr-2" />
          Github
        </a>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Code2 className="text-red-400" /> Technologies
        </h3>
        <div className="flex flex-wrap gap-3">
          {project.TechStack.map((t, i) => (
            <TechBadge key={i} tech={t} />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Star className="text-yellow-400" /> Key Features
        </h3>
        <ul className="space-y-3">
          {project.Features.map((f, i) => (
            <FeatureItem key={i} feature={f} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectDetails;
