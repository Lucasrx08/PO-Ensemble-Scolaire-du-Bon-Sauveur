# Portes ouvertes — Bon Sauveur

Application photo autonome, conçue en priorité pour les téléphones tenus verticalement. Elle reprend les sept circuits et les photos du Genially fourni par Lucas RIGAUX. Aucun compte ni service externe n’est nécessaire pour les visiteurs après publication sur GitHub Pages.

## Contenu livré

- Une présentation d’accueil et un menu par famille de formations.
- Sept circuits, avec leurs ordres de vues propres.
- 116 vues utilisées par les circuits, issues de 61 photos uniques stockées dans le dossier assets/photos.
- Repères d’avancement repris du Genially lorsqu’ils sont utilisables ; bouton Continuer accessible sur toutes les vues.
- Retour dans l’ordre du circuit sélectionné, accès aux vignettes, aide et changement de circuit.
- Reprise de la progression sur le même navigateur, si son stockage local est disponible.
- Écran de fin et possibilité de découvrir une autre filière.

Le dossier documentation contient la conception détaillée, la cartographie technique et les points restant à vérifier sur place. Les titres précis des salles ne sont pas inventés : la navigation indique « Vue 1 », « Vue 2 », etc. La visite utilise des photos fixes, sans zoom ni étape artificielle. Le fonctionnement hors connexion n’est pas garanti : aucun mode hors ligne complet n’est inclus.

## Mettre sur GitHub

1. Décompresser l’archive sur le Mac.
2. Dans GitHub, créer un dépôt nommé **Portes-Ouvertes**, avec un README. Le choisir public pour utiliser GitHub Pages avec un compte gratuit.
3. Ouvrir ce dépôt puis **Add file → Upload files**.
4. Glisser **le contenu du dossier portes-ouvertes-github**, en conservant les dossiers assets et documentation. Ne pas téléverser le ZIP ; ne pas ajouter le dossier parent autour de index.html.
5. Cliquer sur **Commit changes**.
6. Aller dans **Settings → Pages**.
7. Dans **Build and deployment → Source**, sélectionner **Deploy from a branch**.
8. Choisir la branche **main** et le dossier **/(root)**, puis **Save**.
9. Attendre la fin du déploiement, puis utiliser le lien **Visit site** affiché par GitHub Pages.

À la racine du dépôt, il faut voir index.html, styles.css, app.js, parcours.js, assets/, documentation/ et README.md. Le fichier .nojekyll fourni est facultatif pour cette structure mais peut aussi être ajouté. Aucun terminal, npm ou compilation n’est nécessaire.

Le nom Portes-Ouvertes est une proposition : aucun dépôt GitHub n’a été créé dans cette livraison. Copier le lien réellement affiché par GitHub Pages pour le QR code, sans déduire l’adresse à partir du nom du dépôt.

Pour les prochains changements, téléverser les fichiers modifiés au même endroit puis valider un nouveau commit. GitHub Pages republiera le site. Le déploiement peut prendre jusqu’à dix minutes.

## Vérifier après publication

- Tester sur un iPhone et un iPad, en portrait et en paysage.
- Pour chaque formation, aller jusqu’à la fin et revenir sur quelques vues.
- Vérifier sur place que les repères désignent bien les portes et les directions attendues.
- Fermer et rouvrir la page pour vérifier la reprise.
- Tester avec la connexion mobile disponible dans l’établissement.
- Vérifier que le premier écran apparaît à l’adresse principale.

## Modifier les circuits

parcours.js contient toutes les données. Chaque circuit possède une liste ordonnée scenes ; chaque identifiant correspond à une photo et, éventuellement, à un repère nextPosition en pourcentage du cadre vertical de référence 360 × 640. Le moteur utilise des chemins de fichiers relatifs, compatibles avec un site de projet GitHub Pages.

Pour ajouter une photo, la copier dans assets/photos puis renseigner son chemin dans parcours.js. Pour changer l’ordre d’un circuit, modifier sa liste scenes. Ne pas modifier une vue partagée sans contrôler les circuits qui l’utilisent. La cartographie dans documentation/cartographie.json est une copie de travail destinée à l’analyse ; le navigateur lit parcours.js.

Si la structure des circuits change fortement entre deux éditions, modifier la clé de stockage bs-visite-v1 dans app.js pour éviter de reprendre un ancien numéro de vue.

## Accès direct à un circuit

Ajouter à l’adresse publiée un fragment de ce type :

`#circuit=cap-aepe`

Pour ouvrir une vue précise :

`#circuit=cap-aepe&vue=3`

La vue est numérotée dans le circuit sélectionné, à partir de 1. Les identifiants disponibles sont cap-aepe, bac-assp, bac-ecp, seconde-gt, st2s, bts-tourisme et bts-sp3s. Un fragment pointant une vue précise prend le pas sur la progression enregistrée. Un lien de circuit seul reprend la visite en cours sur le navigateur, s’il en existe une.

## Sources

Genially source : https://view.genially.com/697756e7cbdd7382a5884bc5

Documentation GitHub vérifiée le 7 novembre 2026 :
- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

Version de travail : 7 novembre 2026. Les visuels proviennent du Genially fourni pour ce projet. Leur présence dans cette archive ne vaut pas licence de réutilisation par des tiers.
