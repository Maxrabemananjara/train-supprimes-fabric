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

