import { readFile, writeFile } from "fs/promises";
import { basename } from "path";

// Configuration
const cssFilePath = "dist/icons/icons.css"; // Remplacez par le chemin de votre fichier CSS
const dartFilePath = "dist/magis.dart"; // Remplacez par le chemin de sortie
const fontFamily = "magis"; // Nom de la famille de polices définie dans pubspec.yaml

async function generateDartIcons() {
  try {
    // Lire le fichier CSS
    const data = await readFile(cssFilePath, "utf8");

    // Afficher un extrait pour vérifier le contenu
    console.log("Contenu du fichier CSS (extrait) :", data.slice(0, 500));

    // Regex pour extraire les noms et les codes Unicode des icônes
    const regex =
      /\.magis-([\w-]+):before\s*{\s*content:\s*"\\(f[0-9a-f]+)";\s*}/g;
    let match;
    const icons = [];

    while ((match = regex.exec(data)) !== null) {
      icons.push({
        name: match[1].replace(/-/g, "_"), // Remplacez les traits d'union par des underscores pour respecter la convention Dart
        code: match[2], // Code Unicode
      });
    }

    if (icons.length === 0) {
      console.error(
        "Aucune icône trouvée. Vérifiez le format du fichier CSS et le regex."
      );
      return;
    }

    // Contenu du fichier Dart
    const dartContent = `
// GENERATED CODE - DO NOT MODIFY BY HAND
// This file is auto-generated from ${basename(cssFilePath)}

// Importation nécessaire pour les icônes Flutter
import 'package:flutter/widgets.dart';

class MagisIcons {
${icons
  .map(
    (icon) =>
      `  static const IconData ${icon.name} = IconData(0x${icon.code}, fontFamily: '${fontFamily}');`
  )
  .join("\n")}
}
`;

    // Écrire le fichier Dart
    await writeFile(dartFilePath, dartContent.trim(), "utf8");
    console.log(`Fichier Dart généré avec succès : ${dartFilePath}`);
  } catch (err) {
    console.error("Erreur lors de la génération de la classe Dart:", err);
  }
}

// Exécuter la fonction
generateDartIcons();
