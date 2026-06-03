# Sources

## Trains supprimes

La source principale est le jeu de donnees data.gouv suivant :

```text
Liste des trains SNCF supprimes
```

API dataset :

```text
https://www.data.gouv.fr/api/1/datasets/liste-des-trains-sncf-supprimes/
```

Le jeu de donnees publie des fichiers CSV quotidiens. L'ingestion Bronze selectionne automatiquement la ressource CSV la plus recente a partir des metadonnees data.gouv.

Colonnes attendues :

```text
departure_date
departure
arrival
departure_time
arrival_time
headsign
type
```

Les fichiers bruts sont conserves dans le Lakehouse avec une partition par date d'extraction.
