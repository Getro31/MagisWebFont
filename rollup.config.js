import svgr from "@svgr/rollup";

export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "esm",
  },
  plugins: [svgr()],
};
