"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function NeonButton({
    children,
    className,
    variant = "blue",
    size = "md",
    ...props
}) {
    const variants = {
        blue: "border-blue-500/50 text-blue-400 hover:text-blue-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]",
        green: "border-green-500/50 text-green-400 hover:text-green-200 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]",
        orange: "border-orange-500/50 text-orange-400 hover:text-orange-200 hover:shadow-[0_0_20px_rgba(255,107,0,0.5)]",
        outline: "border-white/10 text-white hover:border-white/20 hover:bg-white/5",
    }

    const sizes = {
        sm: "px-4 py-2 text-xs",
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-4 text-base",
    }

    return (
        <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "relative group overflow-hidden rounded-lg border bg-black/40 backdrop-blur-sm transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] font-mono tracking-wider font-semibold",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {/* Sweep Effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-sweep pointer-events-none" />

            {/* Content */}
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>

            {/* Ripple/Glow Circle on Hover */}
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 bg-current rounded-full opacity-0 group-hover:w-32 group-hover:h-32 group-hover:opacity-[0.03] transition-all duration-700 pointer-events-none" />
        </motion.button>
    )
}
