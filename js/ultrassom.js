/* Fluindo — simulações de ultrassom geradas em canvas + comparação com ilustrações */
(function () {
  const I = window.FluindoIllu;
  const { icon, hydrate } = window.FluindoIcons;

  /*
    Para usar fotos reais de ultrassom (com direito de uso), coloque os arquivos
    em assets/ultrassom/ e informe o caminho abaixo. Ex.: 'assets/ultrassom/ovario-inicial.jpg'.
    Quando o caminho estiver vazio, a página gera uma simulação.
  */
  const REAL_IMAGES = {
    'ovario-inicial': 'assets/ultrassom/ovario-inicial.png', // imagem1
    'endometrio-fino': 'assets/ultrassom/endometrio-fino.png', // imagem2
    'ovario-dominante': 'assets/ultrassom/ovario-dominante.png', // imagem3
    'endometrio-trilaminar': 'assets/ultrassom/endometrio-trilaminar.png', // imagem4
    'corpo-luteo': 'assets/ultrassom/corpo-luteo.png', // imagem5
    'endometrio-secretor': 'assets/ultrassom/endometrio-secretor.png', // imagem6
  };

  const SECTIONS = [
    {
      title: 'Pós menstrual', sub: '(Fase proliferativa inicial · dias 5 a 9)',
      figs: [
        { id: 'ovario-inicial', label: 'OV D  TV', title: 'Ovário com folículos antrais', text: 'Vários pequenos folículos (círculos escuros de 2 a 9 mm) espalhados pelo ovário. Ainda não há um folículo dominante.', illu: () => I.ovaryDetail('early', { tube: false, title: 'Ilustração: folículos antrais' }) },
        { id: 'endometrio-fino', label: 'UT LONG  END 3mm', title: 'Endométrio fino', text: 'Logo após a menstruação, o endométrio aparece como uma linha fina e brilhante no centro do útero (cerca de 2 a 4 mm).', illu: () => I.endometriumDetail('thin', { title: 'Ilustração: endométrio fino' }) },
      ],
    },
    {
      title: 'Fase periovulatória', sub: '(dias 12 a 15)',
      figs: [
        { id: 'ovario-dominante', label: 'OV E  D1 21mm', title: 'Folículo dominante', text: 'Um folículo se destaca e cresce até cerca de 18 a 25 mm. A linha pontilhada mostra a medição do seu diâmetro.', illu: () => I.ovaryDetail('growing', { tube: false, labels: false, title: 'Ilustração: folículo dominante' }) },
        { id: 'endometrio-trilaminar', label: 'UT LONG  END 10mm', title: 'Endométrio trilaminar', text: 'Sob efeito do estrogênio, o endométrio fica com aspecto de "três linhas": duas linhas externas brilhantes e uma central, separadas por faixas escuras.', illu: () => I.endometriumDetail('proliferative', { title: 'Ilustração: endométrio proliferativo' }) },
      ],
    },
    {
      title: 'Fase pós-ovulatória', sub: '(pré-menstrual · dias 16 a 28)',
      figs: [
        { id: 'corpo-luteo', label: 'OV D  DOPPLER', title: 'Corpo lúteo com Doppler', text: 'O corpo lúteo aparece com parede espessa e irregular. No Doppler colorido, o fluxo de sangue ao redor forma o "anel de fogo".', illu: () => I.ovaryDetail('luteum', { tube: false, title: 'Ilustração: corpo lúteo' }) },
        { id: 'endometrio-secretor', label: 'UT LONG  END 14mm', title: 'Endométrio secretor', text: 'Com a progesterona, o endométrio fica espesso (cerca de 8 a 16 mm), mais brilhante (hiperecogênico) e homogêneo, perdendo o padrão trilaminar.', illu: () => I.endometriumDetail('secretory', { title: 'Ilustração: endométrio secretor' }) },
      ],
    },
  ];

  /* ---------- Gerador de ruído ---------- */
  function rng(seed) { let s = seed % 2147483647; if (s <= 0) s += 2147483646; return () => (s = (s * 16807) % 2147483647) / 2147483647; }
  function makeNoise(rand, gw, gh) {
    const g = new Float32Array((gw + 1) * (gh + 1)).map(() => rand());
    return (x, y) => {
      const xi = Math.max(0, Math.min(gw - 1, Math.floor(x))), yi = Math.max(0, Math.min(gh - 1, Math.floor(y)));
      const tx = x - xi, ty = y - yi;
      const sx = tx * tx * (3 - 2 * tx), sy = ty * ty * (3 - 2 * ty);
      const a = g[yi * (gw + 1) + xi], b = g[yi * (gw + 1) + xi + 1];
      const c = g[(yi + 1) * (gw + 1) + xi], d = g[(yi + 1) * (gw + 1) + xi + 1];
      return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
    };
  }

  /* ---------- Renderização ---------- */
  function draw(canvas, type, seed) {
    const W = 320, H = 240;
    const rand = rng(seed);
    const n1 = makeNoise(rand, 12, 9), n2 = makeNoise(rand, 40, 30), n3 = makeNoise(rand, 6, 5);
    const off = document.createElement('canvas');
    off.width = W; off.height = H;
    const ctx = off.getContext('2d');
    const img = ctx.createImageData(W, H);
    const apex = { x: W / 2, y: -50 };
    const fan = 0.92; // meia-abertura em radianos

    // estruturas
    const follicles = [];
    const ov = { x: W * 0.5, y: H * 0.55, rx: 115, ry: 78 };
    if (type === 'ovario-inicial') {
      for (let i = 0; i < 9; i++) {
        const a = rand() * Math.PI * 2, r = Math.sqrt(rand()) * 0.75;
        follicles.push({ x: ov.x + Math.cos(a) * ov.rx * r, y: ov.y + Math.sin(a) * ov.ry * r, r: 8 + rand() * 9 });
      }
    } else if (type === 'ovario-dominante') {
      follicles.push({ x: ov.x - 12, y: ov.y, r: 44 });
      follicles.push({ x: ov.x + 72, y: ov.y - 22, r: 13 }, { x: ov.x + 70, y: ov.y + 30, r: 9 }, { x: ov.x - 80, y: ov.y + 24, r: 8 });
    }
    const cl = { x: ov.x - 5, y: ov.y + 4, r: 34 };

    const endoCurve = (x) => H * 0.5 + Math.sin(x / W * Math.PI * 1.1 - 0.4) * 24 - (x - W / 2) * 0.12;

    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const dx = x - apex.x, dy = y - apex.y;
        const dist = Math.hypot(dx, dy), ang = Math.atan2(dx, dy);
        const idx = (y * W + x) * 4;
        if (Math.abs(ang) > fan || dist < 70 || dist > 330) { img.data[idx + 3] = 255; continue; }
        let v = 0.26 + 0.2 * n1(x / W * 12, y / H * 9) + 0.07 * n2(x / W * 40, y / H * 30);
        let bright = 0;

        if (type.startsWith('ovario') || type === 'corpo-luteo') {
          const e = ((x - ov.x) / ov.rx) ** 2 + ((y - ov.y) / ov.ry) ** 2;
          if (e < 1) v += 0.1 + 0.05 * n3(x / 50, y / 50);
          if (Math.abs(e - 1) < 0.06) bright += 0.18;
          for (const f of follicles) {
            const d = Math.hypot(x - f.x, y - f.y) / f.r;
            if (d < 1) v = 0.02 + 0.04 * rand();
            else if (d < 1.12) bright += 0.35 * (1.12 - d) / 0.12;
            // reforço acústico posterior
            if (y > f.y && Math.abs(x - f.x) < f.r * 0.85 && y < f.y + f.r * 2.4) bright += 0.1 * (1 - (y - f.y) / (f.r * 2.4));
          }
          if (type === 'corpo-luteo') {
            const ang2 = Math.atan2(y - cl.y, x - cl.x);
            const rr = cl.r * (1 + 0.12 * Math.sin(ang2 * 7) + 0.06 * Math.sin(ang2 * 13));
            const d = Math.hypot(x - cl.x, y - cl.y);
            if (d < rr * 0.55) v = 0.06 + 0.1 * n2(x / 8, y / 8);
            else if (d < rr) v = 0.38 + 0.15 * n2(x / 6, y / 6);
            else if (d < rr + 3) bright += 0.25;
          }
        } else {
          // útero em corte longitudinal
          const c = endoCurve(x);
          const dy2 = y - c;
          const uterus = Math.abs(dy2) < 92 - Math.abs(x - W / 2) * 0.12;
          if (uterus) v += 0.08;
          const ad = Math.abs(dy2);
          if (type === 'endometrio-fino') {
            if (ad < 3) bright += 0.6 * (1 - ad / 3);
            else if (ad < 7) v -= 0.06;
          } else if (type === 'endometrio-trilaminar') {
            const T = 22;
            if (ad < 1.8) bright += 0.4;
            else if (ad < T - 3) v = 0.13 + 0.08 * n2(x / 10, y / 10);
            else if (ad < T + 1.5) bright += 0.4;
            else if (ad < T + 6) v -= 0.05;
          } else if (type === 'endometrio-secretor') {
            const T = 34;
            if (ad < 1.2) v = 0.12;
            else if (ad < T) v = 0.55 + 0.18 * n2(x / 7, y / 7);
            else if (ad < T + 3) v -= 0.12;
          }
        }
        // atenuação com a profundidade e speckle
        const att = 1 - Math.max(0, (dist - 90) / 300) * 0.55;
        let g = (v + bright) * att * (0.45 + 1.1 * rand());
        g = Math.max(0, Math.min(1, g));
        g = Math.pow(g, 0.95);
        let r = g * 255, gg = g * 255, b = g * 255;
        if (type === 'endometrio-fino') { r *= 0.78; gg *= 0.8; b = Math.min(255, b * 1.22 + 18); }
        // Doppler colorido ("anel de fogo")
        if (type === 'corpo-luteo') {
          const d = Math.hypot(x - cl.x, y - cl.y);
          const ring = d > cl.r * 1.02 && d < cl.r * 1.5;
          const nn = n2(x / 5, y / 5);
          const inBox = Math.abs(ang) < 0.5 && dist > 120 && dist < 300;
          if (ring && inBox && nn > 0.52) {
            const t = Math.min(1, (nn - 0.52) * 3.5);
            if (nn > 0.86) { r = 40; gg = 90; b = 230; } else { r = 220; gg = 60 + 170 * t; b = 20; }
          }
        }
        img.data[idx] = r; img.data[idx + 1] = gg; img.data[idx + 2] = b; img.data[idx + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);

    const out = canvas.getContext('2d');
    const CW = canvas.width, CH = canvas.height, sx = CW / W, sy = CH / H;
    out.imageSmoothingEnabled = true;
    out.fillStyle = '#000';
    out.fillRect(0, 0, CW, CH);
    out.drawImage(off, 0, 0, CW, CH);

    // marcas de medição
    out.strokeStyle = '#f2f2f2'; out.fillStyle = '#ffe14d'; out.lineWidth = 1.5;
    const plus = (x, y) => { out.beginPath(); out.moveTo((x - 4) * sx, y * sy); out.lineTo((x + 4) * sx, y * sy); out.moveTo(x * sx, (y - 4) * sy); out.lineTo(x * sx, (y + 4) * sy); out.stroke(); };
    out.font = `${Math.round(11 * sx)}px monospace`;
    if (type === 'ovario-inicial') { follicles.slice(0, 3).forEach((f) => plus(f.x + f.r + 4, f.y - f.r)); }
    if (type === 'ovario-dominante') {
      const f = follicles[0];
      out.setLineDash([3 * sx, 3 * sx]); out.strokeStyle = '#ffe14d';
      out.beginPath(); out.moveTo((f.x - f.r) * sx, f.y * sy); out.lineTo((f.x + f.r) * sx, f.y * sy); out.stroke();
      out.setLineDash([]); out.strokeStyle = '#f2f2f2';
      plus(f.x - f.r, f.y); plus(f.x + f.r, f.y);
      out.fillText('21mm', (f.x + f.r + 6) * sx, (f.y + 4) * sy);
    }
    if (type.startsWith('endometrio')) {
      const x0 = W * 0.52, c = endoCurve(x0);
      const t = { 'endometrio-fino': 4, 'endometrio-trilaminar': 24, 'endometrio-secretor': 36 }[type];
      plus(x0, c - t); plus(x0, c + t);
      out.fillText(type === 'endometrio-fino' ? 'END' : 'END', (x0 + 8) * sx, (c - t - 4) * sy);
    }
    if (type === 'corpo-luteo') {
      out.strokeStyle = '#4ce07a'; out.lineWidth = 1.5;
      out.beginPath();
      const a0 = -0.5, a1 = 0.5;
      out.arc(apex.x * sx, apex.y * sy, 300 * sx, Math.PI / 2 - a1, Math.PI / 2 - a0);
      out.arc(apex.x * sx, apex.y * sy, 120 * sx, Math.PI / 2 - a0, Math.PI / 2 - a1, true);
      out.closePath(); out.stroke();
    }
    // escala de profundidade
    out.fillStyle = '#d0d0d0';
    for (let i = 0; i < 6; i++) out.fillRect(CW - 10 * sx, (40 + i * 34) * sy, 5 * sx, 1.5 * sy);
  }

  /* ---------- Página ---------- */
  const root = document.getElementById('us-root');
  root.innerHTML = SECTIONS.map((sec, si) => `
    <section class="us-section">
      <div class="container" style="max-width:1000px">
        <h2 class="reveal">${sec.title}<br><span style="font-size:.9em">${sec.sub}</span></h2>
        <div class="us-pair" style="margin-top:1.4rem">
          ${sec.figs.map((f) => `<figure class="us-fig reveal" data-id="${f.id}">
            <div class="us-frame">
              ${REAL_IMAGES[f.id] ? `<img src="${REAL_IMAGES[f.id]}" alt="Ultrassom: ${f.title}" loading="lazy">` : `<canvas width="640" height="480" role="img" aria-label="Simulação de ultrassom: ${f.title}"></canvas>`}
              ${REAL_IMAGES[f.id] ? '' : `<span class="us-label">${f.label}</span>`}
              <div class="us-illu" aria-hidden="true">${f.illu()}</div>
            </div>
            <figcaption><strong>${f.title}</strong>${f.text}</figcaption>
            <div class="us-controls">
              <button type="button" class="btn btn-sm btn-secondary" data-act="toggle" aria-pressed="false">${icon('eye')} Ver ilustração</button>
              ${REAL_IMAGES[f.id] ? '' : `<button type="button" class="btn btn-sm btn-ghost" data-act="regen">${icon('refresh')} Gerar outra</button>`}
            </div>
          </figure>`).join('')}
        </div>
        ${si < SECTIONS.length - 1 ? '<div class="divider"></div>' : ''}
      </div>
    </section>`).join('');

  const seeds = {};
  function paint(fig) {
    const c = fig.querySelector('canvas');
    if (!c) return;
    const id = fig.dataset.id;
    seeds[id] = seeds[id] || Math.floor(Math.random() * 1e9) + 1;
    draw(c, id, seeds[id]);
  }

  // desenha sob demanda quando a figura aparece na tela
  const figs = root.querySelectorAll('.us-fig');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { paint(en.target); io.unobserve(en.target); } }), { rootMargin: '200px' });
    figs.forEach((f) => io.observe(f));
    // garante que todas sejam desenhadas mesmo sem rolagem
    setTimeout(() => figs.forEach((f) => { if (!seeds[f.dataset.id]) paint(f); }), 1500);
  } else figs.forEach(paint);

  root.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const fig = b.closest('.us-fig');
    if (b.dataset.act === 'toggle') {
      const frame = fig.querySelector('.us-frame');
      const on = frame.classList.toggle('show-illu');
      b.setAttribute('aria-pressed', String(on));
      b.innerHTML = `${icon(on ? 'image' : 'eye')} ${on ? 'Ver ultrassom' : 'Ver ilustração'}`;
      fig.querySelector('.us-illu').setAttribute('aria-hidden', String(!on));
    } else if (b.dataset.act === 'regen') {
      seeds[fig.dataset.id] = Math.floor(Math.random() * 1e9) + 1;
      paint(fig);
    }
  });
  hydrate(root);
})();
