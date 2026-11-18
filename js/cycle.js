/* Fluindo — lógica do ciclo, hormônios e armazenamento local */
(function () {
  const PHASES = {
    menstrual: { id: 'menstrual', name: 'Fase Menstrual', short: 'Menstruação', color: '#e46a6b', days: 'Dia 1 – 5' },
    folicular: { id: 'folicular', name: 'Fase Folicular', short: 'Folicular', color: '#f49a96', days: 'Dia 6 – 13' },
    ovulacao: { id: 'ovulacao', name: 'Ovulação', short: 'Ovulação', color: '#8e1c52', days: 'Dia 14' },
    lutea: { id: 'lutea', name: 'Fase Lútea', short: 'Lútea', color: '#f3c969', days: 'Dia 15 – 28' },
  };
  const ORDER = ['menstrual', 'folicular', 'ovulacao', 'lutea'];

  /* ---------- Datas ---------- */
  const DAY = 86400000;
  function parseISO(s) {
    if (!s || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
    const [y, m, d] = s.split('-').map(Number);
    const dt = new Date(y, m - 1, d);
    if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d) return null;
    return dt;
  }
  function toISO(d) {
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }
  function today() { const t = new Date(); return new Date(t.getFullYear(), t.getMonth(), t.getDate()); }
  function addDays(d, n) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }
  function diffDays(a, b) { return Math.round((a - b) / DAY); }
  const fmt = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' });
  const fmtLong = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  function formatShort(d) { return fmt.format(d).replace('.', ''); }
  function formatLong(d) { return fmtLong.format(d); }

  /* ---------- Fase por dia ----------
     Modelo educativo: fase lútea ≈ 14 dias, ovulação = duração − 14.
  */
  function ovulationDay(cycleLength) { return Math.max(8, cycleLength - 14); }

  function phaseForDay(day, cycleLength = 28, periodLength = 5) {
    const ov = ovulationDay(cycleLength);
    const pl = Math.min(periodLength, ov - 1);
    if (day <= pl) return 'menstrual';
    if (day < ov) return 'folicular';
    if (day === ov) return 'ovulacao';
    return 'lutea';
  }

  function isFertile(day, cycleLength) {
    const ov = ovulationDay(cycleLength);
    return day >= ov - 5 && day <= ov + 1;
  }

  function validate(input) {
    const errors = {};
    const last = parseISO(input.lastPeriod);
    const cl = Number(input.cycleLength);
    const pl = Number(input.periodLength);
    if (!last) errors.lastPeriod = 'Informe uma data válida.';
    else if (last > today()) errors.lastPeriod = 'A data não pode estar no futuro.';
    else if (diffDays(today(), last) > 365) errors.lastPeriod = 'Use uma data dos últimos 12 meses.';
    if (!Number.isInteger(cl) || cl < 21 || cl > 45) errors.cycleLength = 'Use um valor entre 21 e 45 dias.';
    if (!Number.isInteger(pl) || pl < 2 || pl > 10) errors.periodLength = 'Use um valor entre 2 e 10 dias.';
    else if (Number.isInteger(cl) && pl >= ovulationDay(cl)) errors.periodLength = 'A menstruação precisa ser menor que a fase folicular.';
    return { ok: Object.keys(errors).length === 0, errors, last, cl, pl };
  }

  /* Estima o estado do ciclo para uma data de referência */
  function estimate(settings, ref = today()) {
    const last = parseISO(settings.lastPeriod);
    const cl = Number(settings.cycleLength);
    const pl = Number(settings.periodLength);
    if (!last) return null;
    const elapsed = diffDays(ref, last);
    if (elapsed < 0) return null;
    const cyclesPassed = Math.floor(elapsed / cl);
    const day = (elapsed % cl) + 1;
    const cycleStart = addDays(last, cyclesPassed * cl);
    const nextPeriod = addDays(cycleStart, cl);
    const ov = ovulationDay(cl);
    const ovDate = addDays(cycleStart, ov - 1);
    const fertileStart = addDays(cycleStart, ov - 6);
    const fertileEnd = addDays(cycleStart, ov);
    const phase = phaseForDay(day, cl, pl);
    return {
      day, phase, cycleLength: cl, periodLength: pl, cycleStart, nextPeriod,
      daysToNext: diffDays(nextPeriod, ref), ovulationDate: ovDate,
      fertileStart, fertileEnd, fertile: isFertile(day, cl), predicted: cyclesPassed > 0,
    };
  }

  /* Info de um dia qualquer do calendário (inclui previsões futuras) */
  function infoForDate(settings, date) {
    const last = parseISO(settings.lastPeriod);
    if (!last) return null;
    const cl = Number(settings.cycleLength);
    const pl = Number(settings.periodLength);
    const elapsed = diffDays(date, last);
    if (elapsed < 0) return null;
    const day = (elapsed % cl) + 1;
    return { day, phase: phaseForDay(day, cl, pl), fertile: isFertile(day, cl), predicted: elapsed >= cl || date > today() };
  }

  /* ---------- Hormônios (valores relativos 0–1, ciclo de 28 dias) ---------- */
  const KEYS = {
    fsh: [[0, .32], [3, .4], [6, .3], [9, .22], [12, .32], [13.5, .58], [15, .25], [18, .16], [22, .12], [25, .14], [28, .32]],
    lh: [[0, .18], [6, .18], [10, .21], [12, .32], [13.5, 1], [15, .3], [17, .16], [22, .13], [28, .17]],
    estrogeno: [[0, .16], [4, .2], [8, .4], [11, .66], [12.8, .8], [14.5, .42], [16, .34], [21, .55], [25, .38], [28, .14]],
    progesterona: [[0, .06], [12, .05], [14, .09], [16, .3], [19, .72], [21.5, .88], [24, .62], [26.5, .22], [28, .06]],
  };
  function interp(points, x) {
    if (x <= points[0][0]) return points[0][1];
    for (let i = 0; i < points.length - 1; i++) {
      const [x0, y0] = points[i];
      const [x1, y1] = points[i + 1];
      if (x >= x0 && x <= x1) {
        const t = (x - x0) / (x1 - x0);
        const s = (1 - Math.cos(t * Math.PI)) / 2;
        return y0 + (y1 - y0) * s;
      }
    }
    return points[points.length - 1][1];
  }
  function hormones(day) {
    return {
      fsh: interp(KEYS.fsh, day),
      lh: interp(KEYS.lh, day),
      estrogeno: interp(KEYS.estrogeno, day),
      progesterona: interp(KEYS.progesterona, day),
    };
  }
  /* Espessura relativa do endométrio */
  function endometrium(day) {
    return interp([[0, .62], [2, .4], [5, .16], [9, .38], [14, .62], [18, .82], [22, 1], [26, .95], [28, .7]], day);
  }
  function level(v) {
    if (v >= .7) return 'alto';
    if (v >= .4) return 'médio';
    if (v >= .2) return 'baixo';
    return 'muito baixo';
  }
  const HORMONES = {
    fsh: { name: 'FSH', full: 'Hormônio folículo-estimulante', color: '#3fb36b' },
    lh: { name: 'LH', full: 'Hormônio luteinizante', color: '#e23b3b' },
    estrogeno: { name: 'Estrogênio', full: 'Estradiol', color: '#f0c419' },
    progesterona: { name: 'Progesterona', full: 'Progesterona', color: '#2f7fd1' },
  };

  /* ---------- Armazenamento local ---------- */
  const KEY_SETTINGS = 'fluindo:ciclo';
  const KEY_DIARY = 'fluindo:diario';
  const KEY_HISTORY = 'fluindo:historico';
  function read(key, fallback) {
    try { const v = JSON.parse(localStorage.getItem(key)); return v ?? fallback; } catch { return fallback; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
  }
  const store = {
    getSettings: () => read(KEY_SETTINGS, null),
    saveSettings(s) {
      write(KEY_SETTINGS, s);
      const h = store.getHistory();
      if (!h.includes(s.lastPeriod)) { h.push(s.lastPeriod); h.sort(); write(KEY_HISTORY, h.slice(-24)); }
      document.dispatchEvent(new CustomEvent('fluindo:cycle-change'));
    },
    getHistory: () => read(KEY_HISTORY, []),
    removeHistory(date) { write(KEY_HISTORY, store.getHistory().filter((d) => d !== date)); },
    getDiary: () => read(KEY_DIARY, {}),
    saveDiaryEntry(date, entry) {
      const d = store.getDiary();
      const empty = !entry || ((!entry.symptoms || !entry.symptoms.length) && !entry.flow && !entry.mood && !entry.note);
      if (empty) delete d[date]; else d[date] = entry;
      write(KEY_DIARY, d);
    },
    clearAll() {
      [KEY_SETTINGS, KEY_DIARY, KEY_HISTORY].forEach((k) => localStorage.removeItem(k));
      document.dispatchEvent(new CustomEvent('fluindo:cycle-change'));
    },
  };

  /* Média de duração a partir do histórico de inícios de menstruação */
  function averageFromHistory(history) {
    const dates = history.map(parseISO).filter(Boolean).sort((a, b) => a - b);
    const gaps = [];
    for (let i = 1; i < dates.length; i++) {
      const g = diffDays(dates[i], dates[i - 1]);
      if (g >= 18 && g <= 50) gaps.push(g);
    }
    if (!gaps.length) return null;
    return { avg: Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length), count: gaps.length, gaps };
  }

  window.FluindoCycle = {
    PHASES, ORDER, HORMONES,
    parseISO, toISO, today, addDays, diffDays, formatShort, formatLong,
    ovulationDay, phaseForDay, isFertile, validate, estimate, infoForDate,
    hormones, endometrium, level, store, averageFromHistory,
  };
})();
