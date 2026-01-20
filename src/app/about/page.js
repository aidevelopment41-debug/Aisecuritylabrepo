import Link from "next/link"
import { NeonButton } from "@/components/neon-button"

const stats = [
  { label: "Attack scenarios", value: "120+" },
  { label: "LLM apps tested", value: "60+" },
  { label: "Median hardening", value: "36 hrs" },
  { label: "Attack-class coverage", value: "98%" },
]

const principles = [
  {
    title: "Clarity over complexity",
    desc: "We translate adversarial behavior into clear, actionable risk for engineering and security teams.",
  },
  {
    title: "Evidence-first security",
    desc: "Every finding is backed by reproducible steps and a remediation path that can be audited.",
  },
  {
    title: "Ship with confidence",
    desc: "We help teams move faster by proving their AI systems are safe before launch.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-white pt-24">
      <section className="container px-4 md:px-8 mx-auto max-w-screen-2xl py-16">
        <div className="max-w-3xl">
          <div className="text-orange-500 font-mono text-xs tracking-widest mb-3 uppercase">
            About Us
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-orbitron mb-6">
            Securing the agentic era.
          </h1>
          <p className="text-lg text-[#E5E5E5] leading-relaxed font-exo font-light">
            AI Security Lab helps product and engineering teams prove their LLM apps are safe.
            We specialize in prompt injection, data leakage, and tool misuse testing, then
            deliver the evidence and fixes security teams need to approve releases.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
            >
              <div className="text-2xl font-bold text-white font-orbitron">{stat.value}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-mono mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container px-4 md:px-8 mx-auto max-w-screen-2xl py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="text-orange-500 font-mono text-xs tracking-widest uppercase">
              Mission
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-orbitron">
              Make AI systems provably safe.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Traditional security tools were not built for LLMs. We help teams identify how
              their AI systems fail, simulate real adversaries, and harden the stack with
              measurable results.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/lab">
                <NeonButton variant="orange" size="md">
                  Try the Lab
                </NeonButton>
              </Link>
              <Link href="/research">
                <NeonButton variant="outline" size="md">
                  Explore Research
                </NeonButton>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {principles.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
              >
                <div className="text-sm font-semibold text-white mb-2">{item.title}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container px-4 md:px-8 mx-auto max-w-screen-2xl pb-20">
        <div className="rounded-3xl border border-orange-500/20 bg-gradient-to-r from-orange-500/10 via-white/[0.02] to-transparent p-10 md:p-14">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="text-xs font-mono uppercase tracking-[0.35em] text-orange-400">
                Work With Us
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-orbitron text-white">
                Book a fire drill with the Lab.
              </h2>
              <p className="text-muted-foreground text-lg font-exo font-light">
                Get a focused assessment, remediation plan, and proof pack for your next release.
              </p>
            </div>
            <Link href="/lab">
              <NeonButton variant="orange" size="lg">
                Book a Fire Drill
              </NeonButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
