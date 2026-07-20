# Microsoft Fabric

Ce dossier documente la partie Microsoft Fabric du projet.

Workspace :

```text
Projet_Trains_Supprimes_Fabric
```

Lakehouse :

```text
lh_trains_supprimes
```

## Rôle de Fabric

Microsoft Fabric est l'environnement de traitement du projet. Il réalise l'ingestion des données data.gouv, le stockage Bronze, les contrôles qualité et transformations Silver, la modélisation Gold ainsi que la production du fichier `dashboard.json` dans OneLake.

GitHub Actions intervient uniquement après ce traitement : il récupère l'export Gold, le copie vers `site/data/dashboard.json` et publie le dossier `site/` avec GitHub Pages.

## Organisation

```text
data.gouv
  → Microsoft Fabric / OneLake
  → Bronze : données sources et métadonnées
  → Silver : données nettoyées et contrôlées
  → Gold : faits, dimensions, indicateurs et dashboard.json
  → GitHub Actions : récupération de l'export Gold
  → GitHub Pages : dashboard public
```

La structure détaillée du Lakehouse est décrite dans `LAKEHOUSE.md`.
