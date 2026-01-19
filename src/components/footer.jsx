import Link from "next/link"
import { ShieldAlert, Twitter, Linkedin, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NeonButton } from "@/components/neon-button"

export function Footer() {
    return (
        <footer className="bg-[#020202] border-t border-white/10 pt-20 pb-10 text-sm">
            <div className="container px-4 md:px-8 max-w-screen-2xl">

                {/* Top Section: CTA & Newsletter */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-white tracking-tight">
                            Secure your AI infrastructure today.
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-md">
                            Join the leading organizations trusting us to defend their LLMs against adversarial attacks.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <Link href="/lab">
                                <NeonButton variant="orange" size="md">
                                    Try the Lab
                                </NeonButton>
                            </Link>
                            <Link href="/platform">
                                <Button variant="outline" className="border-white/20 text-white hover:border-orange-500/50 hover:bg-orange-500/10 transition-all">
                                    View Platform
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col items-start lg:items-end space-y-4">
                        <h3 className="font-bold text-white uppercase tracking-widest text-xs opacity-80">Stay updated on threats</h3>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground focus-visible:ring-orange-500/30 focus-visible:border-orange-500/50 transition-all"
                            />
                            <Button type="submit" className="bg-orange-500 text-white hover:bg-orange-600 font-bold transition-all shadow-[0_0_15px_rgba(249,115,22,0.2)]">Subscribe</Button>
                        </div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
                            Get research on prompt injection & AI safety.
                        </p>
                    </div>
                </div>

                {/* Middle Section: Sitemap */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-20 border-t border-white/5 pt-16">

                    <div className="col-span-2 lg:col-span-2 pr-8">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <ShieldAlert className="h-6 w-6 text-orange-500" />
                            <span className="font-bold text-lg text-white">AI SECURITY LAB</span>
                        </Link>
                        <p className="text-muted-foreground leading-relaxed max-w-xs mb-6">
                            The global standard for AI security assurance. We protect the integrity of artificial intelligence systems against adversarial manipulation.
                        </p>
                        <div className="flex gap-4">
                            <Button variant="ghost" size="icon" className="hover:bg-white/5 hover:text-white text-muted-foreground h-8 w-8">
                                <Twitter className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:bg-white/5 hover:text-white text-muted-foreground h-8 w-8">
                                <Linkedin className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:bg-white/5 hover:text-white text-muted-foreground h-8 w-8">
                                <Github className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold text-white">Platform</h4>
                        <ul className="space-y-2 text-muted-foreground text-sm">
                            <li><Link href="/platform" className="hover:text-orange-500 transition-colors">Overview</Link></li>
                            <li><Link href="/services" className="hover:text-orange-500 transition-colors">Solutions</Link></li>
                            <li><Link href="/lab" className="hover:text-orange-500 transition-colors">Try the Lab</Link></li>
                            <li><Link href="/research" className="hover:text-orange-500 transition-colors">Research</Link></li>
                            <li><Link href="/updates" className="hover:text-orange-500 transition-colors">Updates</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold text-white">Company</h4>
                        <ul className="space-y-2 text-muted-foreground text-sm">
                            <li><Link href="/company" className="hover:text-orange-500 transition-colors">About Us</Link></li>
                            <li><Link href="/company" className="hover:text-orange-500 transition-colors">Leadership</Link></li>
                            <li><Link href="/#partners" className="hover:text-orange-500 transition-colors">Partners</Link></li>
                            <li><Link href="/insights" className="hover:text-orange-500 transition-colors">Insights</Link></li>
                            <li><Link href="/resources" className="hover:text-orange-500 transition-colors">Resources</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold text-white">Resources</h4>
                        <ul className="space-y-2 text-muted-foreground text-sm">
                            <li><Link href="/research" className="hover:text-orange-500 transition-colors">Threat Research</Link></li>
                            <li><Link href="/insights" className="hover:text-orange-500 transition-colors">Analyst Briefs</Link></li>
                            <li><Link href="/webinar" className="hover:text-orange-500 transition-colors">Webinars</Link></li>
                            <li><Link href="/resources" className="hover:text-orange-500 transition-colors">Security Toolkit</Link></li>
                            <li><Link href="/updates" className="hover:text-orange-500 transition-colors">Release Notes</Link></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Section: Legal */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-muted-foreground text-xs">
                    <div className="mb-4 md:mb-0">
                        (c) 2026 AI Security Lab. All rights reserved.
                    </div>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white">Terms of Service</Link>
                        <Link href="/cookies" className="hover:text-white">Cookie Settings</Link>
                    </div>
                </div>

            </div>
        </footer>
    )
}
