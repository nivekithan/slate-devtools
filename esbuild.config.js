/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

require("esbuild").buildSync({
  entryPoints: ["./slate-devtools/src/lib.tsx"],
  bundle: true,
  sourcemap: true,
  // outfile: "slate-devtools.js",
  define: {
    "process.env.NODE_ENV": `"production"`,
  },
  format: "esm",
  outfile: "./slate-devtools/dist/slate-devtools.es.js",
  tsconfig: "./slate-devtools/tsconfig.json",
  external: ["react", "react-dom"],
});

require("esbuild").buildSync({
  entryPoints: ["./slate-devtools/src/lib.tsx"],
  bundle: true,
  sourcemap: true,
  // outfile: "slate-devtools.js",
  define: {
    "process.env.NODE_ENV": `"production"`,
  },
  format: "iife",
  outfile: "./slate-devtools/dist/slate-devtools.umd.js",
  tsconfig: "./slate-devtools/tsconfig.json",
  external: ["react", "react-dom"],
});
