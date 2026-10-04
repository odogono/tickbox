import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4100",
        // Demo auth: the dev proxy identifies the caller as Ana. In the real
        // product this is a session cookie set at login.
        headers: { "x-user-id": "u-ana" },
      },
    },
  },
});
