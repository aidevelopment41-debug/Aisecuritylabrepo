"use client"

import { useEffect, useRef } from "react"

export function HeroBackground() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        let width = canvas.width = window.innerWidth
        let height = canvas.height = window.innerHeight

        let particles = []
        const particleCount = 60 // Number of nodes
        const connectionDistance = 150
        const mouseDistance = 200

        let mouse = { x: null, y: null }

        window.addEventListener("resize", () => {
            width = canvas.width = window.innerWidth
            height = canvas.height = window.innerHeight
        })

        window.addEventListener("mousemove", (e) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
        })

        window.addEventListener("mouseleave", () => {
            mouse.x = null
            mouse.y = null
        })

        class Particle {
            constructor() {
                this.x = Math.random() * width
                this.y = Math.random() * height
                this.vx = (Math.random() - 0.5) * 0.5
                this.vy = (Math.random() - 0.5) * 0.5
                this.size = Math.random() * 2 + 1
                // 20% chance for an 'active' orange node
                this.color = Math.random() > 0.8
                    ? `rgba(249, 115, 22, ${Math.random() * 0.5 + 0.3})`
                    : `rgba(100, 116, 139, ${Math.random() * 0.3 + 0.1})`
            }

            update() {
                this.x += this.vx
                this.y += this.vy

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1
                if (this.y < 0 || this.y > height) this.vy *= -1

                // Mouse interaction
                if (mouse.x != null) {
                    let dx = mouse.x - this.x
                    let dy = mouse.y - this.y
                    let distance = Math.sqrt(dx * dx + dy * dy)
                    if (distance < mouseDistance) {
                        const forceDirectionX = dx / distance
                        const forceDirectionY = dy / distance
                        const force = (mouseDistance - distance) / mouseDistance
                        const directionX = forceDirectionX * force * 0.6
                        const directionY = forceDirectionY * force * 0.6
                        this.vx += directionX
                        this.vy += directionY
                    }
                }
            }

            draw() {
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fillStyle = this.color
                ctx.fill()
            }
        }

        function init() {
            particles = []
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle())
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height)

            // Draw connections
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x
                    let dy = particles[a].y - particles[b].y
                    let distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < connectionDistance) {
                        let opacity = 1 - (distance / connectionDistance)
                        ctx.strokeStyle = `rgba(100, 116, 139, ${opacity * 0.2})` // Slate-500 with low opacity
                        ctx.lineWidth = 1
                        ctx.beginPath()
                        ctx.moveTo(particles[a].x, particles[a].y)
                        ctx.lineTo(particles[b].x, particles[b].y)
                        ctx.stroke()
                    }
                }
                particles[a].update()
                particles[a].draw()
            }
            requestAnimationFrame(animate)
        }

        init()
        animate()

    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen"
        />
    )
}
