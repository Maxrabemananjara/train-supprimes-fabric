# Pipeline

Ce dossier contient les scripts qui alimentent le dashboard public.

## Flux de traitement

```text
API data.gouv
  -> récupération des CSV
  -> contrôle Bronze
  -> nettoyage Silver
  -> modèle Gold faits / dimensions
  -> export site/data/dashboard.json
```

## Scripts

| Script | Rôle |
| --- | --- |
| `ingest_bronze.py` | Lit les ressources CSV data.gouv et conserve les métadonnées source. |
| `transform_silver.py` | Nettoie les lignes, contrôle le schéma et produit le rapport qualité. |
| `build_gold.py` | Construit les indicateurs, dimensions, faits et agrégats du dashboard. |
| `build_site_data.py` | Met à jour le fichier public `site/data/dashboard.json`. |
| `run_daily.py` | Exécute le flux complet avec les paramètres par défaut. |

## Relance locale

Reconstruire le fichier public à partir des ressources disponibles :

```bash
python pipeline/build_site_data.py
```

Reconstruire l'historique complet :

```bash
python pipeline/build_site_data.py --full
```

Relancer le flux quotidien :

```bash
python pipeline/run_daily.py
```

## Actualisation incrémentale

Le script `build_site_data.py` lit le dernier `dashboard.json` publié. Il compare ensuite la fin de période connue avec les ressources CSV disponibles sur data.gouv.

Si un nouveau fichier existe, il ajoute les lignes au modèle existant et recalcule les indicateurs.

Si aucun nouveau fichier n'existe, il met uniquement à jour la date de contrôle du jour. Cela permet de distinguer une source inchangée d'une pipeline qui ne tourne pas.

## Automatisation

Le workflow GitHub Actions `Actualiser les donnees` exécute cette pipeline plusieurs fois par jour. En cas de changement du fichier public, le commit est réalisé avec le compte du dépôt et le site est republié.
