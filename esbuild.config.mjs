import Esbuild from "esbuild";
import Path from "node:path";
import Process from "node:process";

const BUILDIR = Path.resolve(Process.cwd(), Process.env.BUILDIR);

Esbuild.build({
  entryPoints: ["src/cache/telekom/mobile-telecom-and-data.ts"],
  outdir: Path.join(BUILDIR, "cache/telekom"),
  platform: "node",
  format: "esm",
  packages: "external",
  sourcemap: false,
});

Esbuild.build({
  entryPoints: ["src/providers/telekom.ts"],
  outdir: Path.join(BUILDIR, "providers/"),
  platform: "node",
  format: "esm",
  packages: "external",
  bundle: true,
  sourcemap: false,
});
