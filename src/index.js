import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import svgo from "svgo";
import Fontmin from "fontmin";
import { generateIconClasses } from "./utils.js"; // Assurez-vous d'importer la fonction ici

// Résolution des chemins dans un module ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dossiers pour les fichiers générés
const svgFolder = path.join(__dirname, "../solid"); // Dossier source des SVG
const optimizedSvgFolder = path.join(__dirname, "../optimized_svgs"); // Dossier des SVG optimisés
const distFolder = path.join(__dirname, "../dist"); // Dossier pour les polices générées

// Fonction principale pour créer la police d'icônes
async function generateIconFont() {
  try {
    // Étape 1 : Optimiser tous les SVG
    const svgFiles = await optimizeSvgs();

    // Étape 2 : Convertir les SVG en police d'icônes
    await generateFont(svgFiles);

    // Étape 3 : Générer le fichier CSS avec les classes (en utilisant la fonction importée)
    generateIconClasses(svgFiles);

    console.log("Police d'icônes et fichiers générés avec succès !");
  } catch (err) {
    console.error("Erreur lors de la génération de la police d'icônes:", err);
  }
}

// Fonction pour optimiser tous les SVG dans le dossier
async function optimizeSvgs() {
  await fs.ensureDir(optimizedSvgFolder); // Crée le dossier des SVG optimisés s'il n'existe pas

  const files = await fs.readdir(svgFolder);
  const svgFiles = files.filter((file) => file.endsWith(".svg"));

  const optimizedSvgs = [];
  for (const file of svgFiles) {
    const filePath = path.join(svgFolder, file);
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

// Fonction pour générer la police d'icônes à partir des SVG optimisés
async function generateFont(svgFiles) {
  const fontmin = new Fontmin()
    .src(path.join(optimizedSvgFolder, "*.svg")) // Utilise uniquement les SVG optimisés
    .dest(distFolder) // Dossier de destination pour les fichiers de polices
    .use(Fontmin.otf2ttf()) // Convertit .otf en .ttf
    .use(Fontmin.ttf2woff()) // Convertit .ttf en .woff
    .use(Fontmin.ttf2eot()); // Convertit .ttf en .eot

  await new Promise((resolve, reject) => {
    fontmin.run((err, files) => {
      if (err) {
        reject(err);
      } else {
        console.log(`Polices générées :`);
        files.forEach((file) => console.log(file.path));
        resolve();
      }
    });
  });

  console.log(`Polices générées dans : ${distFolder}`);
}

generateIconFont();
