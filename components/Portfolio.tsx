import Link from "next/link";

const projects = [
  {
    href: "https://everefficient.tech",
    logo: "/images/brand/everefficient-logo-full.png",
    label: "SaaS CRM MVP",
    stack: "Next.js 16 • NestJS • PostgreSQL",
    title: "EverEfficient",
    description: "Plataforma Full-Stack diseñada para digitalizar procesos de venta en PYMEs. Incluye gestión de leads, embudos de venta y automatizaciones de seguimiento.",
    results: ["Arquitectura robusta y escalable", "Enfoque en UX para adopción rápida"],
  },
  {
    href: "#",
    logo: "/images/Logo-Manuscrito.png",
    label: "Asistente Personal con IA",
    stack: "Node.js • MongoDB • Telegram API",
    title: "AutoClaw",
    description: "Asistente con memoria persistente via Telegram. Centraliza finanzas, progreso en gym, habit tracker y diario personal en una interfaz conversacional.",
    results: ["Memoria contextual persistente", "Control total desde el móvil"],
  },
  {
    href: "#",
    logo: "/images/Wiki-Logo.png",
    label: "CRM / LMS Automatizado",
    stack: "Bubble.io • WhatsApp API",
    title: "Wiki Talent Academy",
    description: "Plataforma académica integral con automatizaciones de WhatsApp, generación de PDFs dinámicos y dashboards de rendimiento.",
    results: ["Procesos de 15min → segundos", "Retención de leads aumentada"],
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-32 px-5 bg-[var(--bg-secondary)] relative overflow-hidden">
      <img src="/images/generated/marketing_post_bg.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.35] mix-blend-screen scale-x-[-1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-secondary)] via-[rgba(9,9,11,0.6)] to-[var(--bg-secondary)]" />

      <div className="relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mb-4">Trabajo real, impacto medible</h2>
          <p className="text-xl text-[var(--text-tertiary)] max-w-[600px] mx-auto">
            Sistemas implementados que resuelven problemas reales de negocio.
          </p>
        </div>

        <div className="max-w-[1440px] mx-auto flex flex-wrap justify-center gap-8 relative z-10">
          {projects.map((project, index) => (
            <Link
              key={index}
              href={project.href}
              className="flex-1 min-w-[320px] max-w-[450px] glass-card flex flex-col p-0 border-t-4 border-t-[var(--primary-500)] hover:border-t-[var(--primary-400)] hover:translate-y-[-8px] transition-all duration-400 group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-full h-[200px] bg-white flex items-center justify-center p-8 rounded-t-[24px] overflow-hidden">
                <img src={project.logo} alt={project.title} className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs uppercase tracking-wider text-[var(--text-tertiary)]">{project.label}</span>
                  <span className="text-xs text-[var(--primary-400)] font-mono bg-[rgba(59,130,246,0.1)] px-2 py-1 rounded">{project.stack}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <p className="text-[var(--text-secondary)] mb-6">{project.description}</p>
                <ul className="text-sm space-y-2 mb-auto">
                  {project.results.map((result, i) => (
                    <li key={i} className="flex items-center gap-2 text-white">
                      <span className="text-[var(--success)] font-bold">✓</span>
                      {result}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-2 mt-6 pt-5 text-sm font-semibold text-[var(--primary-400)] group-hover:text-[var(--primary-300)] group-hover:translate-x-1 transition-all">
                  Ver caso completo <span>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Experiencia Adicional */}
        <div className="max-w-[1440px] mx-auto mt-12 flex flex-wrap justify-center gap-8 relative z-10">
          {/* Siemens */}
          <div className="flex-1 min-w-[320px] max-w-[450px] glass-card flex flex-col p-0 animate-fade-in-up [animation-delay:0.6s]">
            <div className="w-full h-[200px] bg-white flex items-center justify-center p-8 rounded-t-[24px] overflow-hidden">
              <img src="/images/siemens-healthineers-hero.png" alt="Siemens Healthineers" className="max-w-full max-h-full object-contain" />
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs uppercase tracking-wider text-[var(--text-tertiary)]">Prácticas Profesionales (5 meses)</span>
                <span className="text-xs text-[var(--primary-400)] font-mono">Mar - Jul 2018</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Siemens Healthineers</h3>
              <p className="text-[var(--text-muted)] text-sm mb-4">Kemnath, Alemania</p>
              <p className="text-[var(--text-secondary)] text-sm mb-4">Experiencia internacional en planta trabajando bajo estrictos lineamientos de seguridad como Ingeniero Industrial practicante.</p>
              <ul className="text-sm space-y-2">
                <li className="flex items-center gap-2 text-white"><span className="text-[var(--success)]">✓</span> Apoyo al rediseño del manual de operador</li>
                <li className="flex items-center gap-2 text-white"><span className="text-[var(--success)]">✓</span> Pruebas de calidad de materiales base</li>
                <li className="flex items-center gap-2 text-white"><span className="text-[var(--success)]">✓</span> Actualización de documentos en SAP</li>
              </ul>
            </div>
          </div>

          {/* TU Ilmenau */}
          <div className="flex-1 min-w-[320px] max-w-[450px] glass-card flex flex-col p-0 animate-fade-in-up [animation-delay:0.8s]">
            <div className="w-full h-[200px] bg-white flex items-center justify-center p-8 rounded-t-[24px] overflow-hidden">
              <img src="/images/TU_Ilmenau_Logo_black_green.png" alt="TU Ilmenau" className="max-w-full max-h-full object-contain" />
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs uppercase tracking-wider text-[var(--text-tertiary)]">Intercambio Académico (9 meses)</span>
                <span className="text-xs text-[var(--primary-400)] font-mono">Ago 2017 - Abr 2018</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Technische Universität Ilmenau</h3>
              <p className="text-[var(--text-muted)] text-sm mb-4">Ilmenau, Alemania</p>
              <p className="text-[var(--text-secondary)] text-sm mb-4">Inmersión cultural y académica, desarrollando adaptabilidad, resiliencia y comunicación efectiva en entornos multiculturales.</p>
              <ul className="text-sm space-y-2">
                <li className="flex items-center gap-2 text-white"><span className="text-[var(--success)]">✓</span> Integración rápida tras curso intensivo de alemán B1</li>
                <li className="flex items-center gap-2 text-white"><span className="text-[var(--success)]">✓</span> Materias de ingeniería en idioma extranjero</li>
                <li className="flex items-center gap-2 text-white"><span className="text-[var(--success)]">✓</span> Habilidades blandas para equipos globales</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
