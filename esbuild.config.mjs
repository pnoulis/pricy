import Esbuild from "esbuild";
import Path from "node:path";
import Process from "node:process";

const BUILDIR = Path.join(import.meta.dirname, Process.env.BUILDIR);

Esbuild.build({
  entryPoints: [`${Process.env.SRCDIR}/index.ts`],
  outdir: BUILDIR,
  define: {
    __STATEDIR__: `"${Process.env.pricystatedir}"`,
    __CACHEDIR__: `"${Process.env.pricycachedir}"`,
  },
  platform: "node",
  format: "esm",
  packages: "external",
  bundle: true,
  sourcemap: false,
});
