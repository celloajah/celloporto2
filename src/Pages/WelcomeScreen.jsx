import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Code2, Github, Globe, User } from "lucide-react";

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = React.useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayText(text.slice(0, index));
      index++;
      if (index > text.length) clearInterval(timer);
    }, 150);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-3xl animate-pulse" />
  </div>
);

export default function WelcomeScreen({ onLoadingComplete }) {
  useEffect(() => {
    // ⛑ HARD SAFETY (kalau framer error)
    const forceExit = setTimeout(() => {
      onLoadingComplete();
    }, 5000);

    return () => clearTimeout(forceExit);
  }, [onLoadingComplete]);

  return (
    <motion.div
      key="welcome"
      className="fixed inset-0 bg-[#030014]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onAnimationComplete={() => {
        // 🔥 INI YANG PALING PENTING
        setTimeout(onLoadingComplete, 2500);
      }}
    >
      <BackgroundEffect />

      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-8">
          <div className="flex justify-center gap-6">
            {[Code2, User, Github].map((Icon, i) => (
              <div key={i} className="p-3 bg-black/40 rounded-full">
                <Icon className="w-6 h-6 text-white" />
              </div>
            ))}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold">
            <span className="bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              Welcome To My
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Portfolio Website
            </span>
          </h1>

          <a
            href="https://www.eki.my.id"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xl text-indigo-400"
          >
            <Globe className="w-5 h-5" />
            <TypewriterEffect text="www.eki.my.id" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
