# Bon Sauveur — visite mobile des portes ouvertes

Application statique pour smartphone, sans installation ni compte. Publication sur la branche `main` du dépôt `Lucasrx08/PO-Ensemble-Scolaire-du-Bon-Sauveur`, à la racine via GitHub Pages.

Adresse : https://lucasrx08.github.io/PO-Ensemble-Scolaire-du-Bon-Sauveur/

## Expérience

Accueil photographique → univers (Collège, Lycée, CAP, BTS) → formation → présentation du circuit → visite → conclusion. Le collège est explicitement indiqué à venir : aucun parcours collège n'est fourni par les données actuelles. Le lycée rassemble Seconde GT, ST2S, ASSP et ECP ; CAP AEPE et les deux BTS conservent leurs propres itinéraires.

La visite propose les photos entières, des repères d'avancement issus de la source, un bouton Continuer, le retour dans l'ordre du circuit, un sommaire de vignettes et un panneau d'informations avec les vues de la même séquence. Reprise enregistrée localement sur le même navigateur, si disponible. Les changements de formation et les liens directs fonctionnent par fragments d'URL.

## Fichiers

- `index.html` : point d'entrée et panneau modal accessible.
- `styles.css` : styles historiques et mise en page des parcours.
- `experience-2026.css` : nouvelle identité visuelle, écrans de découverte et adaptations tactiles.
- `app.js` : navigation, chargement des images, stockage et interactions.
- `parcours.js` : sept circuits, 116 scènes et 286 passages dans les itinéraires.
- `configuration.js` : couverture, polices officielles et éventuelle configuration des univers.
- 61 fichiers WebP à la racine du dépôt : conserver les chemins relatifs actuels.

Aucune dépendance, compilation ou ressource tierce nécessaire en production. Les images restent chargées à la demande ; les deux suivantes sont préchargées. Le cache applicatif de promesses est limité à six entrées. Le fonctionnement hors connexion complet n'est pas inclus.

## Identité graphique et expérience mobile — novembre 2026

La refonte visuelle se trouve dans `experience-2026.css`, chargé après `styles.css`. Elle améliore l'accueil photographique, le choix des univers, les cartes des formations, l'introduction aux parcours et la lisibilité des visites **sans remplacer le moteur de navigation ni modifier les données des circuits**.

Palette officielle :
- Bleu institutionnel commun `#0076ac`.
- Vert Collège `#91c219`.
- Rose Lycée et CAP `#c8559d`.
- Rose BTS `#d28db7`.

Le logo fourni par l'établissement est intégré sous `assets/logo-bon-sauveur.png` : copie réduite/optimisée pour l'affichage mobile, conservant ses couleurs et sa composition. Les grands titres utilisent la police libre Fredoka et les textes Barlow Condensed, déjà auto-hébergées. Ces polices sont des **substituts**, pas les typographies officielles Balloon Extra Bold et Heading Now 61–68, dont les fichiers ne sont pas encore fournis. Ne pas charger des polices depuis des sources non autorisées.

L'accueil est photographique par défaut. Si l'établissement dispose d'une courte vidéo MP4 optimisée dont les droits d'usage sont vérifiés, la déposer dans `assets/video/`, puis renseigner `VISIT_CONFIG.welcomeVideo` dans `configuration.js`. En l'absence de vidéo, la photographie existante assure un chargement rapide. **La vidéo Dailymotion ancienne n'est pas copiée ni embarquée.**

Le collège est mis en évidence en vert mais reste marqué « visite à venir » jusqu'à la fourniture de vraies photos et d'un itinéraire validé. Aucune visite de collège fictive n'est créée.

## Modifier le contenu

Chaque route contient `id`, `title`, `summary`, `scenes`. Les propriétés optionnelles `description` et `cover` permettent une présentation personnalisée. Les scènes sont partagées entre plusieurs circuits : leur ordre provient toujours de la route active.

