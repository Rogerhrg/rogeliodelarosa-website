import "./globals.css";

export const metadata = {
  title: "Rogelio De La Rosa · Desarrollo Web Full-Stack & Consultoría",
  description: "Ingeniero Industrial convertido en desarrollador Full-Stack. Construyo plataformas web y automatizo procesos con Next.js, NestJS y PostgreSQL. MVP en semanas, no meses.",
  keywords: ["Desarrollo Web", "Full-Stack", "Next.js", "NestJS", "PostgreSQL", "Automatización", "CRM", "MVP", "Monterrey"],
  authors: [{ name: "Rogelio De La Rosa", url: "https://rogeliodelarosa.com" }],
  openGraph: {
    title: "Rogelio De La Rosa · Desarrollo Web Full-Stack",
    description: "Construyo plataformas web y automatizo procesos. De la idea compleja al software que tu negocio realmente necesita.",
    url: "https://rogeliodelarosa.com",
    siteName: "Rogelio De La Rosa",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rogelio De La Rosa · Desarrollo Web Full-Stack",
    description: "Construyo plataformas web y automatizo procesos.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
