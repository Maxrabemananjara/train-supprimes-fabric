# Structure Lakehouse

Le Lakehouse est organisé selon une approche médaillon.

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

## Bronze

La zone Bronze conserve les fichiers sources et leurs métadonnées :

- nom de ressource ;
- URL source ;
- date de modification ;
- date d'extraction ;
- fichier d'origine.

Elle permet de revenir à la donnée brute en cas de contrôle ou de reprise.

## Silver

La zone Silver contient les données nettoyées.

Sortie attendue :

```text
Files/
  silver/
    trains_supprimes/
      date_traitement=YYYY-MM-DD/
        silver_trains_supprimes.csv
        quality_report.json
```

Les contrôles Silver portent sur le schéma, les dates, les heures, les valeurs obligatoires et les doublons.

## Gold

La zone Gold contient les sorties prêtes à l'analyse.

Tables logiques :

```text
fact_suppressions
dim_date
dim_gare
dim_liaison
dim_type_train
dim_tranche_horaire
gold_kpi
gold_evolution_journaliere
gold_repartition_type_train
gold_top_gares
gold_top_liaisons
gold_qualite_pipeline
```

Ces sorties alimentent le fichier public `dashboard.json` utilisé par le site GitHub Pages.
