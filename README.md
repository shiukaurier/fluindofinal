# Fluindo

Site educativo sobre o ciclo menstrual: "Entenda o seu corpo, fase por fase."
HTML, CSS e JavaScript puros. Não precisa de build nem de dependências.

## Como rodar

Abra `index.html` no navegador, ou sirva a pasta:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Páginas

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Hero com roda do ciclo interativa, rastreador rápido, as quatro fases e atalhos |
| `fases.html?fase=menstrual\|folicular\|ovulacao\|lutea` | Página de cada fase: corpo, hormônios, curiosidades, sensações, dicas |
| `corpo.html` | Eixo hipotálamo–hipófise–ovário clicável e detalhes de cada fase |
| `hormonios.html` | Gráfico interativo (FSH, LH, estrogênio, progesterona, endométrio) |
| `ultrassom.html` | Simulações de ultrassom geradas em canvas, comparáveis às ilustrações |
| `acompanhar.html` | Rastreador completo: calendário, janela fértil, previsões, diário, histórico, exportação |

## Estrutura

```
css/style.css          estilos e paleta (variáveis CSS)
js/icons.js            ícones SVG
js/cycle.js            cálculo do ciclo, curvas hormonais, localStorage
js/illustrations.js    ilustrações SVG (útero, ovário, endométrio, roda, eixo)
js/layout.js           cabeçalho, rodapé, menu mobile, animações
js/tracker.js          formulário, resultado e calendário
js/data-fases.js       textos das quatro fases
js/home.js, fases.js, corpo.js, hormonios.js, ultrassom.js, acompanhar.js
assets/favicon.svg
```

## Paleta

`#FFFDEB` creme · `#E8A9B0` rosa · `#E46A6B` coral · `#F49A96` salmão · `#3D0410` vinho · `#FFDFDF` blush · `#8E1C52` ameixa

Fontes (Google Fonts): Marcellus (títulos), Montserrat (textos), Lilita One (logo).

## Usar fotos reais de ultrassom

Coloque as imagens em `assets/ultrassom/` e preencha os caminhos no objeto `REAL_IMAGES`
no início de `js/ultrassom.js`. Quando um caminho está vazio, a página usa a simulação.
Use apenas imagens que você tem direito de publicar.

## Privacidade

Os dados do ciclo e do diário ficam só no `localStorage` do navegador. Nada é enviado a servidores.

> Conteúdo educativo. Não substitui avaliação médica nem método contraceptivo.
