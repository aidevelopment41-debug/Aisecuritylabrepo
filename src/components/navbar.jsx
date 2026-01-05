"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShieldAlert, ChevronDown, ArrowRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const announcements = [
  { text: "New Research: Prompt Injection in RAG Systems - 2026 Report", href: "/research" },
  { text: "Webinar: Securing Agentic Workflows - Register Now", href: "/webinar" },
  { text: "Platform Update: Enhanced Context Filtering Live", href: "/updates" },
]

export function Navbar() {
  const [index, setIndex] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed top-0 w-full z-50">
      {/* Rotating Announcement Strip */}
      <div className="bg-primary text-primary-foreground text-[10px] md:text-xs py-2 px-4 text-center font-medium relative z-50 overflow-hidden h-9 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 absolute w-full justify-center"
          >
            <span className="font-bold uppercase tracking-wider opacity-80 lg:inline hidden">Latest Update:</span>
            <span className="truncate max-w-[200px] md:max-w-none">{announcements[index].text}</span>
            <Link href={announcements[index].href} className="underline underline-offset-2 hover:opacity-80 flex items-center cursor-pointer ml-1 shrink-0">
              Read <ArrowRight className="h-3 w-3 ml-0.5" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <nav className={cn(
        "bg-background/80 backdrop-blur-md relative z-40 transition-all duration-500",
        isScrolled ? "border-b border-orange-500/30 shadow-[0_4px_30px_rgba(249,115,22,0.1)] py-0" : "border-b border-white/5 py-2"
      )}>
        <div className="container flex h-20 max-w-screen-2xl items-center justify-between px-4 md:px-8">

          <Link href="/" className="flex items-center gap-2 md:gap-3 mr-4 md:mr-8 shrink-0 hover:opacity-80 transition-opacity">
            <ShieldAlert className="h-6 w-6 md:h-8 md:h-8 text-orange-500" />
            <span className="font-bold text-base md:text-xl tracking-tight leading-none text-white">
              AI SECURITY <br />
              <span className="text-muted-foreground font-normal text-[10px] md:text-xs tracking-widest uppercase">LAB</span>
            </span>
          </Link>

          {/* AI Lab Nav */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            <Link href="/research" className="text-sm font-medium hover:text-primary transition-colors flex items-center group">
              Research & Projects <ChevronDown className="h-4 w-4 ml-1 opacity-50 group-hover:rotate-180 transition-transform duration-300" />
            </Link>
            <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors">
              Services & Solutions
            </Link>
            <Link href="/insights" className="text-sm font-medium hover:text-primary transition-colors">
              Insights & Blog
            </Link>
            <Link href="/resources" className="text-sm font-medium hover:text-primary transition-colors">
              Resources
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About Us
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground hidden sm:block transition-colors">
              Log In
            </Link>
            <Link href="/demo" className="hidden sm:block">
              <Button className="font-semibold shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] transition-all bg-orange-500 hover:bg-orange-600 text-white">
                Get a Demo
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-white/5 bg-background/95 backdrop-blur-xl overflow-hidden"
            >
              <div className="container px-4 py-8 flex flex-col gap-6">
                {[
                  { label: "Research & Projects", href: "/research" },
                  { label: "Services & Solutions", href: "/services" },
                  { label: "Insights & Blog", href: "/insights" },
                  { label: "Resources", href: "/resources" },
                  { label: "About Us", href: "/about" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-bold font-orbitron hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-lg">Log In</Button>
                  </Link>
                  <Link href="/demo" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full text-lg py-6 bg-orange-500 hover:bg-orange-600 text-white shadow-[0_0_20px_rgba(249,115,22,0.2)]">Get a Demo</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  )
}
