// "use client";

// import React, { useEffect, useRef } from 'react';

// // --- SHADER SOURCE CODE ---
// const VERTEX_SHADER = `
// precision mediump float;
// attribute vec2 a_position;
// uniform vec2 u_resolution;
// uniform vec2 u_mouse;
// uniform float u_time;

// varying float v_force;
// varying float v_opacity;

// // Helper to convert pixel coordinates to Clip Space (-1.0 to 1.0)
// vec2 toClipSpace(vec2 pos, vec2 res) {
//     return (pos / res * 2.0 - 1.0) * vec2(1.0, -1.0);
// }

// void main() {
//     vec2 pos = a_position;
//     float dist = distance(u_mouse, pos);
//   
//     float mouseRadius = 220.0;
//     
//     float force = 1.0 - smoothstep(0.0, mouseRadius, dist);
//     v_force = force;

//     float waveSpeed = u_time * 0.03;
//     float angleOffset = dot(a_position, vec2(0.01));
//     float angle = waveSpeed + angleOffset;
//     
//     float s = sin(angle);
//     float c = cos(angle);

//     float driftStrength = 6.0 * (1.0 - force);
//     vec2 drift = vec2(c, s) * driftStrength;

//     // Attraction: subtle pull toward the mouse cursor
//     vec2 attraction = (u_mouse - pos) * 0.15 * force;

//     // Calculate final position
//     vec2 targetPos = pos + drift + attraction;

//     // 4. Transform to Projection
//     gl_Position = vec4(toClipSpace(targetPos, u_resolution), 0.0, 1.0);
//     
//     // 5. Aesthetics: Opacity and Size
//     v_opacity = clamp(0.1 + (force * 0.7) + (s * 0.05), 0.0, 1.0);
//     // Vary point size based on interaction
//     gl_PointSize = 3.5 +sin(pos.y)*0.02 + (v_opacity * 13.0);
// }
// `;

// const FRAGMENT_SHADER = `
// precision mediump float;

// varying float v_force;
// varying float v_opacity;

// uniform float u_time;

// // --- Simple 2D Noise ---
// float hash(vec2 p) {
//     return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
// }

// float noise(vec2 p) {
//     vec2 i = floor(p);
//     vec2 f = fract(p);

//     float a = hash(i);
//     float b = hash(i + vec2(1.0, 0.0));
//     float c = hash(i + vec2(0.0, 1.0));
//     float d = hash(i + vec2(1.0, 1.0));

//     vec2 u = f * f * (3.0 - 2.0 * f);
//     return mix(a, b, u.x) +
//            (c - a) * u.y * (1.0 - u.x) +
//            (d - b) * u.x * u.y;
// }

// void main() {
//     vec2 uv = gl_PointCoord * 2.0 - 1.0;

//     // --- STAR SHAPE ---
//     float starShape = pow(abs(uv.x), 0.5) + pow(abs(uv.y), 0.5);
//     if (starShape > 1.0) discard;

//     float starAlpha = 1.0 - smoothstep(0.75, 1.0, starShape);

//     // --- VEIL ANIMATION ---
//     float veilNoise = noise(uv * 2.5 + vec2(0.0, u_time * 0.15));
//     float veilWave = sin(uv.y * 3.0 + u_time * 0.8) * 0.15;
//     float veil = smoothstep(0.2, 0.8, veilNoise + veilWave);
//     float veilAlpha = veil * 0.25 * (1.0 - v_force);

//     // --- BASE COLORS ---
//     vec3 colorInactive = vec3(0.278, 0.333, 0.411);
//     vec3 colorActive   = vec3(0.976, 0.451, 0.086);
//     vec3 veilColor     = vec3(1.0, 0.55, 0.15);

//     vec3 baseColor = mix(colorInactive, colorActive, v_force);
//     vec3 finalColor = mix(baseColor, veilColor, veil * 0.35);

//     // Distance to nearest corner
//     vec2 cornerUV = abs(uv);
//     float cornerDist = max(cornerUV.x, cornerUV.y);

//     // Wave animation
//     float wave = sin(cornerDist * 10.0 - u_time * 2.5);
//     wave = wave * 0.5 + 0.5;
//     // Corner mask
//     float cornerMask = smoothstep(0.4, 1.0, cornerDist);
//     // Final glow strength
//     float cornerGlow = wave * cornerMask * 0.9;

//     // White glow color
//     vec3 cornerColor = vec3(uv.x,uv.y,sin(uv.y+uv.x));

