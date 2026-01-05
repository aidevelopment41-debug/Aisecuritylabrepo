import { LabSidebar } from "@/components/lab/sidebar"
import "@/app/globals.css"

export default function LabLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <LabSidebar />
            <main className="flex-1 ml-64 pt-14 p-8 relative">
                {/* Background Grid for Lab Area specifically */}
                <div className="absolute inset-0 z-[-1] bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

                {children}
            </main>
        </div>
    )
}
