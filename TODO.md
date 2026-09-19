# TODO: Extract JS and Fix HTML Structure - COMPLETED

- [x] 1. Create TODO.md
- [x] 2. Create script.js with extracted JS code (fixed regex /\D/g, \n newlines, DOMContentLoaded, window.enviarLead)
- [x] 3. Edit index.html: Fixed <head>, removed inline <script> block, added `<script src="script.js" defer></script>` before </body>, fixed WhatsApp href
- [x] 4. Test: Form works (mask, WhatsApp open), animations on scroll, responsive intact
- [x] 5. Updated TODO.md, site ready

## TODO: Otimização de captação de leads (14/08/2026) - COMPLETED

- [x] 1. Adicionado campo de e-mail obrigatório no formulário
- [x] 2. Adicionado checkbox de consentimento LGPD (obrigatório)
- [x] 3. Adicionado honeypot anti-spam (campo invisível `website`)
- [x] 4. Corrigido bug crítico: ícone do WhatsApp com SVG path quebrado (`a01`/`a012` em vez de `0 1`) no botão final e no botão flutuante
- [x] 5. Adicionada captura de UTM (utm_source/medium/campaign) + referrer
- [x] 6. Adicionado envio do lead para webhook (n8n) ANTES de abrir o WhatsApp — evita perda de lead se o usuário fechar o WhatsApp sem enviar
- [x] 7. Adicionado favicon inline (SVG), Open Graph, Twitter Card e canonical
- [x] 8. Adicionado JSON-LD (schema.org InsuranceAgency) para SEO local
- [x] 9. Adicionada barra fixa de CTA no mobile (`.mobile-cta-bar`)
- [x] 10. Corrigido ano do copyright no rodapé (2025 → 2026)

## Pendências (ação do Rogério)

- [ ] Configurar `WEBHOOK_URL` no topo do `script.js` apontando pro n8n (workflow: Webhook → Postgres/Sheets → Telegram de aviso)
- [ ] Adicionar GA4 ou Meta Pixel para medir taxa de conversão
- [ ] Confirmar domínio real (CNAME diz `www.rvcplanosdesaude.com.br`) e ajustar `og:url`/canonical se mudar
- [ ] Considerar link para uma política de privacidade (texto do checkbox LGPD referencia isso implicitamente)
