import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github, Linkedin, Mail, Menu, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { ThemeToggle } from "@/components/portfolio/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre.").max(80, "Máximo 80 caracteres."),
  email: z.string().trim().email("Introduce un email válido.").max(120, "Máximo 120 caracteres."),
  message: z.string().trim().min(12, "Cuéntame un poco más.").max(1000, "Máximo 1000 caracteres."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

//Descripcion
const profile = {
  name: "Luis",
  role: "Frontend Specialist",
  location: "Disponible para proyectos remotos y colaboraciones de producto",
  summary:
    "Construyo interfaces rápidas, accesibles y orientadas al detalle, con foco en sistemas de diseño, rendimiento y experiencias claras para producto digital.",
  githubUsername: import.meta.env.VITE_USERNAME,
  githubUrl: import.meta.env.VITE_GITHUB_URL,
  linkedinUrl: import.meta.env.VITE_LINKEDIN_URL,
  email: import.meta.env.VITE_EMAIL,
};

const navigationItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Skills", href: "#skills" },
  { label: "Contacto", href: "#contacto" },
];

const highlightedProjects = [
  {
    name: "Scrumble Words App",
    description:
      "Aplicación interactiva diseñada para aprender y practicar verbos en inglés de manera divertida y dinámica.",
    stack: ["React", "TypeScript", "Tailwind", "Shadcn UI"],
    stats: "Aprendizaje, Interactividad",
    repoUrl: import.meta.env.VITE_PROJECT_SCRUMBLE_REPO,
    demoUrl: import.meta.env.VITE_PROJECT_SCRUMBLE_DEMO,
  },
  {
    name: "Analytics Dashboard",
    description:
      "Dashboard modular con visualización de métricas, filtros avanzados y flujos optimizados para equipos de negocio.",
    stack: ["React.js", "TypeScript", "Shadcn UI", "Tailwind"],
    stats: "Filtros persistentes y UX",
    repoUrl: import.meta.env.VITE_PROJECT_DASHBOARD_REPO,
    demoUrl: import.meta.env.VITE_PROJECT_DASHBOARD_DEMO,
  },
  {
    name: "Crypto Quote",
    description:
      "Aplicación que permite convertir cualquier moneda seleccionada en una criptomoneda específica en tiempo real",
    stack: ["React", "API REST", "Zustand", "Framer Motion"],
    stats: "Consultar de divisas",
    repoUrl: import.meta.env.VITE_PROJECT_CRYPTO_REPO,
    demoUrl: import.meta.env.VITE_PROJECT_CRYPTO_DEMO,
  },
  {
    name: "Afiliación Pensiones",
    description:
      "Flujo de afiliación digital simplificado, logrando verificar la viabilidad en segundos.",
    stack: ["Next.js", "Sass", "TypeScript", "SEO", "Jenkins", "Azure"],
    stats: "Performance, trazabilidad,Cloud",
    // repoUrl: "#",
    demoUrl: import.meta.env.VITE_PROJECT_AFILIACION_PENSIONES_DEMO,
  },
  {
    name: "Afiliación Cesantias",
    description:
      "Flujo de afiliación digital que simplifica el registro de usuarios mediante firma electrónica e integración de beneficios corporativos.",
    stack: ["Next.js", "Sass", "TypeScript", "SEO", "Jenkins", "Azure"],
    stats: "Performance, trazabilidad,Cloud",
    // repoUrl: "#",
    demoUrl: import.meta.env.VITE_PROJECT_AFILIACION_CESANTIAS_DEMO,
  },
];

type SkillIconProps = {
  className?: string;
};

function ReactSkillIcon({ className }: SkillIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)" />
    </svg>
  );
}

function TypeScriptSkillIcon({ className }: SkillIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4 4h16v16H4z" opacity="0.18" />
      <path d="M7.2 8.2h7.2v1.8h-2.6V17H9.7v-7H7.2zm9.2 3.1c.6-.4 1.3-.6 2-.6 1.1 0 2 .3 2.7.9l-1.1 1.4c-.4-.4-.9-.6-1.5-.6-.6 0-.9.2-.9.6 0 .3.2.5 1.1.8 1.5.5 2.7 1 2.7 2.7 0 1.7-1.4 2.7-3.3 2.7-1.4 0-2.6-.4-3.5-1.3l1.2-1.4c.6.5 1.3.9 2.2.9.7 0 1.1-.3 1.1-.7 0-.5-.4-.6-1.3-.9-1.7-.6-2.5-1.2-2.5-2.7 0-.8.4-1.5 1.1-1.8Z" />
    </svg>
  );
}

