# Validação — CORTEJO

Conferência em 2026-11-01. Demo: [CORTEJO](https://cortejo-gustapaz.starrylinen.chatgpt.site).

- 20 testes de domínio, API e D1 aprovados; o lote completo soma 215 testes.
- Build de produção, TypeScript e formatação aprovados. CI reproduz os testes no GitHub.
- Smoke HTTP público aprovado: saúde do banco, domínio, rejeição de entrada extra, criação, leitura privada, isolamento, edição, revisão antiga/CAS, publicação, exportação, encerramento do link, remoção do registro de teste, HTML e OpenAPI.
- Navegador público: calcular, guardar, reler, criar link e baixar o arquivo da revisão salva.
- Desktop e larguras de 390 e 768 px verificadas. Com barra de rolagem, as áreas úteis observadas foram 375 e 753 px; nenhuma rolagem horizontal após as correções.
- Capacidade insuficiente exibida; recuperação pelo exemplo; título móvel corrigido e diagrama simplificado com nomes completos na lista textual.
- Exportação verificada: `cortejo.csv`, 196 bytes, SHA-256 `29dc37320bbb50811fb482e03f657de0aa5b2e6908a3262d2aecc23f6a0a4b0c`.

## Evidências visuais

![Demo no desktop](screenshots/desktop.jpg)

![Demo no celular](screenshots/mobile.jpg)

## Publicação e limites

Commit da aplicação publicada: `6fa93966d5137aba69be68d52058e78273cc87cd`. Commits posteriores que acrescentam estas evidências não alteram o bundle da aplicação.

Dados de demonstração sintéticos, retenção de sete dias, limite global de doze novos registros por hora UTC e até trinta revisões por registro. Edição autorizada por chave aleatória guardada nesta aba; um link público permite leitura. A demo não promete disponibilidade ilimitada nem armazenamento permanente. Nenhum cartão, trial ou faturamento foi ativado.

Não há nota Lighthouse declarada nem certificação de conformidade: as verificações acima descrevem os testes efetivamente executados.
