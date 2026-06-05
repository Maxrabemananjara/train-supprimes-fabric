# Trains Supprimes Fabric

Projet data engineering autour des trains supprimes en France, a partir de donnees publiques data.gouv.

L'objectif est de construire une chaine automatisee de traitement et de publication :

- ingestion de donnees open data ;
- organisation en architecture medaillon Bronze / Silver / Gold ;
- traitement et controles qualite avec Microsoft Fabric ;
- preparation d'un modele Gold faits / dimensions pour un site public ;
- publication d'un dashboard via GitHub Pages.

## Architecture cible

```text
data.gouv
  -> Bronze : fichiers bruts historises
  -> Silver : donnees nettoyees et controlees
  -> Gold   : faits, dimensions, indicateurs et JSON pour le dashboard
  -> GitHub Pages : site public mis a jour quotidiennement
```

## Composants prevus

```text
fabric/        Objets et notebooks Microsoft Fabric
pipeline/      Scripts de recuperation, transformation et controle
site/          Application web statique publiee via GitHub Pages
docs/          Documentation projet et mode operatoire
data-samples/  Exemples de donnees non sensibles
```

## Statut

Le depot contient la structure du projet, l'ingestion Bronze, la transformation Silver, la preparation Gold du dashboard et le site public.

Le dashboard public est porte par le dossier `site/` et publie via GitHub Pages.
