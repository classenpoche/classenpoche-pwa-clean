/**
 * classenpoche-responsive.js
 * Script universel d'injection responsive pour toutes les pages du site.
 * S'injecte dans chaque page et transforme dynamiquement le HTML ancien.
 */
 

 
(function () {
  'use strict';

  /* ── 1. Détection du chemin relatif vers la racine ── */
  function rootPath() {
    var depth = (window.location.pathname.match(/\//g) || []).length - 1;
    if (depth <= 0) return './';
    return Array(depth).fill('..').join('/') + '/';
  }
  var ROOT = rootPath();

  /* ── 2. Injection du CSS ── */
  var link = document.createElement('link');
  link.rel  = 'stylesheet';
  link.href = ROOT + 'responsive.css';
  document.head.appendChild(link);

  /* ── 3. Meta viewport (sécurité) ── */
  if (!document.querySelector('meta[name=viewport]')) {
    var mv = document.createElement('meta');
    mv.name    = 'viewport';
    mv.content = 'width=device-width, initial-scale=1.0';
    document.head.appendChild(mv);
  }

  /* ── 4. Attente du DOM ── */
  document.addEventListener('DOMContentLoaded', function () {
    transformPage();
  });

  function transformPage() {
    var body = document.body;

    /* 4a. Wrapper le contenu existant dans #cp-content */
var existing = Array.from(body.children);
var wrapper = document.createElement('div');
    wrapper.id = 'cp-content';
    existing.forEach(function (n) { wrapper.appendChild(n); });
    body.appendChild(wrapper);

    /* 4b. Barre de navigation */
    var topbar  = buildTopbar();
    body.insertBefore(topbar, wrapper);

    /* 4c. Ajouter bouton "Retour" si pas déjà présent */
    ensureBackButton(wrapper);

    /* 4d. Transformer les listes de liens en grille ou liste stylisée */
    transformLinks(wrapper);

    /* 4e. Envelopper les blocs de cours */
    wrapContent(wrapper);

    /* 4f. Mettre le titre de la page dans la topbar */
    //setTopbarTitle(topbar);
  }

  /* ── Topbar ── */
  function buildTopbar() {
    var bar = document.createElement('nav');
    bar.id  = 'cp-topbar';

    var logo = document.createElement('img');
    logo.src = ROOT + 'new-logo.jpg';
    logo.alt = 'Classenpoche';
    bar.appendChild(logo);

    var home = document.createElement('a');
    home.href = ROOT + 'index.html';
    home.textContent = '🏠 Accueil';
    bar.appendChild(home);

    return bar;
  }

  function setTopbarTitle(topbar) {
    var pageTitle = document.title || '';
    /* Supprimer "L'École Nomade" du titre si doublé */
    pageTitle = pageTitle
      .replace(/L'[ÉE]cole Nomade\s*[–\-]?\s*/i, '')
      .replace(/L'école nomade/i, '')
      .trim();

    if (pageTitle) {
      var span = document.createElement('span');
      span.textContent = pageTitle;
      span.style.cssText = 'color:#fff;font-size:.9rem;opacity:.85;margin-left:auto;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px;';
      topbar.appendChild(span);
    }
  }

  /* ── Bouton retour ── */
  function ensureBackButton(wrapper) {
    /* S'il y a déjà un lien "Retour", le styler */
    var anchors = wrapper.querySelectorAll('a');
    anchors.forEach(function (a) {
      var txt = (a.textContent || '').trim().toLowerCase();
      if (txt === 'retour' || txt === 'back') {
        a.id = 'cp-back';
        a.innerHTML = '← Retour';
      }
    });
  }

  /* ── Transformation des listes de liens en navigation ── */
  function transformLinks(wrapper) {
    /* Détecter si c'est une page de menu (beaucoup de liens courts) */
    var anchors = wrapper.querySelectorAll('a');
    if (anchors.length < 3) return;

    var isMenuPage = true;
    anchors.forEach(function (a) {
      /* Les pages de cours ont des paragraphes longs : on ne touche pas */
      var parent = a.closest('p, div');
      if (parent && parent.textContent.length > 300) isMenuPage = false;
    });

    /* Page d'accueil principale : transformer en grille de boutons */
    if (isMenuPage && anchors.length <= 20) {
      var levelLinks = [];
      anchors.forEach(function (a) {
        var txt = (a.textContent || '').trim();
        if (txt && !['Retour', 'Contact', 'Accueil', '←'].includes(txt)) {
          levelLinks.push({ href: a.href, text: txt, el: a });
        }
      });

      if (levelLinks.length >= 3) {
        var grid = document.createElement('div');
        grid.className = 'cp-grid';


        levelLinks.forEach(function (item) {
          var btn = document.createElement('a');
          btn.href = item.href;
          btn.className = 'cp-btn ' + guessLevel(item.text);
          btn.textContent = item.text;
		  var li = document.createElement('li');

var link = document.createElement('a');
link.href = item.href;
link.textContent = item.text;

li.appendChild(link);
list.appendChild(li);
		  
          grid.appendChild(btn);

          /* Masquer l'élément original */
          var container = item.el.closest('div.level, p, li');
          if (container) container.style.display = 'none';
          else item.el.style.display = 'none';
        });

        wrapper.appendChild(grid);
		

		
		
      }
    }
  }

  function guessLevel(text) {
    var t = text.toLowerCase();
    if (t.includes('6') || t.includes('six')) return 'sixieme';
    if (t.includes('5') || t.includes('cinq')) return 'cinquieme';
    if (t.includes('4') || t.includes('quat')) return 'quatrieme';
    if (t.includes('3') || t.includes('trois')) return 'troisieme';
    if (t.includes('2nde') || t.includes('seconde') || t.includes('2')) return 'seconde';
    if (t.includes('1') || t.includes('premi')) return 'premiere';
    if (t.includes('term')) return 'terminale';
    if (t.includes('bts')) return 'bts';
    if (t.includes('cm') || t.includes('socle')) return 'cm2';
    return '';
  }

  /* ── Envelopper le contenu de cours ── */
  function wrapContent(wrapper) {
    var divs = wrapper.querySelectorAll('div[align="left"]');
    divs.forEach(function (d) {
      if (!d.closest('.cp-cours') && !d.closest('.cp-grid')) {
        d.classList.add('cp-cours');
        d.removeAttribute('align');
      }
    });

    /* Texte libre (hors div) */
    var paras = wrapper.querySelectorAll('p');
    paras.forEach(function (p) {
      p.removeAttribute('align');
    });
  }

/* ==========================================================
   CLASSENPOCHE
   MODE CONFORT DE LECTURE
========================================================== 

(function () {

    // ---------- Création du bouton ----------

   /* const btn = document.createElement("button");

    btn.id = "lectureBtn";

    btn.innerHTML = "👓";

    document.body.appendChild(btn);


	
(function () {

    // ---------- CSS automatique ----------

    const style = document.createElement("style");

    style.textContent = `

    /* Zoom automatique smartphone */
/*html {
    zoom: 1;
}

@media (max-width:480px) {
    html {
        zoom: 1;
    }
}

    `;

    document.head.appendChild(style);

})();



    const style = document.createElement("style");

    style.textContent = `

#lectureBtn{

position:fixed;

bottom:20px;

right:20px;

width:58px;

height:58px;

border:none;

border-radius:50%;

background:#d06000;

color:white;

font-size:28px;

cursor:pointer;

z-index:99999;

box-shadow:0 3px 10px rgba(0,0,0,.3);

}

#lectureBtn:hover{

transform:scale(1.08);

}

.modeLecture{

font-size:125% !important;

line-height:1.9 !important;

letter-spacing:.03em;

}

.modeLecture p,
.modeLecture li,
.modeLecture td,
.modeLecture div,
.modeLecture span{

font-size:1.15em !important;

line-height:1.9 !important;

}

.modeLecture a{

font-size:1.15em !important;

padding:8px 0;

}

.modeLecture button{

font-size:1.15em !important;

min-height:54px;

}

.modeLecture h1{

font-size:2.2em !important;

}

.modeLecture h2{

font-size:1.8em !important;

}

.modeLecture h3{

font-size:1.5em !important;

}

`;




document.addEventListener("DOMContentLoaded", () => {

  // Active automatiquement le mode confort
  document.body.classList.add("cp-zoom");

});

    document.head.appendChild(style);


    // ---------- Restauration ----------

    if(localStorage.getItem("lecture") === "on"){

        document.body.classList.add("modeLecture");

    }


    // ---------- Clic ----------

    btn.onclick = function(){

        document.body.classList.toggle("modeLecture");

        localStorage.setItem(

            "lecture",

            document.body.classList.contains("modeLecture")

                ? "on"

                : "off"

        );

    };

})();*/


})();
