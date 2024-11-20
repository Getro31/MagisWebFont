import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generateIconClasses(svgFiles) {
  const distFolder = path.join(__dirname, "../dist");
  const cssFilePath = path.join(distFolder, "icons.css");

  const classes = svgFiles
    .map(
      (file) => `
      .icon-${file.name} {
        background-image: url('../icons/${file.name}.svg');
      }
    `
    )
    .join("\n");

  fs.writeFileSync(cssFilePath, classes, "utf8");
  console.log(`Fichier CSS généré : ${cssFilePath}`);
}

function generateUnicode(name) {
  // Simplification : ici vous pouvez associer des codes unicode ou une autre logique pour générer des codes.
  return Math.floor(Math.random() * 10000).toString(16);
}
