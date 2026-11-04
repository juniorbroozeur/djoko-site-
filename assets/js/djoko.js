/* ==========================================================================
   DJOKO — Comportements de l'interface
   Aucune dépendance externe.
   ========================================================================== */
(function () {
  'use strict';

  var mouvementReduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Emplacements d'images ------------------------------------------- */
  /* Marque comme vide tout emplacement dont le fichier est absent, afin
     d'afficher le repère de cadrage à la place.                           */
  function verifierEmplacements() {
    document.querySelectorAll('.emplacement').forEach(function (bloc) {
      var image = bloc.querySelector('img');
      if (!image) { bloc.classList.add('est-vide'); return; }

      function marquerVide() { bloc.classList.add('est-vide'); }
      function marquerRempli() { bloc.classList.remove('est-vide'); }

      if (image.complete) {
        image.naturalWidth === 0 ? marquerVide() : marquerRempli();
      } else {
        image.addEventListener('load', marquerRempli);
        image.addEventListener('error', marquerVide);
      }
    });
  }

  /* --- Menu sur petit écran -------------------------------------------- */
  function initMenu() {
    var bascule = document.querySelector('.bascule');
    var navigation = document.getElementById('navigation');
    if (!bascule || !navigation) return;

    bascule.addEventListener('click', function () {
      var ouvert = navigation.classList.toggle('est-ouverte');
      bascule.setAttribute('aria-expanded', String(ouvert));
      bascule.textContent = ouvert ? 'Fermer' : 'Menu';
    });

    navigation.querySelectorAll('a').forEach(function (lien) {
      lien.addEventListener('click', function () {
        navigation.classList.remove('est-ouverte');
        bascule.setAttribute('aria-expanded', 'false');
        bascule.textContent = 'Menu';
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navigation.classList.contains('est-ouverte')) {
        navigation.classList.remove('est-ouverte');
        bascule.setAttribute('aria-expanded', 'false');
        bascule.textContent = 'Menu';
        bascule.focus();
      }
    });
  }

  /* --- Diaporama d'accueil ---------------------------------------------- */
  function initDiaporama() {
    var diapo = document.querySelector('.diapo');
    if (!diapo) return;

    var vues = Array.prototype.slice.call(diapo.querySelectorAll('.diapo__vue'));
    var puces = Array.prototype.slice.call(diapo.querySelectorAll('.diapo__puce'));
    var compteur = diapo.querySelector('[data-compteur]');
    var precedent = diapo.querySelector('[data-precedent]');
    var suivant = diapo.querySelector('[data-suivant]');
    if (vues.length < 2) return;

    var index = 0;
    var minuterie = null;
    var DUREE = 6000;

    function deuxChiffres(n) { return n < 10 ? '0' + n : String(n); }

    function afficher(nouvelIndex) {
      index = (nouvelIndex + vues.length) % vues.length;
      vues.forEach(function (vue, i) {
        var actif = i === index;
        vue.classList.toggle('est-active', actif);
        vue.setAttribute('aria-hidden', String(!actif));
      });
      puces.forEach(function (puce, i) {
        puce.setAttribute('aria-selected', String(i === index));
      });
      if (compteur) {
        compteur.textContent = deuxChiffres(index + 1) + ' / ' + deuxChiffres(vues.length);
      }
    }

    function lancer() {
      if (mouvementReduit) return;
      arreter();
      minuterie = window.setInterval(function () { afficher(index + 1); }, DUREE);
    }
    function arreter() {
      if (minuterie) { window.clearInterval(minuterie); minuterie = null; }
    }

    puces.forEach(function (puce, i) {
      puce.addEventListener('click', function () { afficher(i); lancer(); });
    });
    if (precedent) precedent.addEventListener('click', function () { afficher(index - 1); lancer(); });
    if (suivant) suivant.addEventListener('click', function () { afficher(index + 1); lancer(); });

    diapo.addEventListener('mouseenter', arreter);
    diapo.addEventListener('mouseleave', lancer);
    diapo.addEventListener('focusin', arreter);
    diapo.addEventListener('focusout', lancer);

    diapo.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { afficher(index - 1); lancer(); }
      if (e.key === 'ArrowRight') { afficher(index + 1); lancer(); }
    });

    document.addEventListener('visibilitychange', function () {
      document.hidden ? arreter() : lancer();
    });

    afficher(0);
    lancer();
  }

  /* --- Révélation au défilement ----------------------------------------- */
  function initRevelations() {
    var cibles = document.querySelectorAll('.revele');
    if (!cibles.length) return;

    if (mouvementReduit || !('IntersectionObserver' in window)) {
      cibles.forEach(function (c) { c.classList.add('est-visible'); });
      return;
    }

    var observateur = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (entree) {
        if (entree.isIntersecting) {
          entree.target.classList.add('est-visible');
          observateur.unobserve(entree.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    cibles.forEach(function (c) { observateur.observe(c); });
  }

  /* --- Formulaire de demande de devis ----------------------------------- */
  function initFormulaire() {
    var formulaire = document.getElementById('formulaire-devis');
    if (!formulaire) return;

    var confirmation = document.getElementById('confirmation-devis');

    formulaire.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!formulaire.checkValidity()) {
        formulaire.reportValidity();
        return;
      }

      /* Piège à robots : rempli uniquement par un automate. */
      var piege = formulaire.querySelector('[name="site-web"]');
      if (piege && piege.value !== '') return;

      /* ------------------------------------------------------------------
         À BRANCHER À LA MISE EN LIGNE
         Remplacez ce bloc par l'envoi vers votre service de messagerie
         (Formspree, Resend, EmailJS, script PHP…). Exemple :

         fetch('https://formspree.io/f/VOTRE_IDENTIFIANT', {
           method: 'POST',
           headers: { 'Accept': 'application/json' },
           body: new FormData(formulaire)
         }).then(...)
      ------------------------------------------------------------------ */
      console.info('Demande de devis :', Object.fromEntries(new FormData(formulaire)));

      if (confirmation) {
        confirmation.hidden = false;
        confirmation.focus();
        confirmation.scrollIntoView({ behavior: mouvementReduit ? 'auto' : 'smooth', block: 'center' });
      }
      formulaire.reset();
    });
  }

  /* --- Année courante dans le pied de page ------------------------------ */
  function initAnnee() {
    document.querySelectorAll('[data-annee]').forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* --- Démarrage --------------------------------------------------------- */
  function demarrer() {
    verifierEmplacements();
    initMenu();
    initDiaporama();
    initRevelations();
    initFormulaire();
    initAnnee();
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', demarrer)
    : demarrer();
})();
