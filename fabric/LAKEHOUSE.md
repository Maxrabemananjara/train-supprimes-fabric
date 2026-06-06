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

`bronze` conserve les donnees sources recuperees, avec une logique d'historisation par date d'extraction et identifiant de relance. Les chargements historiques sont consolides dans un fichier Bronze trace par fichier source afin de limiter les appels OneLake.

`silver` contient les donnees nettoyees et controlees avant modelisation.

`gold` contient les sorties pretes a alimenter le tableau de bord public et le suivi qualite. Les indicateurs sont recalcules depuis une table de faits et des dimensions derivees de l'historique Silver disponible.

## Sorties Silver

```text
Files/
  silver/
    trains_supprimes/
      date_traitement=YYYY-MM-DD/
        silver_trains_supprimes.csv
        quality_report.json
```

La sortie Silver applique les controles de base : colonnes attendues, valeurs obligatoires, dates exploitables, duree positive et suppression des doublons exacts.

## Tables prevues

```text
silver_trains_supprimes
gold_kpi
gold_evolution_journaliere
gold_repartition_type_train
gold_top_gares_depart
gold_top_liaisons
fact_suppressions
dim_date
dim_gare
dim_liaison
dim_type_train
dim_tranche_horaire
gold_qualite_pipeline
```

Les sorties Gold sont historisees par date de traitement dans `Files/gold/dashboard` et `Files/gold/quality`.
