/**
 * Tiny HTTP server that receives base64 screenshot POSTs from the browser
 * and saves them to public/screenshots/.
 *
 * Run: node tools/screenshot-server.mjs
 * Then run the browser bookmarklet to trigger capture.
 */

import { createServer } from "http";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dir, "..", "public", "screenshots");
mkdirSync(OUT, { recursive: true });

const PORT = 7824;

const server = createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Private-Network", "true");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.writeHead(404);
    res.end();
    return;
  }

  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    try {
      const { name, data } = JSON.parse(body);
      const buf = Buffer.from(data.replace(/^data:image\/\w+;base64,/, ""), "base64");
      const outPath = join(OUT, name);
      writeFileSync(outPath, buf);
      console.log(`✓ saved ${outPath} (${Math.round(buf.length / 1024)} KB)`);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true, path: outPath }));
    } catch (e) {
      console.error(e);
      res.writeHead(500);
      res.end(JSON.stringify({ error: e.message }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`Screenshot receiver listening on http://localhost:${PORT}`);
  console.log(`Waiting for browser to POST screenshots…`);
});
