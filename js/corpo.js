/* Fluindo — Por dentro do seu corpo */
(function () {
  const F = window.FluindoCycle;
  const I = window.FluindoIllu;
  const { icon, hydrate } = window.FluindoIcons;

  const ORGANS = {
    hipotalamo: { name: 'Hipotálamo', text: 'Região do cérebro que funciona como o "maestro" do ciclo. Ele libera o GnRH em pulsos, um hormônio que avisa a hipófise para produzir FSH e LH. O ritmo desses pulsos muda ao longo do ciclo.' },
    hipofise: { name: 'Hipófise', text: 'Glândula do tamanho de uma ervilha, logo abaixo do hipotálamo. Em resposta ao GnRH, ela libera o FSH (que faz os folículos crescerem) e o LH (que dispara a ovulação e mantém o corpo lúteo).' },
    ovarios: { name: 'Ovários', text: 'Guardam os folículos, cada um com um ovócito. Respondem ao FSH e ao LH produzindo estrogênio e progesterona. Esses hormônios agem no útero e também "conversam" de volta com o cérebro (feedback).' },
    utero: { name: 'Útero', text: 'Órgão muscular revestido pelo endométrio. O estrogênio faz esse revestimento crescer, a progesterona o deixa pronto para uma implantação e, quando os dois caem, ele descama na menstruação.' },
    cerebro: { name: 'Cérebro e feedback', text: 'O cérebro "lê" os níveis de estrogênio e progesterona no sangue. Na maior parte do ciclo, níveis altos freiam a produção de FSH e LH (feedback negativo). Perto da ovulação, o estrogênio alto faz o contrário e provoca o pico de LH (feedback positivo).' },
  };

  const PHASES = [
    {
      id: 'menstrual', title: 'Fase menstrual', ico: 'drop', days: 'Dia 1 ao 5',
      blocks: [
        ['Hipotálamo e hipófise', 'brain', 'b-salmon', 'Com a queda da progesterona e do estrogênio no fim do ciclo anterior, o hipotálamo deixa de ser "freado" e volta a liberar GnRH em pulsos. A hipófise responde aumentando aos poucos o FSH.'],
        ['Funcionamento dos hormônios', 'chart', 'b-cream', 'Estrogênio e progesterona estão nos níveis mais baixos do ciclo. O FSH começa a subir já nos primeiros dias e recruta um novo grupo de folículos.'],
        ['Útero', 'uterus', 'b-rose', 'Sem sustentação hormonal, a camada funcional do endométrio descama. As prostaglandinas provocam contrações do músculo do útero, que ajudam a expulsar o tecido e podem causar cólicas.'],
        ['Ovário', 'egg', 'b-blush', 'Um grupo de pequenos folículos antrais (2 a 9 mm) começa a responder ao FSH. O corpo lúteo do ciclo anterior vira uma pequena cicatriz esbranquiçada, o corpo albicans.'],
        ['Saiba mais', 'book', 'b-coral', 'A camada basal do endométrio não descama: é a partir dela que o tecido se regenera no ciclo seguinte. Perder cerca de 30 a 80 ml de fluido por ciclo é considerado comum.'],
      ],
    },
    {
      id: 'folicular', title: 'Fase folicular', ico: 'egg', days: 'Dia 6 ao 13 (ela começa junto com a menstruação)',
      blocks: [
        ['Hipotálamo e hipófise', 'brain', 'b-salmon', 'O hipotálamo mantém os pulsos de GnRH e a hipófise libera FSH. Conforme o estrogênio sobe, ele avisa o cérebro, que reduz o FSH (feedback negativo).'],
        ['Funcionamento dos hormônios', 'chart', 'b-cream', 'O folículo dominante produz cada vez mais estradiol. A queda do FSH faz os outros folículos regredirem, e só o mais sensível continua crescendo.'],
        ['Útero', 'uterus', 'b-rose', 'O estrogênio reconstrói o endométrio (fase proliferativa): glândulas e vasos crescem e a camada passa de cerca de 2 a 4 mm para 8 a 12 mm. No ultrassom aparece o padrão "trilaminar".'],
        ['Ovário', 'egg', 'b-blush', 'O folículo dominante cresce cerca de 1 a 2 mm por dia até chegar a 18 a 25 mm, pronto para ovular.'],
        ['Saiba mais', 'book', 'b-coral', 'O muco cervical fica mais abundante, claro e elástico perto do fim da fase. A duração da fase folicular é a que mais varia entre pessoas e entre ciclos.'],
      ],
    },
    {
      id: 'ovulacao', title: 'Ovulação', ico: 'sparkle', days: 'Por volta do dia 14',
      blocks: [
        ['Hipotálamo e hipófise', 'brain', 'b-salmon', 'Quando o estradiol fica alto por cerca de 36 a 48 horas, o efeito no cérebro se inverte (feedback positivo): o hipotálamo acelera o GnRH e a hipófise libera o pico de LH.'],
        ['Funcionamento dos hormônios', 'chart', 'b-cream', 'O pico de LH, com um pico menor de FSH, dispara a maturação final do óvulo. Cerca de 24 a 36 horas depois, o folículo se rompe. O estradiol cai um pouco e a progesterona começa a subir.'],
        ['Útero', 'uterus', 'b-rose', 'O endométrio está espesso e o colo do útero mais aberto, com muco que facilita a passagem dos espermatozoides.'],
        ['Ovário', 'egg', 'b-blush', 'O folículo se rompe e libera o ovócito, que é capturado pelas fímbrias da tuba uterina. O óvulo sobrevive de 12 a 24 horas.'],
        ['Saiba mais', 'book', 'b-coral', 'Algumas pessoas sentem uma dor leve de um lado do baixo-ventre na ovulação, chamada mittelschmerz. Os espermatozoides podem sobreviver até 5 dias, por isso a janela fértil começa antes da ovulação.'],
      ],
    },
    {
      id: 'lutea', title: 'Fase lútea', ico: 'flower', days: 'Dia 15 ao 28',
      blocks: [
        ['Hipotálamo e hipófise', 'brain', 'b-salmon', 'Progesterona e estrogênio altos freiam o hipotálamo e a hipófise, que mantêm LH e FSH baixos. Isso impede que novos folículos amadureçam neste ciclo.'],
        ['Funcionamento dos hormônios', 'chart', 'b-cream', 'O corpo lúteo produz progesterona, com pico por volta do dia 21, e um segundo aumento, menor, de estrogênio. Se houver gravidez, o hCG do embrião mantém o corpo lúteo funcionando.'],
        ['Útero', 'uterus', 'b-rose', 'O endométrio se torna secretor: as glândulas produzem nutrientes e os vasos ficam espiralados. No ultrassom ele fica mais brilhante (hiperecogênico) e homogêneo.'],
        ['Ovário', 'egg', 'b-blush', 'O corpo lúteo dura cerca de 14 dias. Sem gravidez, ele regride, a progesterona cai e a menstruação começa.'],
        ['Saiba mais', 'book', 'b-coral', 'A progesterona eleva a temperatura basal em cerca de 0,3 a 0,5 °C. A queda hormonal no fim da fase está ligada aos sintomas de TPM.'],
      ],
    },
  ];

  /* Eixo interativo */
  const axis = document.getElementById('axis');
  axis.innerHTML = I.hpoAxis();
  const btns = document.getElementById('organ-buttons');
  const text = document.getElementById('organ-text');
  const order = ['hipotalamo', 'hipofise', 'ovarios', 'utero', 'cerebro'];
  btns.innerHTML = order.map((k) => `<button type="button" class="organ-btn" data-organ="${k}" aria-pressed="false">${ORGANS[k].name}</button>`).join('');
  function select(k) {
    btns.querySelectorAll('.organ-btn').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.organ === k)));
    axis.querySelectorAll('.organ').forEach((g) => g.classList.toggle('sel', g.dataset.organ === k));
    text.innerHTML = `<h3>${ORGANS[k].name}</h3><p>${ORGANS[k].text}</p>`;
  }
  btns.addEventListener('click', (e) => { const b = e.target.closest('.organ-btn'); if (b) select(b.dataset.organ); });
  axis.addEventListener('click', (e) => { const g = e.target.closest('.organ'); if (g) select(g.dataset.organ); });
  axis.addEventListener('keydown', (e) => {
    const g = e.target.closest('.organ');
    if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); select(g.dataset.organ); }
  });
  select('hipotalamo');

  /* Fases */
  const s = F.store.getSettings();
  const est = s ? F.estimate(s) : null;
  document.getElementById('body-nav').innerHTML = PHASES.map((p) => `<a class="phase-tab" href="#corpo-${p.id}"><span class="dot ${p.id}"></span>${p.title}${est && est.phase === p.id ? '<span class="you">você</span>' : ''}</a>`).join('');

  const illu = {
    menstrual: () => I.uterus({ endo: 'shed', drops: true, left: 'follicles', right: 'albicans' }),
    folicular: () => I.uterus({ endo: 'medium', left: 'follicles', right: 'growing', rays: 'R' }),
    ovulacao: () => I.uterus({ endo: 'thick', left: 'follicles', right: 'rupture' }),
    lutea: () => I.uterus({ endo: 'thick', left: 'luteum', right: 'follicles' }),
  };

  document.getElementById('body-phases').innerHTML = PHASES.map((p) => `
    <article class="body-phase" id="corpo-${p.id}">
      <h2 class="reveal">${p.title}: ${icon(p.ico)}</h2>
      <div class="grid-2 even">
        <div class="info-stack reveal">
          <div class="body-days">${icon('calendar')} ${p.days}</div>
          ${p.blocks.slice(0, 3).map(([t, ic, cls, txt]) => `<div class="info-block"><h4>${icon(ic)} ${t}:</h4><div class="box ${cls}"><p>${txt}</p></div></div>`).join('')}
        </div>
        <div class="info-stack reveal">
          <figure class="diagram" style="max-width:320px;margin-inline:auto">${illu[p.id]()}<figcaption>${F.PHASES[p.id].name} · <a href="fases.html?fase=${p.id}">ver a fase completa</a></figcaption></figure>
          ${p.blocks.slice(3).map(([t, ic, cls, txt]) => `<div class="info-block"><h4>${icon(ic)} ${t}:</h4><div class="box ${cls}"><p>${txt}</p></div></div>`).join('')}
        </div>
      </div>
    </article>`).join('<div class="divider"></div>');
  hydrate();
})();
