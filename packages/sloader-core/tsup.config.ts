import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "iife"],
  globalName: "SloaderCore",
  dts: true,
  sourcemap: true,
  clean: true,
  minify: false, // you can flip this later
  target: "es2020",
  outDir: "dist",
});
