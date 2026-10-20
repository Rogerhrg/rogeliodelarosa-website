import Link from "next/link";
import { notFound } from "next/navigation";

interface ProjectData {
  title: string;
  subtitle: string;
  badges: string[];
  problem: {
    title: string;
    description: string;
    cards: Array<{ icon: string; title: string; description: string }>;
  };
  transformation: {
    title: string;
    description: string;
    items: Array<{ title: string; before: string; after: string }>;
  };
  stack: string[];
  results: Array<{ metric: string; label: string }>;
  role: {
    description: string;
    items: Array<{ icon: string; title: string; description: string }>;
  };
}

const projects: Record<string, ProjectData> = {
  "everefficient": {
    title: "EverEfficient CRM",
    subtitle: "Plataforma SaaS diseñada para centralizar la gestión de ventas y leads para pequeñas empresas. Desarrollada con un stack moderno enfocado en la velocidad de respuesta y escalabilidad.",
    badges: ["🚀 SaaS CRM", "⚡ Next.js + NestJS", "📊 Ventas Real-Time"],
    problem: {
      title: "Ventas fragmentadas y leads perdidos",
      description: "Las PYMEs suelen perder oportunidades por no tener un centro de control unificado para sus prospectos.",
      cards: [
        { icon: "📉", title: "Falta de seguimiento", description: "Leads que se olvidan en chats de WhatsApp o correos." },
        { icon: "📁", title: "Información dispersa", description: "Datos de clientes en hojas de cálculo no colaborativas." },
        { icon: "⏱️", title: "Procesos lentos", description: "Tiempo excesivo buscando estatus de ventas." },
        { icon: "📉", title: "Sin métricas", description: "Imposibilidad de medir el rendimiento del equipo de ventas." },
      ],
    },
    transformation: {
      title: "Control total del embudo de ventas",
      description: "Implementación de una arquitectura Full-Stack transparente que permite la gestión fluida del ciclo de vida del cliente.",
      items: [
        { title: "🎯 Centralización", before: "Prospectos en múltiples canales sin orden", after: "Dashboard unificado de leads" },
        { title: "🔄 Pipelines", before: "Estatus de venta desconocido", after: "Embudos de venta visuales e interactivos" },
        { title: "📈 Analítica", before: "Suposiciones sobre el rendimiento", after: "Reportes automáticos de conversión" },
        { title: "🔒 Seguridad", before: "Datos vulnerables en archivos compartidos", after: "Base de Datos PostgreSQL con acceso controlado" },
      ],
    },
    stack: ["Next.js 16", "NestJS", "Prisma ORM", "PostgreSQL", "Tailwind CSS v4", "Lucide Icons"],
    results: [
      { metric: "100%", label: "Trazabilidad de prospectos" },
      { metric: "24/7", label: "Disponibilidad del sistema" },
      { metric: "MVP", label: "Lanzado en tiempo récord" },
      { metric: "Scale", label: "Base sólida para nuevas funciones" },
    ],
    role: {
      description: "Arquitecto y Desarrollador principal. Diseñé desde el esquema de base de datos hasta la interfaz de usuario, priorizando la simplicidad y la potencia operativa.",
      items: [
        { icon: "🏗️", title: "Arquitecto Cloud", description: "Definición de stack y deployment" },
        { icon: "🎨", title: "UI/UX Designer", description: "Interfaz limpia centrada en ventas" },
        { icon: "💻", title: "Full-Stack Dev", description: "Implementación de lógica Next/Nest" },
      ],
    },
  },
  "wiki-talent": {
    title: "Wiki Talent Academy",
    subtitle: "Academia de preparación para exámenes de admisión a universidades. Transformé una operación manual basada en Word y Zoom en una plataforma CRM/LMS automatizada que gestiona alumnos, pagos, comunicaciones y exámenes de simulación.",
    badges: ["🎓 CRM / LMS", "🤖 Automatización", "📱 WhatsApp API"],
    problem: {
      title: "Una academia que crecía más rápido que sus herramientas",
      description: "Wiki Talent Academy operaba como la mayoría de las academias pequeñas: clases por Zoom, contenido en documentos de Word, y una montaña de tareas manuales que consumían tiempo valioso.",
      cards: [
        { icon: "📋", title: "Tracking manual de alumnos", description: "Para saber cómo iba un alumno, había que preguntarle directamente al maestro." },
        { icon: "✉️", title: "Correos manuales", description: "Cada resultado de examen se comunicaba manualmente a alumnos y padres." },
        { icon: "📝", title: "Google Forms como CRM", description: "Datos de prospectos sin conexión con pagos ni control de acceso." },
        { icon: "🎨", title: "Propuestas manuales en Canva", description: "Cada propuesta se diseñaba manualmente. Varios minutos por propuesta." },
        { icon: "📱", title: "Búsqueda Manual (CRM)", description: "Los contactos requerían tiempo excesivo de búsqueda manual." },
        { icon: "📄", title: "Sin exámenes propios", description: "No existía un sistema interno para simular exámenes de admisión." },
      ],
    },
    transformation: {
      title: "De lo manual a lo automatizado",
      description: "Construí una plataforma integral en Bubble.io que reemplazó cada proceso manual con un sistema automatizado, conectado y escalable.",
      items: [
        { title: "📊 Tracking de Alumnos", before: "Preguntarle al maestro cómo iba cada alumno", after: "Cuentas de alumno con progreso visible en dashboard" },
        { title: "📧 Resultados de Simulación", before: "Envío manual de correos con resultados", after: "Automatización con merges de Mailchimp por evento" },
        { title: "📋 Captura de Prospectos", before: "Google Forms sin conexión con pagos", after: "Sistema con control de pago: solo inscritos crean cuenta" },
        { title: "📑 Generación de Propuestas", before: "Diseño manual en Canva — minutos por propuesta", after: "Generación automática (PDFMonkey) — segundos" },
        { title: "💬 Comunicación con Papás", before: "CRM desclasificado, mensajes manuales", after: "WhatsApp API con plantillas automáticas segmentadas" },
        { title: "📝 Exámenes de Simulación PAA", before: "Sin simulaciones propias", after: "Simulaciones integradas con resultados y predicción" },
      ],
    },
    stack: ["Bubble.io", "Mailchimp", "WhatsApp API", "PDFMonkey", "CRM Custom", "LMS Custom"],
    results: [
      { metric: "15min → seg", label: "Generación de propuestas académicas" },
      { metric: "0%", label: "Pérdida de información de leads y prospectos" },
      { metric: "100%", label: "Automatización de resultados de simulación" },
      { metric: "CRM → LMS", label: "Evolución a plataforma unificada" },
    ],
    role: {
      description: "Entré como maestro de matemáticas. Al identificar las oportunidades de mejora, propuse e implementé la plataforma completa. Hoy soy Coordinador Académico y Desarrollador de la infraestructura tecnológica.",
      items: [
        { icon: "📐", title: "Maestro de Matemáticas", description: "Inicio: enseñanza directa a alumnos" },
        { icon: "⚙️", title: "Desarrollador de Plataforma", description: "Diseño y construcción del CRM/LMS" },
        { icon: "🎯", title: "Coordinador Académico", description: "Gestión total: tecnología + operación" },
      ],
    },
  },
  "sigmapro": {
    title: "SigmaPRO",
    subtitle: "Empresa líder en capacitación y certificación en metodología Six Sigma y Lean Manufacturing. Intervine para estructurar su ecosistema digital: de boletines y manuales desactualizados, a un hub de contenido centralizado en WordPress con material de video rediseñado.",
    badges: ["🏭 Consultoría Lean Six Sigma", "💻 WordPress", "🎥 Edición Multimedia"],
    problem: {
      title: "Material de alto valor, presentación obsoleta",
      description: "SigmaPRO contaba con un excelente nivel académico, pero su escaparate digital no reflejaba esta autoridad y su material didáctico se había quedado en el pasado.",
      cards: [
        { icon: "📰", title: "Newsletter sin destino claro", description: "Los enlaces dirigían a sitios externos en lugar de consolidar tráfico propio." },
        { icon: "🏛️", title: "Sitio web 'antiguo'", description: "La página carecía de dinamismo y estructura moderna." },
        { icon: "🖼️", title: "Instrucciones estáticas", description: "El material dependía de capturas de versiones antiguas de Minitab." },
        { icon: "📢", title: "Promoción dispersa", description: "Faltaba consistencia visual en las redes sociales." },
      ],
    },
    transformation: {
      title: "Centralización y modernización audiovisual",
      description: "Mi rol evolucionó desde la gestión documental hasta orquestar una renovación completa de su presencia digital y formativa.",
      items: [
        { title: "🌐 Nuevo portal de WordPress", before: "Web estática con aspecto anticuado", after: "Plataforma WordPress dinámica y profesional" },
        { title: "✍️ Estrategia de Contenido Inbound", before: "Newsletter con tráfico desviado a terceros", after: "Blog propio: correos dirigen a entradas con CTAs claros" },
        { title: "🎥 Actualización de Material Didáctico", before: "Imágenes de versiones antiguas", after: "Videotutoriales grabados en OBS y masterizados en DaVinci Resolve" },
        { title: "🎨 Creatividades para Facebook Ads", before: "Diseños genéricos con bajo engagement", after: "A/B Testing de diseños en Canva" },
      ],
    },
    stack: ["WordPress", "OBS Studio", "DaVinci Resolve", "Canva", "Minitab", "Facebook Ads"],
    results: [
      { metric: "📈", label: "Tráfico propio retenido mediante Blog en WP" },
      { metric: "🎯", label: "CTAs claros y enfocados a conversión" },
      { metric: "HD", label: "Cientos de horas de material convertido a video" },
      { metric: "🔄", label: "Aprendizaje acelerado por inmersión" },
    ],
    role: {
      description: "Comencé gestionando la parte operativa y documental. Eventualmente, mi involucramiento creció hasta tomar las riendas de su ecosistema digital.",
      items: [
        { icon: "📋", title: "Operaciones", description: "Gestión documental y apoyo logístico en cursos" },
        { icon: "💻", title: "Desarrollador Web", description: "Mapeo del sitio antiguo y migración total a WordPress" },
        { icon: "🎬", title: "Productor Audiovisual", description: "Grabación, edición de audio/video y diseño de Ads" },
      ],
    },
  },
  "autoclaw": {
    title: "AutoClaw",
    subtitle: "Asistente personal con memoria persistente en MongoDB a través de Telegram. Trackeo de ingresos/gastos, gym, habit tracker y diario personal con UI web administrativa.",
    badges: ["🤖 IA + Memoria", "💬 Telegram Bot", "📊 Dashboard Web"],
    problem: {
      title: "Información dispersa en múltiples apps",
      description: "El tracking de hábitos, gastos, gym y notas personales estaba fragmentado en diferentes aplicaciones sin conexión entre sí.",
      cards: [
        { icon: "💰", title: "Gastos en spreadsheets", description: "Registro manual sin automatización ni insights." },
        { icon: "💪", title: "Gym en apps genéricas", description: "Sin personalización ni seguimiento de progresión real." },
        { icon: "📝", title: "Notas dispersas", description: "Diario personal en diferentes lugares sin contexto unificado." },
        { icon: "🔁", title: "Sin memoria contextual", description: "Cada app funcionaba de forma aislada sin recordar el contexto." },
      ],
    },
    transformation: {
      title: "Todo en un solo chat + UI web",
      description: "Un asistente que recuerda todo, accesible desde Telegram con dashboard web para administración y visualización de datos.",
      items: [
        { title: "💬 Chat Natural", before: "Múltiples interfaces y formularios", after: "Todo desde Telegram con comandos naturales" },
        { title: "🧠 Memoria Persistente", before: "Datos aislados sin contexto", after: "MongoDB con contexto histórico de conversaciones" },
        { title: "📊 Dashboard Web", before: "Sin visualización de tendencias", after: "UI web con gráficas y administración de datos" },
        { title: "🔔 Recordatorios Inteligentes", before: "Olvido de hábitos", after: "Notificaciones contextuales basadas en patrones" },
      ],
    },
    stack: ["Node.js", "MongoDB", "Telegram Bot API", "Express", "React", "Chart.js"],
    results: [
      { metric: "1 chat", label: "Todas las funcionalidades integradas" },
      { metric: "100%", label: "Memoria contextual persistente" },
      { metric: "24/7", label: "Acceso desde cualquier dispositivo con Telegram" },
      { metric: "📈", label: "Visualización clara de progresos" },
    ],
    role: {
      description: "Proyecto personal desarrollado para resolver mi propia necesidad de tener un asistente que realmente me conozca y me ayude a mantener consistencia en mis hábitos y registros.",
      items: [
        { icon: "🤖", title: "Backend Developer", description: "Bot de Telegram con memoria en MongoDB" },
        { icon: "🎨", title: "Frontend Developer", description: "Dashboard web con gráficas y administración" },
        { icon: "🧠", title: "AI Integration", description: "Contexto conversacional y respuestas inteligentes" },
      ],
    },
  },
};

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects[slug];

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      {/* Back Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[var(--bg-primary)]/80 backdrop-blur-[24px] border-b border-white/5">
        <div className="max-w-[1440px] mx-auto px-5 py-4 flex justify-between items-center">
          <Link href="/#portfolio" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Volver al Portafolio
          </Link>
          <Link href="/">
            <img src="/images/generated/logo.png" alt="Rogelio De La Rosa" className="h-12 w-auto" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-40 pb-20 px-5 bg-gradient-to-b from-[rgba(59,130,246,0.1)] to-transparent">
        <div className="max-w-[900px] mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {project.badges.map((badge, i) => (
              <span key={i} className={`px-4 py-2 rounded-full text-sm font-medium ${i % 2 === 0 ? "bg-[rgba(59,130,246,0.15)] text-[var(--primary-300)]" : "bg-[rgba(245,158,11,0.15)] text-[var(--warning)]"}`}>
                {badge}
              </span>
            ))}
          </div>
          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold mb-6">
            {project.title.split(" ").map((word, i) => {
              if (word.includes("PRO") || word.includes("Academy")) {
                return <span key={i} className="text-gradient">{word} </span>;
              }
              return word + " ";
            })}
          </h1>
          <p className="text-xl text-[var(--text-secondary)] leading-relaxed">{project.subtitle}</p>
        </div>
      </header>

      {/* Problem Section */}
      <section className="py-20 px-5">
        <div className="max-w-[900px] mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--primary-400)]">El Problema</span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mt-4 mb-6">{project.problem.title}</h2>
          <p className="text-lg text-[var(--text-tertiary)] mb-12">{project.problem.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.problem.cards.map((card, i) => (
              <div key={i} className="bg-[var(--bg-tertiary)] border border-white/5 rounded-2xl p-6 hover:border-[rgba(59,130,246,0.2)] transition-colors">
                <div className="text-4xl mb-4">{card.icon}</div>
                <h4 className="text-lg font-semibold mb-2">{card.title}</h4>
                <p className="text-[var(--text-secondary)] text-sm">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Section */}
      <section className="py-20 px-5 bg-[var(--bg-secondary)]">
        <div className="max-w-[900px] mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--primary-400)]">La Transformación</span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mt-4 mb-6">{project.transformation.title}</h2>
          <p className="text-lg text-[var(--text-tertiary)] mb-12">{project.transformation.description}</p>

          <div className="space-y-6 relative before:content-[''] before:absolute before:left-[19px] before:top-0 before:h-full before:w-[2px] before:bg-[rgba(59,130,246,0.2)]">
            {project.transformation.items.map((item, i) => (
              <div key={i} className="relative pl-12">
                <div className="absolute left-0 w-[40px] h-[40px] bg-[var(--primary-600)] rounded-full flex items-center justify-center text-xl border-4 border-[var(--bg-secondary)]">
                  {item.title.split(" ")[0]}
                </div>
                <div className="bg-[var(--bg-tertiary)] border border-white/5 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold mb-4">{item.title.substring(2)}</h4>
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="flex-1 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-sm text-red-300">
                      <span className="block text-xs text-red-400 mb-1">ANTES</span>
                      {item.before}
                    </div>
                    <span className="text-[var(--primary-400)] text-2xl">→</span>
                    <div className="flex-1 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3 text-sm text-green-300">
                      <span className="block text-xs text-green-400 mb-1">DESPUÉS</span>
                      {item.after}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-5">
        <div className="max-w-[900px] mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--primary-400)]">Stack Tecnológico</span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mt-4 mb-12">Herramientas clave del proyecto</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {project.stack.map((tech, i) => (
              <span key={i} className="bg-[var(--bg-tertiary)] border border-white/10 px-6 py-3 rounded-full text-sm font-medium hover:border-[var(--primary-500)] transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-20 px-5 bg-[var(--bg-secondary)]">
        <div className="max-w-[900px] mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--primary-400)]">Resultados</span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mt-4 mb-12">Impacto medible en la operación</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.results.map((result, i) => (
              <div key={i} className="bg-[var(--bg-tertiary)] border border-white/5 rounded-2xl p-6">
                <div className="text-3xl font-extrabold text-[var(--primary-400)] mb-2">{result.metric}</div>
                <div className="text-[var(--text-secondary)]">{result.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role */}
      <section className="py-20 px-5">
        <div className="max-w-[900px] mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--primary-400)]">Mi Rol</span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mt-4 mb-6">Evolución dentro del proyecto</h2>
          <p className="text-lg text-[var(--text-tertiary)] mb-12">{project.role.description}</p>

          <div className="flex flex-wrap items-center gap-4">
            {project.role.items.map((item, i) => (
              <div key={i} className="flex-1 min-w-[200px] bg-[var(--bg-tertiary)] border border-white/5 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-lg font-semibold mb-2">{item.title}</div>
                <div className="text-sm text-[var(--text-secondary)]">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-5 bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)]">
        <div className="max-w-[700px] mx-auto text-center glass-card py-16 px-8">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mb-6">
            ¿Necesitas <span className="text-gradient">modernizar</span> la forma en la que enseñas u operas?
          </h2>
          <p className="text-xl text-[var(--text-tertiary)] mb-8">
            Conversemos sobre cómo rediseñar tu contenido y plataformas para retener mejor a tu audiencia.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/#cta" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--primary-600)] via-[var(--primary-500)] to-[var(--primary-400)] bg-[length:200%_200%] animate-[gradient-shift_4s_ease_infinite] text-white font-semibold px-8 py-4 rounded-xl shadow-[0_0_0_1px_rgba(59,130,246,0.5),0_4px_24px_rgba(59,130,246,0.4)] hover:translate-y-[-2px] hover:shadow-[0_0_0_2px_rgba(59,130,246,0.8),0_8px_40px_rgba(59,130,246,0.6)] transition-all">
              <span>Iniciar Conversación</span>
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </Link>
            <a href="https://wa.me/528129135475" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/5 hover:border-white/40 transition-all">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Escribir por WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-5 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto text-center text-[var(--text-quaternary)] text-sm">
          <p>© {new Date().getFullYear()} Rogelio De La Rosa. Todos los derechos reservados. | Monterrey, N.L.</p>
        </div>
      </footer>
    </main>
  );
}
