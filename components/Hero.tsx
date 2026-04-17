"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Hero() {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--primary-500);
        border-radius: 50%;
        box-shadow: 0 0 10px var(--primary-500);
        opacity: 0;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float-particle ${(15 + Math.random() * 10)}s ease-in-out infinite;
        animation-delay: ${Math.random() * 20}s;
      `;
      container.appendChild(particle);
    }
  }, []);

  return (
    <header className="relative min-h-screen flex items-center px-5 pt-24 pb-16 overflow-hidden bg-gradient-to-b from-[rgba(59,130,246,0.1)] to-transparent">
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-0" />

      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center gap-16 z-10 w-full">
        <div className="flex-1 max-w-[650px]">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium mb-8 animate-fade-in-up">
            <span>⚡</span>
            <span>Ingeniería de Software & Inteligencia Artificial</span>
          </div>

          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-[1.1] tracking-tight mb-6 animate-fade-in-up [animation-delay:0.2s]">
            Ingeniería de Software para <br />
            <span className="text-gradient">escalar tu negocio</span>
          </h1>

          <p className="text-xl text-[var(--text-secondary)] mb-10 max-w-[540px] animate-fade-in-up [animation-delay:0.4s] leading-relaxed">
            Especialista en <strong>Next.js 16</strong>, <strong>React 19</strong> y <strong>NestJS</strong>. 
            Combino metodologías Lean con IA para construir plataformas que optimizan procesos y generan impacto real.
          </p>

          <div className="flex flex-wrap gap-6 animate-fade-in-up [animation-delay:0.6s]">
            <Link
              href="#cta"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--primary-600)] via-[var(--primary-500)] to-[var(--primary-400)] bg-[length:200%_200%] animate-[gradient-shift_4s_ease_infinite] text-white font-semibold px-8 py-4 rounded-xl shadow-[0_0_0_1px_rgba(59,130,246,0.5),0_4px_24px_rgba(59,130,246,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] hover:translate-y-[-2px] hover:scale-[1.02] hover:shadow-[0_0_0_2px_rgba(59,130,246,0.8),0_8px_40px_rgba(59,130,246,0.6)] transition-all duration-300 pulse-btn"
            >
              Iniciar Proyecto
            </Link>
            <Link
              href="#portfolio"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/5 hover:border-white/40 transition-all duration-300"
            >
              Ver Trabajo
            </Link>
          </div>
          
          <div className="mt-8 animate-fade-in-up [animation-delay:0.8s]">
            <a 
              href="https://github.com/Rogerhrg/rogeliodelarosa-website" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-white transition-colors group"
            >
              <svg className="w-4 h-4 fill-current transition-transform group-hover:rotate-12" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>Ver código fuente de este sitio</span>
            </a>
          </div>
        </div>

        <div className="flex-1 w-full max-w-[500px] animate-fade-in-up [animation-delay:0.8s]">
          <div className="relative w-full aspect-square rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(59,130,246,0.2)] border border-white/10 bg-gradient-to-br from-[rgba(59,130,246,0.1)] to-[rgba(59,130,246,0.05)]">
            <img
              src="/images/generated/hero_visual_new.png"
              alt="Ingeniería y Desarrollo Web"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
