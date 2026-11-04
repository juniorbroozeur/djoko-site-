# Où déposer vos images

Chaque emplacement du site attend un fichier **portant exactement le nom indiqué ci-dessous**,
déposé dans ce dossier `images/`. Tant que le fichier est absent, le site affiche un repère
hachuré rappelant le nom et le format attendu. Dès que le fichier est présent, l'image le
remplace automatiquement — aucune modification du code n'est nécessaire.

## Format des fichiers

- **Extension :** `.jpg` (ou `.webp` si vous adaptez les chemins dans le HTML)
- **Poids :** viser **moins de 250 Ko** par image. Au-delà, le temps de chargement se dégrade
  sensiblement sur les connexions mobiles gabonaises, ce qui pénalise aussi le référencement.
- **Compression recommandée :** qualité 78–82 %, profil sRGB.
- Le cadrage indiqué est la zone visible : les images sont recadrées automatiquement
  (`object-fit: cover`), prévoyez un peu de marge autour du sujet.

---

## Page d'accueil — diaporama

Cinq images défilant automatiquement toutes les 6 secondes.
Ce sont les plus importantes du site : ce sont elles qui décident si un acheteur public
vous prend au sérieux.

| Fichier | Format | Sujet attendu |
|---|---|---|
| `accueil-01.jpg` | 1600 × 1200 px | Uniforme complet porté, en situation |
| `accueil-02.jpg` | 1600 × 1200 px | Gros plan sur une chemise et son marquage brodé |
| `accueil-03.jpg` | 1600 × 1200 px | Préparation des commandes, lots empilés |
| `accueil-04.jpg` | 1600 × 1200 px | Literie : draps et taies pliés |
| `accueil-05.jpg` | 1600 × 1200 px | Livraison ou remise à l'établissement |

**Les légendes se modifient** dans `index.html`, dans les balises `<p class="diapo__legende">`.

## Page d'accueil — autres emplacements

| Fichier | Format | Sujet attendu |
|---|---|---|
| `apropos-portrait.jpg` | 1000 × 1250 px (portrait) | Personne portant l'uniforme, cadrage vertical |
| `gamme-apercu.jpg` | 1200 × 900 px (paysage) | Vue d'ensemble de la gamme, articles pliés |

## Page « Qui sommes-nous »

| Fichier | Format | Sujet attendu |
|---|---|---|
| `apropos-01.jpg` | 1200 × 900 px | Contexte : établissement, cour, atelier |
| `apropos-02.jpg` | 1000 × 1250 px | Uniforme marqué au numéro d'établissement |

## Page « Nos produits »

Une image par référence, toutes au **format portrait 1000 × 1250 px**.

| Fichier | Référence |
|---|---|
| `produit-chemise.jpg` | DJK-01 |
| `produit-teeshirt.jpg` | DJK-02 |
| `produit-pantalon.jpg` | DJK-03 |
| `produit-sous-vetement-homme.jpg` | DJK-04 |
| `produit-sous-vetement-femme.jpg` | DJK-05 |
| `produit-soutien-gorge.jpg` | DJK-06 |
| `produit-chaussettes.jpg` | DJK-07 |
| `produit-chaussures.jpg` | DJK-08 |
| `produit-drap.jpg` | DJK-09 |
| `produit-taie-oreiller.jpg` | DJK-10 |

## Page « Personnalisation »

| Fichier | Format | Sujet attendu |
|---|---|---|
| `personnalisation-01.jpg` | 1000 × 1250 px | Détail d'une broderie ou d'un marquage |
| `qualite-01.jpg` | 1200 × 900 px | Contrôle qualité, vérification d'un lot |

## Image de partage sur les réseaux et messageries

| Fichier | Format | Rôle |
|---|---|---|
| `partage.jpg` | 1200 × 630 px | Vignette affichée quand un lien du site est partagé sur WhatsApp, LinkedIn ou par e-mail |

---

## Fichiers déjà présents

- `logo-monogramme.png` — monogramme utilisé dans l'en-tête
- `logo.png` — logo complet
- `favicon.svg` — icône de l'onglet du navigateur

---

## Deux points à trancher avant la mise en ligne

**1. Les visuels doivent être les vôtres.** Les images actuellement utilisées dans votre
plaquette proviennent de banques d'images étrangères — l'une porte visiblement la mention
« Fulton Co Jail » (États-Unis). Sur un site destiné à l'administration gabonaise, cela se
remarque et fragilise la crédibilité du dossier. Des photos non originales ne génèrent par
ailleurs aucun trafic via Google Images et exposent à un risque de droits d'auteur.

**2. Le texte alternatif compte.** Chaque image porte un attribut `alt` décrivant ce qu'elle
montre. Il sert aux personnes utilisant un lecteur d'écran et au référencement. Si vous
changez le sujet d'une photo, modifiez l'`alt` correspondant dans le HTML.