function PostgreSqlSkillIcon({ className }: SkillIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 4c-3.1 0-5.5 1.7-5.5 3.8v8.1c0 2.1 2.4 3.8 5.5 3.8s5.5-1.7 5.5-3.8V7.8C17.5 5.7 15.1 4 12 4Z" />
      <path d="M6.5 8c0 2.1 2.4 3.8 5.5 3.8s5.5-1.7 5.5-3.8" />
      <path d="M10 13.5h4" />
      <path d="M10 16.5h4" />
    </svg>
  );
}

function SassSkillIcon({ className }: SkillIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.8 6.8c-1.8-1.3-4.6-1.4-6.9-.5-1.7.7-3.9 2.3-4 4.4-.1 1.4 1 2.2 2.1 2.8 1.5.8 1.7 1.3 1.6 1.7-.1.7-.9 1.2-1.7 1.2-1.1 0-2-.5-2.6-1.3l-1.4 1.1c.9 1.1 2.4 1.8 4 1.8 1.8 0 3.6-1 3.9-2.9.2-1.2-.4-2.3-2.4-3.3-1-.5-1.5-.9-1.5-1.4 0-.9 1.2-2 2.7-2.6 1.8-.7 4-.6 5.2.3.9.6 1 1.6.3 2.4-.7.8-1.9 1.1-3 1 .1.6.1 1.2-.1 1.8 1.7.1 3.5-.5 4.7-1.8 1.4-1.7 1.1-4-.9-5.4Z" />
    </svg>
  );
}

function NextJsSkillIcon({ className }: SkillIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 4a8 8 0 1 0 8 8 8 8 0 0 0-8-8Zm0 1.8a6.2 6.2 0 0 1 4.9 10L9.7 7.4h-.1v8.8H7.9V8.2A6.2 6.2 0 0 1 12 5.8Zm-1.2 12.3 1.6 2.1A6.2 6.2 0 0 1 7 17.3V9.6Z" />
    </svg>
  );
}

function NodeJsSkillIcon({ className }: SkillIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path
        d="M12 3.8 5.4 7.6v8.8l6.6 3.8 6.6-3.8V7.6L12 3.8Zm4.8 11.5L12 18l-4.8-2.7V8.7L12 6l4.8 2.7Z"
        opacity="0.3"
      />
      <path d="M12 6.9 8 9.2v5.6l4 2.3 4-2.3V9.2Zm.6 7.2c0 .9-.5 1.4-1.4 1.4-.5 0-1-.2-1.4-.5l.5-.9c.2.2.5.4.8.4.3 0 .5-.1.5-.5v-3.1h1Zm2.5 1.4c-.7 0-1.3-.2-1.8-.7l.6-.8c.4.3.8.5 1.2.5.4 0 .6-.1.6-.4 0-.2-.1-.3-.8-.5-.9-.3-1.5-.6-1.5-1.5s.8-1.5 1.8-1.5c.7 0 1.2.2 1.7.6l-.6.8c-.3-.2-.7-.4-1.1-.4s-.5.1-.5.4c0 .2.2.3.9.6.9.3 1.4.7 1.4 1.5 0 .9-.7 1.4-1.9 1.4Z" />
    </svg>
  );
}

function ZustandSkillIcon({ className }: SkillIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 14.5c0-2.8 2.5-5 5.5-5 1.6 0 2.9.5 3.9 1.5" />
      <path d="M8.3 12.8c.7-1 1.8-1.6 3.2-1.6 2.2 0 3.9 1.6 3.9 3.7" />
      <path d="M5 16.8c.9 1.9 3 3.2 5.5 3.2 3.3 0 6-2.2 6.5-5.1" />
      <path d="m15.4 7.1 3.6.1-.8 3.3" />
    </svg>
  );
}

