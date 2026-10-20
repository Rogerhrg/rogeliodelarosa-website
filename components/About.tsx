export default function About() {
  return (
    <section id="about" className="py-32 px-5 bg-[var(--bg-primary)] relative overflow-hidden">
      <img src="/images/generated/marketing_post_bg.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.35] mix-blend-screen" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[rgba(0,0,0,0.6)] to-[var(--bg-primary)]" />

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 items-center">
        {/* Visual */}
        <div className="animate-fade-in-up">
          <div className="relative rounded-[32px] overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.2)] before:content-[''] before:absolute before:inset-[-2px] before:bg-gradient-to-br before:from-[var(--primary-500)] before:via-transparent before:to-[var(--primary-700)] before:rounded-[34px] before:-z-10">
            <img src="/images/Perfil CV.jpg" alt="Rogelio De La Rosa" className="w-full aspect-[4/5] object-cover rounded-[32px]" />
          </div>

          <div className="glass-card mt-8">
            <div className="flex items-center gap-3 text-white font-medium mb-4">
              <span className="text-2xl">🎓</span>
              <span>Ingeniería Industrial (UANL)</span>
            </div>
            <div className="flex items-center gap-3 text-white font-medium mb-4">
              <span className="text-2xl">🌍</span>
              <span>TU Ilmenau (Alemania)</span>
            </div>
            <div className="flex items-center gap-3 text-white font-medium">
              <span className="text-2xl">🏭</span>
              <span>Experiencia Siemens Healthineers</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="animate-fade-in-up [animation-delay:0.4s]">
          <div className="text-xs font-semibold uppercase tracking-widest text-[var(--primary-400)] mb-4">Sobre Mí</div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mb-6 text-left">
            Ingeniería pura.<br />
            <span className="text-left">Enfoque práctico.</span>
          </h2>

          <div className="space-y-6 text-lg">
            <p>
              Soy <strong className="text-white">Rogelio De La Rosa</strong>, desarrollador web full-stack e ingeniero industrial.
              Combino la lógica rigurosa de los procesos industriales con la agilidad del desarrollo moderno para crear soluciones que realmente funcionen.
            </p>
            <p>
              No me limito a escribir código; analizo el comportamiento de los sistemas. Utilizo las metodologías
              <strong className="text-white"> Lean Manufacturing y Six Sigma</strong> para identificar cuellos de botella antes de diseñar la plataforma digital adecuada.
              Mi objetivo es claro: reducir desperdicios y construir software que la gente sí quiera utilizar.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-[var(--text-secondary)]">Desarrollo Web (Next.js / NestJS)</span>
            <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-[var(--text-secondary)]">PostgreSQL / Prisma</span>
            <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-[var(--text-secondary)]">Lean Six Sigma</span>
            <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-[var(--text-secondary)]">Automatización de Procesos</span>
            <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-[var(--text-secondary)]">Análisis de Datos</span>
            <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-[var(--text-secondary)]">Producción de Video Educativo</span>
          </div>

          <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
            <a href="/cv/CV Rogelio De La Rosa Developer.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-[var(--text-secondary)] bg-white/4 border border-white/12 hover:bg-[rgba(59,130,246,0.1)] hover:border-[rgba(59,130,246,0.3)] hover:text-[var(--primary-300)] hover:translate-y-[-2px] transition-all">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              CV Developer
            </a>
            <a href="/cv/CV Rogelio De La Rosa Ingeniero.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-[var(--text-secondary)] bg-white/4 border border-white/12 hover:bg-[rgba(59,130,246,0.1)] hover:border-[rgba(59,130,246,0.3)] hover:text-[var(--primary-300)] hover:translate-y-[-2px] transition-all">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              CV Ingeniero
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
