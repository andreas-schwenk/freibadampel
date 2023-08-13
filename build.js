const esbuild = require("esbuild");

// build src for view.html
esbuild.buildSync({
  platform: "browser",
  globalName: "freibadampel",
  minify: true, // TODO
  target: "es2020",
  entryPoints: ["src/view.js"],
  bundle: true,
  outfile: "./view.min.js",
});

// build src for editor/index.html
esbuild.buildSync({
  platform: "browser",
  globalName: "freibadampel",
  minify: true, // TODO
  target: "es2020",
  entryPoints: ["editor/src/edit.js"],
  bundle: true,
  outfile: "editor/index.min.js",
});
