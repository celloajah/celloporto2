import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import WelcomeScreen from "./Pages/WelcomeScreen";
import NotFoundPage from "./Pages/404";

import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import ProjectDetails from "./components/ProjectDetail";

import { supabase } from "./supabase";

/* ---------- Landing Page ---------- */
function LandingPage({ showWelcome, setShowWelcome }) {
  return (
    <>
      {/* Welcome Screen */}
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen
            key="welcome"
            onLoadingComplete={() => setShowWelcome(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      {!showWelcome && (
        <div key="main-content">
          <Navbar />
          <AnimatedBackground />
          <Home />
          <About />
          <Portofolio />
          <ContactPage />
        </div>
      )}
    </>
  );
}

/* ---------- App ---------- */
function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  // ❗ Supabase safety check (tidak bikin blank)
  if (!supabase) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0b0b1a",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div>
          <h2>⚠️ Configuration Error</h2>
          <p>Supabase environment variables belum dikonfigurasi.</p>
          <small>
            Pastikan <b>VITE_SUPABASE_URL</b> dan{" "}
            <b>VITE_SUPABASE_ANON_KEY</b> sudah diset di Vercel.
          </small>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              showWelcome={showWelcome}
              setShowWelcome={setShowWelcome}
            />
          }
        />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
