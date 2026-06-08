# Architecture

Le projet suit une architecture médaillon simple : Bronze, Silver, Gold. Cette organisation permet de séparer la donnée source, la donnée contrôlée et la donnée prête à être consommée par le dashboard.

## Vue d'ensemble

```text
data.gouv
  -> Ingestion Bronze
  -> Nettoyage Silver
  -> Modèle Gold
  -> Export dashboard.json
  -> Publication GitHub Pages
```

## Source

La source principale est le jeu public data.gouv `Liste des trains SNCF supprimés`.

Les fichiers sont publiés au format CSV. Chaque ressource est lue à partir des métadonnées de l'API data.gouv, ce qui évite de dépendre d'un nom de fichier figé.

## Bronze

La couche Bronze correspond à la récupération des données sources.

Elle conserve :

- les colonnes d'origine ;
- le titre de la ressource ;
- l'URL source ;
- la date de dernière modification ;
- le nom du fichier source.

Cette étape sert à garder une traçabilité claire avant tout nettoyage.

## Silver

La couche Silver contient les lignes nettoyées et contrôlées.

Les principaux contrôles sont :

- présence des colonnes attendues ;
- dates de départ exploitables ;
- heures de départ et d'arrivée cohérentes ;
- gares de départ et d'arrivée renseignées ;
- type de train normalisé ;
- suppression des doublons exacts.

Les rejets sont comptabilisés afin d'alimenter le suivi qualité.

## Gold

La couche Gold prépare les données pour l'usage métier.

Elle produit :

- une table de faits des suppressions ;
- une dimension date ;
- une dimension gare ;
- une dimension liaison ;
- une dimension type de train ;
- une dimension tranche horaire ;
- des indicateurs de synthèse ;
- les agrégats nécessaires aux graphiques.

Le fichier public `site/data/dashboard.json` reprend ce modèle sous une forme directement exploitable par le site.

## Publication

GitHub Actions exécute la pipeline, met à jour le fichier public si besoin, puis publie le dossier `site/` avec GitHub Pages.

Le dashboard ne contient pas de serveur applicatif. Toute la lecture se fait côté navigateur à partir du JSON publié.

## Points de vigilance

Le projet dépend du rythme de publication data.gouv. Si aucun nouveau fichier n'est publié, les volumes restent identiques, mais la date de contrôle quotidienne est tout de même actualisée.
