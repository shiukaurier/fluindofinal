/* Fluindo — conteúdo das quatro fases */
(function () {
  const I = window.FluindoIllu;

  const fig = (svg, cap) => `<figure class="diagram">${svg}${cap ? `<figcaption>${cap}</figcaption>` : ''}</figure>`;

  window.FluindoFases = {
    menstrual: {
      id: 'menstrual',
      title: 'Fase Menstrual',
      days: 'Dia 1 ao 5 (em média)',
      range: [1, 5],
      intro: 'Essa é a fase em que o corpo elimina o revestimento do útero, marcando o início de um novo ciclo menstrual.',
      hero: () => I.uterus({ endo: 'shed', heart: true, drops: true, left: 'follicles', right: 'albicans', title: 'Útero durante a menstruação' }),
      body: 'Durante a menstruação, o revestimento do útero (endométrio), que foi preparado para receber um possível óvulo fertilizado, se decompõe. Isso ocorre devido à queda acentuada nos níveis hormonais, o que aciona a liberação de substâncias químicas chamadas prostaglandinas. Essas substâncias causam vasoconstrição (estreitamento dos vasos sanguíneos) e contrações musculares no útero para expelir o revestimento. O fluido menstrual é composto por sangue, tecido endometrial e muco cervical.',
      diagrams: () => `<div class="diagram-row two">
        ${fig(I.uterus({ endo: 'thick', left: 'albicans', right: 'follicles', title: 'Início da menstruação', labels: [
          { x: 30, y: 168, t: 'endométrio\nespesso', anchor: 'start', lx: 136, ly: 80 },
          { x: 270, y: 168, t: 'colo do\nútero', anchor: 'end', lx: 156, ly: 156 },
        ] }), '<strong>Início da menstruação:</strong> queda hormonal. Sem gravidez, estrogênio e progesterona caem.')}
        ${fig(I.uterus({ endo: 'shed', drops: true, left: 'albicans', right: 'follicles', title: 'Descamação do endométrio', labels: [
          { x: 26, y: 168, t: 'vasos se\ncontraem', anchor: 'start', lx: 136, ly: 76 },
          { x: 274, y: 168, t: 'fluido\nmenstrual', anchor: 'end', lx: 152, ly: 196 },
        ] }), '<strong>Menstruação:</strong> descamação do endométrio. Contrações ajudam a expulsar o tecido.')}
      </div>
      <div class="diagram-row" style="max-width:420px;margin-inline:auto">${fig(I.endometriumDetail('shed'), 'Corte do endométrio: a camada funcional se solta e a basal permanece para regenerar o tecido.')}</div>`,
      hormonesIntro: 'A fase menstrual é desencadeada por um "reset" hormonal. Os níveis de estrogênio e progesterona, que estavam altos na fase lútea, despencam drasticamente quando a gravidez não ocorre. Essa queda sinaliza ao útero para iniciar a descamação. Simultaneamente, os hormônios da pituitária (FSH e LH) estão baixos, mas prontos para reiniciar o estímulo folicular.',
      hormones: [
        { name: 'Estrogênio', icon: 'wavesDown', dir: 'down', text: 'Queda rápida, afetando a regulação térmica e o humor.' },
        { name: 'Progesterona', icon: 'molecule', dir: 'down', text: 'Queda brusca, acionando as prostaglandinas e o sangramento.' },
        { name: 'Hormônios da hipófise (FSH/LH)', icon: 'brain', dir: 'none', text: 'Níveis baixos, mas prontos para o recrutamento folicular. O FSH começa a subir nos primeiros dias.' },
      ],
      focus: ['estrogeno', 'progesterona'],
      curiosities: [
        { icon: 'drops', text: 'A cor do fluido menstrual pode variar de vermelho vivo a marrom escuro ou rosa, dependendo da velocidade do fluxo e da exposição ao oxigênio (sangue "velho" é marrom).' },
        { icon: 'flask', text: 'A quantidade total de fluido menstrual é surpreendentemente pequena, variando de 30 a 80 ml (cerca de 2 a 5 colheres de sopa), embora possa parecer mais.' },
        { icon: 'thermo', text: 'Sua Temperatura Corporal Basal (TCB) cai para o nível mais baixo do ciclo, confirmando o fim da fase anterior.' },
        { icon: 'swelling', text: 'A retenção de líquidos e o inchaço podem persistir nos primeiros dias, mas a própria menstruação ajuda a aliviar esse sintoma ao longo do período.' },
        { icon: 'egg', text: 'Enquanto um ciclo termina, o próximo já começa! Novas ondas de folículos começam a ser recrutadas no ovário imediatamente.' },
      ],
      feelings: [
        { icon: 'drop', text: 'Cansaço', note: 'Hormônios baixos e a perda de sangue podem deixar o corpo mais cansado.' },
        { icon: 'zzz', text: 'Sono maior', note: 'É comum sentir mais necessidade de descanso nos primeiros dias.' },
        { icon: 'waves', text: 'Cólica', note: 'As prostaglandinas contraem o útero para expulsar o endométrio.' },
        { icon: 'frown', text: 'Sensibilidade Emocional', note: 'A queda de estrogênio pode influenciar o humor.' },
        { icon: 'brain', text: 'Dificuldade de concentração', note: 'Cansaço e desconforto podem atrapalhar o foco.' },
        { icon: 'utensils', text: 'Aumento do apetite', note: 'O corpo pode pedir mais energia, especialmente nos primeiros dias.' },
      ],
      tips: [
        { icon: 'drop', text: 'Mantenha-se hidratada' },
        { icon: 'dumbbell', text: 'Faça atividades leves, como caminhada' },
        { icon: 'hotbag', text: 'Use bolsa de calor, se precisar' },
        { icon: 'heart', text: 'Cuide de sua saúde mental e descanse' },
      ],
      remember: 'A menstruação é um processo natural, e faz parte de sua saúde e de seu ciclo. Conhecer o seu corpo ajuda a lidar melhor com essa fase e a se cuidar ainda mais! Cólicas que impedem suas atividades ou sangramento muito intenso merecem avaliação profissional.',
    },

    folicular: {
      id: 'folicular',
      title: 'Fase Folicular',
      days: 'Dia 6 ao 13 (em média)',
      range: [6, 13],
      intro: 'Esta é a fase que se segue à menstruação, onde o corpo se prepara para a ovulação. O FSH estimula o crescimento de folículos nos ovários e o revestimento do útero começa a se reconstruir.',
      hero: () => I.uterus({ endo: 'medium', left: 'follicles', right: 'growing', rays: 'R', title: 'Útero e ovários na fase folicular', labels: [{ x: 262, y: 160, t: 'folículo\ndominante', size: 8.5, lx: 243, ly: 114 }] }),
      body: 'Sob a influência do FSH, vários folículos nos ovários começam a amadurecer. O folículo dominante libera Estrogênio, que sinaliza ao útero para reconstruir e espessar seu revestimento (endométrio), preparando-o para uma possível implantação.',
      diagrams: () => `<div class="diagram-row">
        ${fig(I.ovaryDetail('growing'), 'Ovário: vários folículos crescem, e um deles se torna o dominante.')}
        <div class="diagram-row two">
          ${fig(I.uterus({ endo: 'medium', left: 'follicles', right: 'growing', title: 'Útero reconstruindo o endométrio' }), 'O endométrio volta a crescer.')}
          ${fig(I.endometriumDetail('proliferative', { title: 'Endométrio proliferativo' }), '<strong>Reconstrução do endométrio</strong> e vasos em crescimento.')}
        </div>
      </div>`,
      hormonesIntro: 'O equilíbrio hormonal muda para apoiar o desenvolvimento folicular. O FSH inicia o processo, seguido por um pico de Estrogênio crucial para o crescimento do útero e a maturação do folículo.',
      hormones: [
        { name: 'FSH (Hormônio Folículo Estimulante)', icon: 'brain', dir: 'up', text: 'Sobe para estimular os ovários a recrutar folículos.' },
        { name: 'Estrogênio', icon: 'molecule', dir: 'up', text: 'Aumenta, espessando o endométrio e preparando o muco cervical.' },
        { name: 'LH / Hormônios da Hipófise', icon: 'brain', dir: 'none', text: 'O cérebro regula o aumento do FSH para orquestrar o ciclo. O LH fica estável até perto da ovulação.' },
      ],
      focus: ['fsh', 'estrogeno'],
      curiosities: [
        { icon: 'heartPulse', title: 'Janela de Fertilidade', text: 'A fase folicular culmina na janela de fertilidade, os dias que antecedem a ovulação.' },
        { icon: 'pipette', title: 'Muco Cervical', text: 'O muco se torna claro, elástico e com aspecto de clara de ovo, facilitando a passagem dos espermatozoides.' },
        { icon: 'battery', title: 'Pico de Energia e Foco', text: 'É comum sentir um pico de energia e clareza mental devido ao aumento do estrogênio.' },
        { icon: 'egg', title: 'O Folículo Dominante', text: 'Um único folículo (geralmente) se torna o dominante, enquanto os outros regridem.' },
      ],
      feelings: [
        { icon: 'bolt', text: 'Energia Aumentada', note: 'O estrogênio em alta costuma trazer mais disposição.' },
        { icon: 'face', text: 'Melhora na pele', note: 'O estrogênio favorece a hidratação e o colágeno da pele.' },
        { icon: 'heart', text: 'Maior libido', note: 'O desejo tende a aumentar conforme a ovulação se aproxima.' },
        { icon: 'feather', text: 'Sensação de Leveza', note: 'A retenção de líquidos costuma ser menor nesta fase.' },
        { icon: 'target', text: 'Melhora no foco', note: 'Muitas pessoas relatam mais clareza mental.' },
        { icon: 'smile', text: 'Bom humor estável', note: 'Hormônios em subida gradual ajudam no equilíbrio do humor.' },
      ],
      tips: [
        { icon: 'walk', title: 'Aproveite a energia:', text: 'Planeje exercícios mais intensos ou novos projetos.' },
        { icon: 'rocket', title: 'Dê um gás:', text: 'Inicie novos projetos e organize sua agenda.' },
        { icon: 'brain', title: 'Cuide da saúde mental:', text: 'Nutra seu corpo com alimentos saudáveis e aproveite o bom humor.' },
        { icon: 'drop', text: 'Mantenha-se hidratada.' },
      ],
      remember: 'A fase folicular é um período de renovação e crescimento, em que o seu corpo se prepara para a ovulação. Conhecer e aproveitar o aumento de energia, foco e bom humor dessa fase ajuda você a iniciar novos projetos e a cuidar ainda mais do seu bem-estar!',
    },

    ovulacao: {
      id: 'ovulacao',
      title: 'Ovulação',
      days: 'Por volta do dia 14 (em um ciclo de 28 dias)',
      range: [13, 15],
      intro: 'A ovulação é o momento culminante do ciclo menstrual, quando um óvulo maduro é libertado do ovário. É o período mais fértil e ideal para a concepção.',
      hero: () => I.uterus({ endo: 'thick', left: 'follicles', right: 'rupture', title: 'Ovulação: óvulo sendo liberado', labels: [{ x: 252, y: 168, t: 'folículo\nmaduro', size: 8.5, lx: 240, ly: 120 }, { x: 290, y: 40, t: 'óvulo', size: 8.5, anchor: 'end', lx: 262, ly: 84 }] }),
      body: 'Em resposta a um pico maciço de LH, o folículo dominante se rompe e libera o óvulo. As fímbrias capturam o óvulo para que ele viaje pela tuba uterina. O endométrio atinge sua espessura máxima e receptividade.',
      diagrams: () => `<div class="diagram-row two">
        ${fig(I.ovaryDetail('rupture', { tube: false }), 'O folículo se rompe e as fímbrias capturam o óvulo.')}
        ${fig(I.uterus({ endo: 'thick', left: 'follicles', right: 'rupture', title: 'Útero pronto para implantação', labels: [
          { x: 30, y: 176, t: 'endométrio\nespesso', anchor: 'start', lx: 134, ly: 82 },
          { x: 272, y: 176, t: 'pronto para\nimplantação', anchor: 'end', lx: 160, ly: 90 },
        ] }), 'O endométrio está espesso e receptivo.')}
      </div>`,
      hormonesIntro: 'A ovulação é resultado de uma verdadeira reação em cadeia hormonal, na qual o cérebro e os ovários trabalham em sincronia para liberar o óvulo maduro no momento ideal.',
      hormones: [
        { name: 'Estrogênio (Pico máximo)', icon: 'molecule', dir: 'up', text: 'Atinge o seu nível mais alto pouco antes da ovulação. Esse pico deixa o muco cervical mais fértil e envia um sinal para a hipófise liberar uma grande descarga de LH.' },
        { name: 'LH – Hormônio Luteinizante', icon: 'brain', dir: 'up', text: 'Sofre uma elevação brusca e intensa. Esse "pico de LH" é o responsável por romper o folículo dominante e liberar o óvulo, o que acontece entre 24 e 36 horas depois.' },
        { name: 'FSH – Hormônio Folículo-Estimulante', icon: 'brain', dir: 'up', text: 'Acompanha o pico de LH com uma subida mais discreta, ajudando a finalizar o amadurecimento e a ruptura do folículo.' },
        { name: 'Progesterona (Início da subida)', icon: 'molecule', dir: 'up', text: 'Começa a ser produzida logo após a liberação do óvulo, iniciando o preparo do útero para uma possível gravidez e elevando levemente a temperatura basal do corpo.' },
      ],
      focus: ['lh', 'fsh', 'estrogeno'],
      curiosities: [
        { icon: 'microscope', title: 'Janela de Fertilidade', text: 'Dias que antecedem e incluem a ovulação. Os espermatozoides podem sobreviver até 5 dias no corpo.' },
        { icon: 'pipette', title: 'Muco Clara de Ovo', text: 'O muco se torna claro, elástico e facilita a passagem do esperma.' },
        { icon: 'thermo', title: 'Pico da Temperatura Corporal Basal (TCB)', text: 'A temperatura corporal basal pode subir ligeiramente após a ovulação.' },
        { icon: 'target', title: 'Sobrevivência do Óvulo', text: 'O óvulo sobrevive apenas 12 a 24 horas após a liberação.' },
        { icon: 'eggs', title: 'Ovulação Múltipla', text: 'É raro, mas a ovulação de dois óvulos pode resultar em gêmeos.' },
      ],
      feelings: [
        { icon: 'rocket', text: 'Pico de Energia', note: 'O estrogênio no ponto mais alto costuma trazer disposição.' },
        { icon: 'smile', text: 'Bom Humor e Confiança', note: 'Muitas pessoas se sentem mais sociáveis e confiantes.' },
        { icon: 'heart', text: 'Aumento da Libido', note: 'O desejo costuma atingir o pico perto da ovulação.' },
        { icon: 'drop', text: 'Muco Clara de Ovo', note: 'Muco transparente e elástico é um sinal da fase fértil.' },
        { icon: 'heartPulse', text: 'Sensibilidade nos Seios', note: 'A mudança hormonal pode deixar os seios sensíveis.' },
        { icon: 'waves', text: 'Cólicas Ligeiras', note: 'Uma dor leve de um lado do abdome (mittelschmerz) pode acontecer.' },
      ],
      tips: [
        { icon: 'drop', text: 'Mantenha-se hidratada' },
        { icon: 'rocket', title: 'Aproveite a energia:', text: 'Planeje atividades criativas e exercícios mais intensos.' },
        { icon: 'calendarHeart', title: 'Rastreie seu ciclo:', text: 'Use apps e testes de ovulação para monitorar o seu ciclo.' },
        { icon: 'apple', text: 'Nutra seu corpo com alimentos ricos em zinco e antioxidantes' },
      ],
      remember: 'A ovulação é um processo natural e vital do seu ciclo. Conhecer o seu corpo e rastrear a ovulação ajuda a lidar melhor com essa fase e a planejar ou prevenir a concepção com mais conhecimento! Lembre: aplicativos de ciclo não são método contraceptivo.',
    },

    lutea: {
      id: 'lutea',
      title: 'Fase Lútea',
      days: 'Dia 15 ao 28 (cerca de 14 dias)',
      range: [15, 28],
      intro: 'Nessa fase, o folículo que liberou o ovócito transforma-se em uma estrutura chamada corpo lúteo, responsável pela produção principalmente de progesterona. Esse hormônio promove alterações no endométrio, preparando o útero para uma possível implantação embrionária e para o início de uma gestação.',
      hero: () => I.uterus({ endo: 'thick', left: 'luteum', right: 'follicles', title: 'Útero e corpo lúteo', labels: [{ x: 40, y: 160, t: 'corpo\nlúteo', size: 9, lx: 62, ly: 118 }, { x: 262, y: 30, t: 'endométrio\nsecretor', size: 9, lx: 166, ly: 76 }] }),
      body: 'Após a ovulação, o folículo vazio se reorganiza e vira o corpo lúteo, que passa a produzir grandes quantidades de progesterona e um pouco de estrogênio. Sob esse estímulo, o endométrio fica mais espesso, rico em glândulas e vasos (fase secretora), pronto para nutrir um possível embrião. Se não houver gravidez, o corpo lúteo regride em cerca de 14 dias.',
      steps: () => [
        [I.ovaryDetail('empty', { tube: false }), 'O folículo vazio se transforma no Corpo Lúteo.'],
        [I.ovaryDetail('luteum', { tube: false }), 'O Corpo Lúteo libera grandes quantidades de Progesterona.'],
        [I.endometriumDetail('secretory'), 'O endométrio atinge sua espessura máxima e torna-se secretor.'],
        [I.ovaryDetail('degenerating', { tube: false }), 'Sem gravidez, o Corpo Lúteo começa a degenerar.'],
      ],
      hormonesIntro: 'A progesterona é a protagonista desta fase. Ela e o estrogênio, em alta, avisam o cérebro para manter LH e FSH baixos. No final, sem gravidez, todos caem e o ciclo recomeça.',
      hormones: [
        { name: 'Progesterona', icon: 'molecule', dir: 'up', text: 'Hormônio dominante: atinge o pico por volta do dia 21, prepara o endométrio e eleva a temperatura corporal.' },
        { name: 'Estrogênio', icon: 'target', dir: 'up', text: 'Tem um segundo aumento, menor que o da fase folicular.' },
        { name: 'LH / FSH', icon: 'brain', dir: 'down', text: 'Ficam baixos: a hipófise é "freada" pela progesterona, impedindo novas ovulações.' },
        { name: 'Fim da fase', icon: 'flask', dir: 'down', text: 'Sem gravidez, a progesterona e o estrogênio caem, o que desencadeia a menstruação.' },
      ],
      focus: ['progesterona'],
      curiosities: [
        { icon: 'calendar', title: 'Duração Constante', text: 'É a fase mais constante do ciclo (média de 12 a 14 dias).' },
        { icon: 'flower', title: 'Corpo Lúteo', text: 'Uma glândula temporária vital que secreta progesterona.' },
        { icon: 'thermo', title: 'Temperatura Corporal', text: 'Permanece elevada (cerca de 0,3 a 0,5 °C) devido à progesterona.' },
        { icon: 'alert', title: 'Sinais Pré-Menstruais (SPM/TPM)', text: 'Muitos sintomas de SPM ocorrem nesta fase, principalmente nos últimos dias.' },
      ],
      feelings: [
        { icon: 'battery', text: 'Cansaço', note: 'A progesterona tem efeito mais calmante e pode dar sono.' },
        { icon: 'bolt', text: 'Irritabilidade', note: 'A queda hormonal no fim da fase pode afetar o humor.' },
        { icon: 'drops', text: 'Retenção de Líquidos', note: 'A progesterona pode causar inchaço e sensação de peso.' },
        { icon: 'heartPulse', text: 'Sensibilidade nos Seios', note: 'Os hormônios estimulam o tecido mamário.' },
        { icon: 'brain', text: 'Dificuldade de concentração', note: 'Sono e desconforto podem atrapalhar o foco.' },
        { icon: 'cookie', text: 'Desejos Alimentares', note: 'Vontade de doces e carboidratos é comum antes da menstruação.' },
      ],
      tips: [
        { icon: 'apple', title: 'Nutrição Equilibrada:', text: 'Foco em alimentos anti-inflamatórios e ricos em magnésio.' },
        { icon: 'lotus', title: 'Exercício Leve:', text: 'Atividades de baixo impacto, como yoga e caminhada.' },
        { icon: 'bed', title: 'Priorizar o Sono:', text: 'Estabelecer rotina de sono e reduzir cafeína.' },
        { icon: 'heart', title: 'Cuidados Emocionais:', text: 'Relaxamento e meditação para lidar com a SPM.' },
      ],
      remember: 'A fase lútea é a metade do seu ciclo que prepara o útero para nutrir uma possível gravidez. Se a gravidez não ocorrer, a queda dos hormônios desencadeia a menstruação e o início de um novo ciclo. Use esta fase para autocuidado e compreensão dos seus sinais pré-menstruais.',
    },
  };
})();
