# Adaptação à Hope Human — 20 de outubro de 2026

## Decisões confirmadas
Mantidos o visual atual, Plus Jakarta Sans, cores verdes/douradas, logo autêntica, histórias e fotos das 54 campanhas. Seleção continua na página /donate, não em drawer. Nenhuma identidade, endereço, EIN, certificação, contato ou informação institucional da Free Hearts foi incorporada.

## Recursos incorporados
- Nove categorias com contagem calculada a partir dos registros existentes; categorias sem campanhas exibem zero.
- Progresso arredondado, proteção para meta zero/números inválidos, barra limitada a 100% sem limitar o total financeiro. Fully funded tem precedência sobre Urgent; urgência vem exclusivamente do registro original.
- Cartões com resumo, localização, percentual, status e ação de apoio. Área inteira abre a campanha; coração e botão são independentes. Fotos 16:10, zoom/elevação discretos e respeito a movimento reduzido.
- Favoritos existentes preservados, deduplicados e sincronizados entre controles; fallback em memória se armazenamento for bloqueado. Não são contagem pública de corações.
- Categoria/data/localização no detalhe, setas mobile acessíveis e galeria com swipe existente. Barra mobile só aparece quando ações principais estão fora da tela. Mensagens inicialmente limitadas a seis, sem inventar valores/horários associados.
- Presets preservados: USD 20/30/50/100/250/500. Suggested em $50, sem alegação Most donated. Título do ebook selecionado e natureza da compra ficam explícitos antes de continuar. Destinos /comprar originais e sete parâmetros de atribuição permanecem inalterados; nenhum campaign/csid artificial adicionado.
- Bloqueio síncrono contra navegação duplicada, controles indisponíveis durante abertura, recuperação pageshow e erro de navegação. Analytics opcional não impede seleção/navegação.
- /thank-you não afirma mais recebimento financeiro com base em parâmetro manipulável. Mantém agradecimento em inglês e USD com centavos, mas identifica ausência de confirmação.

## Preservado ou não implementado por falta de dados/integracão
Most Loved continua ordenado por arrecadação anterior. As informações de campanha permanecem snapshots com rótulo Previous fundraising, não novos recebimentos. Não foram gerados doadores, corações públicos, certificados, atualizações, comentários com pagamentos, horários recentes ou impacto por valor. Não existe base legítima para esses dados. Não se adicionou contador artificial, idioma/tradução automática, newsletter fictícia, login, pagamento mínimo customizado de $5 ou garantia nova. Esses recursos não podem substituir os presets/fluxo do destino nem alegar persistência ou integração inexistentes.

Pagamentos, recibos, comprovação de alocação/ref por campanha, verificação e liberação de fundos dependem da operação externa. Nenhum checkout foi aberto, preenchido ou pago, e nenhuma transação foi certificada. Outros projetos não foram modificados. Não houve publicação ou mudanças em credenciais, hospedagem ou integrações financeiras. Assets públicos, configuração Vercel e prerender foram preservados.

## Verificações
- Suíte completa: 53 testes passaram antes do teste adicional da barra; resultado final registrado no encerramento.
- Navegador em 375 e 1280px: favorito independente, escolha US$20, título correspondente, botão habilitado, ausência de formulário financeiro, galeria com foto carregada e nenhuma rolagem horizontal; zero pageErrors.
- Barra mobile oculta quando o painel principal está visível, exibida na região inferior. SDK/eventos Meta não receberam nova integração e Test Events externos não foram certificados.
- Todos os arquivos de páginas inspecionados têm metadados próprios via pageHead; fallback de campanha indisponível também atualizado.
- Verificação automática final anterior à documentação: build OK. Não executado build/typecheck manual, conforme ambiente gerenciado. Produção Vercel independente e aprovações operacionais continuam pendências externas.
- Avisos dos testes /thank-you: renderização de html dentro do contêiner jsdom e href vazio do ambiente de teste; não observados como pageErrors no navegador real.

## Arquivos alterados
AGENTS.md; README.md; roadmap.md; src/lib/campaigns.ts; src/lib/site.ts; src/hooks/use-favorites.ts; src/hooks/use-donation-bar.ts; src/components/campaign-card.tsx; src/components/most-loved-page.tsx; src/routes/campaign-detail.tsx; src/routes/donate.tsx; src/routes/thank-you.tsx; src/styles.css; src/test/campaigns.test.ts; src/test/checkout-start.test.tsx; src/test/donation-content.test.tsx; src/test/thank-you.test.tsx; src/test/favorites.test.tsx; src/test/donation-bar.test.tsx; este relatório.

Capturas de QA e resultados de navegador estão em /tmp/browser/crowdfunding (temporários, não servidos pelo site).