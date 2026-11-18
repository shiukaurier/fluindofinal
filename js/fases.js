/* Fluindo — página das fases (renderização a partir de data-fases.js) */
(function () {
  const F = window.FluindoCycle;
  const I = window.FluindoIllu;
  const { icon, hydrate } = window.FluindoIcons;
  const DATA = window.FluindoFases;
  const root = document.getElementById('fase-root');

  function getPhase() {
    const p = new URLSearchParams(location.search).get('fase');
    return DATA[p] ? p : 'menstrual';
  }

  function arrow(dir) {
    if (dir === 'up') return icon('arrowUp', 'arrow');
    if (dir === 'down') return icon('arrowDown', 'arrow');
    return '';
  }

  function render(id) {
    const d = DATA[id];
    const s = F.store.getSettings();
    const est = s ? F.estimate(s) : null;
    const idx = F.ORDER.indexOf(id);
    const prev = F.ORDER[(idx + 3) % 4];
    const next = F.ORDER[(idx + 1) % 4];

    const tabs = F.ORDER.map((p) => `<a class="phase-tab${p === id ? ' active' : ''}" href="fases.html?fase=${p}" data-fase="${p}" ${p === id ? 'aria-current="page"' : ''}>
      <span class="dot ${p}"></span>${F.PHASES[p].name}${est && est.phase === p ? '<span class="you">você</span>' : ''}</a>`).join('');

    const bodyVisual = d.steps
      ? `<div class="steps">${d.steps().map(([svg, txt], i) => `<div class="step"><span class="step-num">${i + 1})</span><div class="step-box">${svg}</div><p>${i + 1}. ${txt}</p></div>`).join('')}</div>`
      : d.diagrams();

    root.innerHTML = `
    <section class="phase-hero page-hero">
      <div class="container">
        <nav class="phase-tabs" aria-label="Escolher fase">${tabs}</nav>
        <div class="grid-2">
          <div class="reveal">
            <p class="eyebrow">Fases da menstruação</p>
            <h1 class="display">${d.title}</h1>
            ${est && est.phase === id ? `<span class="phase-badge-current">${icon('sparkle')} Você está nesta fase hoje (dia ${est.day} do ciclo)</span><br>` : ''}
            <span class="phase-days">${icon('calendar')} ${d.days}</span>
            <p class="lead">${d.intro}</p>
          </div>
          <div class="hero-illu float reveal">${d.hero()}</div>
        </div>
      </div>
    </section>

    <section>
      <div class="container grid-2">
        <div class="reveal">
          <h2 class="section-title">O que acontece no corpo</h2>
          <p>${d.body}</p>
          ${bodyVisual}
        </div>
        <div class="reveal">
          <h2 class="section-title">Hormônios dessa fase</h2>
          <p>${d.hormonesIntro}</p>
          <div class="hormone-list">
            ${d.hormones.map((h) => `<div class="hormone-item">
              <div class="h-ico">${icon(h.icon)}${arrow(h.dir)}</div>
              <div><h4>${h.name}</h4><p>${h.text}</p></div>
            </div>`).join('')}
          </div>
          <div class="mini-graph">${I.miniHormoneGraph(d.focus, d.range)}
            <p class="small muted center">A faixa rosa marca esta fase em um ciclo de 28 dias. <a href="hormonios.html">Ver gráfico completo</a></p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container grid-2">
        <div class="reveal">
          <h2 class="section-title">Curiosidades sobre essa fase</h2>
          <ul class="curio-list">
            ${d.curiosities.map((c) => `<li><span class="curio-ico">${icon(c.icon)}</span><p>${c.title ? `<strong>${c.title}:</strong> ` : ''}${c.text}</p></li>`).join('')}
          </ul>
        </div>
        <div class="reveal">
          <h2 class="section-title">O que a gente sente ?</h2>
          <div class="feel-grid" role="group" aria-label="Sensações comuns nesta fase">
            ${d.feelings.map((f, i) => `<button type="button" class="feel" aria-pressed="false" data-i="${i}">${icon(f.icon)}${f.text}</button>`).join('')}
          </div>
          <p class="feel-note" aria-live="polite">Toque em uma sensação para entender o porquê.</p>
          <p class="important">${icon('alert')}<span><strong>Importante:</strong> esses sintomas variam muito entre as pessoas e podem ser mais leves ou intensos.</span></p>
        </div>
      </div>
    </section>

    <section>
      <div class="container grid-2" style="align-items:center">
        <div class="reveal">
          <h2 class="section-title">Dicas para se sentir bem</h2>
          <div class="tips-grid">
            ${d.tips.map((t) => `<div class="tip">${icon(t.icon)}<span>${t.title ? `<strong>${t.title}</strong>` : ''}${t.text}</span></div>`).join('')}
          </div>
        </div>
        <aside class="remember reveal">
          <h3>Lembre-se:</h3>
          <p>${d.remember}</p>
        </aside>
      </div>
    </section>

    <div class="container phase-pager">
      <a class="pager-link" href="fases.html?fase=${prev}" data-fase="${prev}"><small>← Fase anterior</small><strong>${F.PHASES[prev].name}</strong></a>
      <a class="pager-link next" href="fases.html?fase=${next}" data-fase="${next}"><small>Próxima fase →</small><strong>${F.PHASES[next].name}</strong></a>
    </div>`;

    document.title = `${d.title} — Fluindo`;
    document.querySelectorAll('.nav-drop-menu a').forEach((a) => a.classList.toggle('active', a.href.endsWith(`fase=${id}`)));

    // sensações interativas
    const note = root.querySelector('.feel-note');
    root.querySelectorAll('.feel').forEach((b) => b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      root.querySelectorAll('.feel').forEach((x) => x.setAttribute('aria-pressed', 'false'));
      b.setAttribute('aria-pressed', String(on));
      note.textContent = on ? d.feelings[b.dataset.i].note : 'Toque em uma sensação para entender o porquê.';
    }));

    hydrate(root);
    window.Fluindo.reveal(root);
  }

  // navegação entre fases sem recarregar
  root.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-fase]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    history.pushState({}, '', a.href);
    render(a.dataset.fase);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('popstate', () => render(getPhase()));

  render(getPhase());
})();
