"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--bg-secondary)] py-16 px-5 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-wrap gap-16 mb-16">
          {/* Brand */}
          <div className="flex-grow min-w-[250px]">
            <Image src="/images/generated/logo.png" alt="Rogelio De La Rosa Logo" width={160} height={40} className="mb-4" />
            <p className="text-[var(--text-tertiary)] text-sm leading-relaxed">
              Sistemas eficientes.<br />Diseño inquebrantable.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-16">
            <div className="link-col">
              <h4 className="text-sm font-semibold text-white mb-6">Navegación</h4>
              <Link href="#hero" className="block text-[var(--text-tertiary)] hover:text-[var(--primary-400)] transition-colors mb-4">Inicio</Link>
              <Link href="#services" className="block text-[var(--text-tertiary)] hover:text-[var(--primary-400)] transition-colors mb-4">Servicios</Link>
              <Link href="#portfolio" className="block text-[var(--text-tertiary)] hover:text-[var(--primary-400)] transition-colors mb-4">Proyectos</Link>
              <Link href="#about" className="block text-[var(--text-tertiary)] hover:text-[var(--primary-400)] transition-colors mb-4">Sobre Mí</Link>
            </div>

            <div className="link-col">
              <h4 className="text-sm font-semibold text-white mb-6">Contacto</h4>
              <a href="mailto:contacto@rogeliodelarosa.com" className="block text-[var(--text-tertiary)] hover:text-[var(--primary-400)] transition-colors mb-4">Email</a>
              <a href="https://wa.me/528129135475" target="_blank" rel="noopener noreferrer" className="block text-[var(--text-tertiary)] hover:text-[var(--primary-400)] transition-colors mb-4">WhatsApp</a>
              <a href="https://linkedin.com/in/rogelio-de-la-rosa" target="_blank" rel="noopener noreferrer" className="block text-[var(--text-tertiary)] hover:text-[var(--primary-400)] transition-colors mb-4">LinkedIn</a>
              <a href="https://github.com/Rogerhrg" target="_blank" rel="noopener noreferrer" className="block text-[var(--text-tertiary)] hover:text-[var(--primary-400)] transition-colors mb-4">GitHub</a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center pt-8 border-t border-white/5 text-[var(--text-quaternary)] text-sm">
          <p>© {currentYear} Rogelio De La Rosa. Todos los derechos reservados. | Monterrey, N.L.</p>
        </div>
      </div>
    </footer>
  );
}
