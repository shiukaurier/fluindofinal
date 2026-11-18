/* Fluindo — cabeçalho, rodapé, menu e utilidades compartilhadas */
(function () {
  const { icon } = window.FluindoIcons;
  const page = document.body.dataset.page || '';

  const LOGO = `<svg viewBox="0 0 210 92" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fluindo">
    <ellipse cx="105" cy="56" rx="98" ry="30" fill="#ffdfdf" opacity=".55"/>
    <g transform="translate(70 0)">
      <path d="M22 12 C22 4 48 4 48 12 C48 22 42 28 38 31 L38 38 L32 38 L32 31 C28 28 22 22 22 12Z" fill="#f49a96" stroke="#8e1c52" stroke-width="2"/>
      <path d="M28 13 C29 9 41 9 42 13 C41 20 37 24 35 27 C33 24 29 20 28 13Z" fill="#e46a6b"/>
      <path d="M22 13 C14 6 7 6 4 12" stroke="#8e1c52" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M48 13 C56 6 63 6 66 12" stroke="#8e1c52" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M22 13 C14 6 7 6 4 12" stroke="#e8a9b0" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <path d="M48 13 C56 6 63 6 66 12" stroke="#e8a9b0" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <ellipse cx="7" cy="19" rx="6" ry="4.5" fill="#f49a96" stroke="#8e1c52" stroke-width="1.6"/>
      <ellipse cx="63" cy="19" rx="6" ry="4.5" fill="#f49a96" stroke="#8e1c52" stroke-width="1.6"/>
    </g>
    <g transform="translate(150 6)">
      <rect x="0" y="4" width="26" height="23" rx="4" fill="#fffdeb" stroke="#8e1c52" stroke-width="1.8"/>
      <rect x="0" y="4" width="26" height="7" rx="3" fill="#e46a6b"/>
      <path d="M7 1v6M19 1v6" stroke="#8e1c52" stroke-width="2" stroke-linecap="round"/>
      <path d="M13 23s-5-3-5-6a2.4 2.4 0 0 1 5-.9 2.4 2.4 0 0 1 5 .9c0 3-5 6-5 6z" fill="#e46a6b"/>
    </g>
    <text x="105" y="70" text-anchor="middle" font-family="'Lilita One', 'Montserrat', sans-serif" font-weight="800" font-size="40" fill="#8e1c52" stroke="#fffdeb" stroke-width="5" paint-order="stroke" letter-spacing="1">Fluindo</text>
    <path d="M105 76 C102 80 100 82 100 85 a5 5 0 0 0 10 0 c0-3-2-5-5-9z" fill="#e46a6b"/>
    <path d="M28 40 l2 4 4 2 -4 2 -2 4 -2-4 -4-2 4-2z M184 44 l1.5 3 3 1.5 -3 1.5 -1.5 3 -1.5-3 -3-1.5 3-1.5z" fill="#fffdeb"/>
  </svg>`;

  const PHASE_LINKS = [
    ['menstrual', 'Fase Menstrual'],
    ['folicular', 'Fase Folicular'],
    ['ovulacao', 'Ovulação'],
    ['lutea', 'Fase Lútea'],
  ];

  function header() {
    const a = (p) => (page === p ? ' class="active" aria-current="page"' : '');
    const currentFase = new URLSearchParams(location.search).get('fase');
    return `<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header class="site-header">
      <div class="container">
        <a class="logo" href="index.html" aria-label="Fluindo — página inicial">${LOGO}</a>
        <button class="menu-toggle" aria-expanded="false" aria-controls="main-nav" aria-label="Abrir menu">${icon('menu')}</button>
        <nav class="main-nav" id="main-nav" aria-label="Principal">
          <ul>
            <li><a href="index.html"${a('home')}>Página inicial</a></li>
            <li class="nav-drop">
              <button class="nav-drop-btn${page === 'fases' ? ' active' : ''}" aria-expanded="false" aria-haspopup="true">Fases ${icon('chevronDown')}</button>
              <ul class="nav-drop-menu">
                ${PHASE_LINKS.map(([id, n]) => `<li><a href="fases.html?fase=${id}" class="${page === 'fases' && currentFase === id ? 'active' : ''}"><span class="dot ${id}"></span>${n}</a></li>`).join('')}
              </ul>
            </li>
            <li><a href="corpo.html"${a('corpo')}>Por dentro do seu corpo</a></li>
            <li><a href="hormonios.html"${a('hormonios')}>Hormônios e curiosidades</a></li>
            <li><a href="ultrassom.html"${a('ultrassom')}>Ultrassom</a></li>
            <li class="nav-cta"><a class="btn btn-sm" href="acompanhar.html"${page === 'acompanhar' ? ' aria-current="page"' : ''}>Acompanhar ciclo</a></li>
          </ul>
        </nav>
      </div>
    </header>`;
  }

  function footer() {
    return `<footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <h4>Fluindo</h4>
            <p>Educação sobre o ciclo menstrual com fisiologia e linguagem acessível. Entenda o seu corpo, fase por fase.</p>
            <p class="small">${icon('lock')} Seus dados do ciclo ficam salvos apenas neste navegador.</p>
          </div>
          <div>
            <h4>Fases</h4>
            <ul>${PHASE_LINKS.map(([id, n]) => `<li><a href="fases.html?fase=${id}">${n}</a></li>`).join('')}</ul>
          </div>
          <div>
            <h4>Aprenda</h4>
            <ul>
              <li><a href="corpo.html">Por dentro do seu corpo</a></li>
              <li><a href="hormonios.html">Hormônios e curiosidades</a></li>
              <li><a href="ultrassom.html">Ultrassom</a></li>
              <li><a href="acompanhar.html">Acompanhar ciclo</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          ${icon('alert')} Conteúdo educativo. Não substitui avaliação médica nem método contraceptivo. © ${new Date().getFullYear()} Fluindo
        </div>
      </div>
    </footer>
    <div class="toast" role="status" aria-live="polite"></div>`;
  }

  document.body.insertAdjacentHTML('afterbegin', header());
  document.body.insertAdjacentHTML('beforeend', footer());

  // Menu mobile
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    toggle.innerHTML = icon(open ? 'close' : 'menu');
  });

  // Dropdown "Fases"
  const drop = document.querySelector('.nav-drop');
  const dropBtn = drop.querySelector('.nav-drop-btn');
  const setDrop = (open) => { drop.classList.toggle('open', open); dropBtn.setAttribute('aria-expanded', String(open)); };
  dropBtn.addEventListener('click', (e) => { e.stopPropagation(); setDrop(!drop.classList.contains('open')); });
  if (window.matchMedia('(hover: hover) and (min-width: 961px)').matches) {
    drop.addEventListener('mouseenter', () => setDrop(true));
    drop.addEventListener('mouseleave', () => setDrop(false));
  }
  document.addEventListener('click', (e) => { if (!drop.contains(e.target)) setDrop(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setDrop(false); });

  // Animação de entrada
  function reveal(root = document) {
    const els = root.querySelectorAll('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.08 });
    els.forEach((el) => io.observe(el));
  }

  let toastTimer;
  function toast(msg) {
    const t = document.querySelector('.toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  }

  function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  window.Fluindo = { reveal, toast, escapeHTML, LOGO };

  document.addEventListener('DOMContentLoaded', () => { window.FluindoIcons.hydrate(); reveal(); });
})();
