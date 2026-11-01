# Arquitetura

Modo integrado, conforme solution-contract.md. Backbone + Underscore consome Sunder + Superstruct na mesma origem. SSR contém conteúdo, metadados e navegação; o bundle próprio monta depois da hidratação.

Backtracking com quebra de simetria, restrições de assentos e conflitos, e pontuação por afinidade ou mistura. Até 25 mil nós; resultados distinguem inviabilidade e limite de busca.

API HTTP de mesma origem.

service.mjs: domínio e exportação. input-schema.mjs: restrições canônicas. validator.mjs: validação da stack. api.mjs: protocolo/router. store.mjs: D1, tokens, CAS, TTL e cotas. transport.mjs: bytes/UTF-8, origem, erros mascarados e cabeçalhos.

Sunder 0.10.1 tem imports ESM sem extensão. prepare-server.mjs gera bundle de compatibilidade com esbuild antes de teste/build, preservando licença original; não modifica node_modules. É uma dependência legada usada nesta demonstração limitada.
