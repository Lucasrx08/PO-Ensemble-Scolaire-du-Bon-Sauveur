# Conception de la refonte mobile — 7 novembre 2026

## Audit initial

Le dépôt est un site statique : HTML, CSS et JavaScript sans dépendances. Sept circuits actifs, 116 scènes réutilisées et 61 photographies WebP, pour 286 passages. Tous les fichiers photo se trouvent à la racine ; les chemins ont été réparés dans la version précédente. Les photos et les séquences proviennent de la cartographie Genially existante. Aucun fichier de fonte et aucun itinéraire collège ne sont présents. Les noms de salles et les informations contextuelles vérifiées ne sont pas fournis par la majorité des scènes.

À conserver : photographies, listes ordonnées propres à chaque formation, coordonnées des repères, préchargement des vues, sauvegarde locale et accès direct.

À remplacer : accueil typographique surdimensionné, sélection répétitive par cartes, visite recadrée en couverture, navigation peu explicite et documentation de livraison devenue obsolète.

## Système visuel

Application en une colonne, limitée à 480 px sur un écran large, sans variante desktop. Fond blanc cassé, texte anthracite, bleu institutionnel. Les roses officiels identifient le lycée/CAP et les BTS. Les petits textes gardent une teinte anthracite ; les roses clairs ne portent pas seuls une information. Zones tactiles au moins 44 × 44 px pour les contrôles visibles vérifiés.

Accueil éditorial avec photographie réelle, titre court, institution clairement identifiée et action de départ. Univers présentés en lignes avec petite photographie et repère de couleur. Présentation de chaque formation avant son circuit. Les fichiers officiels Balloon Extra Bold et Heading Now restent à fournir ; l'intégration est préparée sans requête vers un faux fichier de police.

## Visite

La photographie s'affiche en entier (`object-fit: contain`) dans l'espace disponible. La position des repères dépend des dimensions naturelles de l'image et de son rectangle réellement affiché. Pas de zoom artificiel, pas de panorama simulé. Le retour, le changement de parcours, les informations et la progression restent disponibles dans des zones dédiées, hors de la photographie. Le préchargement porte sur les deux images suivantes, sans téléchargement initial de toute la visite.

Le panneau inférieur réunit les informations de formation et les autres vues de la même séquence source. Les données peuvent recevoir des titres, descriptions, points d'intérêt, photographies complémentaires et cibles d'exploration. Aucun de ces contenus locaux n'est inventé dans la livraison. Les données de test de point d'intérêt sont isolées de la version publiée.

## Navigation et résilience

Les fragments d'URL expriment l'accueil, l'univers, la formation, le circuit et la fin. Le navigateur peut revenir aux écrans précédents. Les numéros de vue sont propres à la route sélectionnée ; les vues partagées ne changent pas de formation au retour.

Le stockage existant `bs-visite-v1` est conservé et validé à la lecture. Une image ne valide une nouvelle progression qu'après chargement. Les transitions vers un autre écran invalident les chargements en cours pour éviter une mise à jour tardive du mauvais écran. Échec de chargement : réessayer ou revenir au choix des formations ; aucune avance vers une photo non chargée. Un délai limite le blocage sur un chargement sans réponse.

Une transition courte d'opacité accompagne les photos. Les préférences de réduction des animations sont respectées. Les panneaux utilisent un dialogue natif, avec titre accessible, fermeture et retour du focus.

## Compléments indispensables à la fidélité finale

- Fichiers officiels des typographies, avec les graisses nécessaires.
- Parcours collège réel et ses photographies.
- Noms des espaces et descriptions validés par l'établissement.
- Éventuels équipements à annoter et destinations des embranchements.
- Canal de contact public vérifié si un accès contact doit être ajouté.

Aucun formulaire factice ou contact supposé n'est publié.
