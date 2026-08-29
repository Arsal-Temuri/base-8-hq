"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Operational Units", path: "/operational-units" },
  { label: "Mission Archive", path: "/mission-archive" },
  { label: "Headquarters", path: "/headquarters" },
  { label: "Strike Team", path: "/strike-team" },
  { label: "Contact Point", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const mobileToggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      const next = window.scrollY > 50;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrolled(next);
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when navigating to a new route
  useEffect(() => {
    const timer = setTimeout(() => setMobileOpen(false), 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const toggleButton = mobileToggleRef.current;
    if (!toggleButton) return;
    toggleButton.setAttribute("aria-expanded", mobileOpen ? "true" : "false");
    toggleButton.setAttribute("aria-label", mobileOpen ? "Close navigation" : "Open navigation");
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-primary/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link href="/" aria-label="BASE8HQ Home" className="flex items-center">
          <div className="h-11 lg:h-14 w-44 lg:w-56 overflow-hidden">
            <Image
              src="/LOGO%20BASE%208%20HQ.png"
              alt="BASE8HQ"
              width={224}
              height={56}
              priority
              className="h-full w-full object-cover object-[center_46%]"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`font-heading text-[0.65rem] tracking-widest uppercase transition-colors duration-200 ${
                pathname === link.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/deploy-mission"
            className="hidden md:inline-block btn-glow rounded-sm"
          >
            Deploy a Mission
          </Link>
          <button
            ref={mobileToggleRef}
            className="lg:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-controls="mobile-navigation"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-primary/20 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`font-heading text-sm tracking-widest uppercase ${
                    pathname === link.path
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/deploy-mission" className="btn-glow-filled rounded-sm text-center mt-2">
                Deploy a Mission
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
