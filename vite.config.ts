import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  server: {
    proxy: {
      "/api/contact": {
        target: "/projects/pearl/api/contact",
        changeOrigin: true,
        secure: true,
        rewrite: () => "/contact.php",
      },
    },
  },
});
