import { Moon, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

type ThemeMode = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("dark");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("portfolio-theme") as ThemeMode | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = storedTheme ?? (systemPrefersDark ? "dark" : "light");

    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    window.localStorage.setItem("portfolio-theme", nextTheme);
  };

  return (
    <Button
      type="button"
      variant="panel"
      size="icon"
      aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      onClick={toggleTheme}
    >
      {theme === "dark" ? <SunMedium /> : <Moon />}
    </Button>
  );
}