# Pipeline

Ce dossier contiendra les scripts de traitement du projet.

Flux cible :

```text
ingestion data.gouv
  -> controles Bronze
  -> nettoyage Silver
  -> agregations Gold
  -> export JSON pour le site
```

Le pipeline devra etre executable automatiquement chaque jour et relancable manuellement.

Le premier script d'ingestion Bronze est `ingest_bronze.py`.

La transformation Silver est portee par `transform_silver.py`.

La source de donnees est decrite dans `SOURCES.md`.
