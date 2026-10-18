import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const username = "Shahrukhxkhan";
const url = `https://github-contributions-api.jogruber.de/v4/${username}?y=last`;

const targetPaths = [
  path.resolve(rootDir, "client/src/data/github-contributions.json"),
  path.resolve(rootDir, "src/data/github-contributions.json"),
];

async function main() {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
    }
    const json = await res.json();
    const contributions = (json.contributions || []).map((item) => ({
      date: item.date,
      count: Number(item.count) || 0,
    }));

    if (contributions.length < 300) {
      throw new Error(`Insufficient contributions data: got ${contributions.length}`);
    }

    const payload = JSON.stringify(
      {
        username,
        fetchedAt: new Date().toISOString(),
        contributions,
      },
      null,
      2
    );

    for (const p of targetPaths) {
      fs.mkdirSync(path.dirname(p), { recursive: true });
      fs.writeFileSync(p, payload, "utf8");
    }
    console.log(`[fetch-github-contributions] Successfully saved ${contributions.length} contributions for ${username}`);
  } catch (err) {
    console.warn(`[fetch-github-contributions] Warning: ${err.message}. Keeping existing data.`);
    for (const p of targetPaths) {
      if (!fs.existsSync(p)) {
        fs.mkdirSync(path.dirname(p), { recursive: true });
        fs.writeFileSync(
          p,
          JSON.stringify({ username, fetchedAt: new Date().toISOString(), contributions: [] }, null, 2),
          "utf8"
        );
      }
    }
    process.exit(0);
  }
}

main();
