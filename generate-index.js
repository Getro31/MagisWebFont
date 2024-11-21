import fs from "fs";
import path from "path";

// Chemin du dossier contenant les icônes
const iconsDir = path.resolve("dist/icons");
const outputFile = path.resolve("src/index.js");

// Lister les fichiers dans le dossier des icônes
const files = fs.readdirSync(iconsDir).filter((file) => file.endsWith(".js"));

// Générer des exports dynamiques
const exports = files
  .map((file) => {
    const name = path.basename(file, ".js"); // Retirer l'extension
    return `export { default as ${name}Icon } from './icons/${name}';`;
  })
  .join("\n");

// Écrire dans `index.js`
fs.writeFileSync(outputFile, exports);
console.log(`Index généré avec succès dans ${outputFile}`);
