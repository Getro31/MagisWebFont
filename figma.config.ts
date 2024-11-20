// @ts-check
import outputComponentsAsSvg from "@figma-export/output-components-as-svg";
import transformSvgWithSvgo from "@figma-export/transform-svg-with-svgo";
import dotenv from "dotenv";

dotenv.config();
const fileId = process.env.FILE_ID;

/** @type { import('@figma-export/types').ComponentsCommandOptions } */
const componentOptions = {
  fileId,
  onlyFromPages: ["solid"],
  transformers: [
    transformSvgWithSvgo({
      multipass: true,
      plugins: [
        {
          name: "preset-default",
          params: {
            overrides: {
              removeViewBox: false,
            },
          },
        },
        {
          name: "mergePaths",
        },
        {
          name: "cleanupEnableBackground",
        },
        {
          name: "sortAttrs",
        },
        {
          name: "minifyStyles",
        },
        {
          name: "removeDimensions",
        },
        {
          name: "cleanupNumericValues",
        },
        {
          name: "removeAttrs",
          params: {
            attrs: "fill",
          },
        },
      ],
    }),
  ],
  outputters: [
    outputComponentsAsSvg({
      output: "./",
    }),
  ],
};

/** @type { import('@figma-export/types').FigmaExportRC } */
export default {
  commands: [["components", componentOptions]],
};
