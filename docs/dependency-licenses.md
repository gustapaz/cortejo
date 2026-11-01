# Licenças de dependências

Escopo: todas as dependências diretas de runtime e desenvolvimento do package.json instalado, incluindo Manrope e DM Mono locais. Textos disponíveis foram copiados sem alteração; metadados com hashes e caminhos estão em `third-party/manifest.json`. Não é auditoria exaustiva da árvore transitiva.

| Pacote | Versão instalada | Licença declarada | Texto integral |
| --- | --- | --- | --- |
| `clsx` | 2.1.1 | MIT | Preservado |
| `drizzle-orm` | 0.45.2 | Apache-2.0 | Não distribuído na raiz; metadados preservados |
| `next` | 16.3.4 | MIT | Preservado |
| `react` | 19.2.6 | MIT | Preservado |
| `react-dom` | 19.2.6 | MIT | Preservado |
| `tailwind-merge` | 3.6.0 | MIT | Preservado |
| `zod` | 3.25.76 | MIT | Preservado |
| `backbone` | 1.6.1 | MIT | Preservado |
| `underscore` | 1.13.8 | MIT | Preservado |
| `sunder` | 0.10.1 | MIT | Preservado |
| `superstruct` | 2.0.2 | MIT | Preservado |
| `@cloudflare/vite-plugin` | 1.37.1 | MIT | Não distribuído na raiz; metadados preservados |
| `@cloudflare/workers-types` | 4.20260515.1 | MIT OR Apache-2.0 | Não distribuído na raiz; metadados preservados |
| `@tailwindcss/postcss` | 4.2.1 | MIT | Preservado |
| `@types/node` | 22.19.19 | MIT | Preservado |
| `@types/react` | 19.2.14 | MIT | Preservado |
| `@types/react-dom` | 19.2.3 | MIT | Preservado |
| `@vitejs/plugin-react` | 6.0.2 | MIT | Preservado |
| `@vitejs/plugin-rsc` | 0.5.26 | MIT | Não distribuído na raiz; metadados preservados |
| `drizzle-kit` | 0.31.10 | MIT | Não distribuído na raiz; metadados preservados |
| `eslint` | 9.39.4 | MIT | Preservado |
| `eslint-config-next` | 16.3.4 | MIT | Não distribuído na raiz; metadados preservados |
| `json-rpc-2.0` | 1.7.1 | MIT | Preservado |
| `raw-body` | 3.0.2 | MIT | Preservado |
| `react-server-dom-webpack` | 19.2.6 | MIT | Preservado |
| `tailwindcss` | 4.2.1 | MIT | Preservado |
| `tw-animate-css` | 1.4.0 | MIT | Preservado |
| `typescript` | 5.9.3 | Apache-2.0 | Preservado |
| `vinext` | 1.0.0-beta.5 | MIT | Preservado |
| `vite` | 8.0.13 | MIT | Preservado |
| `wrangler` | 4.92.0 | MIT OR Apache-2.0 | Não distribuído na raiz; metadados preservados |
| `prettier` | 3.9.10 | MIT | Preservado |
| `@fontsource-variable/manrope` | 5.3.0 | OFL-1.1 | Preservado |
| `@fontsource/dm-mono` | 5.3.0 | OFL-1.1 | Preservado |
| `esbuild` | 0.28.0 | MIT | Preservado |
| `fast-deep-equal` | 3.1.3 | MIT | Preservado |
| `http-errors` | 2.0.1 | MIT | Preservado |
| `secure-json-parse` | 2.7.0 | BSD-3-Clause | Preservado |
| `tiny-request-router` | 1.2.2 | MIT | Não distribuído na raiz; metadados preservados |

## Limitações

Alguns pacotes npm omitem o texto integral de sua licença na raiz: `drizzle-orm`, `@cloudflare/vite-plugin`, `@cloudflare/workers-types`, `@vitejs/plugin-rsc`, `drizzle-kit`, `eslint-config-next`, `wrangler`, `tiny-request-router`. A licença declarada foi registrada sem criar texto ou autoria presumidos. `package-metadata.json` é o arquivo original e não substitui os termos integrais.

As fontes permanecem sob suas licenças OFL distribuídas. A licença do código deste projeto não substitui as licenças dos terceiros.

## Bundle de compatibilidade Sunder

Sunder 0.10.1 mantém copyright © 2020 Guido Zuidhof e licença MIT. O npm omite LICENSE, portanto o texto oficial foi copiado do commit exato `802cd23582641e8adde84056f624d2543fccc930`. Esse texto e os avisos das quatro dependências runtime incluídas nesta coleta devem acompanhar a distribuição do bundle de compatibilidade. Esbuild também consta entre as dependências diretas. Não há reivindicação de autoria sobre Sunder.
