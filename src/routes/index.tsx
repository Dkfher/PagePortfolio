import { createFileRoute } from "@tanstack/react-router";

import { FrontendPortfolioApp } from "@/components/portfolio/frontend-portfolio-app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Luis — Frontend Developer Portfolio" },
      {
        name: "description",
        content:
          "Portafolio frontend de Luis con proyectos destacados, integración con GitHub, skills clave y formulario de contacto.",
      },
      { property: "og:title", content: "Luis — Frontend Developer Portfolio" },
      {
        property: "og:description",
        content:
          "SPA de portafolio con React, TypeScript, TailwindCSS, animaciones sutiles y repositorios destacados desde GitHub.",
      },
      { name: "twitter:title", content: "Luis — Frontend Developer Portfolio" },
      {
        name: "twitter:description",
        content:
          "Portafolio frontend con About, proyectos, skills y contacto, diseñado para despliegue rápido y mantenimiento sencillo.",
      },
    ],
    links: [{ rel: "canonical", href: "https://id-preview--8e9692d9-846d-49b3-9707-03b3cfc7ef93.lovable.app/" }],
  }),
  component: Index,
});

function Index() {
  return <FrontendPortfolioApp />;
}
