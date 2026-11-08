# Vérification de la refonte mobile — 8 novembre 2026

## Contrôles de code réalisés
- L'interface JavaScript de l'application passe le test de syntaxe.
- Simulation du rendu des 9 états suivants avec données du dépôt : accueil, choix des univers, Collège, Lycée, CAP, BTS, Seconde GT, CAP AEPE et fin BTS SP3S : aucune erreur JavaScript dans ces états.
- Le choix des univers comporte 4 cartes : Collège, Lycée, CAP, BTS.
- Les sous-écrans présentent 4 choix Lycée, 1 CAP, 2 BTS.
- Le code conserve les routes photographiques, le préchargement, les liens directs, la progression sauvegardée et les dialogues.
- Le logo optimisé figure dans l'arborescence Git du dépôt ; le CSS supplémentaire et le code d'accueil sont publiés sur la branche principale.
- Les couleurs de référence sont présentes dans les sources.

## À tester impérativement sur de vrais téléphones
- iPhone SE et iPhone récent : Safari, hauteur d'écran courte, encoche, clavier/accessibilité, retour navigateur.
- Android : Chrome, rotation, chargement images, bascule entre formations.
- Débit mobile faible ou absence de réseau : échec photo et bouton Réessayer.
- Parcours complets : retour, sommaire, saut d'une vue, détails, reprise et fin.
- Contraste du texte sur les différentes photos de cartes et la couverture réelle.
- Vérifier sur place que les circuits et photographies correspondent aux bâtiments.
- Valider les droits de la vidéo et les éventuelles autorisations à l'image avant l'import d'un extrait.

L'application **n'a pas été testée ici dans un navigateur graphique réel** ; les contrôles ci-dessus sont des validations statiques et simulations des états de rendu. La référence `VERIFICATIONS.md` documente des vérifications Chrome sur la version précédente, qui ne remplacent pas les nouveaux tests.
