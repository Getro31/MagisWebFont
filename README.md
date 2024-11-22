# Name

Web Font

# Author

Magis

## Installation

### Pour JavaScript (ex. : Angular)
Installez via npm :

```bash
npm install my-icon-package
```


# 📖 Usage

Following expample in angular.json:

```
{
    "build": [
        "styles": {
            "node_modules/webfontmagis/dist/icons/icons.css"
        }
    ]
}
```
### Pour Flutter (ex. : React)

## Installation des icônes

Pour installer les icônes et les fichiers Dart nécessaires à l'utilisation de ce package, exécutez le script d'installation :

1. Téléchargez les fichiers :
   ```bash
   ./scripts/install_icons.sh
    ```
2. Vous pouvez utiliser Dart pour telecharger les fichiers
    ```
    flutter run scripts/install_icons.dart
    ```

    ### Exemple :
    ```
    import 'dart:io';
    import 'package:http/http.dart' as http;
    import 'dart:convert';

    Future<void> downloadFiles() async {
      // URL des fichiers sur GitHub (ou un autre service)
      const ttfUrl = 'https://github.com/Getro31/MagisWebFont/dist/icons/icons.ttf';
      const dartUrl = 'https://github.com/Getro31/MagisWebFont/dist/magis_icons.dart';

      // Téléchargement des fichiers
      final ttfResponse = await http.get(Uri.parse(ttfUrl));
      final dartResponse = await http.get(Uri.parse(dartUrl));

      // Vérifiez si les requêtes sont réussies
      if (ttfResponse.statusCode == 200 && dartResponse.statusCode == 200) {
        // Enregistrez les fichiers dans le projet Flutter
        final ttfFile = File('./assets/fonts/icons.ttf');
        await ttfFile.writeAsBytes(ttfResponse.bodyBytes);

        final dartFile = File('./lib/icons/magis_icons.dart');
        await dartFile.writeAsString(dartResponse.body);

        print('Fichiers téléchargés et enregistrés avec succès.');
      } else {
        print('Échec du téléchargement des fichiers.');
      }
    }

    void main() {
      downloadFiles();
    }
    ```

    ## Usage

    Configurez votre pubspec.yaml
    ```
    flutter:
        assets:
            - assets/fonts/icons.ttf

    fonts:
      - family: icons
        fonts:
          - asset: assets/fonts/icons.ttf

    ```



# Visit

[Home Page](icons.html)

# Licence

MIT License

Copyright (c) 2024 Magis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


---

### **Conclusion**

Ce processus vous permet de maintenir un package Node.js avec des fichiers d'icônes, tout en automatisant leur intégration dans un projet Flutter. Vous pouvez soit utiliser un script Bash pour cloner un dépôt Git, soit utiliser un script Dart pour télécharger directement les fichiers nécessaires depuis un serveur ou un dépôt GitHub.

Cela permet à votre package de rester accessible et réutilisable à la fois dans des projets JavaScript (via npm) et Flutter, avec un minimum d'effort d'intégration pour l'utilisateur final.

Si vous avez besoin de plus de détails ou d'aide supplémentaire, n'hésitez pas à me le faire savoir ! 😊
