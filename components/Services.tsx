"use client";

import { useState } from "react";
import Link from "next/link";

const services = [
  {
    image: "/images/generated/service_1.png",
    titleFront: "Desarrollo Plataformas MVP",
    titleBack: "Plataformas MVP",
    description: "Construyo aplicaciones web desde cero: CRM, LMS, portales de clientes. Alcance definido, entrega rápida y base escalable para validar tu idea.",
    tags: ["Next.js", "NestJS", "PostgreSQL", "Escalabilidad"],
  },
  {
    image: "/images/generated/service_2.png",
    titleFront: "Diseño Web Premium",
    titleBack: "Diseño Web Premium",
    description: "Sitios web corporativos de alto impacto. Diseño limpio, orientación a conversión, y experiencias fluidas con estética moderna y rápida velocidad de carga.",
    tags: ["UI/UX", "Conversión", "Performance", "Tailwind CSS"],
  },
  {
    image: "/images/generated/service_3.png",
    titleFront: "Automatización & APIs",
    titleBack: "Automatización & APIs",
    description: "Conexión de sistemas, integración de WhatsApp API, envíos automáticos y generación de reportes. Elimina el trabajo manual y los errores repetitivos.",
    tags: ["Integraciones", "APIs", "Workflows", "n8n"],
  },
  {
    image: "/images/generated/service_4.png",
    titleFront: "Consultoría Operativa",
    titleBack: "Consultoría Operativa",
    description: "Aplicación de principios Lean Six Sigma para mapear procesos antes de digitalizarlos. Reducción de variabilidad y estandarización medible.",
    tags: ["Lean", "Six Sigma", "Diagnóstico", "Optimización"],
  },
];

const plans = [
  {
    name: "Starter",
    tagline: "Presencia Digital Inmediata",
    priceDescription: "Ideal para validación rápida",
    features: [
      "Landing Page (One-Page)",
      "Diseño Premium Responsive",
      "Formulario de Contacto",
      "SEO Básico",
      "WhatsApp Integration",
    ],
    highlight: false,
    cta: "Comenzar Fase Uno",
  },
  {
    name: "Essential",
    tagline: "E-commerce & IA Ready",
    priceDescription: "El punto de equilibrio perfecto",
    features: [
      "Tienda Online / Catálogo",
      "Automatizaciones Básicas",
      "Dashboard de Gestión",
      "Integración WhatsApp API",
      "Soporte Prioritario",
    ],
    highlight: true,
    cta: "Escalar mi Proyecto",
  },
  {
    name: "Growth",
    tagline: "Sistemas a la Medida",
    priceDescription: "Software robusto para escalar",
    features: [
      "Desarrollo Full-Stack (Next/Nest)",
      "Arquitectura de Base de Datos",
      "Automatizaciones n8n Complejas",
      "Integración con IA / LLMs",
      "Consultoría de Procesos Lean",
    ],
    highlight: false,
    cta: "Consultoría Especializada",
  },
];

export default function Services() {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const handleFlip = (index: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section id="services" className="py-32 px-5 bg-[var(--bg-primary)] relative overflow-hidden">
      {/* Background Decor */}
      <img src="/images/generated/marketing_post_bg.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.2] mix-blend-screen" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[rgba(0,0,0,0.8)] to-[var(--bg-primary)]" />

      <div className="relative z-10 max-w-[1440px] mx-auto">
        {/* Capabilities Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mb-4">Capacidades e Ingeniería</h2>
          <p className="text-xl text-[var(--text-tertiary)] max-w-[600px] mx-auto">
            Soluciones integrales de software diseñadas con enfoque industrial y escalable.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mb-32">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex-1 min-w-[280px] max-w-[320px] h-[400px] relative perspective-[1500px]"
              onClick={() => handleFlip(index)}
              onTouchStart={() => handleFlip(index)}
            >
              <div className={`relative w-full h-full transition-transform duration-700 preserve-3d cursor-pointer ${flippedCards[index] ? "rotate-y-180" : ""}`}>
                {/* Front */}
                <div className="absolute inset-0 backface-hidden rounded-[24px] overflow-hidden bg-[var(--bg-tertiary)] border border-white/5">
                  <img src={service.image} alt={service.titleFront} className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-end p-6">
                    <h3 className="text-lg font-bold text-white leading-tight">{service.titleFront}</h3>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden rounded-[24px] overflow-hidden bg-[var(--bg-secondary)] rotate-y-180 flex flex-col justify-center p-8">
                  <h3 className="text-lg font-bold text-[var(--primary-400)] mb-3">{service.titleBack}</h3>
                  <p className="text-[var(--text-secondary)] mb-4 text-xs leading-relaxed">{service.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.tags.map((tag, i) => (
                      <span key={i} className="bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] text-[var(--primary-300)] px-2 py-1 rounded-full text-[10px] font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing/Packages Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mb-4">Planes y Servicios</h2>
          <p className="text-xl text-[var(--text-tertiary)] max-w-[600px] mx-auto">
            Modelos de trabajo flexibles adaptados al crecimiento de tu negocio.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-stretch gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`flex-1 min-w-[300px] max-w-[400px] glass-card flex flex-col p-10 relative group transition-all duration-500 ${
                plan.highlight 
                  ? "border-[var(--primary-500)] shadow-[0_0_40px_rgba(var(--primary-rgb),0.2)] scale-105 z-20" 
                  : "hover:border-[var(--primary-400)] z-10"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--primary-500)] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                  Recomendado
                </div>
              )}
              <h3 className="text-3xl font-black mb-1">{plan.name}</h3>
              <p className="text-[var(--primary-400)] font-semibold text-sm mb-6 uppercase tracking-wider">{plan.tagline}</p>
              <div className="mb-8">
                <span className="text-[var(--text-tertiary)] text-sm">{plan.priceDescription}</span>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                    <span className="text-[var(--primary-400)] mt-1 font-bold">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link 
                href="https://wa.me/528129135475" 
                target="_blank"
                className={`w-full py-4 rounded-xl font-bold transition-all text-center ${
                  plan.highlight 
                    ? "bg-[var(--primary-500)] text-white hover:bg-[var(--primary-600)] shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)]" 
                    : "border border-white/20 text-white hover:bg-white/5"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
