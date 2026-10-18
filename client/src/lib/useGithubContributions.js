import { useState, useEffect } from "react";
import snapshot from "../data/github-contributions.json";

const CACHE_KEY = "gh-contrib-v1:Shahrukhxkhan";
const TTL_MS = 6 * 60 * 60 * 1000; // 6 hours
const USERNAME = "Shahrukhxkhan";
const API_URL = `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`;

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function isValidContributions(arr) {
  if (!Array.isArray(arr) || arr.length < 300) return false;
  return arr.every(
    (item) =>
      item &&
      typeof item.date === "string" &&
      DATE_REGEX.test(item.date) &&
      typeof item.count === "number" &&
      Number.isFinite(item.count) &&
      item.count >= 0
  );
}

function isAvailable(data) {
  if (!data || !Array.isArray(data) || data.length === 0) return false;
  const sum = data.reduce((acc, curr) => acc + (Number(curr?.count) || 0), 0);
  return sum > 0;
}

function getInitialState() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (
        parsed &&
        parsed.timestamp &&
        Date.now() - parsed.timestamp < TTL_MS &&
        isValidContributions(parsed.contributions) &&
        isAvailable(parsed.contributions)
      ) {
        return { data: parsed.contributions, status: "cached", isFresh: true };
      }
    }
  } catch {
    // ignore localStorage errors
  }

  // Fallback to bundled snapshot
  const snapContribs = snapshot?.contributions || [];
  if (isValidContributions(snapContribs) && isAvailable(snapContribs)) {
    return { data: snapContribs, status: "snapshot", isFresh: false };
  }

  return { data: null, status: "unavailable", isFresh: false };
}

export function useGithubContributions() {
  const [state, setState] = useState(() => {
    const init = getInitialState();
    return { data: init.data, status: init.status };
  });

  useEffect(() => {
    const init = getInitialState();
    if (init.isFresh) {
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);

    async function fetchLive() {
      try {
        const res = await fetch(API_URL, { signal: controller.signal });
        if (!res.ok) return;
        const json = await res.json();
        const mapped = (json.contributions || []).map((c) => ({
          date: c.date,
          count: Number(c.count) || 0,
        }));

        if (isValidContributions(mapped) && isAvailable(mapped)) {
          try {
            localStorage.setItem(
              CACHE_KEY,
              JSON.stringify({ timestamp: Date.now(), contributions: mapped })
            );
          } catch {
            // ignore localStorage write error
          }
          setState({ data: mapped, status: "live" });
        }
      } catch {
        // On failure keep what you have, with no console errors and no thrown exceptions
      } finally {
        clearTimeout(timer);
      }
    }

    fetchLive();

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  return { data: state.data, status: state.status };
}

export default useGithubContributions;
