# Sistema de Orçamentos Online (static prototype)

Estrutura criada para a UC5 — Projeto Integrador (Front-End).
Este é um protótipo estático (HTML/CSS/JS) que simula uma API usando `data/produtos.json`
e `localStorage`. Ideal para desenvolvimento sem backend.

## Como usar

1. Rode um servidor local na pasta `meu-projeto` (recomendado):
   - Python 3: `python -m http.server 8000`
   - Node (serve): `npx serve .`
2. Abra `http://localhost:8000` no navegador.
3. Páginas:
   - `/index.html` — Página principal: lista de produtos, criar orçamento (simulação).
   - `/produtos.html` — CRUD local de produtos (usa localStorage).
   - `/contato.html` — Formulário de contato (mock).
4. Observações:
   - O fetch de `data/produtos.json` funciona quando servido por HTTP.
   - Para persistência entre sessões, o CRUD escreve em `localStorage`.
   - Use os arquivos em `docs/` para o briefing e relatório.

