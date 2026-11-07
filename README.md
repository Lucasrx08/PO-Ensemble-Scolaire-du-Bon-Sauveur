# Bon Sauveur — visite mobile des portes ouvertes

Application statique pour smartphone, sans installation ni compte. Publication sur la branche `main` du dépôt `Lucasrx08/PO-Ensemble-Scolaire-du-Bon-Sauveur`, à la racine via GitHub Pages.

Adresse : https://lucasrx08.github.io/PO-Ensemble-Scolaire-du-Bon-Sauveur/

## Expérience

Accueil photographique → univers (Collège, Lycée, CAP, BTS) → formation → présentation du circuit → visite → conclusion. Le collège est explicitement indiqué à venir : aucun parcours collège n'est fourni par les données actuelles. Le lycée rassemble Seconde GT, ST2S, ASSP et ECP ; CAP AEPE et les deux BTS conservent leurs propres itinéraires.

La visite propose les photos entières, des repères d'avancement issus de la source, un bouton Continuer, le retour dans l'ordre du circuit, un sommaire de vignettes et un panneau d'informations avec les vues de la même séquence. Reprise enregistrée localement sur le même navigateur, si disponible. Les changements de formation et les liens directs fonctionnent par fragments d'URL.

## Fichiers

- `index.html` : point d'entrée et panneau modal accessible.
- `styles.css` : styles pour smartphone, zones de sécurité, animations réduites.
- `app.js` : navigation, chargement des images, stockage et interactions.
- `parcours.js` : sept circuits, 116 scènes et 286 passages dans les itinéraires.
- `configuration.js` : couverture, polices officielles et éventuelle configuration des univers.
- 61 fichiers WebP à la racine du dépôt : conserver les chemins relatifs actuels.

Aucune dépendance, compilation ou ressource tierce nécessaire en production. Les images restent chargées à la demande ; les deux suivantes sont préchargées. Le cache applicatif de promesses est limité à six entrées. Le fonctionnement hors connexion complet n'est pas inclus.

## Identité graphique et polices

Bleu établissement `#0076ac`, rose lycée/CAP `#c8559d`, rose BTS `#d28db7`. Les roses portent les surfaces et les repères graphiques ; les petits textes utilisent l'anthracite pour leur lisibilité.

Aucun fichier Balloon Extra Bold ou Heading Now n'était présent au moment de la refonte du 7 novembre 2026. La version emploie donc temporairement la police système. Elle ne prétend pas reproduire les typographies officielles.

Pour les intégrer : déposer les fichiers autorisés dans `assets/fonts/`, puis compléter `VISIT_CONFIG.fonts` dans `configuration.js` avec les chemins réels, le nom de famille et les graisses correspondant aux fichiers livrés. Le moteur charge les fontes avec FontFace et les ajoute au navigateur. Utiliser la famille `Balloon Extra Bold` pour les titres identitaires et `Heading Now` pour les textes. Ne pas renommer artificiellement une police générique. Aucun appel à des fichiers de fonte inexistants n'est émis lorsque `fonts` reste vide.

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