const skills = [
  { name: "React", icon: ReactSkillIcon },
  { name: "TypeScript", icon: TypeScriptSkillIcon },
  { name: "PostgreSQL", icon: PostgreSqlSkillIcon },
  { name: "Sass", icon: SassSkillIcon },
  { name: "Next.js", icon: NextJsSkillIcon },
  { name: "Node.js", icon: NodeJsSkillIcon },
  { name: "Zustand", icon: ZustandSkillIcon },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{title}</h2>
      <p className="text-base leading-7 text-muted-foreground md:text-lg">{description}</p>
    </div>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function FrontendPortfolioApp() {
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sentMessage, setSentMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const metrics = useMemo(
    () => [
      { label: "Proyectos", value: "5" },
      { label: "Skills clave", value: "7" },
      { label: "Enfoque", value: "UX + Performance" },
    ],
    [],
  );

  const handleContactSubmit = async (values: ContactFormValues) => {
    const subject = encodeURIComponent(`Nuevo contacto desde portafolio: ${values.name}`);
    const body = encodeURIComponent(
      `Nombre: ${values.name}\nEmail: ${values.email}\n\nMensaje:\n${values.message}`,
    );

    setSentMessage("Mensaje preparado. Se abrirá tu cliente de correo.");
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    reset();
  };

  return (
    <div className="relative overflow-x-hidden">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border/70 bg-background/75 backdrop-blur-xl">
        <div className="section-shell flex h-18 items-center justify-between gap-4 py-4">
          <a
            href="#inicio"
            className="flex items-center gap-3 text-sm font-semibold tracking-[0.16em] text-foreground"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-sm text-brand hero-glow">
              LS
            </span>
            <span className="hidden sm:block">Luis Fernando Sierra</span>
          </a>

          <nav className="hidden items-center gap-2 md:flex" aria-label="Navegación principal">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              type="button"
              variant="panel"
              size="icon"
              className="md:hidden"
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((current) => !current)}
            >
              <Menu />
            </Button>
          </div>
        </div>

        {menuOpen && (
          <div className="section-shell border-t border-border/70 py-3 md:hidden">
            <nav className="grid gap-2" aria-label="Navegación móvil">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="pt-[73px] md:pt-[89px]">
        <section
          id="inicio"
          className="section-shell grid min-h-[calc(100vh-72px)] items-center gap-10 py-14 md:grid-cols-[1.1fr_0.9fr] md:py-20"
        >
          <Reveal>
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted-foreground shadow-[var(--shadow-soft)]">
                <Sparkles className="size-4 text-brand" />
                Software Engineer con criterio de producto
              </div>

              <div className="space-y-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {profile.role}
                </p>
                <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
                  Hola, soy <span className="text-gradient-brand">{profile.name}</span>.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
                  {profile.summary}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button asChild variant="hero" size="lg">
                  <a href="#proyectos">
                    Ver proyectos
                    <ArrowUpRight />
                  </a>
                </Button>
                <Button asChild variant="panel" size="lg">
                  <a href="#contacto">
                    Contactar
                    <Mail />
                  </a>
                </Button>
              </div>

              <div className="balanced-grid pt-4">
                {metrics.map((metric, index) => (
                  <Reveal key={metric.label} delay={index * 0.08}>
                    <div className="glass-panel rounded-xl border border-border p-5">
                      <p className="text-2xl font-semibold text-foreground md:text-3xl">
                        {metric.value}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">{metric.label}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <motion.article
              className="glass-panel hero-glow relative rounded-2xl border border-border p-6 md:p-8"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      rotate: [0, 0.7, 0],
                      y: [0, -6, 0],
                    }
              }
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                    Presentación
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-foreground">
                    Interfaces precisas, rápidas y accesibles.
                  </p>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-elevated text-xl font-semibold text-brand shadow-[var(--shadow-glow)]">
                  L
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-surface p-5">
                  <p className="text-sm text-muted-foreground">Especialidad</p>
                  <p className="mt-2 text-lg font-semibold text-foreground">
                    React / Next.js / TypeScript / Microfrontends
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-surface p-5">
                  <p className="text-sm text-muted-foreground">Trabajo</p>
                  <p className="mt-2 text-lg font-semibold text-foreground">{profile.location}</p>
                </div>
                <div className="rounded-xl border border-border bg-surface p-5 sm:col-span-2">
                  <p className="text-sm text-muted-foreground">Extracto</p>
                  <p className="mt-2 text-base leading-7 text-foreground/90">
                    Me gusta convertir requisitos complejos en experiencias limpias, componibles y
                    listas para evolucionar con el producto.
                  </p>
                </div>
              </div>
            </motion.article>
          </Reveal>
        </section>

        <section id="proyectos" className="section-shell space-y-10 py-16 md:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Proyectos"
              title="Selección de proyectos"
              description="Una muestra de proyectos seleccionados por su enfoque en diseño de interfaces, rendimiento, mantenibilidad y experiencia de usuario."
            />
          </Reveal>

          <div className="balanced-grid">
            {highlightedProjects.map((project, index) => (
              <Reveal key={project.name} delay={index * 0.06}>
                <article className="glass-panel rounded-xl border border-border p-6 transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                        Proyecto destacado
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-foreground">{project.name}</h3>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {project.description}
                  </p>
                  <p className="mt-4 text-sm font-medium text-foreground">{project.stats}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button asChild variant="hero">
                      <a href={project.repoUrl} target="_blank" rel="noreferrer">
                        Repositorio
                        <Github />
                      </a>
                    </Button>
                    <Button asChild variant="panel">
                      <a href={project.demoUrl} target="_blank" rel="noreferrer">
                        Visitar
                        <ExternalLink />
                      </a>
                    </Button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="skills" className="section-shell space-y-10 py-16 md:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Skills"
              title="Tecnologías con las que diseño y construyo"
              description="Base sólida en frontend moderno, integración con backend y cuidado por la mantenibilidad del código a largo plazo."
            />
          </Reveal>

          <div className="balanced-grid">
            {skills.map((skill, index) => {
              const Icon = skill.icon;

              return (
                <Reveal key={skill.name} delay={index * 0.06}>
                  <article className="glass-panel flex min-h-36 flex-col items-center justify-center rounded-xl border border-border p-6 text-center transition-transform duration-300 hover:-translate-y-1">
                    <div className="flex h-18 w-18 items-center justify-center rounded-xl border border-border bg-elevated text-brand shadow-[var(--shadow-soft)]">
                      <Icon className="size-7" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-foreground">{skill.name}</h3>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section id="contacto" className="section-shell py-16 md:py-24">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="space-y-6">
                <SectionHeading
                  eyebrow="Contacto"
                  title="Hablemos del próximo producto que quieras lanzar"
                  description="Si necesitas una interfaz clara, rápida y bien estructurada, puedo ayudarte a diseñarla, construirla y dejarla lista para escalar."
                />

                <div className="space-y-4">
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-panel flex items-center justify-between rounded-xl border border-border px-5 py-4 text-foreground transition-transform duration-300 hover:-translate-y-1"
                  >
                    <span className="flex items-center gap-3">
                      <Linkedin className="size-5 text-brand" />
                      LinkedIn
                    </span>
                    <ArrowUpRight className="size-4 text-muted-foreground" />
                  </a>
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-panel flex items-center justify-between rounded-xl border border-border px-5 py-4 text-foreground transition-transform duration-300 hover:-translate-y-1"
                  >
                    <span className="flex items-center gap-3">
                      <Github className="size-5 text-brand" />
                      GitHub
                    </span>
                    <ArrowUpRight className="size-4 text-muted-foreground" />
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="glass-panel rounded-2xl border border-border p-6 md:p-8">
                <form className="space-y-5" onSubmit={handleSubmit(handleContactSubmit)} noValidate>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground" htmlFor="name">
                      Nombre
                    </label>
                    <Input
                      id="name"
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground" htmlFor="email">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground" htmlFor="message">
                      Mensaje
                    </label>
                    <Textarea
                      id="message"
                      aria-invalid={Boolean(errors.message)}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive">{errors.message.message}</p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button type="submit" variant="hero" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? "Preparando..." : "Enviar mensaje"}
                      <Mail />
                    </Button>
                    <p
                      className={cn(
                        "text-sm text-muted-foreground",
                        sentMessage && "text-foreground",
                      )}
                    >
                      {sentMessage ?? "Respuesta rápida para nuevas colaboraciones."}
                    </p>
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
