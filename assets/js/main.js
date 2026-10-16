/**
 * Script Principal — Portfolio Romaric Pradeau
 * Refactorisé en ES6+, Allégé du code mort et Optimisé pour les performances (60 FPS)
 */

(() => {
  "use strict";

  /* ==============================================================
     1. Gestion du Menu Mobile et Accessibilité
     ============================================================== */
  const header = document.querySelector('#header');
  const headerToggleBtn = document.querySelector('.header-toggle');

  /**
   * Bascule l'état d'affichage du menu latéral sur mobile
   * et met à jour l'attribut ARIA pour les lecteurs d'écran.
   */
  const toggleHeader = () => {
    if (!header || !headerToggleBtn) return;
    const isShown = header.classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list', !isShown);
    headerToggleBtn.classList.toggle('bi-x', isShown);
    headerToggleBtn.setAttribute('aria-expanded', String(isShown));
  };

  if (headerToggleBtn) {
    headerToggleBtn.addEventListener('click', toggleHeader);
  }

  // Fermer automatiquement le menu mobile lors d'un clic sur un lien d'ancre
  document.querySelectorAll('#navmenu a').forEach(link => {
    link.addEventListener('click', () => {
      if (header?.classList.contains('header-show')) {
        toggleHeader();
      }
    });
  });

  // Gestion des sous-menus déroulants (mobile / tactile)
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      const parent = this.parentNode;
      const nextMenu = parent.nextElementSibling;
      parent.classList.toggle('active');
      if (nextMenu) {
        nextMenu.classList.toggle('dropdown-active');
      }
      e.stopImmediatePropagation();
    });
  });

  /* ==============================================================
     2. Preloader
     ============================================================== */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.classList.add('loaded');
      setTimeout(() => preloader.remove(), 400);
    });
  }

  /* ==============================================================
     3. Bouton Retour en Haut (Scroll Top)
     ============================================================== */
  const scrollTop = document.querySelector('.scroll-top');

  const toggleScrollTop = () => {
    if (scrollTop) {
      scrollTop.classList.toggle('active', window.scrollY > 100);
    }
  };

  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==============================================================
     4. Navmenu Scrollspy (Mise en surbrillance du lien actif)
     ============================================================== */
  const navmenuLinks = document.querySelectorAll('.navmenu a');

  const navmenuScrollspy = () => {
    const position = window.scrollY + 200;
    navmenuLinks.forEach(link => {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (!section) return;

      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(item => item.classList.remove('active'));
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  /* ==============================================================
     5. Écouteur Scroll Optimisé via requestAnimationFrame (Pas de saccade)
     ============================================================== */
  let scrollTicking = false;
  const onScroll = () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        toggleScrollTop();
        navmenuScrollspy();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', () => {
    toggleScrollTop();
    navmenuScrollspy();
  });

  /* ==============================================================
     6. Compensation du défilement pour les liens d'ancre au chargement
     ============================================================== */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          const scrollMarginTop = getComputedStyle(target).scrollMarginTop;
          window.scrollTo({
            top: target.offsetTop - parseInt(scrollMarginTop || '0', 10),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /* ==============================================================
     7. Initialisation Sécurisée des Librairies Actives
     ============================================================== */
  // AOS (Animations au défilement)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  // Typed.js (Animation d'écriture de la section Hero)
  const typedTarget = document.querySelector('.typed');
  if (typedTarget && typeof Typed !== 'undefined') {
    const items = typedTarget.getAttribute('data-typed-items');
    if (items) {
      new Typed('.typed', {
        strings: items.split(',').map(s => s.trim()),
        loop: true,
        typeSpeed: 90,
        backSpeed: 45,
        backDelay: 2000
      });
    }
  }

  // GLightbox (Visionneuse d'images haute résolution)
  if (typeof GLightbox !== 'undefined') {
    GLightbox({ selector: '.glightbox' });
  }

  /* ==============================================================
     8. Menu / Raccourci Projets Flottant (si présent)
     ============================================================== */
  const shortcutBtn = document.getElementById('projectsShortcut');
  const shortcutPopup = document.getElementById('projectsPopup');
  if (shortcutBtn && shortcutPopup) {
    shortcutBtn.addEventListener('click', (e) => {
      const isShown = shortcutPopup.classList.toggle('show');
      shortcutBtn.setAttribute('aria-expanded', String(isShown));
      e.stopPropagation();
    });
    shortcutPopup.addEventListener('click', (e) => e.stopPropagation());
    document.addEventListener('click', () => {
      if (shortcutPopup.classList.contains('show')) {
        shortcutPopup.classList.remove('show');
        shortcutBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();