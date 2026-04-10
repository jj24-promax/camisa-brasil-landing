import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  /** Evita confusão de raiz quando existe outro lockfile na pasta pai (ex.: Camisa V2). */
  outputFileTracingRoot: path.join(__dirname),
  images: {
    // Configura as qualidades permitidas para evitar avisos de versões futuras do Next.js
    qualities: [75, 90, 95],
  },
};

export default nextConfig;