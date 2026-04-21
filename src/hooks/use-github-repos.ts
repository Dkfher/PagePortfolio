import { useEffect, useState } from "react";

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  topics?: string[];
  fork: boolean;
}

interface UseGithubReposOptions {
  username: string;
  limit?: number;
}

interface UseGithubReposState {
  repos: GithubRepo[];
  loading: boolean;
  error: string | null;
  isPlaceholder: boolean;
}

const PLACEHOLDER_USERNAMES = ["github-username", "tu-usuario", "username"];

export function useGithubRepos({ username, limit = 6 }: UseGithubReposOptions): UseGithubReposState {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const normalizedUsername = username.trim();
    const isPlaceholder = PLACEHOLDER_USERNAMES.includes(normalizedUsername.toLowerCase());

    if (!normalizedUsername || isPlaceholder) {
      setRepos([]);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();

    async function loadRepos() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.github.com/users/${encodeURIComponent(normalizedUsername)}/repos?sort=updated&per_page=100`,
          {
            headers: {
              Accept: "application/vnd.github+json",
            },
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error("No fue posible cargar los repositorios de GitHub.");
        }

        const data = (await response.json()) as GithubRepo[];

        const curatedRepos = data
          .filter((repo) => !repo.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, limit);

        setRepos(curatedRepos);
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }

        setError(err instanceof Error ? err.message : "Error desconocido al conectar con GitHub.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadRepos();

    return () => controller.abort();
  }, [limit, username]);

  return {
    repos,
    loading,
    error,
    isPlaceholder: PLACEHOLDER_USERNAMES.includes(username.trim().toLowerCase()),
  };
}