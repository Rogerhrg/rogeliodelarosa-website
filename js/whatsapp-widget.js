/**
 * whatsapp-widget.js - Componente Flotante de WhatsApp
 * =====================================================
 * Componente reutilizable autocontenido (HTML + CSS + JS).
 * Incluirlo en cualquier página con:
 *   <script src="/js/whatsapp-widget.js"></script>
 *
 * Configuración opcional (antes de cargar el script):
 *   window.WA_CONFIG = {
 *     phone: '528129135475',       // Número de WhatsApp (con código de país, sin +)
 *     message: 'Hola Rogelio!...',  // Mensaje predeterminado
 *     position: 'bottom-right',    // 'bottom-right' | 'bottom-left'
 *     showAfterMs: 3000,           // Milisegundos antes de mostrar el widget
 *   };
 */
(function () {
  'use strict';

  // ── Config ─────────────────────────────────────────────────────────────────
  const DEFAULT_CONFIG = {
    phone: '528129135475',
    message: '¡Hola Rogelio! Me interesa platicar sobre un proyecto. 🚀',
    tooltip: '¿Te ayudo con tu proyecto? 🚀',
    position: 'bottom-right',
    showAfterMs: 1500,
  };

  const cfg = Object.assign({}, DEFAULT_CONFIG, window.WA_CONFIG || {});

  const waUrl = `https://wa.me/${cfg.phone}?text=${encodeURIComponent(cfg.message)}`;
  const isRight = cfg.position !== 'bottom-left';

  // ── Styles ─────────────────────────────────────────────────────────────────
  const CSS = `
    :root {
      --wa-green: #25D366;
      --wa-green-dark: #128C7E;
      --wa-shadow: rgba(37, 211, 102, 0.45);
    }

    #wa-widget-wrapper {
      position: fixed;
      bottom: 28px;
      ${isRight ? 'right: 28px;' : 'left: 28px;'}
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: ${isRight ? 'flex-end' : 'flex-start'};
      gap: 10px;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s cubic-bezier(.16,1,.3,1),
                  transform 0.5s cubic-bezier(.16,1,.3,1);
      pointer-events: none;
    }

    #wa-widget-wrapper.wa-visible {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    /* ── Tooltip bubble ── */
    #wa-tooltip {
      background: #1e2a2e;
      color: #e0f5ec;
      padding: 10px 16px;
      border-radius: 14px;
      font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
      font-size: 0.8rem;
      line-height: 1.4;
      max-width: 200px;
      text-align: center;
      box-shadow: 0 8px 24px rgba(0,0,0,0.35),
                  0 0 0 1px rgba(37,211,102,0.15);
      position: relative;
      transform-origin: ${isRight ? 'right' : 'left'} bottom;
      animation: wa-pop-in 0.4s cubic-bezier(.16,1,.3,1) both;
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    #wa-tooltip::after {
      content: '';
      position: absolute;
      bottom: -7px;
      ${isRight ? 'right: 22px;' : 'left: 22px;'}
      border-width: 7px 7px 0;
      border-style: solid;
      border-color: #1e2a2e transparent transparent;
    }

    #wa-tooltip.wa-hidden {
      opacity: 0;
      transform: scale(0.85);
      pointer-events: none;
    }

    /* ── FAB button ── */
    #wa-fab {
      position: relative;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--wa-green) 0%, var(--wa-green-dark) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 6px 20px var(--wa-shadow), 0 0 0 0 var(--wa-shadow);
      cursor: pointer;
      text-decoration: none;
      border: none;
      outline: none;
      transition: transform 0.25s cubic-bezier(.16,1,.3,1),
                  box-shadow 0.25s ease;
      animation: wa-pulse-ring 2.5s ease-out infinite 2s;
    }

    #wa-fab:hover {
      transform: scale(1.1) rotate(-5deg);
      box-shadow: 0 10px 30px var(--wa-shadow), 0 0 0 0 var(--wa-shadow);
    }

    #wa-fab:active {
      transform: scale(0.95);
    }

    #wa-fab svg {
      width: 30px;
      height: 30px;
      fill: #fff;
      flex-shrink: 0;
      transition: transform 0.25s ease;
    }

    #wa-fab:hover svg {
      transform: scale(1.1);
    }

    /* Notification dot */
    #wa-fab::before {
      content: '';
      position: absolute;
      top: 5px;
      right: 3px;
      width: 13px;
      height: 13px;
      background: #FF4757;
      border: 2px solid #0a0f0d;
      border-radius: 50%;
      animation: wa-blink 2s ease-in-out infinite;
    }

    /* ── Keyframes ── */
    @keyframes wa-pop-in {
      from { opacity: 0; transform: scale(0.7); }
      to   { opacity: 1; transform: scale(1); }
    }

    @keyframes wa-pulse-ring {
      0%   { box-shadow: 0 6px 20px var(--wa-shadow), 0 0 0 0 rgba(37,211,102,0.55); }
      60%  { box-shadow: 0 6px 20px var(--wa-shadow), 0 0 0 18px rgba(37,211,102,0); }
      100% { box-shadow: 0 6px 20px var(--wa-shadow), 0 0 0 0 rgba(37,211,102,0); }
    }

    @keyframes wa-blink {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.6; transform: scale(0.85); }
    }

    /* ── Responsive ── */
    @media (max-width: 480px) {
      #wa-widget-wrapper {
        bottom: 20px;
        ${isRight ? 'right: 16px;' : 'left: 16px;'}
      }
      #wa-fab {
        width: 54px;
        height: 54px;
      }
      #wa-fab svg { width: 26px; height: 26px; }
    }
  `;

  // ── HTML ───────────────────────────────────────────────────────────────────
  const WHATSAPP_SVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15
               -.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463
               -2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606
               .134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025
               -.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008
               -.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479
               0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306
               1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006
               -1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421
               7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648
               -.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884
               2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45
               -4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0
               .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654
               a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893
               a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  `;

  // ── Mount ──────────────────────────────────────────────────────────────────
  function mount() {
    // Avoid double-mounting
    if (document.getElementById('wa-widget-wrapper')) return;

    // Inject styles
    const style = document.createElement('style');
    style.id = 'wa-widget-styles';
    style.textContent = CSS;
    document.head.appendChild(style);

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.id = 'wa-widget-wrapper';
    wrapper.setAttribute('aria-label', 'Contactar por WhatsApp');

    // Tooltip
    const tooltip = document.createElement('div');
    tooltip.id = 'wa-tooltip';
    tooltip.textContent = cfg.tooltip;

    // FAB link
    const fab = document.createElement('a');
    fab.id = 'wa-fab';
    fab.href = waUrl;
    fab.target = '_blank';
    fab.rel = 'noopener noreferrer';
    fab.setAttribute('aria-label', 'Abrir chat de WhatsApp');
    fab.innerHTML = WHATSAPP_SVG;

    wrapper.appendChild(tooltip);
    wrapper.appendChild(fab);
    document.body.appendChild(wrapper);

    // ── Show after delay ──
    setTimeout(() => {
      wrapper.classList.add('wa-visible');
    }, cfg.showAfterMs);

    // ── Auto-hide tooltip on FAB click ──
    fab.addEventListener('click', () => {
      tooltip.classList.add('wa-hidden');
    });

    // ── Hide tooltip after 8 s automatically ──
    setTimeout(() => {
      tooltip.classList.add('wa-hidden');
    }, cfg.showAfterMs + 8000);
  }

  // Mount on DOMContentLoaded or immediately if DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
