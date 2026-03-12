# Rogelio De La Rosa · Landing Page Premium Dark Mode

Este proyecto es una Landing Page moderna y premium para la marca personal de **Rogelio De La Rosa**, especializado en Desarrollo Web MVP, Consultoría de Procesos, y Automatización. El diseño está basado en una estética *"Dark Luxury"* orientada al sector Tech/Consultoría, con un color de acento principal **Azul Eléctrico (`#3B82F6`)**.

## Características del Proyecto
- **Diseño "Dark Luxury"**: Fondos ultra oscuros (`#000000`, `#09090B`) con efectos glow y glassmorphism.
- **Color Principal**: Azul Eléctrico (`#3B82F6`).
- **Secciones Responsive**: Hero interactivo, Métricas, Servicios (Flip-Cards 3D), Showcase de Proyectos, Sobre mí y CTA.
- **Animaciones Nativas**: Partículas flotantes con CSS/JS, esferas 3D con Keyframes, observer para scroll animations.
- **Performance Optimizado**: Tipografías de Google Fonts en pre-carga, JS ligero usando DOM nativo, y media queries organizadas.

## Estructura de Archivos
```
proyecto/
├── index.html       # Estructura principal y contenido adaptado
├── css/
│   └── styles.css   # Todas las variables de Dark Luxury y animaciones
├── js/
│   └── script.js    # Interacciones, contadores animados y navbar sticky
├── README.md        # Documentación
└── images/
    ├── Perfil CV.jpg             # Foto de perfil
    ├── Logo-Manuscrito.png       # Logo original (fallback)
    └── generated/                # Imágenes IA incorporadas 
        ├── logo.png              # Logo vector generado
        ├── hero_visual.png       # Elemento hero 3D
        ├── service_1.png         # [MVP Web]
        ├── service_2.png         # [WP Design]
        ├── service_3.png         # [Automation]
        └── service_4.png         # [Data/Consulting]
```

## Paleta de Colores
*   **Fondo Primario**: `#000000` (Negro Puro)
*   **Fondo Secundario (Cards)**: `#09090B` (Gris Ultra Oscuro)
*   **Acento (Azul Eléctrico)**:
    *   Base (`--primary-500`): `#3B82F6`
    *   Hover/Gradient (`--primary-600`): `#2563EB`
    *   Glow Shadow: `rgba(59, 130, 246, 0.4)`

## Notas de Implementación (Imágenes IA)
Las imágenes en la carpeta `/images/generated` fueron creadas utilizando IA, acorde a las especificaciones del sector *Tech/Consultoría*.
Debido a límites de tarifa de generación (Rate Limits), actualmente el sitio cuenta con 4 imágenes de servicios que se reutilizan en el grid principal de servicios (6 espacios).  
*Para agregar más imágenes en el futuro:*
1. Genera la imagen con la instrucción `Professional [SERVICE] visual for Tech industry, Electric Blue...`
2. Guárdala en `/images/generated/service_N.png`
3. Actualiza el tag `<img>` correspondiente en el `index.html`.

---
*Diseñado e Implementado mediante Automatización de Agentes IA (Google Deepmind).*
