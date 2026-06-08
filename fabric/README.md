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

Fabric sert de socle technique pour organiser les données selon une architecture Bronze / Silver / Gold.

Le projet GitHub conserve la pipeline de publication du dashboard. Fabric apporte le cadre Lakehouse, les zones de données et la documentation technique attendue pour une exploitation data engineering.

## Organisation attendue

```text
bronze  Données sources et traçabilité
silver  Données contrôlées et nettoyées
gold    Faits, dimensions, indicateurs et suivi qualité
```

La structure détaillée du Lakehouse est décrite dans `LAKEHOUSE.md`.
