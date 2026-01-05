import Link from "next/link"
import { ShieldAlert, Twitter, Linkedin, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
                            <Link href="/demo">
                                <Button className="font-bold bg-orange-500 text-white hover:bg-orange-600 transition-all shadow-[0_0_20px_rgba(249,115,22,0.1)]">
                                    Request Demo
                                </Button>
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
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Detection Engine</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Compliance Control</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Real-time WAF</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Integrations</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Docs</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold text-white">Company</h4>
                        <ul className="space-y-2 text-muted-foreground text-sm">
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Newsroom</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Partners</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold text-white">Resources</h4>
                        <ul className="space-y-2 text-muted-foreground text-sm">
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Research Reports</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Webinars</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Vulnerability Database</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Community</Link></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Section: Legal */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-muted-foreground text-xs">
                    <div className="mb-4 md:mb-0">
                        © 2026 AI Security Lab. All rights reserved.
                    </div>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-white">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white">Terms of Service</Link>
                        <Link href="#" className="hover:text-white">Cookie Settings</Link>
                    </div>
                </div>

            </div>
        </footer>
    )
}
