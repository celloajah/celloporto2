import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { supabase } from "../supabase";

import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import Certificate from "../components/Certificate";

import AOS from "aos";
import "aos/dist/aos.css";

import { Code, Award, Boxes } from "lucide-react";

/* ================= TOGGLE BUTTON ================= */
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-4 py-2 text-sm font-medium rounded-lg
      bg-[var(--glass-bg)] border border-[var(--border-soft)]
      text-[var(--text-main)] hover:text-white
      relative overflow-hidden
    "
  >
    <span className="absolute inset-0 bg-gradient-to-r from-[var(--red-main)] to-[var(--red-soft)] opacity-20 blur-lg"></span>
    <span className="relative">
      {isShowingMore ? "See Less" : "See More"}
    </span>
  </button>
);

/* ================= TAB PANEL ================= */
function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

/* ================= TECH STACK ================= */
const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "MUI.svg", language: "Material UI" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "SweetAlert.svg", language: "SweetAlert2" },
];

/* ================= MAIN ================= */
export default function Portofolio() {
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [initialItems, setInitialItems] = useState(6);

  useEffect(() => {
    if (window.innerWidth < 768) setInitialItems(4);
  }, []);

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const [{ data: projectData }, { data: certData }] =
        await Promise.all([
          supabase.from("projects").select("*").order("id"),
          supabase.from("certificates").select("*").order("id"),
        ]);

      setProjects(projectData || []);
      setCertificates(certData || []);

      localStorage.setItem("projects", JSON.stringify(projectData || []));
      localStorage.setItem("certificates", JSON.stringify(certData || []));
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    const cachedProjects = localStorage.getItem("projects");
    const cachedCertificates = localStorage.getItem("certificates");

    if (cachedProjects) setProjects(JSON.parse(cachedProjects));
    if (cachedCertificates) setCertificates(JSON.parse(cachedCertificates));

    fetchData();
  }, [fetchData]);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  return (
    <section
      id="Portofolio"
      className="
        relative w-full mt-20 px-[5%] md:px-[10%]
        bg-transparent
      "
    >
      {/* HEADER */}
      <div className="text-center pb-12" data-aos="fade-up">
        <h2 className="
          text-4xl md:text-6xl font-bold
          bg-gradient-to-r from-[var(--red-main)] to-[var(--red-soft)]
          bg-clip-text text-transparent
        ">
          Portfolio
        </h2>
        <p className="text-[var(--text-muted)] mt-3">
          Projects, certificates, and tech stack I’ve worked with.
        </p>
      </div>

      {/* TABS */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: "transparent" }}>
  <Tabs
    value={value}
    onChange={(e, v) => setValue(v)}
    variant="fullWidth"
    textColor="inherit"
    TabIndicatorProps={{
      style: {
        background: "linear-gradient(90deg, #ef4444, #fb7185)",
        height: "3px",
      },
    }}
    sx={{
      "& .MuiTab-root": {
        color: "#ffffff",                // 👈 DEFAULT PUTIH
        fontWeight: 500,
        transition: "all .3s ease",
      },
      "& .MuiTab-root.Mui-selected": {
        color: "#ef4444",                // 👈 AKTIF MERAH NEON
        textShadow: "0 0 12px rgba(239,68,68,.6)",
      },
      "& .MuiSvgIcon-root": {
        color: "inherit",                // 👈 ICON IKUT WARNA TEXT
      },
    }}
  >
    <Tab icon={<Code />} label="Projects" />
    <Tab icon={<Award />} label="Certificates" />
    <Tab icon={<Boxes />} label="Tech Stack" />
  </Tabs>
</AppBar>


      {/* PROJECTS */}
      <TabPanel value={value} index={0}>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {displayedProjects.map((p, i) => (
            <CardProject key={p.id || i} {...p} />
          ))}
        </div>

        {projects.length > initialItems && (
          <div className="mt-8 flex justify-center">
            <ToggleButton
              onClick={() => setShowAllProjects(!showAllProjects)}
              isShowingMore={showAllProjects}
            />
          </div>
        )}
      </TabPanel>

      {/* CERTIFICATES */}
      <TabPanel value={value} index={1}>
        <div className="grid md:grid-cols-3 gap-6">
          {displayedCertificates.map((c, i) => (
            <Certificate key={c.id || i} ImgSertif={c.Img} />
          ))}
        </div>
      </TabPanel>

      {/* TECH STACK */}
      <TabPanel value={value} index={2}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {techStacks.map((t, i) => (
            <TechStackIcon
              key={i}
              TechStackIcon={t.icon}
              Language={t.language}
            />
          ))}
        </div>
      </TabPanel>
    </section>
  );
}
