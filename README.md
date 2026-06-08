# Trains supprimés Fabric

[Dashboard public](https://maxrabemananjara.github.io/train-supprimes-fabric/)

Ce dépôt présente une chaîne data complète autour du jeu public data.gouv `Liste des trains SNCF supprimés`.

Le projet couvre l'ingestion, le contrôle, la modélisation et la publication d'un tableau de bord métier accessible en ligne. L'ensemble suit une logique médaillon Bronze / Silver / Gold et produit un site statique publié avec GitHub Pages.

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
  -> Bronze : fichiers sources et métadonnées
  -> Silver : données nettoyées, contrôlées et dédoublonnées
  -> Gold   : modèle faits / dimensions et indicateurs
  -> GitHub Pages : tableau de bord public
```

Le site lit le fichier `site/data/dashboard.json`. Ce fichier contient les métadonnées de mise à jour, les dimensions, la table de faits et les agrégats utilisés par l'interface.

## Mise à jour

La mise à jour est automatisée avec GitHub Actions.

Le workflow `Actualiser les donnees` :

- interroge data.gouv ;
- détecte les nouveaux fichiers CSV disponibles ;
- ajoute les nouvelles données au modèle existant ;
- met à jour l'heure de contrôle même lorsqu'aucun nouveau fichier n'est publié ;
- enregistre le fichier `site/data/dashboard.json` si nécessaire ;
- publie le site.

Le workflow est planifié plusieurs fois par jour afin de rattraper les publications tardives de la source.

Le bouton `Rafraîchir les données` du dashboard ne relance pas la pipeline. Il recharge simplement la dernière version publiée par GitHub Pages, ce qui évite les problèmes de cache côté navigateur.

## Structure du dépôt

```text
.github/workflows/  Automatisation GitHub Actions
fabric/             Documentation Microsoft Fabric et Lakehouse
pipeline/           Scripts d'ingestion, contrôle et transformation
site/               Dashboard statique publié avec GitHub Pages
docs/               Documentation projet
data-samples/       Exemples légers non sensibles
```

## Lecture des dossiers

- `pipeline/` contient le traitement opérationnel depuis data.gouv jusqu'au JSON public.
- `site/` contient l'application web, le style et le fichier de données publié.
- `fabric/` décrit l'organisation attendue dans Microsoft Fabric.
- `docs/` reprend l'architecture et les principes de qualité.

## État du projet

Le dashboard est publié et alimenté automatiquement. Le dépôt conserve une organisation claire pour montrer à la fois le résultat métier et la logique data engineering qui l'alimente.
