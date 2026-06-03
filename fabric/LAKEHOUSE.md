# Structure Lakehouse

Le Lakehouse du projet est organise selon une approche medaillon simple.

## Lakehouse

```text
lh_trains_supprimes
```

## Zones fichiers

```text
Files/
  bronze/
    trains_supprimes/
  silver/
    trains_supprimes/
  gold/
    dashboard/
    quality/
```

## Role des zones

`bronze` conserve les fichiers sources recuperes, avec une logique d'historisation par date d'extraction.

`silver` contient les donnees nettoyees et controlees avant aggregation.

`gold` contient les sorties pretes a alimenter le tableau de bord public et le suivi qualite.

## Tables prevues

```text
silver_trains_supprimes
gold_kpi
gold_evolution_journaliere
gold_repartition_type_train
gold_top_gares
gold_qualite_pipeline
```

Les tables seront creees a l'etape de transformation, apres la mise en place de l'ingestion.
