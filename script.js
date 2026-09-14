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

// ===== PRÉVIA DO MERCADINHO DA 44 =====
(() => {
  const slides=[...document.querySelectorAll('.project-preview-slide')],dots=[...document.querySelectorAll('.project-preview-dots b')];
  let miniIndex=0;
  if(slides.length)setInterval(()=>{slides[miniIndex].classList.remove('active');dots[miniIndex]?.classList.remove('active');miniIndex=(miniIndex+1)%slides.length;slides[miniIndex].classList.add('active');dots[miniIndex]?.classList.add('active')},3800);
  const modal=document.getElementById('mercadinhoPreview'); if(!modal)return;
  const screens=[
   {image:'assets/mercadinho-home.png',alt:'Tela inicial do Mercadinho da 44',eyebrow:'EXPERIÊNCIA DO CLIENTE',title:'Catálogo e experiência de compra',text:'Página pública responsiva com funcionamento, busca, categorias e catálogo de produtos para os moradores do condomínio.'},
   {image:'assets/mercadinho-carrinho.png',alt:'Carrinho do Mercadinho da 44',eyebrow:'FLUXO DE PEDIDO',title:'Carrinho e finalização do pedido',text:'O cliente seleciona os itens, acompanha o total e segue para o fluxo de pedido integrado ao WhatsApp e às formas de pagamento.'},
   {image:'assets/mercadinho-admin-login.png',alt:'Login do painel administrativo do Mercadinho da 44',eyebrow:'GESTÃO PROTEGIDA',title:'Painel administrativo',text:'Acesso protegido para a gestão do sistema. A demonstração exibe somente a tela de login e preserva completamente os dados operacionais do cliente.'}
  ];
  let current=0;
  const img=document.getElementById('previewImage'),eyebrow=document.getElementById('previewEyebrow'),title=document.getElementById('previewTitle'),text=document.getElementById('previewText'),counter=document.getElementById('previewCurrent');
  const render=()=>{const s=screens[current];img.src=s.image;img.alt=s.alt;eyebrow.textContent=s.eyebrow;title.textContent=s.title;text.textContent=s.text;counter.textContent=String(current+1).padStart(2,'0')};
  const open=()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');current=0;render()};
  const close=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open')};
  document.querySelectorAll('[data-open-mercadinho]').forEach(el=>el.addEventListener('click',open));
  document.querySelectorAll('[data-close-mercadinho]').forEach(el=>el.addEventListener('click',close));
  document.getElementById('previewPrev').addEventListener('click',()=>{current=(current-1+screens.length)%screens.length;render()});
  document.getElementById('previewNext').addEventListener('click',()=>{current=(current+1)%screens.length;render()});
  document.addEventListener('keydown',e=>{if(!modal.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowRight'){current=(current+1)%screens.length;render()}if(e.key==='ArrowLeft'){current=(current-1+screens.length)%screens.length;render()}});
})();
