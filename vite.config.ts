import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    tailwindcss(),
    // Only include reactRouter plugin when not running tests
    ...(process.env.VITEST ? [] : [reactRouter()]),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    css: true,
    testTimeout: 10000,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["app/**/*.{ts,tsx}"],
      exclude: [
        "tests/**",
        "app/routes/**",
        "app/root.tsx",
        "app/routes.ts",
        "node_modules/**",
      ],
    },
  },
});
