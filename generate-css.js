import fs from "fs";
import path from "path";

const iconsDir = "src/icons"; // Chemin vers tes icônes SVG
const cssFile = "dist/icons.css"; // Fichier CSS généré
const files = fs.readdirSync(iconsDir).filter((file) => file.endsWith(".svg"));

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
console.log("CSS généré avec succès !");
