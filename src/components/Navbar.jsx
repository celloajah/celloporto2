import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  const navItems = [
    { href: "#Home", label: "Home" },
    { href: "#About", label: "About" },
    { href: "#Portofolio", label: "Portofolio" },
    { href: "#Contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems
        .map((item) => {
          const section = document.querySelector(item.href);
          if (!section) return null;
          return {
            id: item.href.replace("#", ""),
            offset: section.offsetTop - 300,
            height: section.offsetHeight,
          };
        })
        .filter(Boolean);

      const current = window.scrollY;
      const active = sections.find(
        (s) => current >= s.offset && current < s.offset + s.height
      );

      if (active) setActiveSection(active.id);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const section = document.querySelector(href);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isOpen
          ? "bg-[#030014]"
          : scrolled
          ? "bg-[#030014]/70 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto px-[5%] lg:px-[10%]">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <a
            href="#Home"
            onClick={(e) => scrollToSection(e, "#Home")}
            className="text-xl font-bold bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent"
          >
            
          </a>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="relative group text-sm font-medium"
              >
                <span
                  className={`transition-colors duration-300 ${
                    activeSection === item.href.substring(1)
                      ? "bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent font-semibold"
                      : "text-gray-300 group-hover:text-white"
                  }`}
                >
                  {item.label}
                </span>

                <span
                  className={`absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-red-500 to-rose-500 transition-transform duration-300 origin-left ${
                    activeSection === item.href.substring(1)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            ))}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white transition-transform duration-300"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-6 space-y-4 bg-[#030014]/95 backdrop-blur-xl">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className={`block text-lg font-medium transition-all duration-300 ${
                activeSection === item.href.substring(1)
                  ? "bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent"
                  : "text-gray-300 hover:text-white"
              }`}
              style={{
                transitionDelay: `${index * 80}ms`,
                transform: isOpen ? "translateX(0)" : "translateX(30px)",
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
  