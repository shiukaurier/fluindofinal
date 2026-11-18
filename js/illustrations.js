/* Fluindo — ilustrações didáticas em SVG geradas por código */
(function () {
  const C = {
    cream: '#fffdeb', rose: '#e8a9b0', coral: '#e46a6b', salmon: '#f49a96',
    wine: '#3d0410', blush: '#ffdfdf', plum: '#8e1c52', yellow: '#f3c969',
    yellowDark: '#d99a2b', pinkLight: '#ffeef0', red: '#c9303f', blue: '#4a6fd1',
  };
  const FONT = "font-family=\"Montserrat, sans-serif\"";

  /* ---------- Peças básicas ---------- */
  function drop(x, y, s = 1, color = C.coral, cls = '') {
    return `<path class="${cls}" transform="translate(${x} ${y}) scale(${s})" d="M0 -10 C-3 -5 -6 -1.5 -6 2 a6 6 0 0 0 12 0 C6 -1.5 3 -5 0 -10z" fill="${color}"/>`;
  }
  function heart(x, y, s = 1, color = C.coral) {
    return `<path transform="translate(${x} ${y}) scale(${s})" d="M0 8 C-8 2 -11 -2 -10 -6 C-9 -10 -3 -11 0 -6 C3 -11 9 -10 10 -6 C11 -2 8 2 0 8z" fill="${color}" stroke="${C.plum}" stroke-width="1.2"/>`;
  }
  function follicle(x, y, r) {
    if (r < 5) {
      return `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.cream}" stroke="${C.plum}" stroke-width="1"/><circle cx="${x}" cy="${y}" r="${(r * 0.45).toFixed(1)}" fill="${C.coral}"/>`;
    }
    const er = Math.max(2, r * 0.22);
    return `<g><circle cx="${x}" cy="${y}" r="${r}" fill="${C.cream}" stroke="${C.plum}" stroke-width="1.3"/>
      <circle cx="${x}" cy="${y}" r="${(r * 0.72).toFixed(1)}" fill="${C.pinkLight}" stroke="${C.rose}" stroke-width="1"/>
      <circle cx="${(x + r * 0.36).toFixed(1)}" cy="${(y - r * 0.32).toFixed(1)}" r="${er.toFixed(1)}" fill="${C.coral}" stroke="${C.cream}" stroke-width="1.2"/></g>`;
  }
  function egg(x, y, r = 6) {
    let dots = '';
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      dots += `<circle cx="${(x + Math.cos(a) * (r + 3)).toFixed(1)}" cy="${(y + Math.sin(a) * (r + 3)).toFixed(1)}" r="1.4" fill="${C.salmon}"/>`;
    }
    return `<g>${dots}<circle cx="${x}" cy="${y}" r="${r}" fill="${C.cream}" stroke="${C.plum}" stroke-width="1.2"/><circle cx="${x}" cy="${y}" r="${(r * 0.4).toFixed(1)}" fill="${C.coral}"/></g>`;
  }
  function luteum(x, y, r, pale = false) {
    const petal = pale ? '#f4ead2' : C.yellow;
    const core = pale ? '#fbf6e8' : '#f9de8f';
    const st = pale ? '#cdbf9c' : C.yellowDark;
    let p = '';
    const n = 9;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      p += `<circle cx="${(x + Math.cos(a) * r * 0.62).toFixed(1)}" cy="${(y + Math.sin(a) * r * 0.62).toFixed(1)}" r="${(r * 0.42).toFixed(1)}" fill="${petal}" stroke="${st}" stroke-width="1"/>`;
    }
    return `<g>${p}<circle cx="${x}" cy="${y}" r="${(r * 0.55).toFixed(1)}" fill="${core}" stroke="${st}" stroke-width="1"/>
      <path d="M${x - r * 0.25} ${y} q${r * 0.12} ${-r * 0.2} ${r * 0.25} 0 t${r * 0.25} 0" fill="none" stroke="${st}" stroke-width="1"/></g>`;
  }
  function label(x, y, text, opts = {}) {
    const { anchor = 'middle', size = 9, lx, ly, weight = 600, color = C.wine } = opts;
    const lines = String(text).split('\n');
    const leader = lx !== undefined ? `<path d="M${x} ${y + (anchor === 'middle' ? 4 : -3)} L${lx} ${ly}" stroke="${C.wine}" stroke-width=".8" fill="none"/><circle cx="${lx}" cy="${ly}" r="1.6" fill="${C.wine}"/>` : '';
    const tspans = lines.map((l, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : size * 1.15}">${l}</tspan>`).join('');
    return `${leader}<text x="${x}" y="${y - (lines.length - 1) * size * 1.15}" ${FONT} font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}">${tspans}</text>`;
  }
  function wrap(viewBox, inner, title) {
    return `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${title || 'Ilustração'}"><title>${title || 'Ilustração'}</title>${inner}</svg>`;
  }

  /* ---------- Sistema reprodutor (vista frontal) ---------- */
  function ovaryContent(type, cx, cy, side) {
    const s = side === 'L' ? -1 : 1;
    switch (type) {
      case 'follicles':
        return follicle(cx - 9, cy - 3, 4) + follicle(cx + 2, cy + 5, 3.5) + follicle(cx + 10, cy - 4, 4.5) + follicle(cx - 1, cy - 7, 2.8) + follicle(cx - 13, cy + 6, 2.5);
      case 'growing':
        return follicle(cx - 10, cy + 2, 4) + follicle(cx + 7, cy, 8) + follicle(cx - 3, cy - 8, 3) + follicle(cx - 6, cy + 9, 2.4);
      case 'dominant':
        return follicle(cx - 12, cy + 3, 3) + follicle(cx + 4 * s, cy - 1, 10) + follicle(cx - 4, cy + 9, 2.4);
      case 'rupture':
        return `${follicle(cx - 12, cy + 4, 3)}<path d="M${cx + 4 * s - 8} ${cy - 8} a10 10 0 1 0 ${16} 0" fill="${C.pinkLight}" stroke="${C.plum}" stroke-width="1.3"/>`
          + egg(cx - 26 * -s, cy - 26, 5);
      case 'luteum':
        return luteum(cx + 3 * s, cy, 10) + follicle(cx - 13 * s, cy + 5, 2.6);
      case 'albicans':
        return `<circle cx="${cx + 5}" cy="${cy}" r="5" fill="#fbf6e8" stroke="#cdbf9c"/>` + follicle(cx - 9, cy + 3, 3) + follicle(cx - 2, cy - 6, 2.6);
      default:
        return '';
    }
  }

  function uterusInner(o = {}) {
    const endo = o.endo || 'medium';
    const scale = { thin: 0.88, medium: 0.68, thick: 0.46, shed: 0.6 }[endo];
    const org = (name, inner) => (o.organs ? `<g class="organ" data-organ="${name}" tabindex="0" role="button" aria-label="${name}">${inner}</g>` : inner);
    const fimbria = (x, y, dir) => `<path d="M${x} ${y} l${-12 * dir} 10 M${x} ${y} l${-7 * dir} 14 M${x} ${y} l${1 * dir} 15 M${x} ${y} l${8 * dir} 11 M${x} ${y} l${-15 * dir} 3" stroke="${C.plum}" stroke-width="4.2" stroke-linecap="round" fill="none"/>
      <path d="M${x} ${y} l${-12 * dir} 10 M${x} ${y} l${-7 * dir} 14 M${x} ${y} l${1 * dir} 15 M${x} ${y} l${8 * dir} 11 M${x} ${y} l${-15 * dir} 3" stroke="${C.rose}" stroke-width="2.2" stroke-linecap="round" fill="none"/>`;
    const tube = (d) => `<path d="${d}" stroke="${C.plum}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${C.rose}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
    const ovary = (cx, cy, rot, type, side) => `<g><ellipse cx="${cx}" cy="${cy}" rx="25" ry="16" transform="rotate(${rot} ${cx} ${cy})" fill="${C.salmon}" stroke="${C.plum}" stroke-width="2"/>${ovaryContent(type, cx, cy, side)}</g>`;

    let s = '';
    // tubas uterinas
    s += tube('M114 70 C95 52 72 44 56 52 C44 58 38 70 40 84') + tube('M186 70 C205 52 228 44 244 52 C256 58 262 70 260 84');
    s += fimbria(40, 84, -1) + fimbria(260, 84, 1);
    // ligamentos
    s += `<path d="M114 92 L88 108" stroke="${C.rose}" stroke-width="4" stroke-linecap="round"/><path d="M186 92 L212 108" stroke="${C.rose}" stroke-width="4" stroke-linecap="round"/>`;
    s += org('ovarios', ovary(64, 114, -18, o.left || 'follicles', 'L') + ovary(236, 114, 18, o.right || 'follicles', 'R'));
    // vagina
    s += `<path d="M137 172 L137 208 C137 216 163 216 163 208 L163 172 Z" fill="${C.rose}" stroke="${C.plum}" stroke-width="2"/>`;
    // útero
    const body = `<path d="M112 66 C112 40 188 40 188 66 C188 100 174 124 163 138 L163 174 C163 182 137 182 137 174 L137 138 C126 124 112 100 112 66 Z" fill="${C.salmon}" stroke="${C.plum}" stroke-width="2.5"/>
      <path d="M118 64 C120 48 180 48 182 64" fill="none" stroke="${C.cream}" stroke-width="2" opacity=".5"/>
      <path d="M124 66 C126 56 174 56 176 66 C174 92 162 112 153 128 L147 128 C138 112 126 92 124 66 Z" fill="${C.coral}" stroke="${C.plum}" stroke-width="1"/>
      <path transform="translate(150 84) scale(${scale}) translate(-150 -84)" d="M124 66 C126 56 174 56 176 66 C174 92 162 112 153 128 L147 128 C138 112 126 92 124 66 Z" fill="${C.blush}"/>
      <path d="M150 128 L150 176" stroke="${C.plum}" stroke-width="2"/>`;
    s += org('utero', body);
    if (endo === 'thick') {
      s += `<path d="M131 70 q4 6 0 12 M169 70 q-4 6 0 12 M138 90 q3 5 0 10 M162 90 q-3 5 0 10" stroke="${C.red}" stroke-width="1" fill="none" opacity=".7"/>`;
    }
    if (endo === 'shed') {
      s += `<path d="M136 74 l6 -4 l3 6 z M158 78 l7 -2 l-1 7 z M145 96 l6 1 l-3 5z M152 108 l4 3 l-5 2z" fill="${C.coral}"/>`;
      s += drop(150, 150, 0.5, C.coral, 'drop-anim') + drop(150, 196, 0.55, C.coral, 'drop-anim');
    }
    if (o.heart) s += `<g class="pulse">${heart(150, 84, 1.2, C.coral)}</g>`;
    if (o.drops) s += drop(130, 228, 0.9, C.coral, 'drop-anim') + drop(150, 238, 1, C.coral, 'drop-anim') + drop(170, 228, 0.9, C.coral, 'drop-anim');
    if (o.tubeEgg) s += egg(70, 50, 4.5);
    if (o.rays) {
      const [rx, ry] = o.rays === 'L' ? [64, 114] : [236, 114];
      for (let i = 0; i < 7; i++) {
        const a = -Math.PI * 0.9 + (i / 6) * Math.PI * 0.8;
        s += `<path d="M${(rx + Math.cos(a) * 34).toFixed(1)} ${(ry + Math.sin(a) * 30).toFixed(1)} L${(rx + Math.cos(a) * 44).toFixed(1)} ${(ry + Math.sin(a) * 40).toFixed(1)}" stroke="${C.plum}" stroke-width="2" stroke-linecap="round"/>`;
      }
    }
    if (o.labels) s += o.labels.map((l) => label(l.x, l.y, l.t, l)).join('');
    return s;
  }
  function uterus(o = {}) { return wrap('0 0 300 250', uterusInner(o), o.title || 'Útero, tubas uterinas e ovários'); }

  /* ---------- Ovário em corte ---------- */
  function ovaryDetail(stage, o = {}) {
    let s = `<ellipse cx="170" cy="100" rx="140" ry="76" fill="${C.salmon}" stroke="${C.plum}" stroke-width="2.5"/>
      <ellipse cx="170" cy="100" rx="122" ry="62" fill="#f7aeaa" opacity=".6"/>`;
    // estruturas de fundo (folículos primordiais)
    const prim = [[70, 80], [86, 130], [120, 60], [150, 150], [210, 58], [240, 140], [270, 96], [100, 104], [190, 140], [60, 110]];
    s += prim.map(([x, y]) => follicle(x, y, 3)).join('');
    if (o.tube !== false) {
      s += `<path d="M0 30 C30 30 40 40 52 56" stroke="${C.plum}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M0 30 C30 30 40 40 52 56" stroke="${C.rose}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
    }
    switch (stage) {
      case 'early':
        s += [[110, 85, 9], [140, 115, 10], [175, 78, 8], [205, 112, 11], [240, 85, 8], [160, 130, 7], [95, 120, 7]].map(([x, y, r]) => follicle(x, y, r)).join('');
        break;
      case 'growing':
        s += follicle(100, 92, 7) + follicle(132, 120, 10) + follicle(160, 76, 12) + follicle(200, 118, 9) + follicle(244, 92, 24) + follicle(125, 70, 5);
        if (o.labels !== false) s += label(262, 26, 'crescimento\nde folículos', { lx: 246, ly: 68 });
        break;
      case 'rupture':
        s += follicle(110, 96, 7) + follicle(150, 124, 6) + follicle(170, 76, 5);
        s += `<path d="M262 70 A30 30 0 1 0 262 130" fill="${C.pinkLight}" stroke="${C.plum}" stroke-width="2"/>
          <path d="M262 74 q10 6 18 -2 M262 126 q10 -6 18 2" stroke="${C.plum}" stroke-width="1.5" fill="none"/>`;
        s += egg(300, 100, 9);
        s += `<path d="M330 60 l-12 18 M336 70 l-18 14 M338 84 l-16 8" stroke="${C.plum}" stroke-width="4" stroke-linecap="round"/><path d="M330 60 l-12 18 M336 70 l-18 14 M338 84 l-16 8" stroke="${C.rose}" stroke-width="2" stroke-linecap="round"/>`;
        if (o.labels !== false) {
          s += label(200, 22, 'rompimento\ndo folículo', { lx: 250, ly: 76 }) + label(300, 150, 'óvulo sendo\nliberado', { lx: 300, ly: 112 }) + label(330, 30, 'fímbrias', { anchor: 'end', lx: 330, ly: 58 });
        }
        break;
      case 'empty':
        s += follicle(110, 96, 6) + follicle(150, 128, 5);
        s += `<path d="M220 72 q14 -10 26 0 q14 6 14 22 q4 16 -10 26 q-14 10 -28 0 q-14 -8 -12 -24 q-2 -16 10 -24z" fill="${C.pinkLight}" stroke="${C.plum}" stroke-width="1.8"/>
          <path d="M228 84 q8 6 16 0 M226 100 q10 8 22 0 M232 112 q6 3 12 0" stroke="${C.coral}" stroke-width="2" fill="none"/>`;
        if (o.labels !== false) s += label(236, 26, 'folículo vazio', { lx: 236, ly: 70 });
        break;
      case 'luteum': {
        s += follicle(110, 96, 6) + follicle(140, 130, 5);
        s += luteum(234, 98, 34);
        let dots = '';
        for (let i = 0; i < 16; i++) {
          const a = (i / 16) * Math.PI * 2;
          const d = 50 + (i % 3) * 9;
          dots += `<circle cx="${(234 + Math.cos(a) * d).toFixed(1)}" cy="${(98 + Math.sin(a) * d * 0.75).toFixed(1)}" r="2.6" fill="${C.prog || '#2f7fd1'}" opacity=".7"/>`;
        }
        s += dots;
        if (o.labels !== false) s += label(234, 190, 'progesterona', { color: '#2f7fd1' });
        break;
      }
      case 'degenerating':
        s += follicle(100, 92, 6) + follicle(130, 120, 7) + follicle(160, 80, 5);
        s += luteum(234, 98, 26, true);
        if (o.labels !== false) s += label(234, 26, 'corpo lúteo\nregredindo', { lx: 234, ly: 70 });
        break;
      default: break;
    }
    return wrap('-10 0 360 200', s, o.title || 'Ovário em corte');
  }

  /* ---------- Endométrio em corte ---------- */
  function endometriumDetail(stage, o = {}) {
    const h = { thin: 26, proliferative: 70, secretory: 112, shed: 46 }[stage] || 60;
    const base = 150;
    const top = base - h;
    let s = `<rect x="0" y="0" width="320" height="200" fill="${C.blush}"/>
      <rect x="0" y="${base + 14}" width="320" height="${200 - base - 14}" fill="${C.salmon}"/>
      <path d="M0 ${base + 14} Q80 ${base + 8} 160 ${base + 14} T320 ${base + 14}" fill="none" stroke="${C.plum}" stroke-width="1"/>
      <rect x="0" y="${base}" width="320" height="14" fill="${C.coral}" opacity=".85"/>`;
    // camada funcional com superfície ondulada
    let surf = `M0 ${top}`;
    for (let x = 0; x <= 320; x += 20) surf += ` Q${x + 10} ${top + (stage === 'shed' ? ((x / 20) % 2 ? 14 : -8) : (x / 20) % 2 ? 6 : -4)} ${x + 20} ${top}`;
    s += `<path d="${surf} L320 ${base} L0 ${base} Z" fill="#f6b3b3" stroke="${C.plum}" stroke-width="1.6"/>`;
    // glândulas
    for (let x = 18; x < 320; x += 34) {
      if (stage === 'secretory') {
        let d = `M${x} ${top + 6}`;
        for (let y = top + 10; y < base; y += 8) d += ` L${x + ((y / 8) % 2 ? 5 : -5)} ${y}`;
        s += `<path d="${d}" stroke="${C.cream}" stroke-width="6" fill="none" stroke-linejoin="round"/><path d="${d}" stroke="${C.plum}" stroke-width="1" fill="none" opacity=".6"/>`;
      } else {
        s += `<path d="M${x} ${top + 6} L${x + 2} ${base - 2}" stroke="${C.cream}" stroke-width="${stage === 'proliferative' ? 5 : 3}" stroke-linecap="round"/>`;
      }
    }
    // vasos (artérias espiraladas e veias)
    for (let x = 34; x < 320; x += 68) {
      let a = `M${x} ${200}`;
      const turns = stage === 'secretory' ? 7 : stage === 'proliferative' ? 4 : 2;
      const span = 200 - top - 8;
      for (let i = 1; i <= turns; i++) a += ` q${i % 2 ? 9 : -9} ${-span / turns / 2} 0 ${-span / turns}`;
      s += `<path d="${a}" stroke="${C.red}" stroke-width="1.6" fill="none"/>`;
      s += `<path d="M${x + 14} 200 C${x + 10} ${base} ${x + 20} ${top + 30} ${x + 14} ${top + 12}" stroke="${C.blue}" stroke-width="1.3" fill="none" opacity=".8"/>`;
    }
    if (stage === 'shed') {
      s += `<path d="M30 ${top - 14} l14 -6 l6 10 l-12 6z M120 ${top - 22} l16 -2 l-2 12 l-14 -2z M220 ${top - 12} l12 -8 l8 10 l-10 6z" fill="${C.coral}" stroke="${C.plum}" stroke-width=".8"/>`;
      s += drop(80, top - 30, 0.7, C.coral, 'drop-anim') + drop(180, top - 36, 0.8, C.coral, 'drop-anim') + drop(270, top - 26, 0.6, C.coral, 'drop-anim');
    }
    if (o.labels !== false) {
      s += label(316, top - 6 < 14 ? 14 : top - 6, stage === 'secretory' ? 'endométrio secretor' : stage === 'shed' ? 'descamação' : 'camada funcional', { anchor: 'end' });
      s += label(316, base + 11, 'camada basal', { anchor: 'end', size: 8, color: C.cream });
      s += label(316, 192, 'miométrio', { anchor: 'end', size: 8 });
    }
    return wrap('0 0 320 200', s, o.title || 'Endométrio em corte');
  }

  /* ---------- Roda do ciclo (home) ---------- */
  function polar(cx, cy, r, deg) { const a = (deg * Math.PI) / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; }
  function sector(cx, cy, r0, r1, a0, a1) {
    const [x0, y0] = polar(cx, cy, r1, a0); const [x1, y1] = polar(cx, cy, r1, a1);
    const [x2, y2] = polar(cx, cy, r0, a1); const [x3, y3] = polar(cx, cy, r0, a0);
    const large = a1 - a0 > 180 ? 1 : 0;
    return `M${x0.toFixed(2)} ${y0.toFixed(2)} A${r1} ${r1} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)} L${x2.toFixed(2)} ${y2.toFixed(2)} A${r0} ${r0} 0 ${large} 0 ${x3.toFixed(2)} ${y3.toFixed(2)} Z`;
  }
  function cycleWheel(currentDay) {
    const F = window.FluindoCycle;
    const cx = 250, cy = 250, n = 28, step = 360 / n;
    let s = `<circle cx="${cx}" cy="${cy}" r="205" fill="${C.cream}" stroke="${C.rose}" stroke-width="2"/>`;
    const ranges = [['menstrual', 1, 5], ['folicular', 6, 13], ['ovulacao', 14, 14], ['lutea', 15, 28]];
    const fills = { menstrual: C.coral, folicular: C.salmon, ovulacao: C.plum, lutea: C.yellow };
    ranges.forEach(([id, a, b]) => {
      const a0 = -90 + (a - 1) * step; const a1 = -90 + b * step;
      s += `<path d="${sector(cx, cy, 62, 150, a0, a1)}" fill="${fills[id]}" stroke="${C.cream}" stroke-width="3" opacity=".92" class="wheel-sector" data-phase="${id}"/>`;
    });
    // ilustrações nos setores
    const [mx, my] = polar(cx, cy, 108, -90 + 2.5 * step);
    s += drop(mx, my + 4, 1.6, C.cream) + drop(mx - 18, my - 8, 0.9, C.cream);
    const [fx, fy] = polar(cx, cy, 108, -90 + 9.5 * step);
    s += follicle(fx, fy, 14) + follicle(fx - 22, fy + 14, 6);
    const [ox, oy] = polar(cx, cy, 112, -90 + 13.5 * step);
    s += egg(ox, oy, 6);
    const [lx, ly] = polar(cx, cy, 108, -90 + 21.5 * step);
    s += luteum(lx, ly, 22);
    // centro
    s += `<circle cx="${cx}" cy="${cy}" r="60" fill="${C.cream}" stroke="${C.plum}" stroke-width="2"/>
      <text id="wheel-center-day" x="${cx}" y="${cy - 2}" text-anchor="middle" font-family="Marcellus, serif" font-size="30" fill="${C.plum}">${currentDay || '28'}</text>
      <text id="wheel-center-label" x="${cx}" y="${cy + 20}" text-anchor="middle" ${FONT} font-size="11" font-weight="600" fill="${C.wine}">${currentDay ? 'seu dia hoje' : 'dias em média'}</text>`;
    // dias
    for (let d = 1; d <= n; d++) {
      const ang = -90 + (d - 0.5) * step;
      const [x, y] = polar(cx, cy, 178, ang);
      const ph = F.phaseForDay(d, 28, 5);
      const isNow = currentDay === d;
      s += `<g class="wheel-day" data-day="${d}" data-phase="${ph}" tabindex="0" role="button" aria-label="Dia ${d}, ${F.PHASES[ph].name}">
        ${isNow ? `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="20" fill="none" stroke="${C.wine}" stroke-width="2.5" stroke-dasharray="4 3"/>` : ''}
        <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="15" fill="${fills[ph]}" stroke="${C.cream}" stroke-width="2"/>
        <text x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="middle" ${FONT} font-size="12" font-weight="700" fill="${ph === 'lutea' || ph === 'folicular' ? C.wine : C.cream}">${d}</text></g>`;
    }
    // rótulos externos
    const labels = [['Menstruação', 3, 0], ['Fase Folicular', 9.5, 0], ['Ovulação', 14, 0], ['Fase Lútea', 21.5, 0]];
    labels.forEach(([t, d]) => {
      const ang = -90 + (d - 0.5) * step;
      const [x, y] = polar(cx, cy, 228, ang);
      s += `<text x="${x.toFixed(1)}" y="${(y + 5).toFixed(1)}" text-anchor="middle" font-family="Marcellus, serif" font-size="17" fill="${C.plum}">${t}</text>`;
    });
    return wrap('-55 0 610 500', s, 'Roda do ciclo menstrual de 28 dias');
  }

  /* ---------- Eixo hipotálamo-hipófise-ovário ---------- */
  function hpoAxis() {
    let s = '';
    // cabeça
    s += `<path d="M160 20 C95 20 60 65 62 118 C63 150 78 170 92 182 L96 214 L190 214 L194 190 C214 188 222 178 222 166 L224 150 L236 146 C240 144 240 138 236 134 L226 112 C226 54 200 20 160 20Z" fill="${C.cream}" stroke="${C.rose}" stroke-width="2.5"/>`;
    // cérebro
    s += `<g class="organ" data-organ="cerebro" tabindex="0" role="button" aria-label="Cérebro">
      <path d="M92 92 C76 66 100 38 128 46 C142 28 182 28 196 46 C220 40 238 66 224 92 C238 112 218 134 196 128 C186 146 154 146 146 130 C130 144 100 140 98 122 C78 120 76 102 92 92 Z" fill="#f7b9c0" stroke="${C.plum}" stroke-width="2"/>
      <path d="M110 70 q14 -10 28 0 M150 58 q16 -8 30 4 M118 100 q16 8 30 -4 M172 96 q14 10 30 0 M196 70 q10 6 16 -2" stroke="${C.plum}" stroke-width="1.5" fill="none"/></g>`;
    s += `<g class="organ" data-organ="hipotalamo" tabindex="0" role="button" aria-label="Hipotálamo"><circle cx="160" cy="134" r="11" fill="${C.coral}" stroke="${C.plum}" stroke-width="2"/></g>`;
    s += `<path d="M160 145 L162 160" stroke="${C.plum}" stroke-width="2.5"/>`;
    s += `<g class="organ" data-organ="hipofise" tabindex="0" role="button" aria-label="Hipófise"><ellipse cx="163" cy="168" rx="10" ry="8" fill="${C.plum}" stroke="${C.wine}" stroke-width="1.5"/></g>`;
    s += label(214, 136, 'hipotálamo', { anchor: 'start', size: 11, lx: 172, ly: 134 }) + label(214, 172, 'hipófise', { anchor: 'start', size: 11, lx: 174, ly: 168 });
    // setas
    s += `<defs><marker id="arw" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${C.plum}"/></marker>
      <marker id="arw2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${C.coral}"/></marker></defs>`;
    s += `<path d="M163 180 C163 230 100 250 82 300" stroke="${C.plum}" stroke-width="2.5" fill="none" marker-end="url(#arw)"/>
      <path d="M163 180 C163 230 226 250 244 300" stroke="${C.plum}" stroke-width="2.5" fill="none" marker-end="url(#arw)"/>`;
    s += label(92, 252, 'FSH · LH', { size: 11, color: C.plum, weight: 700 });
    // feedback
    s += `<path d="M290 340 C320 250 300 150 240 140" stroke="${C.coral}" stroke-width="2" stroke-dasharray="6 4" fill="none" marker-end="url(#arw2)"/>`;
    s += label(306, 236, 'estrogênio e\nprogesterona\n(feedback)', { size: 9.5, color: C.coral, weight: 700, anchor: 'middle' });
    s += label(270, 70, 'GnRH', { size: 11, color: C.plum, weight: 700 });
    s += `<path d="M250 76 C230 90 200 120 172 136" stroke="${C.plum}" stroke-width="1" stroke-dasharray="3 3" fill="none"/>`;
    // sistema reprodutor
    s += `<g transform="translate(14 262) scale(1)">${uterusInner({ endo: 'medium', left: 'growing', right: 'follicles', organs: true })}</g>`;
    return wrap('0 0 340 520', s, 'Eixo hipotálamo-hipófise-ovário');
  }

  /* ---------- Gráfico pequeno de hormônios ---------- */
  function miniHormoneGraph(focus = [], range = null) {
    const F = window.FluindoCycle;
    const W = 320, H = 160, pad = 18, x0 = pad, x1 = W - 8, y0 = H - 36, y1 = 12;
    const X = (d) => x0 + (d / 28) * (x1 - x0);
    const Y = (v) => y0 - v * (y0 - y1);
    let s = `<rect x="0" y="0" width="${W}" height="${H}" rx="12" fill="${C.cream}"/>`;
    if (range) s += `<rect x="${X(range[0] - 1)}" y="${y1 - 4}" width="${X(range[1]) - X(range[0] - 1)}" height="${y0 - y1 + 4}" fill="${C.rose}" opacity=".45" rx="4"/>`;
    Object.keys(F.HORMONES).forEach((k) => {
      let d = '';
      for (let i = 0; i <= 56; i++) { const day = i / 2; d += `${i ? 'L' : 'M'}${X(day).toFixed(1)} ${Y(F.hormones(day)[k]).toFixed(1)} `; }
      const on = !focus.length || focus.includes(k);
      if (on && focus.length) s += `<path d="${d} L${X(28)} ${y0} L${X(0)} ${y0} Z" fill="${F.HORMONES[k].color}" opacity=".16"/>`;
      s += `<path d="${d}" fill="none" stroke="${F.HORMONES[k].color}" stroke-width="${on ? 2.6 : 1.2}" opacity="${on ? 1 : 0.35}"/>`;
    });
    s += `<path d="M${x0} ${y0} H${x1}" stroke="${C.wine}" stroke-width="1"/>`;
    [0, 7, 14, 21, 28].forEach((d) => { s += `<text x="${X(d)}" y="${y0 + 14}" text-anchor="middle" ${FONT} font-size="9" fill="${C.wine}">${d}</text>`; });
    let lx = x0;
    Object.keys(F.HORMONES).forEach((k) => {
      s += `<circle cx="${lx + 4}" cy="${H - 5}" r="3.5" fill="${F.HORMONES[k].color}"/><text x="${lx + 11}" y="${H - 2}" ${FONT} font-size="8.5" fill="${C.wine}">${F.HORMONES[k].name}</text>`;
      lx += k === 'progesterona' ? 0 : k === 'estrogeno' ? 70 : 42;
    });
    return wrap(`0 0 ${W} ${H}`, s, 'Gráfico simplificado dos hormônios ao longo de 28 dias');
  }

  /* ---------- Miniaturas das fases ---------- */
  function phaseThumb(id) {
    let s = '';
    if (id === 'menstrual') s = drop(46, 38, 2.2, C.coral) + drop(24, 22, 1, C.salmon) + drop(70, 24, 1, C.salmon);
    if (id === 'folicular') s = follicle(46, 36, 20) + follicle(16, 50, 6) + follicle(78, 20, 7);
    if (id === 'ovulacao') s = `<path d="M30 14 A22 22 0 1 0 30 58" fill="${C.pinkLight}" stroke="${C.plum}" stroke-width="1.5"/>` + egg(62, 36, 9);
    if (id === 'lutea') s = luteum(46, 36, 26);
    return wrap('0 0 92 70', s, window.FluindoCycle.PHASES[id].name);
  }

  window.FluindoIllu = { C, uterus, uterusInner, ovaryDetail, endometriumDetail, cycleWheel, hpoAxis, miniHormoneGraph, phaseThumb, follicle, luteum, egg, drop, label, wrap };
})();
