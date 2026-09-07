const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
const menuLinks = [...document.querySelectorAll('#menu a')];

menuBtn?.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(isOpen));
  menuBtn.textContent = isOpen ? '✕' : '☰';
});

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
    if (menuBtn) menuBtn.textContent = '☰';
  });
});

const sections = [...document.querySelectorAll('main section[id]')];

const updateActiveLink = () => {
  const scrollY = window.scrollY + 130;
  let current = 'inicio';

  sections.forEach(section => {
    if (scrollY >= section.offsetTop) current = section.id;
  });

  menuLinks.forEach(link => {
    const target = link.getAttribute('href')?.replace('#', '');
    link.classList.toggle('active', target === current);
  });
};

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

reveals.forEach(element => revealObserver.observe(element));
