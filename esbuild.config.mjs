import Esbuild from "esbuild";
import Path from "node:path";
import Process from "node:process";

const BUILDIR = Path.resolve(Process.cwd(), Process.env.BUILDIR);

Esbuild.build({
  entryPoints: ["src/index.ts"],
  outdir: BUILDIR,
  platform: "node",
  format: "esm",
  packages: "external",
  bundle: true,
  sourcemap: false,
});
