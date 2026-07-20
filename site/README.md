# Site public

Ce dossier contient le dashboard publié avec GitHub Pages.

Lien public :

```text
https://maxrabemananjara.github.io/train-supprimes-fabric/
```

## Fichiers principaux

```text
index.html              Structure de la page
styles.css              Mise en forme du dashboard
app.js                  Lecture du JSON, filtres et graphiques
data/dashboard.json     Copie publiée de l'export Gold
```

## Alimentation du site

Microsoft Fabric réalise l’ingestion, les contrôles qualité, les transformations Silver et la modélisation Gold dans OneLake. GitHub Actions récupère ensuite l’export `dashboard.json` produit dans la couche Gold, le copie dans le dossier du site et publie le dashboard avec GitHub Pages.

GitHub Actions constitue uniquement la couche de publication et n'effectue aucune transformation métier.

## Lecture du dashboard

Le dashboard permet de filtrer par :

- date de début ;
- date de fin ;
- gare ;
- type de train.

Les indicateurs et graphiques se recalculent côté navigateur à partir du fichier `dashboard.json`.

## Bouton de rafraîchissement

Le bouton `Rafraîchir les données` relit la dernière version publiée du fichier JSON. Il ne relance ni le traitement dans Microsoft Fabric ni la publication GitHub Actions.

Une fois l'export Gold copié et le site republié, le bouton permet simplement de récupérer cette version sans attendre le cache du navigateur.

## Direction visuelle

L'interface privilégie une lecture métier :

- titre clair ;
- filtres visibles en haut de page ;
- cartes KPI ;
- évolution quotidienne ;
- classement des gares ;
- répartition par type de train ;
- tranches horaires ;
- tableau des liaisons les plus concernées.
