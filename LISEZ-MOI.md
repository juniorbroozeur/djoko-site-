# Site Djoko — documentation technique

Site vitrine statique, sans dépendance ni processus de compilation. Six pages HTML, une
feuille de style, un fichier JavaScript. Il se déploie en copiant le dossier sur n'importe
quel serveur web.

---

## 1. Arborescence

```
djoko-site/
├── index.html               Accueil (diaporama)
├── a-propos.html            Qui sommes-nous
├── produits.html            Les 10 références, fiches techniques
├── personnalisation.html    Options de personnalisation, processus, qualité
├── devis.html               Formulaire de demande de devis
├── mentions-legales.html    Mentions légales et confidentialité
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/djoko.css        Toute la mise en forme
│   └── js/djoko.js          Diaporama, menu, formulaire, révélations
└── images/                  Voir images/LISEZ-MOI.md
```

---

## 2. À compléter avant la mise en ligne

| Où | Quoi |
|---|---|
| Toutes les pages | **Numéro de téléphone** — actuellement `+241 00 00 00 00`. Cherchez `+241` dans les fichiers. |
| Toutes les pages | **Domaine** — remplacer `https://www.djoko.store` dans les `<link rel="canonical">`, les balises `og:`, `robots.txt` et `sitemap.xml`. |
| `mentions-legales.html` | Adresse du siège, registre du commerce, directeur de la publication, hébergeur. |
| `assets/js/djoko.js` | **Envoi du formulaire** — voir la section 4 ci-dessous. |
| `images/` | Les 20 visuels, voir `images/LISEZ-MOI.md`. |

> **Le numéro gabonais n'est pas un détail.** Google Business Profile exige une ligne locale
> vérifiable pour valider une fiche. Sans elle, le référencement local — le levier le plus
> rentable pour Djoko — reste inexploitable.

---

## 3. Identité visuelle

Les couleurs et les typographies sont centralisées dans les variables CSS en tête de
`assets/css/djoko.css`. Une modification à cet endroit se propage à tout le site.

| Jeton | Valeur | Usage |
|---|---|---|
| `--vert` | `#1F4D40` | Couleur du logo, en-tête, sections sombres |
| `--creme` | `#F0E9DA` | Fonds clairs, texte sur vert, pastilles |
| `--brun` | `#7A4E3B` | Accent, titres de section, cadres décalés |
| `--graphite` | `#3F3F3D` | Blocs neutres |
| `--papier` | `#FBFAF7` | Fond général |

**Typographies** (chargées depuis Google Fonts) : Bodoni Moda pour les titres, en écho au
logotype ; Jost pour le texte courant ; IBM Plex Mono pour les données et les pastilles.

### La pastille matricule

C'est l'élément signature du site. Il reprend le numéro cousu sur l'uniforme visible sur vos
propres photos produits : fond crème, liseré piqué, caractères mécaniques. Il sert de
référence produit (`DJK-01`), d'étiquette de section, de numéro d'étape et de compteur du
diaporama. Classe CSS : `.matricule`, avec les variantes `.matricule--vert` et
`.matricule--brun`.

---

## 4. Brancher le formulaire de devis

Le formulaire est fonctionnel côté interface (validation, piège à robots, message de
confirmation) mais **n'envoie encore rien**. Ouvrez `assets/js/djoko.js`, repérez le
commentaire `À BRANCHER À LA MISE EN LIGNE` et remplacez le `console.info` par l'appel à
votre service. Exemple avec Formspree :

```js
fetch('https://formspree.io/f/VOTRE_IDENTIFIANT', {
  method: 'POST',
  headers: { 'Accept': 'application/json' },
  body: new FormData(formulaire)
})
  .then(function (r) { if (!r.ok) throw new Error('Envoi refusé'); })
  .catch(function () { alert("L'envoi a échoué. Écrivez-nous à djoko4371@gmail.com."); });
```

Autres options : Resend, EmailJS, Web3Forms, ou un script PHP si l'hébergement le permet.

---

## 5. Référencement déjà en place

- Balises `title` et `meta description` propres à chaque page
- `<link rel="canonical">` et balises Open Graph
- Données structurées Schema.org : `Organization` sur l'accueil, `ItemList` de `Product`
  sur la page produits
- `sitemap.xml` et `robots.txt`
- Structure de titres `h1`/`h2`/`h3` cohérente, un seul `h1` par page
- Images en chargement différé (`loading="lazy"`) avec dimensions déclarées
- Langue déclarée (`lang="fr"`), lien d'évitement, contrastes conformes AA

---

## 6. Mise en ligne sur un VPS

Le site est constitué de fichiers statiques : il suffit de les copier dans la racine web.

```bash
# Copie vers le serveur
rsync -avz --delete ./djoko-site/ utilisateur@serveur:/var/www/djoko/
```

Bloc Nginx minimal :

```nginx
server {
    listen 80;
    server_name djoko.store www.djoko.store;
    root /var/www/djoko;
    index index.html;

    location / { try_files $uri $uri.html $uri/ =404; }

    # Cache long sur les ressources statiques
    location ~* \.(css|js|jpg|png|svg|webp)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
}
```

Activez ensuite HTTPS (`certbot --nginx -d djoko.store -d www.djoko.store`). Le site n'est pas
considéré comme sérieux par un acheteur institutionnel sans cadenas dans le navigateur.

---

## 7. Vérifications avant livraison

- [ ] Les 20 images sont déposées, aucun repère hachuré ne subsiste
- [ ] Le numéro de téléphone gabonais est renseigné partout
- [ ] Le domaine définitif remplace `djoko.store` dans les canoniques et le sitemap
- [ ] Le formulaire envoie réellement un e-mail (testé de bout en bout)
- [ ] Les mentions légales sont complétées
- [ ] HTTPS actif, redirection HTTP → HTTPS en place
- [ ] Sitemap soumis dans Google Search Console
- [ ] Test sur un téléphone réel, pas seulement en simulation navigateur
