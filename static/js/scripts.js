document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll("#image-container img");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    const indicators = document.querySelectorAll(".indicators span");

    let currentIndex = 0;
    const total = images.length;

    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.toggle("active", i === index);
            if (indicators) { // Check if the indicators are not undefined
                indicators[i].classList.toggle("active", i === index);
            }
        });
    }

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + total) % total;
        showImage(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % total;
        showImage(currentIndex);
    });

    indicators.forEach((indicator, i) => {
        if (indicator) { // Check if the indicator is not undefined
            indicator.addEventListener("click", () => {
                currentIndex = i;
                showImage(currentIndex);
            });
        }
    });

    setInterval(() => {
        currentIndex = (currentIndex + 1) % total;
        showImage(currentIndex);
    }, 5000);

    showImage(currentIndex);
});

const form = document.getElementById("contato-form");

form.addEventListener("submit", function (event) {
    event.preventDefault(); // evita o envio padrão

    // Captura os valores dos campos
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const planointeresse = document.getElementById("planointeresse").value;

    // Monta a mensagem
    const mensagem = `Olá, meu nome é ${nome}. 
                        Email: ${email} 
                        Telefone: ${telefone}
                        Plano de interesse: ${planointeresse}`; 

    // Número do WhatsApp (com DDI e DDD)
    const numeroWhatsApp = "5527995277207";

    
    // // Monta a URL da API do WhatsApp
    // const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`;

    // Abre o WhatsApp em nova aba
    window.open(url, "_blank");
});

function openWhatsApp() {
    window.open('https://api.whatsapp.com/send?phone=5527995277207', '_blank');
}

const iconEmail = document.querySelector('.icon-email');
iconEmail.addEventListener('click', () => {
    const email = 'rogeriovc1000@gmail.com';
    window.location.href = `mailto:${email}`;
});

const iconZap = document.querySelector('.icon-zap');
iconZap.addEventListener('click', () => {
    const zap= '5527995277207';
    window.location.href = `https://api.whatsapp.com/send?phone=${zap}`;
});document.getElementById('contato-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const plano = document.getElementById('planointeresse').value.trim();

    if (!nome || !email || !telefone || !plano) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const btn = document.getElementById('btn-enviar');
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    enviarEmail(nome, email, telefone, plano)
        .then(() => {
            mostrarMensagemSucesso();
            document.getElementById('contato-form').reset();
            enviarWhatsApp(nome, email, telefone, plano);
        })
        .catch(err => {
            console.error('Erro ao enviar email:', err);
            alert('Houve um erro ao enviar sua cotação. Tente novamente ou fale conosco pelo WhatsApp.');
        })
        .finally(() => {
            btn.disabled = false;
            btn.textContent = 'Favor enviar uma cotação';
        });
});

function enviarEmail(nome, email, telefone, plano) {
    return fetch('https://formsubmit.co/ajax/rogeriovc1000@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
            Nome: nome,
            Email: email,
            Telefone: telefone,
            'Plano de interesse': plano,
            _subject: 'Nova cotação solicitada - Site RVC'
        })
    }).then(res => {
        if (!res.ok) throw new Error('Falha no envio do email');
        return res.json();
    });
}

function enviarWhatsApp(nome, email, telefone, plano) {
    const numeroWhatsApp = '5527995277207';
    const mensagem = `Olá! Gostaria de uma cotação de plano de saúde.\n\nNome: ${nome}\nEmail: ${email}\nTelefone: ${telefone}\nPlano de interesse: ${plano}`;
    const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`;
    setTimeout(() => window.open(url, '_blank'), 1200);
}

function mostrarMensagemSucesso() {
    const msg = document.getElementById('mensagem-sucesso');
    msg.style.display = 'block';
    setTimeout(() => {
        msg.style.display = 'none';
    }, 6000);
}
