// ⚙️ CONFIGURAÇÃO: cole aqui a URL do webhook do seu n8n para gravar o lead
const WEBHOOK_URL = 'https://n8n.labfinancas.com/webhook/leads-rvc';

document.addEventListener('DOMContentLoaded', function () {
  // Animação scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Máscara de telefone (aplica em todos os campos de telefone da página)
  document.querySelectorAll('[name="telefone"]').forEach(function (tel) {
    tel.addEventListener('input', function () {
      let v = this.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 6) v = '(' + v.slice(0, 2) + ') ' + v.slice(2, 7) + '-' + v.slice(7);
      else if (v.length > 2) v = '(' + v.slice(0, 2) + ') ' + v.slice(2);
      else if (v.length > 0) v = '(' + v;
      this.value = v;
    });
  });

  // Captura de UTMs
  function getUTMs() {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      referrer: document.referrer || ''
    };
  }

  // Lógica principal de envio
  // btnEl é o botão clicado — usamos .closest('form') pra descobrir
  // se veio do formulário do topo ou do rodapé, sem depender de um ID fixo.
  window.processarEnvio = function (canal, btnEl) {
    const form = btnEl.closest('form');

    // Valida o formulário antes de prosseguir
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Anti-spam Honeypot
    const honeypot = form.querySelector('[name="website"]');
    if (honeypot && honeypot.value) return;

    // Coleta dos dados dos campos
    const nome = form.querySelector('[name="nome"]').value.trim();
    const fone = form.querySelector('[name="telefone"]').value.trim();

    // Objeto do Lead para o n8n
    const lead = {
      nome,
      telefone: fone,
      pagina: window.location.href,
      data: new Date().toISOString(),
      ...getUTMs()
    };
// Requisição ao Webhook do n8n (mode: 'no-cors' ignora a trava de preflight do navegador)
    const salvarLead = WEBHOOK_URL
      ? fetch(WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lead)
        }).catch(err => console.warn('Falha no webhook:', err))
      : Promise.resolve();

    // Roteamento de acordo com o canal escolhido
    if (canal === 'whatsapp') {
      const msg = encodeURIComponent(
        `Olá! Vim pelo site e gostaria de uma cotação.\n\n` +
        `👤 *Nome:* ${nome}\n` +
        `📱 *WhatsApp:* ${fone}`
      );

      salvarLead.finally(() => {
        window.location.href = `https://wa.me/5527995277207?text=${msg}`;
      });

    } else if (canal === 'email') {
      const assunto = encodeURIComponent(`Solicitação de Cotação - ${nome}`);
      const corpo = encodeURIComponent(
        `Solicitação de Cotação enviada pelo site:\n\n` +
        `Nome: ${nome}\n` +
        `Telefone/WhatsApp: ${fone}`
      );

      salvarLead.finally(() => {
        window.location.href = `mailto:contato@rvcplanosdesaude.com.br?subject=${assunto}&body=${corpo}`;
      });

    } else if (canal === 'salvar') {
      // Só grava o lead no webhook e mostra confirmação, sem abrir WhatsApp/e-mail
      salvarLead.finally(() => {
        form.innerHTML = `
          <p class="form-sucesso">
            ✅ Recebemos seu contato, <strong>${nome.split(' ')[0]}</strong>!<br>
            Vou te chamar no WhatsApp em breve.
          </p>
        `;
      });
    }
  };
});
