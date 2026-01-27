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
    className="px-3 py-1.5 text-slate-300 hover:text-white text-sm font-medium
      transition-all duration-300 flex items-center gap-2 bg-white/5 hover:bg-white/10
      rounded-md border border-white/10 hover:border-white/20 backdrop-blur-sm group"
  >
    {isShowingMore ? "See Less" : "See More"}
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

/* ================= MAIN COMPONENT ================= */
export default function Portofolio() {
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [initialItems, setInitialItems] = useState(6);

  /* ✅ AMAN SSR */
  useEffect(() => {
    if (window.innerWidth < 768) setInitialItems(4);
  }, []);

  /* AOS */
  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  /* FETCH SUPABASE */
  const fetchData = useCallback(async () => {
    try {
      const [{ data: projectData, error: projectError }, { data: certData, error: certError }] =
        await Promise.all([
          supabase.from("projects").select("*").order("id", { ascending: true }),
          supabase.from("certificates").select("*").order("id", { ascending: true }),
        ]);

      if (projectError || certError) throw projectError || certError;

      setProjects(projectData || []);
      setCertificates(certData || []);

      localStorage.setItem("projects", JSON.stringify(projectData || []));
      localStorage.setItem("certificates", JSON.stringify(certData || []));
    } catch (err) {
      console.error("Supabase error:", err.message);
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
    <div className="md:px-[10%] px-[5%] w-full mt-12 bg-[#030014]" id="Portofolio">

      {/* HEADER */}
      <div className="text-center pb-10" data-aos="fade-up">
        <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
          Portfolio Showcase
        </h2>
        <p className="text-slate-400 mt-2">
          Projects, certificates, and tech stack I’ve worked with.
        </p>
      </div>

      {/* TABS */}
      <AppBar position="static" sx={{ bgcolor: "transparent" }} elevation={0}>
        <Tabs value={value} onChange={(e, v) => setValue(v)} variant="fullWidth">
          <Tab icon={<Code />} label="Projects" />
          <Tab icon={<Award />} label="Certificates" />
          <Tab icon={<Boxes />} label="Tech Stack" />
        </Tabs>
      </AppBar>

      {/* PROJECTS */}
      <TabPanel value={value} index={0}>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {displayedProjects.map((p, i) => (
            <CardProject key={p.id || i} {...p} />
          ))}
        </div>

        {projects.length > initialItems && (
          <div className="mt-6">
            <ToggleButton
              onClick={() => setShowAllProjects(!showAllProjects)}
              isShowingMore={showAllProjects}
            />
          </div>
        )}
      </TabPanel>

      {/* CERTIFICATES */}
      <TabPanel value={value} index={1}>
        <div className="grid md:grid-cols-3 gap-5">
          {displayedCertificates.map((c, i) => (
            <Certificate key={c.id || i} ImgSertif={c.Img} />
          ))}
        </div>
      </TabPanel>

      {/* TECH STACK */}
      <TabPanel value={value} index={2}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {techStacks.map((t, i) => (
            <TechStackIcon key={i} TechStackIcon={t.icon} Language={t.language} />
          ))}
        </div>
      </TabPanel>
    </div>
  );
}
