# Trains supprimés Fabric

[Dashboard public](https://maxrabemananjara.github.io/train-supprimes-fabric/)

Ce dépôt présente une chaîne data complète autour du jeu public data.gouv `Liste des trains SNCF supprimés`.

Le projet couvre l'ingestion, le contrôle, la modélisation et la publication d'un tableau de bord métier accessible en ligne. L'ensemble suit une logique médaillon Bronze / Silver / Gold dans Microsoft Fabric et produit un site statique publié avec GitHub Pages.

## Objectif

Transformer des fichiers CSV quotidiens en indicateurs lisibles :

- volume de trains supprimés ;
- évolution sur la période sélectionnée ;
- gares les plus touchées ;
- liaisons les plus concernées ;
- répartition par type de train ;
- répartition par tranche horaire ;
- date de contrôle de la donnée publiée.

## Fonctionnement

```text
data.gouv
  → Microsoft Fabric / OneLake
  → Bronze : données sources et métadonnées
  → Silver : données nettoyées et contrôlées
  → Gold : faits, dimensions, indicateurs et dashboard.json
  → GitHub Actions : récupération de l'export Gold
  → GitHub Pages : dashboard public
```

Microsoft Fabric réalise l’ingestion, les contrôles qualité, les transformations Silver et la modélisation Gold dans OneLake. GitHub Actions récupère ensuite l’export `dashboard.json` produit dans la couche Gold, le copie dans le dossier du site et publie le dashboard avec GitHub Pages.

Le site lit le fichier `site/data/dashboard.json`. Ce fichier contient les métadonnées de mise à jour, les dimensions, la table de faits et les agrégats utilisés par l'interface.

## Mise à jour

La publication est automatisée avec GitHub Actions.

La couche de publication GitHub Actions :

- s'authentifie auprès de OneLake ;
- récupère le fichier `dashboard.json` produit dans la couche Gold ;
- copie cet export vers `site/data/dashboard.json` ;
- publie le dossier `site/` avec GitHub Pages.

GitHub Actions n'effectue aucune transformation métier : l'ingestion, les contrôles et la construction du modèle Gold sont réalisés dans Microsoft Fabric.

Le bouton `Rafraîchir les données` du dashboard ne relance pas le traitement. Il recharge simplement la dernière version publiée par GitHub Pages, ce qui évite les problèmes de cache côté navigateur.

## Structure du dépôt

```text
.github/workflows/  Automatisation de la publication
fabric/             Documentation Microsoft Fabric et Lakehouse
pipeline/           Documentation des règles de traitement
site/               Dashboard statique publié avec GitHub Pages
docs/               Documentation projet
data-samples/       Exemples légers non sensibles
```

## Lecture des dossiers

- `fabric/` décrit l'ingestion, les couches Bronze / Silver / Gold et l'export produit dans OneLake.
- `pipeline/` documente les règles métier, les contrôles et la modélisation réalisés dans Fabric.
- `site/` contient l'application web, le style et la copie publiée de l'export Gold.
- `docs/` reprend l'architecture et les principes de qualité.

## État du projet

Le dashboard est publié et alimenté par l'export Gold produit dans Microsoft Fabric. Le dépôt conserve une organisation claire pour montrer à la fois le résultat métier et la logique data engineering qui l'alimente.
