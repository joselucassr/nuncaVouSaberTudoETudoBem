// Função que inicia o canvas p5, e coloca a altura e largura para o tamanho da janela.
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent(select('body'));
  frameRate(60);
}

// Função do p5 que é chamada a cada frame.
function draw() {
  background(255); // Deixa o fundo branco.
  strokeCap(SQUARE); // Faz deixa as pontas quadradas.
  strokeWeight(4); // Ajusta o tamanho da linha.
  stroke(0); // Aplica a cor preta na linha.
  line(mouseX, mouseY, pmouseX, pmouseY); // Desenha uma linha da posição anterior para a atual do mouse.
}

// Função p5 chamada quando a janela tem o tamanho modificado.
function windowResized() {
  // Ajusta o tamanho do canvas para novo tamanho da janela.
  resizeCanvas(windowWidth, windowHeight);
}

// Pegando botões que abrem e fecham o menu e colocando um eventListener.
let settingsBtn = document.querySelector('.settings');
settingsBtn.addEventListener('click', toggleMenu);
document.querySelector('.go-back').addEventListener('click', toggleMenu);

// Pegando os elementos main e section.
let main = document.querySelector('main');
let settingsSection = document.querySelector('section');

// Função que esconde e mostra o menu.
function toggleMenu() {
  // Basicamente é feito um toggle numa classe com display: none;
  main.classList.toggle('hidden');
  settingsSection.classList.toggle('hidden');
  settingsBtn.classList.toggle('hidden');
}

// Captura o botão que inverte as cores e aplica um eventLister.
let invertColorsBtn = document.querySelector('.invert-colors');
invertColorsBtn.addEventListener('click', invertColors);

// Captura a div preta que fica em cima de toda a página.
// A div tem um mix-blend-mode = difference, que basicamente inverte as cores.
let blackOverlay = document.querySelector('#overlay');
function invertColors() {
  // Aqui ela recebe um toggle numa classe que esconde ela.
  blackOverlay.classList.toggle('hidden');
  // Aqui o estado é salvo no localStorage.
  localStorage.isInverted =
    localStorage.isInverted === 'true' ? 'false' : 'true';
}

// Elemento article é capturado.
let articleTag = document.querySelector('article');

// Variáveis iniciando com os valores padrão.
let baseTextSize = '1.20rem';
let baseLineHeight = '1.60rem';
let baseFontFamily = 'Montserrat';

// Se existir um localStorage o bloco abaixo é executado.
// Basicamente é a inicialização caso os parâmetros
// tenham sido modificados em uma visita anterior.
if (Storage) {
  // Nas três linhas abaixo os valores do localStorage são atribuidos
  // às variáveis iniciadas antes, se eles não estiverem indefinidos.
  // O || faz esse papel: se existir atribui, se não mantém o valor padrão.
  baseFontFamily = localStorage.fontFamily || baseFontFamily;
  baseTextSize = localStorage.textSize || baseTextSize;
  baseLineHeight = localStorage.lineHeight || baseLineHeight;

  // Aqui é verificado se as cores estão invertidas ou não.
  // Se sim a classe para esconder a div não é aplicada.
  if (localStorage?.isInverted === 'true') {
    blackOverlay.classList = '';
  } else {
    blackOverlay.classList = 'hidden';
  }
}

// Pegando todos os botões e input do menu.
let smallerTextBtn = document.querySelector('.smallerText');
let largerTextBtn = document.querySelector('.largerText');
let shorterLineBtn = document.querySelector('.shorterLine');
let tallerLineBtn = document.querySelector('.tallerLine');
let fontSelectionInput = document.querySelector('.fontSelection');

// Colocando eventListeners em todos os botões e input do menu.
smallerTextBtn.addEventListener('click', changeArticleStyle);
largerTextBtn.addEventListener('click', changeArticleStyle);
shorterLineBtn.addEventListener('click', changeArticleStyle);
tallerLineBtn.addEventListener('click', changeArticleStyle);
fontSelectionInput.addEventListener('change', changeArticleStyle);

// Pegando texto que informa o tamanho da fonte e colocando o valor salvo.
let textSizeLabel = document.querySelector('.textSize');
textSizeLabel.innerText = baseTextSize;

// Pegando o texto que informa a altura da fonte e colocando o valor salvo.
let lineHeightLabel = document.querySelector('.lineHeight');
lineHeightLabel.innerText = baseLineHeight;

// Pegando elemento body.
let bodyTag = document.querySelector('body');

// Aplicando estilos nas tags article e body.
articleTag.style.fontSize = baseTextSize;
articleTag.style.lineHeight = baseLineHeight;
bodyTag.style.fontFamily = baseFontFamily;
// Colocando valor salvo no input.
fontSelectionInput.value = baseFontFamily.replaceAll('"', '');

// Função que muda o estilo da página.
function changeArticleStyle(event) {
  // Pega a primeira classe do elemento que disparou o evento.
  let targetClass = event.target.classList[0];

  // Pega os estilos já aplicados no article e extrai a parte numérica.
  let currentTextSize = parseFloat(articleTag.style.fontSize);
  let currentLineHeight = parseFloat(articleTag.style.lineHeight);

  // Dependendo do botão apertado aplica a mudança esperada.
  if (targetClass === 'smallerText') currentTextSize -= 0.05;
  if (targetClass === 'largerText') currentTextSize += 0.05;
  if (targetClass === 'shorterLine') currentLineHeight -= 0.05;
  if (targetClass === 'tallerLine') currentLineHeight += 0.05;
  // No caso do input o valor passado é aplicado direto no estilo do body.
  // Isso é possível já que os valores são os nomes das fontes.
  if (targetClass === 'fontSelection') {
    bodyTag.style.fontFamily = event.target.value;
  }

  // Limita o tamanho do número calculado e formata para a unidade esperada.
  currentTextSize = currentTextSize.toFixed(2);
  currentTextSize = currentTextSize + 'rem';

  // Faz o mesmo do código acima.
  currentLineHeight = currentLineHeight.toFixed(2);
  currentLineHeight = currentLineHeight + 'rem';

  // Aplica o estilo de tamanho da fonte e atualiza texto de display.
  articleTag.style.fontSize = currentTextSize;
  textSizeLabel.innerText = currentTextSize;

  // Aplica o estilo de altura da linha e atualiza o texto de display.
  articleTag.style.lineHeight = currentLineHeight;
  lineHeightLabel.innerText = currentLineHeight;

  // Se o localStorage estiver disponível executa o bloco.
  if (Storage) {
    // Salva os novos dados no localStorage.
    localStorage.fontFamily = bodyTag.style.fontFamily;
    localStorage.textSize = currentTextSize;
    localStorage.lineHeight = currentLineHeight;
  }
}
