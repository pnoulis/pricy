import * as Esbuild from "esbuild";
import * as Fs from "node:fs/promises";

const inputFile = process.argv[2];
const outfile = process.argv[3];

const rewriteAliasesPlugin = {
  name: "rewrite-import-aliases",
  setup(build) {
    build.onLoad({ filter: /\.ts$/ }, async (args) => {
      let contents = await Fs.readFile(args.path, "utf8");

      contents = contents.replace(
        /(from\s+['"]|import\s*\(?['"])#src\/(.+?)\.ts(['"]\)?)/g,
        "$1#build/$2.js$3",
      );

      return {
        contents,
        loader: "ts",
      };
    });
  },
};

Esbuild.build({
  entryPoints: [inputFile],
  outfile,
  outbase: process.env.SRCDIR,
  define: {
    __STATEDIR__: `"${process.env.pricystatedir}"`,
    __CACHEDIR__: `"${process.env.pricycachedir}"`,
    __FIREFOX__: `"${process.env.FIREFOX}"`,
    __FIREFOX_PROFILE_DIR__: `"${process.env.pricyfirefoxprofiledir}"`,
    __WEBDRIVER_PORT__: `"${process.env.WEBDRIVER_PORT}"`,
    __WEBDRIVER_URL__: `"${process.env.WEBDRIVER_URL}"`,
  },
  platform: "node",
  format: "esm",
  packages: "external",
  bundle: false,
  sourcemap: false,
  plugins: [rewriteAliasesPlugin],
});
