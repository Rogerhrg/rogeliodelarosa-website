# Personal Brand - Next.js

Sitio web personal de Rogelio De La Rosa, desarrollado con Next.js 16, Tailwind CSS v4 y TypeScript.

## Stack Tecnológico

- **Frontend:** Next.js 16, React 19, Tailwind CSS v4, TypeScript
- **Animaciones:** Framer Motion + CSS custom animations
- **Deploy:** VPS con Docker (próximamente)

## Estruct del Proyecto

```
Personal-Brand-Next.js/
├── app/
│   ├── globals.css          # Estilos globales + Tailwind
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Página principal
│   └── proyectos/
│       └── [slug]/
│           └── page.tsx     # Páginas dinámicas de casos de estudio
├── components/
│   ├── Navbar.tsx           # Barra de navegación
│   ├── Hero.tsx             # Sección hero con partículas
│   ├── Metrics.tsx          # Contadores animados
│   ├── Services.tsx         # Cards de servicios (flip)
│   ├── Portfolio.tsx        # Grid de proyectos
│   ├── About.tsx            # Sobre mí
│   ├── CTA.tsx              # Llamado a la acción
│   └── Footer.tsx           # Pie de página
├── public/
│   ├── images/              # Todas las imágenes del sitio
│   └── cv/                  # Archivos PDF del CV
└── package.json
```

## Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Compila para producción
npm run start    # Inicia servidor de producción
npm run lint     # Ejecuta ESLint
```

## Desarrollo

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar servidor de desarrollo:
```bash
npm run dev
```

3. Abrir http://localhost:3000

## Proyectos/Casos de Estudio

- **Wiki Talent Academy** - `/proyectos/wiki-talent`
- **SigmaPRO** - `/proyectos/sigmapro`
- **AutoClaw** - `/proyectos/autoclaw` (asistente personal con IA)

## Contacto

- **WhatsApp:** +52 812 913 5475
- **Email:** contacto@rogeliodelarosa.com
- **LinkedIn:** linkedin.com/in/rogelio-de-la-rosa
- **GitHub:** github.com/Rogerhrg
