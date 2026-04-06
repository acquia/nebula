import path from "path";
import { fileURLToPath } from "url";
import drupalCanvas from "@drupal-canvas/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// Manually define __dirname for ES Modules.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss(), drupalCanvas()],
  resolve: {
    alias: {
      // Use path.resolve to create an absolute path to your src folder.
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
