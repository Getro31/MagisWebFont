import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";
import svgo from "svgo";
import Fontmin from "fontmin";

const iconsDir = "src/icons"; // Chemin vers tes icônes SVG
const cssFile = "dist/icons.css"; // Fichier CSS généré
const files = fs.readdirSync(iconsDir).filter((file) => file.endsWith(".svg"));

const optimizedSvgFolder = path.join(
  new URL(import.meta.url).pathname,
  "../optimized_svgs"
); // Dossier des SVG optimisés

let cssContent = "";
files.forEach((file) => {
  const iconName = path.basename(file, ".svg");
  cssContent += `
.icon-${iconName} {
  background: url('../src/icons/${file}') no-repeat center;
  display: inline-block;
  width: 24px;
  height: 24px;
}
`;
});
fs.writeFileSync(cssFile, cssContent);

// Fonction pour optimiser tous les SVG dans le dossier
async function optimizeSvgs() {
  await fs.ensureDir(optimizedSvgFolder); // Crée le dossier des SVG optimisés s'il n'existe pas

  const svgFiles = files;

  const optimizedSvgs = [];
  for (const file of svgFiles) {
    const filePath = path.join(iconsDir, file);
    const svgContent = await fs.readFile(filePath, "utf8");

    const optimizedSvg = await svgo.optimize(svgContent, { path: filePath });
    const optimizedFilePath = path.join(optimizedSvgFolder, file);

    // Enregistrer le SVG optimisé dans le dossier `optimizedSvgFolder`
    await fs.writeFile(optimizedFilePath, optimizedSvg.data, "utf8");

    optimizedSvgs.push({
      name: path.basename(file, ".svg"),
      content: optimizedSvg.data,
    });
  }

  console.log(`SVG optimisés enregistrés dans : ${optimizedSvgFolder}`);
  return optimizedSvgs;
}

await optimizeSvgs();
console.log("CSS généré avec succès !");