//     // Additive blend
//     if(v_opacity>0.5){
//     finalColor += cornerColor * cornerGlow;
//     }else{
//       finalColor += cornerColor+uv.x*uv.y;
//       }

//     // --- FINAL OUTPUT ---
//     gl_FragColor = vec4(
//         finalColor,
//         starAlpha + v_opacity + veilAlpha + cornerGlow
//     );
// }
// `;


// export default function DotWaveDither() {
//   const canvasRef = useRef(null);
//   const mouseRef = useRef({ x: -1000, y: -1000 });
//   const programRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const gl = canvas.getContext('webgl', { alpha: true, antialias: true });
//     if (!gl) return;

//     // Shader Compiler Utility
//     const createShader = (gl, type, source) => {
//       const shader = gl.createShader(type);
//       gl.shaderSource(shader, source);
//       gl.compileShader(shader);
//       if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
//         console.error(gl.getShaderInfoLog(shader));
//         gl.deleteShader(shader);
//         return null;
//       }
//       return shader;
//     };

//     const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
//     const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
//     
//     const program = gl.createProgram();
//     gl.attachShader(program, vs);
//     gl.attachShader(program, fs);
//     gl.linkProgram(program);
//     gl.useProgram(program);
//     programRef.current = program;

//     let width, height, dotCount;
//     let positionBuffer = null;

//     const initGrid = () => {
//       const density = 18;
//       const positions = [];
//       for (let x = 0; x < width + density; x += density) {
//         for (let y = 0; y < height + density; y += density) {
//           positions.push(x, y);
//         }
//       }
//       dotCount = positions.length / 2;

//       if (positionBuffer) gl.deleteBuffer(positionBuffer);
//       positionBuffer = gl.createBuffer();
//       gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
//       gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

//       const aPos = gl.getAttribLocation(program, "a_position");
//       gl.enableVertexAttribArray(aPos);
//       gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
//     };

//     const handleResize = () => {
//       const dpr = window.devicePixelRatio || 1;
//       const rect = canvas.parentElement.getBoundingClientRect();
//       width = rect.width;
//       height = rect.height;
//       canvas.width = width * dpr;
//       canvas.height = height * dpr;
//       gl.viewport(0, 0, canvas.width, canvas.height);
//       initGrid();
//     };

//     let time = 0;
//     const render = () => {
//       time += 1;
//       gl.clearColor(0, 0, 0, 0); 
//       gl.clear(gl.COLOR_BUFFER_BIT);

//       gl.enable(gl.BLEND);
//       gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

//       const uRes = gl.getUniformLocation(program, "u_resolution");
//       const uMouse = gl.getUniformLocation(program, "u_mouse");
//       const uTime = gl.getUniformLocation(program, "u_time");

//       gl.uniform2f(uRes, width, height);
//       gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
//       gl.uniform1f(uTime, time);

//       gl.drawArrays(gl.POINTS, 0, dotCount);
//       requestAnimationFrame(render);
//     };

//     window.addEventListener('resize', handleResize);
//     window.addEventListener('mousemove', (e) => {
//       const rect = canvas.getBoundingClientRect();
//       mouseRef.current = { 
//         x: e.clientX - rect.left, 
//         y: e.clientY - rect.top 
//       };
//     });

//     handleResize();
//     render();

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <div className="absolute inset-0 z-0 bg-[#08090b] pointer-events-none overflow-hidden">
//       {/* Vignette for depth */}
//       <div className=" inset-0 z-10 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(8,9,11,1)_100%)]" />
//       
//       <canvas 
//         ref={canvasRef} 
//         className="w-full h-full opacity-90" 
//         style={{ display: 'block' }}
//       />
//     </div>
//   );
// }  
"use client";

import React, { useEffect, useRef } from 'react';

const COLORS = {
  active: '249, 115, 22',
  grid: '255, 200, 80',
};

export default function SecurityBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  useEffect(() => {
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
            const alpha = ((node.brightness + neighbor.brightness) / 2) * 0.5;
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
   <div
      className="absolute inset-0 w-full h-full overflow-hidden bg-transparent"
      style={{
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) calc(100% - 200px), rgba(0,0,0,0) 100%)",
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) calc(100% - 200px), rgba(0,0,0,0) 100%)",
      }}
    >
      {/* Scanline Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%]" />
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ touchAction: "none" }}
      />

    </div>
  );
}