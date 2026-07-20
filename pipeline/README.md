# Pipeline

Ce dossier documente les règles de traitement du projet. Le flux opérationnel est exécuté dans Microsoft Fabric et OneLake.

## Flux de traitement

```text
data.gouv
  → Microsoft Fabric / OneLake
  → Bronze : données sources et métadonnées
  → Silver : données nettoyées et contrôlées
  → Gold : faits, dimensions, indicateurs et dashboard.json
  → GitHub Actions : récupération de l'export Gold
  → GitHub Pages : dashboard public
```

## Traitements

Microsoft Fabric prend en charge :

- l'ingestion des ressources CSV et de leurs métadonnées dans Bronze ;
- les contrôles de schéma, le nettoyage et la déduplication dans Silver ;
- la construction des faits, dimensions, indicateurs et agrégats dans Gold ;
- la production du fichier `dashboard.json` dans la zone Gold de OneLake.

## Publication

GitHub Actions est limité à la publication :

- authentification auprès de OneLake ;
- récupération du fichier `dashboard.json` produit dans Gold ;
- copie vers `site/data/dashboard.json` ;
- publication du dossier `site/` avec GitHub Pages.

Aucune transformation métier, construction d'indicateur ou mise à jour du modèle Gold n'est réalisée dans GitHub Actions.
