// @ts-check
import outputComponentsAsSvg from "@figma-export/output-components-as-svg";
import transformSvgWithSvgo from "@figma-export/transform-svg-with-svgo";
import dotenv from "dotenv";

dotenv.config();
const fileId = process.env.FILE_ID;

/** @type { import('@figma-export/types').ComponentsCommandOptions } */
const componentOptions = {
  fileId,
  onlyFromPages: ["icons"],
  transformers: [
    transformSvgWithSvgo({
      plugins: [
        // 1. Préserve le viewBox
        {
          name: "preset-default",
          params: {
            overrides: {
              removeViewBox: false, // Assure que viewBox reste intact
            },
          },
        },
        // 2. Déplace `fill` de <svg> vers chaque <path>
        {
          name: "removeAttrs",
          params: {
            attrs: "svg:fill", // Supprime `fill` de l'élément <svg>
          },
        },
        {
          name: "addAttributesToSVGElement",
          params: {
            attributes: [
              { "data-fill-processed": "true" }, // Ajout pour trace interne (optionnel)
            ],
          },
        },
      ],
    }),
  ],
  outputters: [
    outputComponentsAsSvg({
      output: "./src",
    }),
  ],
};

/** @type { import('@figma-export/types').FigmaExportRC } */
export default {
  commands: [["components", componentOptions]],
};
