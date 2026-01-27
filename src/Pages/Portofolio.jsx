import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "../supabase"; 
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";
import { useTheme } from "@mui/material/styles"; // ✅ Import useTheme
import AOS from "aos";
import "aos/dist/aos.css";

// Toggle Button
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="px-3 py-1.5 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 ease-in-out flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 hover:border-white/20 backdrop-blur-sm group relative overflow-hidden"
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-300 ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}`}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

// Tab Panel
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
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

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

// Tech Stacks
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

export default function Portofolio() {
  const theme = useTheme(); // ✅ Pakai theme dari MUI
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const [projectsResponse, certificatesResponse] = await Promise.all([
        supabase.from("projects").select("*").order('id', { ascending: true }),
        supabase.from("certificates").select("*").order('id', { ascending: true }),
      ]);
      if (projectsResponse.error) throw projectsResponse.error;
      if (certificatesResponse.error) throw certificatesResponse.error;

      setProjects(projectsResponse.data || []);
      setCertificates(certificatesResponse.data || []);

      // Optional: cache
      localStorage.setItem("projects", JSON.stringify(projectsResponse.data || []));
      localStorage.setItem("certificates", JSON.stringify(certificatesResponse.data || []));
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
    }
  }, []);

  useEffect(() => {
    const cachedProjects = localStorage.getItem('projects');
    const cachedCertificates = localStorage.getItem('certificates');
    if (cachedProjects && cachedCertificates) {
      setProjects(JSON.parse(cachedProjects));
      setCertificates(JSON.parse(cachedCertificates));
    }
    fetchData();
  }, [fetchData]);

  const handleChange = (event, newValue) => setValue(newValue);
  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') setShowAllProjects(prev => !prev);
    else setShowAllCertificates(prev => !prev);
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      {/* Header */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          Portfolio Showcase
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise.
        </p>
      </div>

      {/* Tabs */}
      <Box sx={{ width: "100%" }}>
        <AppBar position="static" elevation={0} sx={{ bgcolor: "transparent", borderRadius: "20px" }}>
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab icon={<Code />} label="Projects" {...a11yProps(0)} />
            <Tab icon={<Award />} label="Certificates" {...a11yProps(1)} />
            <Tab icon={<Boxes />} label="Tech Stack" {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        {/* Tab Panels */}
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedProjects.map((project, i) => (
              <CardProject key={project.id || i} {...project} />
            ))}
          </div>
          {projects.length > initialItems && (
            <ToggleButton onClick={() => toggleShowMore('projects')} isShowingMore={showAllProjects} />
          )}
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {displayedCertificates.map((cert, i) => (
              <Certificate key={cert.id || i} ImgSertif={cert.Img} />
            ))}
          </div>
          {certificates.length > initialItems && (
            <ToggleButton onClick={() => toggleShowMore('certificates')} isShowingMore={showAllCertificates} />
          )}
        </TabPanel>

        <TabPanel value={value} index={2} dir={theme.direction}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {techStacks.map((stack, i) => (
              <TechStackIcon key={i} {...stack} />
            ))}
          </div>
        </TabPanel>
      </Box>
    </div>
  );
}
