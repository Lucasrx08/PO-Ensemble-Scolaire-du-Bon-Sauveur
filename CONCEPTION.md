# La visite photo des portes ouvertes

## Intention

Permettre à l’élève et à sa famille de choisir une formation puis de suivre son circuit propre dans l’établissement, à travers les photos déjà préparées dans Genially. L’application accompagne la visite physique et peut également être consultée à distance.

Principe de navigation : un clic conduit à une nouvelle vue utile. Aucune vue intermédiaire créée par zoom, aucun écran obligatoire ajouté entre deux photos. Les déplacements restent ceux d’une visite photo ; aucun panorama à 360° ni déplacement en trois dimensions n’est simulé.

## Les écrans

| Écran | Contenu et action |
|---|---|
| Accueil | « Votre visite commence ici », présentation courte, Choisir mon circuit, reprise éventuelle. |
| Menu | CAP, Bac professionnel, Général et technologique, BTS. |
| Formations | Deux choix pour les familles qui en contiennent deux. CAP ouvre directement le circuit AEPE. |
| Visite | Photo, formation choisie, repère de déplacement si disponible, Retour, progression, Continuer, menu et aide. |
| Vues | Vignettes numérotées pour retrouver une vue sans recommencer. |
| Fin | Merci, autre circuit, revoir le circuit et retour à la dernière photo. |

La présentation générale reste à l’accueil. Les résumés de formations sont présents sur les cartes de choix ; aucune page de lancement supplémentaire n’est nécessaire.

## Circuits

Le relevé provient des 125 pages et des liens de navigation publiés dans le Genially. Le décompte ci-dessous correspond aux photos parcourues, et non aux salles ou aux étapes pédagogiques. La page de fin du Genially est remplacée par un écran de fin propre à l’application.

| Famille | Circuit | Vues dans l’application | Partie propre au circuit | Jonction avec la partie commune |
|---|---|---:|---|---|
| CAP | CAP AEPE | 35 | pages 103 à 109, puis 111 et 112 | page 28 |
| Bac professionnel | Bac pro ASSP | 38 | pages 90 à 99, puis 101 et 102 | page 28 |
| Bac professionnel | Bac pro ECP | 41 | pages 113 à 125 | page 26 |
| Général et technologique | Seconde GT | 47 | pages 7 à 25 | page 26 |
| Général et technologique | Bac ST2S | 46 | pages 55 à 66 | page 20 |
| BTS | BTS Tourisme | 39 | pages 79 à 89 | page 26 |
| BTS | BTS SP3S | 40 | pages 67 à 78 | page 26 |

Les pages 20 à 53 forment des portions partagées, selon le point de jonction. Les pages 48 à 53 sont nommées « Vers la sortie » dans la source. La page 54 clôt la visite source. La liste intégrale, vue par vue et circuit par circuit, figure dans CARTOGRAPHIE.md et cartographie.json.

Un lieu peut être partagé entre plusieurs filières, mais sa place dans le parcours et son prédécesseur dépendent du circuit. Les photos ne sont stockées qu’une fois lorsque leur source est identique. Le contenu livré comporte 116 vues actives et 61 fichiers photo uniques.

## Navigation

### Avancer

Le repère existant est repris au même emplacement relatif sur la photo de référence. Le bouton Continuer donne la même action : il garantit l’accès à la suite lorsque le repère est recadré hors écran, absent ou peu visible. Ce sont deux accès à la même action, pas deux clics successifs.

### Revenir

Retour utilise la liste ordonnée du circuit choisi. Il ne suit pas aveuglément les liens retour de Genially : certains renvoient vers une autre branche. À la première vue, Retour mène au choix de la formation.

### Changer de circuit

Le menu reste accessible. La progression est enregistrée séparément pour chaque circuit sur l’appareil. L’élève peut donc visiter une formation puis une autre. Le stockage n’identifie personne : aucun nom ni adresse électronique n’est demandé.

### Se repérer

La progression affiche un numéro de photo sur le total. La liste de vignettes est un sommaire visuel ; elle n’est pas présentée comme un plan de l’établissement. Un vrai plan n’est pas inclus faute de plan fourni et validé.

## Présentation

- Téléphone vertical prioritaire ; tablette et ordinateur également utilisables.
- Photos au premier plan ; interface sobre, avec une touche rose issue du lycée dans le Genially.
- Titres courts : Choisir mon circuit, Votre circuit, Merci de votre visite.
- Absence de zoom automatique et de mouvement permanent.
- Repères tactiles d’au moins 44 pixels et boutons accessibles au clavier.
- Photos recadrées pour remplir le cadre de visite ; la position des repères est calculée à partir du cadre source 360 × 640. Si un repère ne tient pas dans la zone utile, le bouton Continuer reste disponible.
- L’aide s’ouvre à la demande, sans interrompre la navigation.

## Technique

L’application est statique : HTML, CSS, JavaScript et photos. Elle fonctionne sur GitHub Pages, sans serveur applicatif, compte visiteur ni base de données. Aucun script Genially, suivi de visite ou dépendance à une police distante n’est embarqué.

Les deux photos suivantes sont préchargées pour rendre la navigation plus réactive. L’ensemble des 61 photos n’est pas téléchargé au démarrage. Le menu des vignettes utilise le chargement différé. Une erreur de chargement affiche une possibilité de réessayer.

La reprise repose sur localStorage. Si le navigateur bloque ce stockage, la visite reste utilisable sans reprise persistante. L’application ne conserve pas de données côté établissement.

## Points à valider

1. Les photos et l’ordre de visite sont ceux du Genially fourni ; une vérification sur place reste nécessaire avant ouverture aux familles.
2. Les noms précis des salles et les indications d’étage ne sont pas renseignés artificiellement. Ils pourront être ajoutés après validation.
3. Les pages 100 (ASSP) et 110 (CAP) ne sont pas atteintes par l’avancement principal du Genially. Elles ne sont pas ajoutées arbitrairement aux circuits livrés. Déterminer si elles sont des doublons ou des vues oubliées.
4. Certains liens de retour sont incohérents : par exemple, la page 20 renvoie vers ST2S page 66, alors que la seconde GT arrive par la page 19. L’application corrige ce comportement en revenant à la vue précédente du circuit actif.
5. Plusieurs vues intérieures ne proposent qu’un bouton en bas à gauche dans la source, qui conduit néanmoins à la suite. Dans l’application, ce déplacement est présenté par Continuer plutôt que par un faux bouton Retour.
6. L’intitulé « Seconde GT » est repris de la structure source. Ne pas le présenter comme un circuit exhaustif de toutes les spécialités du bac général sans validation.
7. Le questionnaire de satisfaction, les coordonnées de contact et les fiches de formation pourront être reliés à l’écran final quand leurs liens définitifs seront fournis. Aucun lien n’est inventé dans cette version.

## Avant diffusion

Vérifier intégralement les sept circuits sur place, contrôler les repères sur iPhone et iPad, tester la connexion dans les bâtiments et confirmer l’absence de photos devenues obsolètes. La mise en ligne sur GitHub est décrite dans README.md. La présence de tous les liens et fichiers peut être vérifiée automatiquement ; la pertinence physique des directions doit être confirmée par l’établissement.
