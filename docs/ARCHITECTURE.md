# Architecture cible

Le projet repose sur une architecture data simple et lisible, inspiree d'une approche medaillon.

## 1. Source

La source principale est le jeu de donnees public data.gouv :

```text
Liste des trains SNCF supprimes
```

Le dataset est publie quotidiennement sous forme de fichiers CSV.

## 2. Bronze

La couche Bronze conserve les fichiers bruts tels qu'ils sont recuperes.

Objectif :

- conserver une trace des donnees sources ;
- permettre la reprise en cas d'erreur ;
- documenter la fraicheur et l'origine des fichiers.

## 3. Silver

La couche Silver contient les donnees nettoyees et controlees.

Traitements prevus :

- controle des colonnes attendues ;
- normalisation des dates et heures ;
- normalisation des types de trains ;
- detection des doublons ;
- controle de coherence sur les valeurs obligatoires.

## 4. Gold

La couche Gold produit les donnees pretes pour le site.

Exemples de sorties :

- indicateurs de synthese ;
- evolution quotidienne ;
- repartition par type de train ;
- repartition par tranche horaire ;
- top gares de depart et d'arrivee ;
- metadata de mise a jour et statut qualite.

## 5. Site public

Le site GitHub Pages lit les fichiers Gold et affiche un dashboard public.

Le style retenu est une interface claire, professionnelle, avec navigation laterale, cartes KPI, graphiques et bloc de monitoring.

