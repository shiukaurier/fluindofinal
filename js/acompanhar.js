/* Fluindo — página de acompanhamento: diário, previsões e histórico */
(function () {
  const F = window.FluindoCycle;
  const { icon, hydrate } = window.FluindoIcons;
  const { escapeHTML, toast } = window.Fluindo;

  const FLOW = ['Nenhum', 'Leve', 'Moderado', 'Intenso'];
  const MOOD = ['Feliz', 'Calma', 'Sensível', 'Irritada', 'Ansiosa', 'Triste'];
  const SYMPTOMS = ['Cólica', 'Cansaço', 'Dor de cabeça', 'Inchaço', 'Acne', 'Seios sensíveis', 'Desejo por doces', 'Insônia', 'Muita energia', 'Libido alta', 'Muco clara de ovo', 'Dor nas costas'];

  let selected = F.toISO(F.today());
  const diaryEl = document.getElementById('diary');

  const tracker = window.FluindoTracker.mount(document.getElementById('tracker'), {
    showDiary: true,
    selected,
    onSelect(date) { selected = date; renderDiary(); diaryEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); },
    onRender() { renderDiary(); renderPredictions(); renderHistory(); },
  });

  function chips(name, list, current, multi) {
    return `<div class="chip-group" role="group" aria-label="${name}">${list.map((v) => {
      const on = multi ? (current || []).includes(v) : current === v;
      return `<button type="button" class="chip" data-group="${name}" data-value="${escapeHTML(v)}" aria-pressed="${on}">${escapeHTML(v)}</button>`;
    }).join('')}</div>`;
  }

  function renderDiary() {
    const date = F.parseISO(selected);
    const entry = F.store.getDiary()[selected] || {};
    const settings = F.store.getSettings();
    const info = settings ? F.infoForDate(settings, date) : null;
    diaryEl.innerHTML = `
      <div>
        <h3 style="margin-bottom:.2rem">Diário · ${F.formatLong(date)}</h3>
        <p class="small muted" style="margin:0">${info ? `Dia ${info.day} do ciclo · ${F.PHASES[info.phase].name}${info.fertile ? ' · janela fértil' : ''}` : 'Preencha seus dados para ver a fase deste dia.'}</p>
      </div>
      <div class="field"><label>Fluxo</label>${chips('flow', FLOW, entry.flow, false)}</div>
      <div class="field"><label>Humor</label>${chips('mood', MOOD, entry.mood, false)}</div>
      <div class="field"><label>Sintomas</label>${chips('symptoms', SYMPTOMS, entry.symptoms, true)}</div>
      <div class="field"><label for="diary-note">Anotação</label><textarea class="input" id="diary-note" maxlength="500" placeholder="Como você se sentiu hoje?"></textarea></div>
      <div class="form-actions" style="justify-content:flex-start">
        <button type="button" class="btn btn-secondary" data-act="save">${icon('check')} Salvar dia</button>
        ${Object.keys(entry).length ? `<button type="button" class="btn btn-ghost btn-sm" data-act="remove">${icon('trash')} Limpar dia</button>` : ''}
        <button type="button" class="btn btn-ghost btn-sm" data-act="period">${icon('drop')} Minha menstruação começou neste dia</button>
      </div>`;
    diaryEl.querySelector('#diary-note').value = entry.note || '';
  }

  diaryEl.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (chip) {
      const group = chip.dataset.group;
      if (group === 'symptoms') chip.setAttribute('aria-pressed', String(chip.getAttribute('aria-pressed') !== 'true'));
      else {
        const was = chip.getAttribute('aria-pressed') === 'true';
        diaryEl.querySelectorAll(`.chip[data-group="${group}"]`).forEach((c) => c.setAttribute('aria-pressed', 'false'));
        chip.setAttribute('aria-pressed', String(!was));
      }
      return;
    }
    const act = e.target.closest('[data-act]');
    if (!act) return;
    if (act.dataset.act === 'save') {
      const pick = (g) => [...diaryEl.querySelectorAll(`.chip[data-group="${g}"][aria-pressed="true"]`)].map((c) => c.dataset.value);
      const entry = { flow: pick('flow')[0] || '', mood: pick('mood')[0] || '', symptoms: pick('symptoms'), note: diaryEl.querySelector('#diary-note').value.trim().slice(0, 500) };
      F.store.saveDiaryEntry(selected, entry);
      toast('Dia salvo no diário.');
      tracker.render();
    } else if (act.dataset.act === 'remove') {
      F.store.saveDiaryEntry(selected, null);
      toast('Anotações do dia removidas.');
      tracker.render();
    } else if (act.dataset.act === 'period') {
      const s = F.store.getSettings();
      if (!s) { toast('Preencha a duração do ciclo e da menstruação primeiro.'); document.getElementById('tk-cycle').focus(); return; }
      if (F.parseISO(selected) > F.today()) { toast('Escolha um dia que já passou.'); return; }
      F.store.saveSettings({ ...s, lastPeriod: selected });
      toast('Novo ciclo registrado!');
    }
  });

  function renderPredictions() {
    const el = document.getElementById('predictions');
    const s = F.store.getSettings();
    const est = s ? F.estimate(s) : null;
    if (!est) { el.innerHTML = `<div class="empty-state">${icon('calendar')}As previsões aparecem depois que você informar seus dados.</div>`; return; }
    const ov = F.ovulationDay(est.cycleLength);
    let html = '<div class="predictions">';
    for (let i = 0; i < 3; i++) {
      const start = F.addDays(est.nextPeriod, i * est.cycleLength);
      const ovd = F.addDays(start, ov - 1);
      html += `<div class="pred"><span class="small">Menstruação ${i + 1}</span><strong>${F.formatShort(start)}</strong><span class="small">Ovulação estimada: ${F.formatShort(ovd)}</span></div>`;
    }
    el.innerHTML = `${html}</div>`;
  }

  function renderHistory() {
    const el = document.getElementById('history');
    const cur = F.store.getSettings();
    const h = [...new Set([...F.store.getHistory(), ...(cur ? [cur.lastPeriod] : [])])].sort().reverse();
    if (!h.length) { el.innerHTML = `<div class="empty-state">${icon('drop')}Cada data de início que você salvar aparece aqui.</div>`; return; }
    const avg = F.averageFromHistory(h);
    const s = F.store.getSettings();
    el.innerHTML = `<ul class="history-list">${h.map((d) => `<li><span>${icon('drop')} ${F.formatLong(F.parseISO(d))}</span><button type="button" class="icon-btn" data-del="${d}" aria-label="Remover ${d} do histórico">${icon('trash')}</button></li>`).join('')}</ul>
      ${avg ? `<p class="small" style="margin-top:.8rem">Média calculada: <strong>${avg.avg} dias</strong> (${avg.count} ${avg.count === 1 ? 'intervalo' : 'intervalos'}).
        ${s && s.cycleLength !== avg.avg ? `<button type="button" class="btn btn-sm btn-ghost" data-use-avg="${avg.avg}">Usar ${avg.avg} dias</button>` : ''}</p>` : '<p class="small muted" style="margin-top:.8rem">Registre pelo menos duas menstruações para calcular a duração média do seu ciclo.</p>'}`;
  }

  document.getElementById('history').addEventListener('click', (e) => {
    const del = e.target.closest('[data-del]');
    if (del) { F.store.removeHistory(del.dataset.del); renderHistory(); return; }
    const use = e.target.closest('[data-use-avg]');
    if (use) {
      const s = F.store.getSettings();
      const v = F.validate({ ...s, cycleLength: use.dataset.useAvg });
      if (!v.ok) { toast(Object.values(v.errors)[0]); return; }
      F.store.saveSettings({ ...s, cycleLength: v.cl });
      toast('Duração média atualizada.');
    }
  });

  document.getElementById('export').addEventListener('click', () => {
    const data = { exportadoEm: new Date().toISOString(), ciclo: F.store.getSettings(), historico: F.store.getHistory(), diario: F.store.getDiary() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `fluindo-dados-${F.toISO(F.today())}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });
  document.getElementById('wipe').addEventListener('click', () => {
    if (!confirm('Apagar todos os dados do ciclo, histórico e diário deste dispositivo?')) return;
    F.store.clearAll();
    toast('Dados apagados.');
  });

  hydrate();
})();
