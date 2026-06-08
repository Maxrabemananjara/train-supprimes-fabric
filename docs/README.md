# Documentation

Ce dossier rassemble les notes de cadrage du projet.

## Contenu

- `ARCHITECTURE.md` : organisation Bronze / Silver / Gold et flux de publication.
- `../pipeline/SOURCES.md` : source data.gouv, colonnes attendues et règles de lecture.
- `../fabric/LAKEHOUSE.md` : structure Lakehouse côté Microsoft Fabric.
- `../pipeline/README.md` : scripts de traitement et mode de relance.
- `../site/README.md` : rôle du site public et du fichier JSON publié.

## Principes retenus

La documentation privilégie une lecture directe :

- source utilisée ;
- transformations réalisées ;
- contrôles appliqués ;
- sortie publiée ;
- limites connues.

L'objectif est de pouvoir comprendre rapidement le parcours de la donnée, depuis le fichier CSV public jusqu'au dashboard.
