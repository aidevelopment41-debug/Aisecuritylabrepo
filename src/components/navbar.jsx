"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ArrowRight, Menu, X, ShieldCheck, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NeonButton } from "@/components/neon-button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"

const NAV_LINKS = [
  { label: "Platform", href: "/platform" },
  { label: "Solutions", href: "/services" },
  { label: "Research", href: "/research", badge: "New" },
  { label: "Company", href: "/company" },
  { label: "About", href: "/about" },
]

const ANNOUNCEMENTS = [
  { text: "Intel Drop: RAG citation spoofing attacks - New brief", href: "/research" },
  { text: "Lab Update: Fire drill templates now live", href: "/lab" },
  { text: "Platform Update: Evidence packs for GRC", href: "/updates" },
]

const PRIMARY_CTA = { label: "Try the Lab", href: "/lab" }
const SECONDARY_CTA = { label: "Get a Demo", href: "/demo" }

export function Navbar() {
  const [index, setIndex] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
  }

  const isActiveLink = (href) => {
    if (href.startsWith("/#")) return false
    if (href === "/") return pathname === "/"
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header className="fixed top-0 w-full z-50">
      <div className="bg-black/35 backdrop-blur-md border-b border-white/10 text-primary-foreground text-[10px] md:text-xs py-2 px-4 text-center font-medium relative z-50 overflow-hidden h-9 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="flex items-center gap-2 absolute w-full justify-center text-center"
          >
            <span className="text-white/70 font-semibold uppercase tracking-wider text-[9px] lg:inline hidden">
              WHAT'S NEW:
            </span>
            <span className="text-zinc-300 truncate max-w-[200px] md:max-w-none">
              {ANNOUNCEMENTS[index].text}
            </span>
            <Link 
              href={ANNOUNCEMENTS[index].href} 
              className="text-white/70 underline decoration-white/40 underline-offset-4 hover:text-white hover:decoration-white/80 transition-colors duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] flex items-center ml-2 shrink-0"
            >
              Analyze <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <nav 
        className={cn(
          "sticky top-0 w-full z-50 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] backdrop-blur-md border-b border-white/10 bg-black/80",
          isScrolled 
            ? "py-3 shadow-2xl" 
            : "py-3"
        )}
      >
        <div className="mx-auto flex h-16 items-center justify-between px-6 lg:px-10 max-w-screen-2xl">
          
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative">
              <img src="/logoAIS2.svg" className="h-8 w-8 text-orange-500 transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full group-hover:bg-orange-500/40 transition-all" />
            </div>
            <span className="font-bold text-lg md:text-xl tracking-tighter leading-tight text-zinc-100">
              AI SECURITY<span className="text-orange-500">.</span>
              <span className="block text-zinc-500 font-mono text-[9px] tracking-[0.3em] uppercase">Laboratory</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-10 flex-1 justify-center">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={cn(
                  "px-2 py-2 text-sm font-medium transition-colors duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] flex items-center group relative after:absolute after:bottom-1 after:left-2 after:right-2 after:h-px after:bg-white/40 after:scale-x-0 after:origin-left after:transition-transform after:duration-200 after:ease-[cubic-bezier(0.4,0,0.2,1)] hover:after:scale-x-100",
                  isActiveLink(link.href)
                    ? "text-white"
                    : "text-[#A1A1AA] hover:text-white"
                )}
              >
                {link.label}
                {link.hasDropdown && (
                  <ChevronDown className="h-3 w-3 ml-1 opacity-40 group-hover:rotate-180 transition-transform" />
                )}

              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{user?.username || 'User'}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-white/10 rounded-lg shadow-xl z-50"
                    >
                      <div className="p-2">
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5 rounded transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <ShieldCheck className="w-4 h-4" />
                          Dashboard
                        </Link>
                        <Link
                          href="/profile"
                          className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5 rounded transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <User className="w-4 h-4" />
                          Profile
                        </Link>
                        <hr className="my-2 border-white/10" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5 rounded transition-colors w-full text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="text-xs font-medium text-zinc-400 hover:text-white hidden sm:flex items-center gap-2 transition-colors duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] leading-none"
                >
                  Log in
                </Link>
              </>
            )}

            <Link href={SECONDARY_CTA.href} className="hidden md:flex">
              <NeonButton
                variant="outline"
                size="sm"
                className="border-white/20 text-white/75 bg-transparent hover:border-white hover:text-white transition-colors duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] font-sans font-semibold tracking-normal px-6 py-2.5 rounded-lg"
              >
                {SECONDARY_CTA.label}
              </NeonButton>
            </Link>
            <Link href={PRIMARY_CTA.href} className="flex">
              <NeonButton
                variant="orange"
                size="sm"
                whileHover={{ scale: 1.05 }}
                className="bg-[#FF6B00] text-black border-transparent shadow-[0_0_18px_rgba(255,107,0,0.35)] hover:brightness-110 hover:shadow-[0_0_22px_rgba(255,107,0,0.5)] focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[filter,box-shadow,color,background,transform] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] font-sans font-semibold tracking-normal px-6 py-2.5 rounded-lg"
              >
                {PRIMARY_CTA.label}
              </NeonButton>
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="lg:hidden p-2 text-zinc-100 hover:bg-white/5 rounded-full transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-zinc-950 border-t border-white/5 overflow-hidden"
            >
              <div className="container px-8 py-12 flex flex-col gap-8">
                {NAV_LINKS.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-3xl font-bold text-zinc-100 hover:text-orange-500 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                
                <div className="pt-8 border-t border-white/5 space-y-4">
                  <Link href={SECONDARY_CTA.href} onClick={() => setIsMenuOpen(false)}>
                    <NeonButton
                      variant="outline"
                      size="md"
                      className="w-full border-white/20 text-white/75 bg-transparent hover:border-white hover:text-white transition-colors duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] font-sans font-semibold tracking-normal px-6 py-2.5 rounded-lg"
                    >
                      {SECONDARY_CTA.label}
                    </NeonButton>
                  </Link>
                  <Link href={PRIMARY_CTA.href} onClick={() => setIsMenuOpen(false)}>
                    <NeonButton
                      variant="orange"
                      size="md"
                      whileHover={{ scale: 1.05 }}
                      className="w-full bg-[#FF6B00] text-black border-transparent shadow-[0_0_18px_rgba(255,107,0,0.35)] hover:brightness-110 hover:shadow-[0_0_22px_rgba(255,107,0,0.5)] focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[filter,box-shadow,color,background,transform] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] font-sans font-semibold tracking-normal px-6 py-2.5 rounded-lg"
                    >
                      {PRIMARY_CTA.label}
                    </NeonButton>
                  </Link>
                  {!isAuthenticated && (
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full text-zinc-300 border-zinc-800">
                        Log in
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
