/* Fluindo — página inicial */
(function () {
  const F = window.FluindoCycle;
  const I = window.FluindoIllu;

  const CARDS = [
    ['menstrual', 'Dia 1 – 5', 'Fase menstrual', 'O endométrio é descamado e os hormônios estão nos níveis mais baixos. É o recomeço do ciclo.'],
    ['folicular', 'Dia 6 – 13', 'Fase folicular', 'O estradiol sobe e um folículo cresce no ovário, reconstruindo o endométrio.'],
    ['ovulacao', 'Dia 14', 'Ovulação', 'Um pico de LH libera o óvulo maduro — o momento mais fértil do ciclo.'],
    ['lutea', 'Dia 15 – 28', 'Fase lútea', 'O corpo lúteo produz progesterona e mantém o endométrio pronto para uma possível gestação.'],
  ];

  function currentEstimate() {
    const s = F.store.getSettings();
    return s ? F.estimate(s) : null;
  }

  /* Roda do ciclo */
  const wheel = document.getElementById('wheel');
  const info = document.getElementById('wheel-info');
  function renderWheel() {
    const est = currentEstimate();
    // a roda usa o modelo de 28 dias; ajusta o dia da usuária proporcionalmente
    const wheelDay = est ? Math.min(28, Math.max(1, Math.round((est.day / est.cycleLength) * 28))) : null;
    wheel.innerHTML = I.cycleWheel(wheelDay);
    if (est) info.innerHTML = `Hoje você está no <strong>dia ${est.day}</strong> do ciclo, na <strong>${F.PHASES[est.phase].name}</strong>.`;
  }
  function selectDay(g) {
    wheel.querySelectorAll('.wheel-day.sel').forEach((x) => x.classList.remove('sel'));
    g.classList.add('sel');
    const d = Number(g.dataset.day);
    const ph = F.PHASES[g.dataset.phase];
    wheel.querySelector('#wheel-center-day').textContent = d;
    wheel.querySelector('#wheel-center-label').textContent = ph.short;
    info.innerHTML = `<strong>Dia ${d}</strong> — ${ph.name}. ${window.FluindoTracker.PHASE_TEXT[ph.id]} <a href="fases.html?fase=${ph.id}">Saiba mais</a>`;
  }
  wheel.addEventListener('click', (e) => { const g = e.target.closest('.wheel-day'); if (g) selectDay(g); });
  wheel.addEventListener('keydown', (e) => {
    const g = e.target.closest('.wheel-day');
    if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); selectDay(g); }
  });

  /* Miniaturas */
  document.getElementById('phase-strip').innerHTML = F.ORDER.map((id) => `<figure>${I.phaseThumb(id)}<figcaption>${F.PHASES[id].short}<br><span class="muted">${F.PHASES[id].days}</span></figcaption></figure>`).join('');

  /* Cards das fases */
  const cardsEl = document.getElementById('phase-cards');
  function renderCards() {
    const est = currentEstimate();
    cardsEl.innerHTML = CARDS.map(([id, days, title, text]) => `
      <article class="card phase-card reveal in${est && est.phase === id ? ' is-current' : ''}" style="--phase-color:${F.PHASES[id].color}">
        ${est && est.phase === id ? '<span class="current-badge">Você está aqui</span>' : ''}
        <span class="tag">${days}</span>
        <h3>${title}</h3>
        <p>${text}</p>
        <a class="btn btn-sm" href="fases.html?fase=${id}">Explorar</a>
      </article>`).join('');
  }

  window.FluindoTracker.mount(document.getElementById('tracker'));
  renderWheel();
  renderCards();
  document.addEventListener('fluindo:cycle-change', () => { renderWheel(); renderCards(); });
})();
