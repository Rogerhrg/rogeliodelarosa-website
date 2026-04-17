"use client";

import { useEffect, useRef } from "react";

export default function Metrics() {
  const countedRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countedRef.current) {
            countedRef.current = true;
            const counters = entry.target.querySelectorAll(".metric-num");
            counters.forEach((counter) => {
              const target = parseInt(counter.getAttribute("data-target") || "0");
              const duration = 2000;
              const increment = target / (duration / 16);
              let current = 0;

              const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                  (counter as HTMLElement).textContent = Math.round(target).toString();
                  clearInterval(timer);
                } else {
                  (counter as HTMLElement).textContent = Math.round(current).toString();
                }
              }, 16);
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-5 bg-[var(--bg-secondary)] border-y border-white/5">
      <div className="max-w-[1000px] mx-auto grid grid-cols-3 gap-8 text-center">
        <div className="text-center">
          <div className="flex items-baseline justify-center gap-1">
            <span className="metric-num text-[3rem] font-extrabold text-white" data-target="5">0</span>
            <span className="text-[2.5rem] text-[var(--primary-500)]">+</span>
          </div>
          <span className="block text-sm text-[var(--text-tertiary)] mt-2">Años de Exp.</span>
        </div>
        <div className="text-center">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-[2.5rem] text-[var(--primary-500)]">+</span>
            <span className="metric-num text-[3rem] font-extrabold text-white" data-target="100">0</span>
          </div>
          <span className="block text-sm text-[var(--text-tertiary)] mt-2">Horas Ahorradas/mes</span>
        </div>
        <div className="text-center">
          <div className="text-[3rem] font-extrabold text-white glow-text">MVP</div>
          <span className="block text-sm text-[var(--text-tertiary)] mt-2">En Semanas</span>
        </div>
      </div>
    </section>
  );
}
