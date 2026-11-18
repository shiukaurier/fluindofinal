/* Fluindo — gráfico interativo dos hormônios */
(function () {
  const F = window.FluindoCycle;
  const I = window.FluindoIllu;
  const C = I.C;
  const W = 960, H = 520, L = 150, R = 935;
  const X = (d) => L + (d / 28) * (R - L);
  const HY0 = 330, HY1 = 140; // área dos hormônios
  const Y = (v) => HY0 - v * (HY0 - HY1);
  const visible = { fsh: true, lh: true, estrogeno: true, progesterona: true };
  const FONT = 'font-family="Montserrat, sans-serif"';

  const wrapEl = document.getElementById('chart-wrap');
  const tip = document.getElementById('chart-tooltip');
  const slider = document.getElementById('day-slider');
  const sliderDay = document.getElementById('slider-day');
  const summary = document.getElementById('day-summary');
  let svg;

  function curve(k) {
    let d = '';
    for (let i = 0; i <= 112; i++) { const day = i / 4; d += `${i ? 'L' : 'M'}${X(day).toFixed(1)} ${Y(F.hormones(day)[k]).toFixed(1)}`; }
    return d;
  }

  function build() {
    let s = `<rect width="${W}" height="${H}" fill="${C.cream}"/>`;
    const txt = (x, y, t, o = '') => `<text x="${x}" y="${y}" ${FONT} font-size="13" fill="${C.wine}" ${o}>${t}</text>`;
    // rótulos de fase
    s += txt((X(0) + X(14)) / 2, 22, 'fase folicular', 'text-anchor="middle" font-weight="700"');
    s += txt((X(14) + X(28)) / 2, 22, 'fase lútea', 'text-anchor="middle" font-weight="700"');
    s += txt(X(2.5), 44, 'menstruação', 'text-anchor="middle" font-size="12"');
    s += txt(X(14), 44, 'ovulação', 'text-anchor="middle" font-size="12"');
    s += `<rect x="${X(0)}" y="52" width="${X(5) - X(0)}" height="${445 - 52}" fill="${C.coral}" opacity=".07"/>`;
    [5, 14].forEach((d) => { s += `<path d="M${X(d)} 52 V445" stroke="${C.wine}" stroke-width="1.5"/>`; });
    // rótulos de linhas
    s += txt(10, 86, '<tspan x="10">desenvolvimento</tspan><tspan x="10" dy="15">folicular</tspan>', 'font-size="12"');
    s += txt(10, 220, '<tspan x="10">níveis hormonais</tspan><tspan x="10" dy="15">da hipófise</tspan><tspan x="10" dy="15">e dos ovários</tspan>', 'font-size="12"');
    s += txt(10, 395, '<tspan x="10">ciclo</tspan><tspan x="10" dy="15">endometrial</tspan>', 'font-size="12"');
    // desenvolvimento folicular
    [[1, 5], [3, 6], [5, 7], [7, 8.5], [9, 10], [11, 12], [13, 14]].forEach(([d, r]) => { s += I.follicle(X(d), 92, r); });
    s += `<path d="M${X(14.3) - 9} 84 a12 12 0 1 0 18 0" fill="${C.pinkLight}" stroke="${C.plum}" stroke-width="1.3"/>` + I.egg(X(15) + 4, 70, 4);
    [[16.5, 10], [18.5, 14], [20.5, 16], [22.5, 16], [24.5, 13], [26.3, 9]].forEach(([d, r]) => { s += I.luteum(X(d), 92, r); });
    s += `<circle cx="${X(27.8)}" cy="92" r="5" fill="#fbf6e8" stroke="#cdbf9c"/>`;
    // grade
    [0.25, 0.5, 0.75, 1].forEach((v) => { s += `<path d="M${L} ${Y(v)} H${R}" stroke="${C.rose}" stroke-width=".6" stroke-dasharray="3 5"/>`; });
    // curvas
    Object.entries(F.HORMONES).forEach(([k, h]) => {
      s += `<path class="h-curve" data-h="${k}" d="${curve(k)}" fill="none" stroke="${h.color}" stroke-width="3" stroke-linecap="round"${visible[k] ? '' : ' style="display:none"'}/>`;
    });
    // rótulos das curvas
    const lab = [['fsh', 2.2, -10], ['lh', 13.6, -10], ['estrogeno', 9.5, -10], ['progesterona', 21.5, -12]];
    lab.forEach(([k, d, dy]) => {
      if (!visible[k]) return;
      s += `<text x="${X(d)}" y="${Y(F.hormones(d)[k]) + dy}" ${FONT} font-size="12" font-weight="700" fill="${F.HORMONES[k].color}" text-anchor="middle" paint-order="stroke" stroke="${C.cream}" stroke-width="4">${F.HORMONES[k].name}</text>`;
    });
    // endométrio
    s += `<rect x="${L}" y="430" width="${R - L}" height="14" fill="${C.wine}"/>`;
    for (let i = 0; i < 56; i++) {
      const day = i / 2 + 0.25;
      const h = 10 + F.endometrium(day) * 64;
      const x = X(i / 2) + 1;
      const w = X(0.5) - X(0) - 2;
      const shed = day < 5;
      s += `<rect x="${x.toFixed(1)}" y="${(430 - h).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="${(w / 2).toFixed(1)}" fill="${shed ? C.coral : C.salmon}" stroke="${C.plum}" stroke-width=".6" opacity="${shed ? 0.85 : 1}"/>`;
    }
    for (let d = 0.5; d < 5; d += 1) s += I.drop(X(d), 418, 0.45, C.red);
    // eixo X
    s += `<path d="M${L} 448 H${R}" stroke="${C.wine}" stroke-width="1.2"/>`;
    for (let d = 0; d <= 28; d += 2) s += `<path d="M${X(d)} 448 v6" stroke="${C.wine}"/>${txt(X(d), 470, d, 'text-anchor="middle" font-size="12"')}`;
    s += txt((L + R) / 2, 498, 'dias do ciclo menstrual', 'text-anchor="middle" font-size="13"');
    // cursor
    s += `<g id="cursor"><path id="cursor-line" d="M0 52 V445" stroke="${C.plum}" stroke-width="1.5" stroke-dasharray="5 4"/>
      ${Object.keys(F.HORMONES).map((k) => `<circle class="cursor-dot" data-h="${k}" r="6" fill="${F.HORMONES[k].color}" stroke="#fff" stroke-width="2"/>`).join('')}</g>`;
    s += `<rect id="hit" x="${L}" y="40" width="${R - L}" height="420" fill="transparent" style="cursor:crosshair"/>`;
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Gráfico do ciclo menstrual com desenvolvimento folicular, níveis de FSH, LH, estrogênio e progesterona, e espessura do endométrio ao longo de 28 dias">${s}</svg>`;
  }

  function describe(day) {
    const ph = F.phaseForDay(day, 28, 5);
    const parts = {
      menstrual: 'O endométrio descama e estrogênio e progesterona estão baixos. O FSH começa a subir para recrutar novos folículos.',
      folicular: 'O folículo dominante cresce e produz cada vez mais estrogênio, que reconstrói o endométrio.',
      ovulacao: 'O pico de LH (com um pico menor de FSH) faz o folículo romper e liberar o óvulo.',
      lutea: 'O corpo lúteo produz progesterona, que deixa o endométrio secretor e eleva a temperatura basal.',
    };
    let extra = '';
    if (day === 13) extra = ' O estrogênio está no auge e dispara o pico de LH.';
    if (day >= 20 && day <= 23) extra = ' A progesterona está perto do pico.';
    if (day >= 25) extra = ' Sem gravidez, o corpo lúteo regride e os hormônios caem: a menstruação se aproxima.';
    return `<strong>Dia ${day} · ${F.PHASES[ph].name}.</strong> ${parts[ph]}${extra}`;
  }

  function setDay(day, showTip, clientX) {
    day = Math.min(28, Math.max(1, Math.round(day)));
    const x = X(day - 0.5);
    svg.querySelector('#cursor-line').setAttribute('d', `M${x} 52 V445`);
    const h = F.hormones(day - 0.5);
    svg.querySelectorAll('.cursor-dot').forEach((c) => {
      c.setAttribute('cx', x); c.setAttribute('cy', Y(h[c.dataset.h]));
      c.style.display = visible[c.dataset.h] ? '' : 'none';
    });
    slider.value = day; sliderDay.textContent = day;
    summary.innerHTML = describe(day);
    const rows = Object.entries(F.HORMONES).filter(([k]) => visible[k])
      .map(([k, o]) => `<div class="row"><span><span class="h-dot" style="width:9px;height:9px;background:${o.color}"></span> ${o.name}</span><span>${F.level(h[k])}</span></div>`).join('');
    tip.innerHTML = `<b>Dia ${day}</b>${rows}<div class="row" style="margin-top:.2rem;opacity:.8"><span>Endométrio</span><span>${F.level(F.endometrium(day))}</span></div>`;
    if (showTip) {
      const rect = wrapEl.getBoundingClientRect();
      const px = clientX !== undefined ? clientX - rect.left : (x / W) * rect.width;
      tip.style.left = `${Math.min(rect.width - 95, Math.max(95, px))}px`;
      tip.style.top = `${(150 / H) * rect.height}px`;
      tip.classList.add('show');
    } else tip.classList.remove('show');
  }

  function dayFromEvent(e) {
    const pt = svg.createSVGPoint();
    const src = e.touches ? e.touches[0] : e;
    pt.x = src.clientX; pt.y = src.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    return { day: ((p.x - L) / (R - L)) * 28 + 0.5, clientX: src.clientX };
  }

  function render() {
    const old = wrapEl.querySelector('svg');
    if (old) old.remove();
    wrapEl.insertAdjacentHTML('afterbegin', build());
    svg = wrapEl.querySelector('svg');
    const hit = svg.querySelector('#hit');
    const move = (e) => { const r = dayFromEvent(e); setDay(r.day, true, r.clientX); };
    hit.addEventListener('mousemove', move);
    hit.addEventListener('touchstart', move, { passive: true });
    hit.addEventListener('touchmove', move, { passive: true });
    hit.addEventListener('mouseleave', () => tip.classList.remove('show'));
    hit.addEventListener('touchend', () => setTimeout(() => tip.classList.remove('show'), 1500));
    setDay(Number(slider.value), false);
  }

  // botões de hormônios
  document.getElementById('chart-toggles').innerHTML = Object.entries(F.HORMONES)
    .map(([k, h]) => `<button type="button" class="toggle-chip" data-h="${k}" aria-pressed="true"><span class="h-dot" style="width:10px;height:10px;background:${h.color}"></span>${h.name}</button>`).join('');
  document.getElementById('chart-toggles').addEventListener('click', (e) => {
    const b = e.target.closest('.toggle-chip');
    if (!b) return;
    const k = b.dataset.h;
    const on = Object.values(visible).filter(Boolean).length;
    if (visible[k] && on === 1) return; // mantém pelo menos um
    visible[k] = !visible[k];
    b.setAttribute('aria-pressed', String(visible[k]));
    render();
  });
  slider.addEventListener('input', () => setDay(Number(slider.value), false));

  // abre no dia atual da usuária (convertido para o modelo de 28 dias)
  const st = F.store.getSettings();
  const est = st ? F.estimate(st) : null;
  if (est) slider.value = Math.min(28, Math.max(1, Math.round((est.day / est.cycleLength) * 28)));
  render();
})();
