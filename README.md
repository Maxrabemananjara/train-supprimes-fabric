# Trains Supprimes Fabric

Projet data engineering autour des trains supprimes en France, a partir de donnees publiques data.gouv.

L'objectif est de construire une chaine automatisee de traitement et de publication :

- ingestion de donnees open data ;
- organisation en architecture medaillon Bronze / Silver / Gold ;
- traitement et controles qualite avec Microsoft Fabric ;
- generation de fichiers Gold pour un site public ;
- publication d'un dashboard via GitHub Pages.

## Architecture cible

```text
data.gouv
  -> Bronze : fichiers bruts historises
  -> Silver : donnees nettoyees et controlees
  -> Gold   : agregats et JSON pour le dashboard
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

Phase de cadrage validee. La prochaine etape consiste a connecter le workspace Microsoft Fabric au depot GitHub, puis a creer les premiers objets Lakehouse / Notebook.

