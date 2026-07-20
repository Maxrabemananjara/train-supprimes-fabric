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

Microsoft Fabric est l'environnement de traitement du projet. Les fichiers data.gouv arrivent dans Bronze, passent par les contrôles Silver, puis alimentent le modèle Gold et son export `dashboard.json`.

La publication GitHub intervient après ce traitement. Elle ne reprend pas les règles métier déjà appliquées dans Fabric.

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

La structure détaillée du Lakehouse est décrite dans `LAKEHOUSE.md`. La grille de contrôle associée se trouve dans `../docs/CONTROLES_QUALITE.md`.
