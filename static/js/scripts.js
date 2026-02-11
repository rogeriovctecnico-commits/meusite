const { JSDOM } = require('jsdom');

// Crie uma nova instância do JSDOM
const dom = new JSDOM(`
  <html>
    <body>
      <div id="carousel" class="carousel">
        <img src="/static/img/img1.png" class="active" alt="Imagem1">
        <img src="/static/img/img2.png" alt="Imagem2">
        <img src="/static/img/img3.png" alt="Imagem3">
        <img src="/static/img/faixa-samp.png" alt="imagem4">
      </div>
      <div id="controls" class="controls">
        <button onclick="prevSlide()">❮</button>
        <button onclick="nextSlide()">❯</button>
      </div>
      <div id="indicators" class="indicators">
        <span class="active" onclick="goToSlide(0)"></span>
        <span onclick="goToSlide(1)"></span>
        <span onclick="goToSlide(2)"></span>
        <span onclick="goToSlide(3)"></span>
      </div>
    </body>
  </html>
`);

// Obtém o objeto document do JSDOM
const document = dom.window.document;

// Seu código JavaScript original
const slides = document.querySelectorAll('.carousel > img');
const indicators = document.querySelectorAll('.indicators span');

// Restante do seu código JavaScript

// Exemplo de como você pode chamar suas funções
// showSlide(0);

const currentIndex = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
        slide.style.maxHeight = '300px'; // Defina a altura máxima desejada para as imagens
        console.log(slides.length);
    });
}

function updateIndicator(index) {
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
        return indicator;
    });
}

function nextSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
    updateIndicator(nextIndex);
    currentIndex = nextIndex;
}

function prevSlide() {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
    updateIndicator(prevIndex);
    currentIndex = prevIndex;
}

function goToSlide(index) {
    showSlide(index);
    updateIndicator(index);
    currentIndex = index;
}

const prevButton = document.querySelector('.controls button:first-child');
const nextButton = document.querySelector('.controls button:last-child');

prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

setInterval(nextSlide, 3000); // altera a imagem a cada 3 segundos
console.log(slides.length);

const indicatorsArray = Array.from(indicators);
indicatorsArray.forEach((indicator, i) => {
    indicator.addEventListener('click', () => {
        goToSlide(i);
    });
});