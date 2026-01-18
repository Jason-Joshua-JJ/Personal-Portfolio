import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "#contact" },
];

interface NavbarProps {
  onOpenTerminal: () => void;
}

export default function Navbar({ onOpenTerminal }: NavbarProps) {
  const [showBurger, setShowBurger] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // If NOT home page, always show burger
      if (location.pathname !== "/") {
        setShowBurger(true);
        return;
      }

      // If Home page, show burger only after scrolling past the hero (viewport height)
      // We can use a threshold like 100vh - 100px to fade it in nicely
      const threshold = window.innerHeight - 100;
      setShowBurger(window.scrollY > threshold);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Toggle Menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // LOGIC:
  // 1. Is Hero Visible? (scrollY < threshold) -> Show Navbar (Logo + Links)
  // 2. Is Scrolled? (scrollY > threshold) -> Show Burger Only

  const isHeroVisible = !showBurger;

  return (
    <>
      {/* 1. DESKTOP NAVBAR (Visible only in Hero) */}
      <AnimatePresence>
        {isHeroVisible && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 h-24 flex items-center justify-end px-6 sm:px-10 bg-transparent"
          >
            {/* Logo removed as per user request */}

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-lg font-medium text-white/80 hover:text-primary transition-colors hover:scale-105"
                >
                  {item.name}
                </a>
              ))}

              <div className="pl-4 border-l border-white/10">
                <ThemeToggle />
              </div>

              <button
                onClick={onOpenTerminal}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all"
                title="Open Terminal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="4 17 10 11 4 5" />
                  <line x1="12" y1="19" x2="20" y2="19" />
                </svg>
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence >

      {/* 2. BURGER BUTTON (Appears after Scroll) */}
      <AnimatePresence>
        {
          (showBurger || isMenuOpen) && (
            <motion.button
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className={`fixed top-6 right-6 sm:right-10 z-50 p-3 rounded-full backdrop-blur-md shadow-lg transition-colors ${isMenuOpen
                ? "bg-red-500/20 text-red-500 hover:bg-red-500/30"
                : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          )
        }
      </AnimatePresence >

      {/* 3. FULL SCREEN MENU OVERLAY */}
      <AnimatePresence>
        {
          isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              className="fixed inset-0 z-40 bg-background/90 flex items-center justify-center p-4"
            >
              <div className="flex flex-col items-center gap-8 max-w-lg w-full">

                {/* Links */}
                <nav className="flex flex-col items-center gap-6 w-full">
                  {navItems.map((item, i) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-4xl md:text-5xl font-bold text-foreground/80 hover:text-primary transition-colors hover:scale-105"
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </nav>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-full h-px bg-border/50"
                />

                {/* Extras */}
                <div className="flex items-center gap-6">
                  <ThemeToggle />

                  <button
                    onClick={() => {
                      onOpenTerminal();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all font-mono"
                  >
                    <span className="text-xl">Opn_Trmnl</span>
                  </button>
                </div>

              </div>
            </motion.div>
          )
        }
      </AnimatePresence >
    </>
  );
}
