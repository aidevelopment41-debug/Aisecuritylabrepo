import { LabSidebar } from "@/components/lab/sidebar"
import "@/app/globals.css"

export default function LabLayout({ children }) {
    return (
        <div className="min-h-screen bg-background text-foreground pt-24 pb-16">
            <div className="container px-4 md:px-8">
                <div className="bg-black/90 border border-[#333] rounded-xl min-h-[600px] h-[80vh] grid grid-cols-[260px_1fr] overflow-hidden">
                    <LabSidebar />
                    <main className="relative p-6 overflow-hidden">
                        {/* Background Grid for Lab Area specifically */}
                        <div className="absolute inset-0 z-[-1] bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
                        <div className="relative h-full flex flex-col">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
