import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icon.svg", "Atelier-logo.png"],
      manifest: {
        name: "L'Atelier Majorité",
        short_name: "Atelier Majorité",
        description:
          "Cockpit des élus de la majorité — Ferrières-en-Brie. Échanger · Coopérer · Agir.",
        theme_color: "#16324f",
        background_color: "#16324f",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        icons: [
          {
            src: "/Atelier-logo.png",
            sizes: "1254x1254",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
