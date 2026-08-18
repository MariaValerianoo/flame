/* =========================================
   FLAME II — script.js
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- HEADER SCROLL EFFECT ---------- */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* ---------- HAMBURGER MENU (MOBILE) ---------- */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });

  /* ---------- MENU MODAL — PANTALLA COMPLETA ---------- */
  const menuModal = document.getElementById('menuModal');
  const openButtons = [
    document.getElementById('openMenuBtn'),
    document.getElementById('openMenuBtnHero'),
    document.getElementById('openMenuBtnSpec')
  ].filter(Boolean);
  const closeMenuBtn = document.getElementById('closeMenuBtn');

  function openMenu() {
    menuModal.classList.add('active');
    document.body.classList.add('no-scroll');
  }

  function closeMenu() {
    menuModal.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  openButtons.forEach(btn => btn.addEventListener('click', openMenu));
  closeMenuBtn.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuModal.classList.contains('active')) closeMenu();
  });

  /* ---------- MENU FILTER TABS ---------- */
  const filterButtons = document.querySelectorAll('.menu-filter-btn');
  const menuCategories = document.querySelectorAll('.menu-category');

  function showCategory(categoryId) {
    menuCategories.forEach(cat => {
      cat.classList.toggle('active', cat.dataset.category === categoryId);
    });
    filterButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === categoryId);
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      showCategory(btn.dataset.category);
      document.querySelector('.menu-modal-body').scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Activar la primera categoría al cargar
  if (menuCategories.length) {
    menuCategories[0].classList.add('active');
  }

  /* ---------- SMOOTH SCROLL PARA ANCLAS ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  /* ---------- BILINGUAL SWITCH (ES / EN) ---------- */
  const langButtons = document.querySelectorAll('.lang-btn');

  const waMessages = {
    es: 'Hola, quisiera hacer una reserva en Flame II',
    en: 'Hi, I would like to make a reservation at Flame II'
  };

  function setLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-es][data-en]').forEach(el => {
      const text = lang === 'en' ? el.dataset.en : el.dataset.es;
      if (text === '') {
        el.style.display = 'none';
      } else {
        el.style.display = '';
        el.innerHTML = text;
      }
    });

    langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
      const base = link.getAttribute('href').split('?')[0];
      link.setAttribute('href', `${base}?text=${encodeURIComponent(waMessages[lang])}`);
    });

    localStorage.setItem('flameii_lang', lang);
  }

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  const savedLang = localStorage.getItem('flameii_lang') || 'es';
  setLanguage(savedLang);

});