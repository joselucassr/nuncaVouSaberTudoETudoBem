function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent(select('body'));
  frameRate(60);
}

function draw() {
  background(255);
  strokeCap(SQUARE);
  strokeWeight(4);
  stroke(0);
  line(mouseX, mouseY, pmouseX, pmouseY);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

let settingsBtn = document.querySelector('.settings');
settingsBtn.addEventListener('click', toggleMenu);
document.querySelector('.go-back').addEventListener('click', toggleMenu);

let main = document.querySelector('main');
let settingsSection = document.querySelector('section');

function toggleMenu() {
  main.classList.toggle('hidden');
  settingsSection.classList.toggle('hidden');
  settingsBtn.classList.toggle('hidden');
}

let invertColorsBtn = document.querySelector('.invert-colors');
invertColorsBtn.addEventListener('click', invertColors);

let blackOverlay = document.querySelector('#overlay');
function invertColors() {
  blackOverlay.classList.toggle('hidden');
  localStorage.isInverted =
    localStorage.isInverted === 'true' ? 'false' : 'true';
}

let articleTag = document.querySelector('article');

let baseTextSize = '1.20rem';
let baseLineHeight = '1.60rem';
let baseFontFamily = 'Montserrat';

if (Storage) {
  baseFontFamily = localStorage.fontFamily || baseFontFamily;
  baseTextSize = localStorage.textSize || baseTextSize;
  baseLineHeight = localStorage.lineHeight || baseLineHeight;

  if (localStorage?.isInverted === 'true') {
    blackOverlay.classList = '';
  } else {
    blackOverlay.classList = 'hidden';
  }
}

let smallerTextBtn = document.querySelector('.smallerText');
let largerTextBtn = document.querySelector('.largerText');
let shorterLineBtn = document.querySelector('.shorterLine');
let tallerLineBtn = document.querySelector('.tallerLine');
let fontSelectionInput = document.querySelector('.fontSelection');

smallerTextBtn.addEventListener('click', changeArticleStyle);
largerTextBtn.addEventListener('click', changeArticleStyle);
shorterLineBtn.addEventListener('click', changeArticleStyle);
tallerLineBtn.addEventListener('click', changeArticleStyle);
fontSelectionInput.addEventListener('change', changeArticleStyle);

let textSizeLabel = document.querySelector('.textSize');
textSizeLabel.innerText = baseTextSize;

let lineHeightLabel = document.querySelector('.lineHeight');
lineHeightLabel.innerText = baseLineHeight;

let bodyTag = document.querySelector('body');

articleTag.style.fontSize = baseTextSize;
articleTag.style.lineHeight = baseLineHeight;
bodyTag.style.fontFamily = baseFontFamily;
fontSelectionInput.value = baseFontFamily.replaceAll('"', '');

function changeArticleStyle(event) {
  let targetClass = event.target.classList[0];
  let currentTextSize = parseFloat(articleTag.style.fontSize);
  let currentLineHeight = parseFloat(articleTag.style.lineHeight);

  if (targetClass === 'smallerText') currentTextSize -= 0.05;
  if (targetClass === 'largerText') currentTextSize += 0.05;
  if (targetClass === 'shorterLine') currentLineHeight -= 0.05;
  if (targetClass === 'tallerLine') currentLineHeight += 0.05;
  if (targetClass === 'fontSelection') {
    bodyTag.style.fontFamily = event.target.value;
  }

  currentTextSize = currentTextSize.toFixed(2);
  currentTextSize = currentTextSize + 'rem';

  currentLineHeight = currentLineHeight.toFixed(2);
  currentLineHeight = currentLineHeight + 'rem';

  articleTag.style.fontSize = currentTextSize;
  textSizeLabel.innerText = currentTextSize;

  articleTag.style.lineHeight = currentLineHeight;
  lineHeightLabel.innerText = currentLineHeight;

  if (Storage) {
    localStorage.fontFamily = bodyTag.style.fontFamily;
    localStorage.textSize = currentTextSize;
    localStorage.lineHeight = currentLineHeight;
  }
}
