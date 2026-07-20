# Contrôles et recette

Cette grille sert de référence pour vérifier le parcours des données, depuis le fichier source jusqu'au dashboard. Elle sépare les contrôles de données des vérifications faites directement sur le site.

## Données

| Couche | Contrôle | Résultat attendu |
| --- | --- | --- |
| Source | L'API data.gouv répond et retourne au moins une ressource CSV. | Une ressource exploitable est disponible. |
| Bronze | Les colonnes attendues sont présentes. | Aucun champ obligatoire ne manque dans le schéma. |
| Bronze | Le nom, l'URL et la date de la ressource sont conservés. | Chaque chargement reste traçable. |
| Silver | Les dates et horaires peuvent être interprétés. | Les lignes incorrectes sont écartées et comptées. |
| Silver | Les gares de départ et d'arrivée sont renseignées. | Aucune ligne conservée ne possède de liaison incomplète. |
| Silver | La durée calculée n'est pas négative. | Les incohérences horaires sont rejetées. |
| Silver | Les doublons exacts sont supprimés. | Une suppression n'est comptée qu'une fois. |
| Gold | Chaque clé présente dans les faits existe dans sa dimension. | Aucune référence orpheline. |
| Gold | La somme des faits correspond au total des indicateurs. | Les KPI et les graphiques reposent sur le même volume. |
| Gold | Les dates, gares, liaisons, types et tranches horaires sont disponibles. | Tous les filtres du dashboard peuvent être alimentés. |
| Export | Le fichier `dashboard.json` est un JSON valide. | Le site peut le charger sans erreur de structure. |

## Dashboard

La recette de l'interface reste volontairement courte :

- ouverture du dashboard et chargement du JSON ;
- vérification des filtres date, gare et type de train ;
- comparaison du total affiché avec le total Gold ;
- contrôle des graphiques lorsqu'un filtre ne retourne aucune ligne ;
- rechargement des données sans utiliser une ancienne version du cache ;
- affichage sur ordinateur et sur mobile ;
- réponse HTTP correcte après la publication GitHub Pages.

## Suivi publié

Le JSON expose aussi quelques informations utiles pour la vérification : période couverte, date de publication, état du schéma, nombre de lignes en entrée, nombre de rejets et taux de rejet. Elles permettent de contrôler rapidement une actualisation sans ouvrir les fichiers intermédiaires.
