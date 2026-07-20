# Structure Lakehouse

Le Lakehouse est organisé selon une approche médaillon dans Microsoft Fabric. Il porte l'ensemble du traitement, depuis l'ingestion de la source data.gouv jusqu'à la production de l'export Gold utilisé par le dashboard.

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

La zone Bronze conserve les fichiers sources ingérés depuis data.gouv et leurs métadonnées :

- nom de ressource ;
- URL source ;
- date de modification ;
- date d'extraction ;
- fichier d'origine.

Elle permet de revenir à la donnée brute en cas de contrôle ou de reprise.

## Silver

La zone Silver contient les données nettoyées et contrôlées dans Microsoft Fabric.

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

Le fichier `dashboard.json` est déposé avec les sorties Gold. Il regroupe les faits, dimensions, indicateurs et agrégats nécessaires au site.

## Publication

Une fois l'export disponible, GitHub Actions le copie vers `site/data/dashboard.json` et publie le dossier `site/`. À ce stade, le contenu métier est déjà figé.
