"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";

const COLORS = {
  active: '249, 115, 22',
  grid: '255, 137, 4',
};

export default function SecurityBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let nodes = [];
    let packets = [];
    let animationFrameId;

    const SETTINGS = {
      spacing: 60,
      mouseRadius: 180, // Adjusted for better feel
      layers: 2
    };

    class Node {
      constructor(x, y, layer) {
        this.originX = x;
        this.originY = y;
        this.x = x;
        this.y = y;
        this.layer = layer;
        this.neighbors = [];
        this.angle = Math.random() * Math.PI * 2;
        this.velocity = 0.01 + Math.random() * 0.01;
        this.brightness = 0.2;
      }

      update(mouse) {
        this.angle += this.velocity;
        const drift = 4 / this.layer;
        const floatX = Math.cos(this.angle) * drift;
        const floatY = Math.sin(this.angle) * drift;

        // Interaction distance logic
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let pushX = 0;
        let pushY = 0;

        if (dist < SETTINGS.mouseRadius) {
          const power = (SETTINGS.mouseRadius - dist) / SETTINGS.mouseRadius;
          const force = power * 50;
          const angle = Math.atan2(dy, dx);
          pushX = -Math.cos(angle) * force;
          pushY = -Math.sin(angle) * force;
          this.brightness = Math.min(this.brightness + 0.1, 0.8);
        } else {
          this.brightness = Math.max(this.brightness - 0.01, 0.15);
        }

        this.x += (this.originX + floatX + pushX - this.x) * 0.1;
        this.y += (this.originY + floatY + pushY - this.y) * 0.1;
      }
    }

    class DataPacket {
      constructor(startNode) {
        this.currentNode = startNode;
        this.nextNode = this.getNext(startNode);
        this.progress = 0;
        this.speed = 0.03 + Math.random() * 0.04;
        this.dead = false;
      }

      getNext(node) {
        if (!node.neighbors.length) return null;
        return node.neighbors[Math.floor(Math.random() * node.neighbors.length)];
      }

      update() {
        this.progress += this.speed;
        if (this.progress >= 1) {
          this.currentNode = this.nextNode;
          this.nextNode = this.getNext(this.currentNode);
          this.progress = 0;
          if (!this.nextNode || Math.random() > 0.9) this.dead = true;
        }
      }

      draw() {
        if (this.dead || !this.nextNode) return;
        const x = this.currentNode.x + (this.nextNode.x - this.currentNode.x) * this.progress;
        const y = this.currentNode.y + (this.nextNode.y - this.currentNode.y) * this.progress;

        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(${COLORS.active}, 0.8)`;
        ctx.fillStyle = `rgba(${COLORS.active}, 1)`;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const initNodes = () => {
      nodes = [];
      const cols = Math.ceil(width / SETTINGS.spacing) + 2;
      const rows = Math.ceil(height / SETTINGS.spacing) + 2;

      for (let l = 1; l <= SETTINGS.layers; l++) {
        for (let r = -1; r < rows; r++) {
          for (let c = -1; c < cols; c++) {
            let x = c * SETTINGS.spacing;
            let y = r * SETTINGS.spacing;
            if (r % 2 !== 0) x += SETTINGS.spacing / 2;
            nodes.push(new Node(x, y, l));
          }
        }
      }

      nodes.forEach(n1 => {
        nodes.forEach(n2 => {
          if (n1 === n2 || n1.layer !== n2.layer) return;
          const d = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          if (d > 0 && d < SETTINGS.spacing * 1.5) n1.neighbors.push(n2);
        });
      });
    };

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initNodes();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Connections
      nodes.forEach(node => {
        node.update(mouseRef.current);
        node.neighbors.forEach(neighbor => {
          if (node.x < neighbor.x) {
            const alpha = (node.brightness + neighbor.brightness) / 2;
            ctx.strokeStyle = `rgba(${COLORS.grid}, ${alpha / node.layer})`;
            ctx.lineWidth = 0.8 / node.layer;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(neighbor.x, neighbor.y);
            ctx.stroke();
          }
        });
      });

      // Update Packets
      if (packets.length < 20 && Math.random() > 0.9) {
        packets.push(new DataPacket(nodes[Math.floor(Math.random() * nodes.length)]));
      }
      packets = packets.filter(p => {
        p.update();
        // p.draw(); // Removed to eliminate the moving dots
        return !p.dead;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    const onMouseMove = (e) => {
      // FIX: Calculate mouse position relative to canvas bounding box
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', onMouseMove);
    handleResize();
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
   <div className="absolute w-full h-screen overflow-hidden bg-transparent">
      {/* Scanline Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%]" />
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ touchAction: "none" }}
      />

      {isMounted && (
        <div className="absolute inset-0 flex items-center -top-50 justify-center z-20 pointer-events-none">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 blur-3xl bg-orange-500/10 rounded-full" />
            <Image
              src="/logoAIS2.svg"
              alt="AI Security Lab logo"
              width={260}
              height={260}
              className="relative drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}
