import { LabSidebar } from "@/components/lab/sidebar"
import "@/app/globals.css"

export default function LabLayout({ children }) {
    return (
        <div className="relative min-h-screen bg-[#050505] text-white pt-[150px] md:pt-[170px] pb-28">
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-50 pointer-events-none">
                <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[160px]" />
                <div className="absolute right-[-10%] top-[20%] h-[360px] w-[360px] rounded-full bg-blue-500/10 blur-[140px]" />
            </div>

            <section className="relative z-10 container px-4 md:px-8 mx-auto max-w-screen-2xl">
                <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
                    {/* Sidebar */}
                    <LabSidebar />
                    
                    {/* Main Content */}
                    <div className="space-y-8">
                        {children}
                    </div>
                </div>
            </section>
        </div>
    )
}