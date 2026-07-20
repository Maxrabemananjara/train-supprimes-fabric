# Documentation

Ce dossier rassemble les notes de cadrage du projet.

## Contenu

- `ARCHITECTURE.md` : organisation Bronze / Silver / Gold dans Microsoft Fabric et flux de publication.
- `CONTROLES_QUALITE.md` : grille de recette appliquée aux données et au dashboard.
- `../pipeline/SOURCES.md` : source data.gouv, colonnes attendues et règles de lecture.
- `../fabric/LAKEHOUSE.md` : structure Lakehouse côté Microsoft Fabric.
- `../pipeline/README.md` : traitements réalisés dans Fabric et publication de l'export Gold.
- `../site/README.md` : rôle du site public et du fichier JSON publié.

## Principes retenus

La documentation va volontairement à l'essentiel :

- source utilisée ;
- transformations réalisées dans Microsoft Fabric ;
- contrôles appliqués dans les couches Bronze et Silver ;
- modèle et export produits dans Gold ;
- publication par GitHub Actions et GitHub Pages ;
- limites connues.

L'objectif est de retrouver rapidement le parcours de la donnée, les contrôles importants et la sortie utilisée par le dashboard.
