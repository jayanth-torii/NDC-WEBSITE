"use client";

import { useEffect, useState } from "react";

// Fetches live data from the backend on mount. No static fallback — data
// is null until the fetch resolves, and stays null if the backend is
// unreachable.
export function useLiveData<T>(fetcher: () => Promise<T | null>) {
  const [data, setData] = useState<T | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let cancelled = false;
    fetcher()
      .then((live) => {
        if (cancelled) return;
        if (live !== null && live !== undefined) {
          setData(live);
          setIsLive(true);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      });
    return () => {
      cancelled = true;
    };
    // Intentionally run once on mount — callers pass a stable fetcher per instance.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, isLive, error };
}