Une scène accepte :

- `photo` : chemin relatif réel de l'image.
- `title` : nom de lieu validé par l'établissement.
- `description` : information courte validée.
- `sourceName` et `sourcePage` : traçabilité du relevé Genially.
- `nextPosition` : repère d'avancement `{x, y}` en pourcentage de la photo.
- `points` : liste optionnelle de points d'intérêt, chacun avec `title`, `text`, `position: {x, y}`, `photos` (liste optionnelle de chemins) et `target` (identifiant optionnel d'une scène du circuit courant).

Les points d'intérêt peuvent ouvrir du contenu complémentaire puis proposer un saut vers une autre scène du même circuit. Aucun détail sur un équipement ou une salle n'a été inventé pour remplir les panneaux. Par défaut, les informations reprennent le résumé de la formation ; « Vers la sortie » est conservé quand la source le fournit. La plupart des noms de salles et descriptions restent à renseigner.

Les univers peuvent être fournis dans `VISIT_CONFIG.universes` : liste d'objets `{id, title, subtitle, color, routes, photo}`. Sans cette propriété, les quatre univers actuels sont employés. Pour le collège, fournir d'abord un itinéraire réel et ses photos dans `parcours.js`, puis rattacher son identifiant à l'univers collège. Ne pas réutiliser arbitrairement un itinéraire lycée.

## Liens directs

- `#univers` : choix des univers.
- `#univers=bts` : choix des BTS.
- `#formation=bts-sp3s` : présentation de la formation.
- `#circuit=bts-sp3s` : reprise du circuit.
- `#circuit=bts-sp3s&vue=12` : vue 12 de ce circuit.

Les anciens liens `#circuit=...&vue=...` restent pris en charge. Une vue explicite prime sur la sauvegarde. Un numéro hors limites est borné. Les sauvegardes invalides sont ignorées.

## Validation et limites

Voir `VERIFICATIONS.md`. Les sept circuits ont été parcourus intégralement dans le navigateur de contrôle, dans des cadres aux dimensions de smartphones. Ces essais ne remplacent pas un contrôle sur iPhone/Safari et Android réels, ni la validation des directions et de l'actualité des photos sur place.

Source des photos et parcours : https://view.genially.com/697756e7cbdd7382a5884bc5

## Parcours guidés immersifs — mise à jour du 8 novembre 2026

La navigation privilégie désormais **l'orientation des familles à l'intérieur de l'établissement** : chaque parcours représente l'itinéraire d'une formation, pas une galerie de photographies. Les compteurs de vues sont masqués dans l'interface publique ; une barre visuelle indique l'avancement sans imposer de numérotation aux familles. Sur chaque photo, une balise bleu institutionnel « PAR ICI » est affichée à proximité des coordonnées du repère source, quand elles existent ; le bouton « Étape suivante » reste toujours disponible.

La visite utilise la photographie entière (`object-fit: contain`) et remplit les éventuelles marges par une version agrandie et floutée **de la même photographie**, sans modifier les fichiers des lieux. Les réglages CSS sont légers (luminosité, contraste et saturation). Il ne s'agit pas d'un panorama ni d'une direction de marche inventée : les coordonnées existantes sont préservées et seulement recentrées si nécessaire pour permettre l'interaction tactile.

L'accueil utilise désormais `assets/bienvenue-signal.svg`, une illustration vectorisée du lettrage **BIENVENUE** fourni sur l'affiche officielle de l'établissement. Ce n'est pas un remplacement des fichiers de polices Balloon Extra Bold / Heading Now, qui restent absents du dépôt. Les autres textes de l'application restent de vrais éléments HTML, lisibles et modifiables.

Cette mise à jour ajoute `guide-2026.css` (chargé après les deux feuilles de style existantes). Les sept itinéraires et les 61 photos du dépôt restent inchangés. Le parcours collège n'est pas inventé.
