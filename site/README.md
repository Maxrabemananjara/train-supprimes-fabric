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

Le site reçoit une copie de l'export Gold préparé dans Fabric. Il ne lit ni les CSV sources ni les zones Bronze et Silver : son seul point d'entrée est `data/dashboard.json`.

## Lecture du dashboard

Le dashboard permet de filtrer par :

- date de début ;
- date de fin ;
- gare ;
- type de train.

Les indicateurs et graphiques se recalculent côté navigateur à partir du fichier `dashboard.json`.

## Bouton de rafraîchissement

Le bouton `Rafraîchir les données` relit la dernière version publiée du fichier JSON. Il ne relance ni le traitement dans Microsoft Fabric ni la publication GitHub Actions.

Après une publication, le bouton permet simplement de récupérer la dernière version sans attendre l'expiration du cache du navigateur.

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
