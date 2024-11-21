import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import svg2ttf from "svg2ttf";
import { SVGIcons2SVGFontStream } from "svgicons2svgfont";
import ttf2woff from "ttf2woff";
import ttf2woff2 from "ttf2woff2";

// Récupérer le chemin du fichier actuel
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Répertoires et fichiers
const iconsDir = path.join(__dirname, "optimized_svgs"); // Répertoire contenant les SVG
const outputDir = path.join(__dirname, "dist"); // Répertoire de sortie
const fontName = "myIconFont"; // Nom de la police

// Crée un répertoire de sortie si inexistant
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

// Générateur de CSS
let cssContent = `@font-face {
  font-family: '${fontName}';
  src: url('${fontName}.woff2') format('woff2'),
       url('${fontName}.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

[class^="icon-"], [class*=" icon-"] {
  font-family: '${fontName}' !important;
  font-style: normal;
  font-weight: normal;
  speak: none;
  display: inline-block;
  text-decoration: none;
  text-align: center;
  vertical-align: middle;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`;

// Étape 1 : Générer un fichier SVG de police
const svgFontStream = new SVGIcons2SVGFontStream({
  fontName: fontName,
  normalize: true,
  fontHeight: 1000,
});

const svgFontPath = path.join(outputDir, `${fontName}.svg`);
const writeStream = fs.createWriteStream(svgFontPath);

svgFontStream.pipe(writeStream).on("finish", () => {
  console.log("SVG font file generated successfully!");

  // Étape 2 : Convertir SVG en TTF
  const ttfPath = path.join(outputDir, `${fontName}.ttf`);
  const ttfBuffer = Buffer.from(
    svg2ttf(fs.readFileSync(svgFontPath, "utf8"), {}).buffer
  );
  fs.writeFileSync(ttfPath, ttfBuffer);

  console.log("TTF font file generated successfully!");

  // Étape 3 : Convertir TTF en WOFF
  const woffPath = path.join(outputDir, `${fontName}.woff`);
  const woffBuffer = ttf2woff(ttfBuffer);
  fs.writeFileSync(woffPath, woffBuffer);

  console.log("WOFF font file generated successfully!");

  // Étape 4 : Convertir TTF en WOFF2
  const woff2Path = path.join(outputDir, `${fontName}.woff2`);
  const woff2Buffer = ttf2woff2(ttfBuffer);
  fs.writeFileSync(woff2Path, woff2Buffer);

  console.log("WOFF2 font file generated successfully!");

  // Étape 5 : Générer le fichier CSS
  const cssPath = path.join(outputDir, `${fontName}.css`);
  fs.writeFileSync(cssPath, cssContent);

  console.log("CSS file generated successfully!");
});

// Ajouter chaque fichier SVG au flux
let unicodeStart = 0xe001; // Code unicode de départ pour les icônes
fs.readdirSync(iconsDir).forEach((file) => {
  if (path.extname(file) === ".svg") {
    const glyph = fs.createReadStream(path.join(iconsDir, file));
    const iconName = path.basename(file, ".svg");
    const unicode = String.fromCharCode(unicodeStart++);

    glyph.metadata = { unicode: [unicode], name: iconName };
    svgFontStream.write(glyph);

    // Ajouter une classe au CSS
    cssContent += `
.icon-${iconName}::before {
  content: '${unicode}';
}
`;
  }
});

// Terminer le flux
svgFontStream.end();
