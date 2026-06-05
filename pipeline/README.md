# Pipeline

Ce dossier contiendra les scripts de traitement du projet.

Flux cible :

```text
ingestion data.gouv
  -> controles Bronze
  -> nettoyage Silver
  -> modele Gold faits / dimensions
  -> export JSON pour le site
```

Le pipeline devra etre executable automatiquement chaque jour et relancable manuellement.

Le premier script d'ingestion Bronze est `ingest_bronze.py`. Par defaut, il recupere les 120 derniers fichiers CSV disponibles pour alimenter une lecture metier avec un historique suffisant.

La transformation Silver est portee par `transform_silver.py`.

Les sorties Gold sont construites par `build_gold.py` a partir de l'historique Silver disponible. Elles contiennent les indicateurs, les tables de dimensions et la table de faits utilisees par le site statique via `site/data/dashboard.json`.

Le flux complet peut etre relance avec `run_daily.py`.

La source de donnees est decrite dans `SOURCES.md`.
