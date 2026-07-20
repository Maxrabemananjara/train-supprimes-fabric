# Documentation

Ce dossier rassemble les notes de cadrage du projet.

## Contenu

- `ARCHITECTURE.md` : organisation Bronze / Silver / Gold dans Microsoft Fabric et flux de publication.
- `../pipeline/SOURCES.md` : source data.gouv, colonnes attendues et règles de lecture.
- `../fabric/LAKEHOUSE.md` : structure Lakehouse côté Microsoft Fabric.
- `../pipeline/README.md` : traitements réalisés dans Fabric et publication de l'export Gold.
- `../site/README.md` : rôle du site public et du fichier JSON publié.

## Principes retenus

La documentation privilégie une lecture directe :

- source utilisée ;
- transformations réalisées dans Microsoft Fabric ;
- contrôles appliqués dans les couches Bronze et Silver ;
- modèle et export produits dans Gold ;
- publication par GitHub Actions et GitHub Pages ;
- limites connues.

L'objectif est de pouvoir comprendre rapidement le parcours unique de la donnée, depuis data.gouv jusqu'au dashboard public, en passant par Microsoft Fabric et OneLake.
