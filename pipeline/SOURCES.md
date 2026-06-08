# Sources

## Jeu de données principal

Source : data.gouv

Jeu de données : `Liste des trains SNCF supprimés`

API :

```text
https://www.data.gouv.fr/api/1/datasets/liste-des-trains-sncf-supprimes/
```

Le jeu de données publie des fichiers CSV. La pipeline sélectionne les ressources disponibles à partir de l'API, puis traite les fichiers nécessaires selon l'historique déjà présent dans `site/data/dashboard.json`.

## Colonnes attendues

```text
departure_date
departure
arrival
departure_time
arrival_time
headsign
type
```

## Règles de lecture

- `departure_date` sert de date de référence pour les analyses temporelles.
- `departure` et `arrival` alimentent les dimensions gare et liaison.
- `departure_time` permet de rattacher chaque suppression à une tranche horaire.
- `type` est normalisé pour produire la répartition par type de train.

## Qualité

Les lignes incomplètes, incohérentes ou non exploitables sont écartées et comptabilisées dans les métadonnées du dashboard.

Les doublons exacts sont supprimés avant la construction du modèle Gold.
