import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

import React from "react";

const LabSection = () => (
  <section id="lab" className="py-32 px-5 bg-[var(--bg-secondary)] relative overflow-hidden">
    <div className="max-w-[1440px] mx-auto relative z-10 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] rounded-full text-[var(--primary-400)] text-xs font-bold uppercase tracking-widest mb-6">
         Zona Experimental ⚗️
      </div>
      <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mb-6">The Lab</h2>
      <p className="text-xl text-[var(--text-tertiary)] max-w-[600px] mx-auto mb-12">
        Espacio dedicado a proyectos en fase beta, experimentos de IA y herramientas internas open-source.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="glass-card opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
          <h3 className="text-lg font-bold mb-2">Automated Lead Scraper</h3>
          <p className="text-sm text-[var(--text-secondary)]">Script de Node.js para detección temprana de oportunidades en LinkedIn.</p>
        </div>
        <div className="glass-card opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all border-dashed border-[var(--primary-500)]">
          <h3 className="text-lg font-bold mb-2">IA PDF Reader</h3>
          <p className="text-sm text-[var(--text-secondary)]">Pruebas de procesamiento de lenguaje natural para lectura masiva de documentación técnica.</p>
        </div>
        <div className="glass-card opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
          <h3 className="text-lg font-bold mb-2">Micro-SaaS Blueprint</h3>
          <p className="text-sm text-[var(--text-secondary)]">Template base para lanzar MVPs en menos de 48 horas.</p>
        </div>
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Metrics />
      <Services />
      <Portfolio />
      <LabSection />
      <About />
      <CTA />
      <Footer />
    </main>
  );
}
