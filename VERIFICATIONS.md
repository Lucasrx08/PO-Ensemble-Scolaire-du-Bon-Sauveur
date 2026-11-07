# Vérifications — refonte mobile du 7 novembre 2026

## Contrôles réalisés

- Syntaxe JavaScript du moteur et de la configuration : valide.
- Sept listes de circuits conservées, 286 références de scènes, aucune référence manquante.
- Correspondance des 61 chemins photo avec les fichiers du dépôt.
- Navigation intégrale dans un navigateur Chrome de contrôle, image chargée avant chaque avance : CAP AEPE 35 vues, ASSP 38, ECP 41, seconde GT 47, ST2S 46, BTS Tourisme 39, BTS SP3S 40. Les sept écrans de fin sont atteints.
- Affichage observé dans des cadres de 320 × 568, 375 × 667, 390 × 844 et 430 × 932. Contrôles des dimensions sur les écrans testés : aucun débordement horizontal, aucune image cassée, aucun bouton visible de moins de 44 px dans une dimension.
- Informations contextuelles, vues apparentées, sommaire et saut à la vue 13 du BTS SP3S : vérifiés.
- Retour de la vue 13 à la vue 12 sans changement de circuit : vérifié.
- Retour à la dernière photo depuis la fin, puis à la photo précédente : vérifié sur CAP.
- Reprise de BTS SP3S à la vue 12 depuis l'accueil, y compris après rechargement : vérifiée.
- Passage entre les univers, écran collège à venir, sélection et introduction du BTS : vérifiés.
- Image volontairement manquante sur une page locale de test : message d'erreur, bouton Réessayer et retour fonctionnel aux formations. Ces fichiers de test ne sont pas publiés.
- Point d'intérêt sur une page locale de test : ouverture du panneau puis navigation vers la vue cible 2. Aucun contenu fictif de ce test n'est publié.

## Limites

Le navigateur de contrôle utilise Chrome, avec des dimensions de smartphone dans un cadre ; ce ne sont pas des essais sur iPhone/Safari et Android physiques. Les zones de sécurité utilisent les variables CSS iOS, mais leur comportement doit être confirmé sur appareil. Les directions, lieux et photographies doivent être validés dans l'établissement.

Les polices officielles sont absentes et ne sont donc pas affichées. Aucun circuit collège ou contenu pédagogique local non vérifié n'est créé. Le mode hors connexion complet n'est pas inclus.
