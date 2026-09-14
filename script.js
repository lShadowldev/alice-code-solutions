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

// ===== MERCADINHO DA 44 — SLIDESHOW + PRÉVIA =====
(() => {
  const modal = document.getElementById('mercadinhoPreview');
  if (!modal) return;

  const previewImage = document.getElementById('mercadinhoPreviewImage');
  const previewTitle = document.getElementById('mercadinhoPreviewTitle');
  const previewText = document.getElementById('mercadinhoPreviewText');
  const previewStep = document.getElementById('mercadinhoPreviewStep');
  const prevBtn = document.getElementById('mercadinhoPrev');
  const nextBtn = document.getElementById('mercadinhoNext');

  const slides = [
    {
      image: 'assets/mercadinho-home.png',
      alt: 'Tela inicial do Mercadinho da 44',
      title: 'Catálogo e experiência de compra',
      text: 'Tela pública responsiva com funcionamento, busca, categorias e catálogo de produtos.'
    },
    {
      image: 'assets/mercadinho-carrinho.png',
      alt: 'Carrinho do Mercadinho da 44',
      title: 'Carrinho e fluxo de pedido',
      text: 'O cliente adiciona produtos, acompanha o total e segue para o fluxo de finalização do pedido.'
    },
    {
      image: 'assets/mercadinho-admin-login.png',
      alt: 'Login do painel administrativo do Mercadinho da 44',
      title: 'Painel administrativo protegido',
      text: 'Área administrativa com acesso protegido. A prévia mostra somente a tela de login, sem expor dados internos.'
    }
  ];

  let current = 0;

  function render() {
    const item = slides[current];
    previewImage.src = item.image;
    previewImage.alt = item.alt;
    previewTitle.textContent = item.title;
    previewText.textContent = item.text;
    previewStep.textContent = `${String(current + 1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
  }

  function openModal() {
    current = 0;
    render();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
  }

  document.querySelectorAll('[data-open-mercadinho]').forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  document.querySelectorAll('[data-close-mercadinho]').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    render();
  });

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    render();
  });

  document.addEventListener('keydown', event => {
    if (!modal.classList.contains('open')) return;
    if (event.key === 'Escape') closeModal();
    if (event.key === 'ArrowLeft') {
      current = (current - 1 + slides.length) % slides.length;
      render();
    }
    if (event.key === 'ArrowRight') {
      current = (current + 1) % slides.length;
      render();
    }
  });
})();
