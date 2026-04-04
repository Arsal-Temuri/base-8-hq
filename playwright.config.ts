import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src/test",
  testMatch: ["**/*.e2e.ts", "**/*.e2e.tsx"],
  use: {
    baseURL: "http://127.0.0.1:4173",
  },
});
