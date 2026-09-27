import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  originalRadius: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export const HeroAnimationBackground: React.FC = () => {
  const { isDarkMode } = useTheme();
  const isDarkModeRef = useRef(isDarkMode);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null; radius: number }>({
    x: null,
    y: null,
    radius: 170,
  });

  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    isDarkModeRef.current = isDarkMode;
  }, [isDarkMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 660);

    const colors = [
      '#ff3838', // Neon Crimson
      '#ff6b6b', // Coral
      '#ff9f43', // Cyber Gold
      '#10b981', // Gaming Green
      '#00f2fe', // Electric Cyan
      '#9945FF', // Neon Violet
    ];

    // Responsive particle count
    const particleCount = Math.min(Math.floor((width * height) / 10000), 90);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 2.2 + 1.2;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.75,
        vy: (Math.random() - 0.5) * 0.75,
        radius,
        originalRadius: radius,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse movement inside hero
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDarkModeRef.current) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current.x = x;
      mouseRef.current.y = y;
      setMousePos({ x, y });
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
      setMousePos(null);
    };

    const parent = canvas.parentElement;
    parent?.addEventListener('mousemove', handleMouseMove);
    parent?.addEventListener('mouseleave', handleMouseLeave);

    // Main animation loop (60-120fps)
    const render = () => {
      if (!isDarkModeRef.current) {
        // Skip particle calculation in light mode, but keep loop active for instant resume
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off canvas edges smoothly
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Pulse size
        p.pulsePhase += p.pulseSpeed;
        p.radius = p.originalRadius + Math.sin(p.pulsePhase) * 0.6;

        // Mouse interaction (gentle repulsion & connection)
        if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRef.current.radius) {
            const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
            const angle = Math.atan2(dy, dx);
            p.x += Math.cos(angle) * force * 2.8;
            p.y += Math.sin(angle) * force * 2.8;

            // Draw line to mouse
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 56, 56, ${(1 - dist / mouseRef.current.radius) * 0.45})`;
            ctx.lineWidth = 1.2;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.stroke();
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.radius), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      // 2. Connect nearby particles with laser filaments
      const maxDistance = 115;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const alpha = (1 - distance / maxDistance) * 0.28;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 75, 75, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      parent?.removeEventListener('mousemove', handleMouseMove);
      parent?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 transition-colors duration-500">

      {/* 1. Underlying Workstation Image with Light/Dark Ambient Masking */}
      <div
        className={`absolute inset-0 bg-cover bg-right lg:bg-center scale-105 transition-all duration-700 ${
          isDarkMode
            ? 'opacity-35 mix-blend-luminosity'
            : 'opacity-90'
        }`}
        style={{ backgroundImage: `url('/hero-bg.jpg')` }}
      />

      {/* 2. Dark Theme Gradients, 3D Cyber Grid, Plasma Orbs, and Canvas (Always mounted in DOM) */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0d13] via-[#0a0d13]/90 to-[#0a0d13]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-transparent to-[#0a0c10]/90" />
        
        {/* Multi-Layered Floating Glowing Plasma Orbs */}
        <div className="absolute -top-24 -left-20 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-[#ff3838]/25 to-[#ff7675]/0 blur-[90px] animate-pulse" />
        <div className="absolute top-1/4 right-0 w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-[#10b981]/20 via-[#059669]/10 to-transparent blur-[110px] animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[350px] rounded-full bg-gradient-to-t from-[#8b5cf6]/15 via-[#00f2fe]/10 to-transparent blur-[100px]" />

        {/* Interactive 3D Cyber Grid on Floor */}
        <div
          className="absolute bottom-0 left-0 right-0 h-64 opacity-25"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 56, 56, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 56, 56, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            transform: 'perspective(500px) rotateX(65deg)',
            transformOrigin: 'bottom center',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 10%, transparent 95%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 10%, transparent 95%)',
          }}
        />

        {/* Interactive Canvas Particles in Dark Mode (Permanently Mounted) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-auto"
        />

        {/* Mouse Ambient Glow Follower */}
        {mousePos && (
          <div
            className="absolute w-72 h-72 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out blur-3xl opacity-35 bg-[radial-gradient(circle,rgba(255,56,56,0.5)_0%,rgba(16,185,129,0.2)_50%,transparent_70%)]"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
            }}
          />
        )}
      </div>

      {/* 3. Light Theme Clean White Gradient Overlay */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${!isDarkMode ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 via-45% to-white/10 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 via-15% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/40 to-transparent h-24" />
      </div>

    </div>
  );
};
