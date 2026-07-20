# Architecture

Le projet suit une architecture médaillon simple dans Microsoft Fabric et OneLake : Bronze, Silver, Gold. Cette organisation permet de séparer la donnée source, la donnée contrôlée et la donnée prête à être consommée par le dashboard.

## Vue d'ensemble

```text
data.gouv
  → Microsoft Fabric / OneLake
  → Bronze : données sources et métadonnées
  → Silver : données nettoyées et contrôlées
  → Gold : faits, dimensions, indicateurs et dashboard.json
  → GitHub Actions : récupération de l'export Gold
  → GitHub Pages : dashboard public
```

Fabric porte le traitement de bout en bout jusqu'à la couche Gold. La partie GitHub commence une fois l'export prêt : elle copie le JSON dans le site et déclenche sa publication.

## Source

La source principale est le jeu public data.gouv `Liste des trains SNCF supprimés`.

Les fichiers sont publiés au format CSV. Microsoft Fabric les ingère à partir des métadonnées de l'API data.gouv, ce qui évite de dépendre d'un nom de fichier figé.

## Bronze

La couche Bronze correspond à la récupération et au stockage des données sources dans OneLake.

Elle conserve :

- les colonnes d'origine ;
- le titre de la ressource ;
- l'URL source ;
- la date de dernière modification ;
- le nom du fichier source.

Cette étape sert à garder une traçabilité claire avant tout nettoyage.

## Silver

La couche Silver contient les lignes nettoyées et contrôlées dans Microsoft Fabric.

Les principaux contrôles sont :

- présence des colonnes attendues ;
- dates de départ exploitables ;
- heures de départ et d'arrivée cohérentes ;
- gares de départ et d'arrivée renseignées ;
- type de train normalisé ;
- suppression des doublons exacts.

Les rejets sont comptabilisés dans le suivi qualité. Cela permet de distinguer un fichier réellement vide d'un fichier dont une partie des lignes n'a pas passé les contrôles.

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
- les agrégats nécessaires aux graphiques ;
- l'export `dashboard.json`.

La copie publique `site/data/dashboard.json` reprend ce modèle sous une forme directement exploitable par le site.

## Publication

GitHub Actions prend ensuite le relais pour télécharger l'export, le placer dans `site/data/dashboard.json` et publier le dossier `site/`. Le modèle n'est pas recalculé pendant ce passage.

Le dashboard ne contient pas de serveur applicatif. Toute la lecture se fait côté navigateur à partir du JSON publié.

## Points de vigilance

Le projet dépend du rythme de publication data.gouv et de la disponibilité de l'export Gold dans OneLake. Si aucun nouveau fichier source n'est publié, les volumes restent identiques. Les contrôles utilisés pour valider chaque couche sont regroupés dans `CONTROLES_QUALITE.md`.
