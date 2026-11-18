/* Fluindo — formulário de acompanhamento, resultado e calendário */
(function () {
  const F = window.FluindoCycle;
  const { icon } = window.FluindoIcons;
  const MONTHS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const DOW = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const PHASE_TEXT = {
    menstrual: 'O endométrio está descamando e os hormônios estão nos níveis mais baixos. Descanso e calor ajudam.',
    folicular: 'O estrogênio sobe e um folículo cresce no ovário. É comum sentir mais energia e disposição.',
    ovulacao: 'O pico de LH libera o óvulo. Este é o momento mais fértil do ciclo.',
    lutea: 'O corpo lúteo produz progesterona. Perto do fim, podem surgir sinais de TPM.',
  };

  /* ---------- Calendário ---------- */
  class Calendar {
    constructor(el, opts = {}) {
      this.el = el;
      this.opts = opts;
      const t = F.today();
      this.year = t.getFullYear();
      this.month = t.getMonth();
      this.selected = opts.selected || null;
      el.addEventListener('click', (e) => {
        const nav = e.target.closest('[data-cal-nav]');
        if (nav) { this.shift(Number(nav.dataset.calNav)); return; }
        const day = e.target.closest('button.cal-day');
        if (day && this.opts.onSelect) { this.selected = day.dataset.date; this.render(); this.opts.onSelect(day.dataset.date); }
      });
    }
    shift(n) {
      this.month += n;
      if (this.month < 0) { this.month = 11; this.year--; }
      if (this.month > 11) { this.month = 0; this.year++; }
      this.render();
    }
    goTo(date) { this.year = date.getFullYear(); this.month = date.getMonth(); this.render(); }
    render() {
      const settings = F.store.getSettings();
      const diary = this.opts.showDiary ? F.store.getDiary() : {};
      const first = new Date(this.year, this.month, 1);
      const daysIn = new Date(this.year, this.month + 1, 0).getDate();
      const todayISO = F.toISO(F.today());
      const selectable = !!this.opts.onSelect;
      let cells = DOW.map((d, i) => `<div class="cal-dow" aria-hidden="true" title="${['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'][i]}">${d}</div>`).join('');
      for (let i = 0; i < first.getDay(); i++) cells += '<div class="cal-day empty"></div>';
      for (let d = 1; d <= daysIn; d++) {
        const date = new Date(this.year, this.month, d);
        const iso = F.toISO(date);
        const info = settings ? F.infoForDate(settings, date) : null;
        const cls = ['cal-day'];
        let desc = `${d} de ${MONTHS[this.month]}`;
        if (info) {
          cls.push(`ph-${info.phase}`);
          if (info.fertile) cls.push('fertile');
          if (info.predicted) cls.push('predicted');
          desc += `, dia ${info.day} do ciclo, ${F.PHASES[info.phase].name}${info.fertile ? ', janela fértil' : ''}${info.predicted ? ' (previsão)' : ''}`;
        }
        if (iso === todayISO) { cls.push('today'); desc += ', hoje'; }
        if (this.selected === iso) cls.push('selected');
        const note = diary[iso] ? '<span class="has-note" aria-hidden="true"></span>' : '';
        if (diary[iso]) desc += ', com anotação';
        cells += selectable
          ? `<button type="button" class="${cls.join(' ')}" data-date="${iso}" aria-label="${desc}" ${this.selected === iso ? 'aria-pressed="true"' : ''}>${d}${note}</button>`
          : `<div class="${cls.join(' ')}" title="${desc}" aria-label="${desc}" role="gridcell">${d}${note}</div>`;
      }
      this.el.innerHTML = `<div class="calendar">
        <div class="cal-head">
          <button type="button" class="cal-nav" data-cal-nav="-1" aria-label="Mês anterior">${icon('chevronLeft')}</button>
          <h4 aria-live="polite">${MONTHS[this.month]} ${this.year}</h4>
          <button type="button" class="cal-nav" data-cal-nav="1" aria-label="Próximo mês">${icon('chevronRight')}</button>
        </div>
        <div class="cal-grid" role="grid">${cells}</div>
        <div class="cal-legend">
          <span><i class="lg menstrual"></i>Menstruação</span><span><i class="lg folicular"></i>Folicular</span>
          <span><i class="lg ovulacao"></i>Ovulação</span><span><i class="lg lutea"></i>Lútea</span>
          <span><i class="lg fertile"></i>Janela fértil</span><span><i class="lg today"></i>Hoje</span>
        </div>
      </div>`;
    }
  }

  /* ---------- Resultado ---------- */
  function ring(day, total) {
    const r = 54, c = 2 * Math.PI * r;
    const pct = day && total ? day / total : 0;
    return `<svg viewBox="0 0 112 112" aria-hidden="true"><circle cx="56" cy="56" r="${r}" fill="none" stroke="#ffdfdf" stroke-width="4"/>
      <circle cx="56" cy="56" r="${r}" fill="none" stroke="#e46a6b" stroke-width="4" stroke-linecap="round" stroke-dasharray="${(c * pct).toFixed(1)} ${c.toFixed(1)}"/></svg>`;
  }

  function resultHTML(est) {
    if (!est) {
      return `<div class="result-top">
          <div class="day-ring">${ring(0, 0)}<div><div class="num">--</div><div class="lbl">dia do ciclo</div></div></div>
          <div>
            <div class="result-title">Fase estimada</div>
            <div class="result-phase">Informe seus dados</div>
            <p class="small muted">Preencha ao lado para ver a estimativa do seu dia atual.</p>
            <a class="btn btn-sm btn-secondary" href="fases.html?fase=menstrual">Fase da menstruação</a>
          </div>
        </div>
        <div><div class="result-title">Calendário do ciclo</div>
          <div class="empty-state">${icon('calendar')}Preencha a data do último ciclo para visualizar o calendário do mês.</div>
        </div>`;
    }
    const P = F.PHASES[est.phase];
    const next = est.daysToNext === 0 ? 'hoje' : est.daysToNext === 1 ? 'amanhã' : `em ${est.daysToNext} dias`;
    return `<div class="result-top">
        <div class="day-ring">${ring(est.day, est.cycleLength)}<div><div class="num">${est.day}</div><div class="lbl">de ${est.cycleLength} dias</div></div></div>
        <div>
          <div class="result-title">Fase estimada</div>
          <div class="result-phase"><span class="dot ${est.phase}"></span> ${P.name}</div>
          <p class="small">${PHASE_TEXT[est.phase]}${est.fertile && est.phase !== 'ovulacao' ? ' Você está na janela fértil estimada.' : ''}</p>
          <a class="btn btn-sm btn-secondary" href="fases.html?fase=${est.phase}">Entender esta fase ${icon('arrowRight')}</a>
        </div>
      </div>
      <div class="result-meta">
        <div class="meta-item">Próxima menstruação<strong>${F.formatShort(est.nextPeriod)} · ${next}</strong></div>
        <div class="meta-item">Ovulação estimada<strong>${F.formatShort(est.ovulationDate)}</strong></div>
        <div class="meta-item">Janela fértil<strong>${F.formatShort(est.fertileStart)} – ${F.formatShort(est.fertileEnd)}</strong></div>
      </div>
      <div><div class="result-title">Calendário do ciclo</div><div class="cal-slot"></div></div>`;
  }

  /* ---------- Montagem ---------- */
  function mount(root, opts = {}) {
    const s = F.store.getSettings() || {};
    const maxDate = F.toISO(F.today());
    root.innerHTML = `<div class="tracker-grid">
      <form class="card form-card" novalidate aria-label="Dados do ciclo">
        <div class="field">
          <label for="tk-last">Primeiro dia da última menstruação</label>
          <input class="input" type="date" id="tk-last" name="lastPeriod" max="${maxDate}" value="${s.lastPeriod || ''}" required aria-describedby="err-lastPeriod">
          <span class="field-error" id="err-lastPeriod"></span>
        </div>
        <div class="field">
          <label for="tk-cycle">Duração média do ciclo (dias)</label>
          <input class="input" type="number" inputmode="numeric" id="tk-cycle" name="cycleLength" min="21" max="45" placeholder="ex: 28" value="${s.cycleLength || ''}" required aria-describedby="err-cycleLength">
          <span class="field-error" id="err-cycleLength"></span>
        </div>
        <div class="field">
          <label for="tk-period">Duração da menstruação (dias)</label>
          <input class="input" type="number" inputmode="numeric" id="tk-period" name="periodLength" min="2" max="10" placeholder="ex: 5" value="${s.periodLength || ''}" required aria-describedby="err-periodLength">
          <span class="field-error" id="err-periodLength"></span>
        </div>
        <div class="form-actions">
          <button class="btn btn-secondary" type="submit">Ver minha fase</button>
          <button class="btn btn-ghost btn-sm" type="button" data-action="clear" ${s.lastPeriod ? '' : 'hidden'}>Apagar dados</button>
        </div>
        <p class="small muted center">${icon('lock')} Seus dados ficam apenas neste dispositivo.</p>
      </form>
      <div class="card result-card" aria-live="polite"></div>
    </div>`;

    const form = root.querySelector('form');
    const result = root.querySelector('.result-card');
    let cal = null;

    function render() {
      const settings = F.store.getSettings();
      const est = settings ? F.estimate(settings) : null;
      result.innerHTML = resultHTML(est);
      form.querySelector('[data-action="clear"]').hidden = !settings;
      const slot = result.querySelector('.cal-slot');
      if (slot) {
        const prevSel = cal ? cal.selected : opts.selected;
        cal = new Calendar(slot, { onSelect: opts.onSelect, showDiary: opts.showDiary, selected: prevSel });
        cal.render();
      } else cal = null;
      if (opts.onRender) opts.onRender(est);
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      const v = F.validate(data);
      ['lastPeriod', 'cycleLength', 'periodLength'].forEach((k) => {
        const msg = v.errors[k] || '';
        form.querySelector(`#err-${k}`).textContent = msg;
        form.querySelector(`[name="${k}"]`).setAttribute('aria-invalid', msg ? 'true' : 'false');
      });
      if (!v.ok) { form.querySelector('[aria-invalid="true"]').focus(); return; }
      F.store.saveSettings({ lastPeriod: data.lastPeriod, cycleLength: v.cl, periodLength: v.pl });
      window.Fluindo.toast('Ciclo atualizado!');
    });

    form.querySelector('[data-action="clear"]').addEventListener('click', () => {
      if (!confirm('Apagar todos os dados do ciclo e do diário salvos neste dispositivo?')) return;
      F.store.clearAll();
      form.reset();
      form.querySelectorAll('input').forEach((i) => { i.value = ''; });
      window.Fluindo.toast('Dados apagados.');
    });

    document.addEventListener('fluindo:cycle-change', () => {
      const st = F.store.getSettings();
      if (st) {
        form.lastPeriod.value = st.lastPeriod; form.cycleLength.value = st.cycleLength; form.periodLength.value = st.periodLength;
      }
      render();
    });
    render();
    return { render, get calendar() { return cal; } };
  }

  window.FluindoTracker = { mount, Calendar, PHASE_TEXT };
})();
