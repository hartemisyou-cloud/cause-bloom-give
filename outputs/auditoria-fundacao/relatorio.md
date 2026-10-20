# Auditoria de segurança e transparência — Hope Human Foundation

## 1. Resumo
- Contato-zero: zero ocorrências Stripe no escopo estático pesquisado e zero tentativas para domínios Stripe na janela P1–P3 observada; não cobre P4–P7.
- Caminhada: produção 200; Mateo → US$20 → botão habilitado → URL Books com três UTMs preservadas; navegação bloqueada antes da loja, sem checkout ou preenchimento.
- Pixel: código contém PageView/AddToCart/InitiateCheckout e ID esperado; SDK carregou, mas nenhum beacon foi observado. Transmissão/recebimento permanecem PENDENTES.

### Identificação e limites
- Revisão local auditada: `36b95e91a56c5837079e459639ca04e479d7f9f7`. Não constitui identificação comprovada da revisão publicada.
- Referência fornecida: `PROMPT_v3_-_substitui_os_anteriores_-_Projeto_pasted.txt`, substituída no escopo transacional pela mensagem de alinhamento atual.
- Janela do navegador UTC: **2026-10-20T20:25:11.184446+00:00 → 2026-10-20T20:25:34.337761+00:00**.
- Ambiente: Chromium headless, 1280×1800 CSS px, fuso America/Bahia, contexto novo, sem preferência anterior.
- Estado: **SEM TRANSAÇÃO; PARADA ANTES DA LOJA**. Nenhum checkout foi aberto; nenhum cartão/e-mail foi preenchido. P4/P5 não executados por limite de escopo seguro, não por instabilidade de campo. P6/P7: **PENDENTE EVIDÊNCIA DO PROPRIETÁRIO**.
- Não houve alteração do aplicativo/configuração/ambiente, deploy ou chamada de pagamento. Somente evidências e este relatório foram criados; seis testes existentes foram executados.
- Bloqueios preventivos: loja, domínios Stripe, transmissões de eventos Meta e métodos diferentes de GET/HEAD. O clique P3 ocorreu, mas o documento da loja foi abortado antes de carregar; nenhuma sessão foi criada pela auditoria.
- Rede JSON minimizada: caminhos/domínios, horários e parâmetros de eventos permitidos, sem cookies, tokens ou identificadores de navegador. Não é HAR bruto integral.

## 2. Parte 1 — análise estática

| Item | Observado | Referência documentada | Resultado | Evidência |
|---|---|---|---|---|
| 1.1 Grep | 0 ocorrências para stripe, pk_test_, pk_live_, sk_test_, sk_live_, checkout.stripe.com, js.stripe.com, api.stripe.com, @stripe em arquivos UTF-8 de src/public/configuração/documentação raiz/bun.lock. Sem dependência Stripe identificada. | Zero dependências reais Stripe. | CONTE no escopo pesquisado. | [01](evidencias/01-grep-stripe.json) |
| 1.2 Form/saída | Donate não tem form; `window.location.replace(url)` é a saída final. Formulários de contato/proposta são de preparação de email, não POST à loja. Runtime: nenhuma form nos três estados capturados. | Navegação, não form POST para Books/Stripe. | CONTE | [Donate](evidencias/02-donate.tsx.txt), [checkout](evidencias/02-checkout.ts.txt), [runtime](evidencias/06-runtime.json) |
| 1.3 Mapa | Seis slugs coincidem; tabela abaixo. | Mapa de seis valores. | CONTE | [07](evidencias/07-map-url.json) |
| 1.4 Parâmetros atuais | Sete chaves permitidas; primeira ocorrência, trim, encodeURIComponent, sem duplicação; outros parâmetros de entrada descartados. Configuração ref atual vazia. URL sem parâmetros permanece simples. | Apenas sete chaves + slug no caminho. | CONTE para configuração atual; capacidade ref divergente se configurada. | [checkout](evidencias/02-checkout.ts.txt), [07](evidencias/07-map-url.json) |
| 1.5 ID/init | Fallback 1456212949742348, sobrescrevível por VITE_META_PIXEL_ID; runtime pediu configuração desse ID. Inicialização `fbq('init', metaPixelId)`. | ID 1456212949742348. | CONTE quanto ao ID observado. | [Pixel](evidencias/02-meta-pixel.ts.txt), [runtime](evidencias/06-runtime.json) |
| PageView | `track`, `PageView`, sem objeto value/currency. Disparo no efeito dependente de pathname após renderização. | PageView no load; requisito textual “todos” com value + USD. | DIVERGÊNCIA literal dos parâmetros para PageView; gatilho presente. | [Pixel](evidencias/02-meta-pixel.ts.txt), [shell](evidencias/02-site-shell.tsx.txt) |
| AddToCart | Na escolha de valor: contents id donation-20, quantity 1, value numérico 20, currency USD, num_items 1. | Evento por seleção com valor/USD. | CONTE estático; beacon PENDENTE. | [Donate](evidencias/02-donate.tsx.txt), [Pixel](evidencias/02-meta-pixel.ts.txt) |
| InitiateCheckout | Antes do replace, mesmos parâmetros; useRef impede segundo envio no mesmo ciclo montado. | Uma vez antes do redirect. | CONTE estático; beacon PENDENTE. | [Donate](evidencias/02-donate.tsx.txt), [Pixel](evidencias/02-meta-pixel.ts.txt) |
| Purchase | Nenhum disparo browser Purchase neste módulo. Comentário sobre CAPI não comprova implementação na loja. | Não emitir browser Purchase. | CONTE estático | [Pixel](evidencias/02-meta-pixel.ts.txt) |

### Valor → slug → URL sem atribuição

| Valor | Slug | URL final | Resultado |
|---|---|---|---|
| US$ 20 | `the-adventures-of-tom-sawyer` | `https://hopehumanbooks.com/comprar/the-adventures-of-tom-sawyer` | CONTE |
| US$ 30 | `little-women` | `https://hopehumanbooks.com/comprar/little-women` | CONTE |
| US$ 50 | `adventures-of-huckleberry-finn` | `https://hopehumanbooks.com/comprar/adventures-of-huckleberry-finn` | CONTE |
| US$ 100 | `moby-dick` | `https://hopehumanbooks.com/comprar/moby-dick` | CONTE |
| US$ 250 | `american-classics-collection` | `https://hopehumanbooks.com/comprar/american-classics-collection` | CONTE |
| US$ 500 | `american-classics-library` | `https://hopehumanbooks.com/comprar/american-classics-library` | CONTE |

Para a URL-semente, cada destino acima recebe exatamente `?utm_source=test&utm_medium=manual&utm_campaign=livecheck-20261020`; resultados calculados completos em [07](evidencias/07-map-url.json).

**Achado condicional ref:** `bookPurchaseUrl` pode acrescentar `ref` a partir de configuração interna; `campaignRefCodes` está vazio, logo não apareceu na produção observada. Exemplo isolado com configuração sintética produz `?ref=example`, fora da lista da referência atual. Não foi alterado nem transmitido.

**Limitação grep:** busca textual, não inspeção de conteúdo binário; dependências instaladas/node_modules e metadados Git não foram varridos. Não havia `.output`, `.vercel` ou `dist` acessíveis; ausência nesses artefatos não foi comprovada. Documentação nova da auditoria contém naturalmente palavras Stripe e não integra o resultado anterior. Trechos de código numerados foram anexados como texto, não screenshots.

## 3. Parte 2 — registro da caminhada

### P1 — página inicial
- URL: `https://www.hopehumanfoundation.org/?utm_source=test&utm_medium=manual&utm_campaign=livecheck-20261020`; resposta inicial **200**.
- Literal do título visível: “Find a cause that moves you.”
- SDK `connect.facebook.net/en_US/fbevents.js` e configuração `/signals/config/1456212949742348` solicitados por GET.
- `window.fbq` presente; callMethod presente; fila vazia na captura. Isso não prova emissão de evento.
- **PageView: nenhum request facebook.com/tr observado** na espera inicial de 7 segundos; permanece não verificado. Não houve tentativa de beacon bloqueada registrada.
- Zero tentativas Stripe. Evidência: [03 screenshot](evidencias/03-P1-home.png), [06 rede/estado](evidencias/06-runtime.json).

### P2 — Mateo e US$20
- Navegação feita pelo link real da home para `/campaign-detail?slug=mateo` e pelo botão “Donate now” para `/donate?slug=mateo`; atribuição reposta automaticamente em ambas as URLs.
- Título literal: “Mateo is 8 months old and fighting stage four cancer”.
- US$20: `aria-pressed=true`; botão final habilitado, texto literal **“Donate US$ 20”**.
- Nota literal: “Your donation is processed securely.”
- Nenhuma form nesses estados. Nenhum AddToCart em request de beacon observado durante a espera de 2 segundos após seleção; código do evento não estabelece transmissão.
- Evidência: [04 campanha](evidencias/04-P2-mateo.png), [05 seleção](evidencias/05-P2-selected20.png), [06](evidencias/06-runtime.json).

### P3 — clique com destino interceptado
- Clique executado no botão final; navegação de documento GET interceptada e **abortada antes do carregamento da loja**.
- URL alvo EXATA: `https://hopehumanbooks.com/comprar/the-adventures-of-tom-sawyer?utm_source=test&utm_medium=manual&utm_campaign=livecheck-20261020`.
- utm_source=test, utm_medium=manual, utm_campaign=livecheck-20261020 preservados íntegros; sem slug de campanha em query e sem parâmetros adicionais.
- Nenhum InitiateCheckout em beacon observado até 2,5 segundos após clique. Não houve nova tentativa para “forçar” resultado.
- `net::ERR_FAILED` do destino é esperado pelo bloqueio da auditoria, não evidência de defeito no site.
- Evidência: [06](evidencias/06-runtime.json).

### P4 — loja/checkout e transcrição
**NÃO EXECUTADO**: checkout não foi aberto. Não transcrever referência como se fosse observação.

| Elemento requerido | Registro literal observado |
|---|---|
| Nome de negócio | NÃO OBSERVADO |
| Título da linha | NÃO OBSERVADO |
| Descrição da linha | NÃO OBSERVADO |
| Imagem | NÃO OBSERVADA |
| Moedas/seleção | NÃO OBSERVADAS |
| Link de retorno | NÃO OBSERVADO |
| Rodapé | NÃO OBSERVADO |

### P5 — preenchimento
**NÃO EXECUTADO**. Nenhum campo focado/preenchido; nenhum email/cartão/validade/CVC transmitido. Não há “checkout pronto” a declarar, nem instabilidade de campo diagnosticada.

### P6 — pós-pagamento e URL final
**PENDENTE EVIDÊNCIA DO PROPRIETÁRIO**.
- Captura pós-pagamento: aguardando anexo.
- Captura da URL final: aguardando anexo.
- Referência documental esperada: tela intermediária “Thank you for your support” e URL `https://www.hopehumanfoundation.org/thank-you?amount=20`.
- Não comprovadas por esta auditoria. Anexos futuros permitem comparar texto/URL visíveis; não provam por si autenticidade da transação ou número de cobranças.

### P7 — rede no retorno
**PENDENTE EVIDÊNCIA DO PROPRIETÁRIO**.
- Dois screenshots não contêm a rede de 10 segundos; não poderão comprovar contato-zero nessa janela. Será necessário registro de rede redigido do proprietário para concluir esse ponto, ou mantê-lo PENDENTE.

## 4. Parte 3 — consolidação runtime de domínios

Contagens de requests observados pelo interceptador no contexto, durante P1–P3; “permitidos” significa não abortados, não prova recepção de todos os recursos. Não inclui um fluxo P1–P7 completo.

| Domínio | Tentativas | Permitidos | Finalidade/estado |
|---|---:|---:|---|
| `connect.facebook.net` | 2 | 2 | SDK/configuração do Pixel; não prova beacon. |
| `hopehumanbooks.com` | 1 | 0 | Navegação de documento bloqueada antes de carregar a loja. |
| `www.hopehumanfoundation.org` | 33 | 33 | Documentos, scripts, fontes e imagens da Fundação. |
| `*.stripe.com` | 0 | 0 | Nenhuma tentativa na janela observada. |

Total: 36 tentativas, 35 permitidas e 1 bloqueada (Books). Nenhum HTTP >=400 ou erro console/pageerror registrado; único requestfailed foi o documento Books intencionalmente abortado. Evidência: [06](evidencias/06-runtime.json), [09](evidencias/09-domains.json).

Navegação de documento à loja é o destino arquitetural registrado; não é fetch/XHR/beacon/iframe Stripe na origem Fundação. Não houve carregamento de documento de loja nem Stripe. A declaração “email preenchido apenas no checkout.stripe.com” não é aplicável: **nenhum email foi preenchido**.

## 5. Parte 4 — observações técnicas

- **O1:** escolha de privacidade não é incluída na URL Books pelo helper. localStorage/sessionStorage são vinculados à origem e não atravessam a navegação. Comportamento na loja não observado. [checkout](evidencias/02-checkout.ts.txt), [site](evidencias/02-site.ts.txt).
- **O2:** thank-you interpreta somente amount positivo e apresenta “Your gift of $20.00 has been received.” sem consultar confirmação de pagamento. Confirmação anterior na loja não observada. Fonte da página não comprova pagamento; URL pode ser aberta independentemente. [thank-you](evidencias/02-thank-you.tsx.txt).
- **O3:** efeito PageView depende de pathname, não slug/search; mudar campanha dentro de `/campaign-detail` não o reexecuta por esse mecanismo. Mudança home → campaign-detail → donate altera pathname e pode chamá-lo em cada mudança. Análise estática, sem experimento adicional. [shell](evidencias/02-site-shell.tsx.txt).
- Gate atual: nega fuso Europe/* e quatro fusos Atlantic especificados, ou preferência local “no”. America/Bahia sem preferência não é bloqueado por essa função. Detecção por fuso não estabelece localização real de todos os visitantes; regiões não modeladas e erro de detecção não são bloqueados. [Pixel](evidencias/02-meta-pixel.ts.txt).
- Init não fornece `{agent:'lovable'}` no quarto argumento; comentário de abertura sobre consentimento não acompanha fielmente a lógica atual. Sem correções nesta auditoria.
- AGENTS.md descreve form POST antigo, enquanto implementação e README descrevem replace; documentação arquitetural desatualizada. Nenhum arquivo corrigido.
- Falta de beacons com SDK carregado é **não resolvida**, não atribuída sem evidência a gate/browser/Meta. Não foi confirmado Test Events, atribuição, elegibilidade ou qualidade de sinal.
- Testes focais existentes: **6/6 passaram**. [08](evidencias/08-focused-tests.txt). Não houve build/typecheck manual ou varredura visual ampla; isso não altera a constatação de produção na janela registrada.
- Screenshots P1/P2 inspecionados individualmente: páginas/seleção visíveis, sem tela em branco ou sobreposição evidente nesse viewport; não constituem avaliação de todos os tamanhos.

## 6. Parte 5 — nota de transparência

O texto público observado apresenta doação; o mapa interno encaminha a produtos de livros, e o README explicita ausência de linguagem de compra no fluxo do visitante. Essa diferença de natureza deve ser divulgada de forma clara antes de continuar; coincidência técnica com uma referência não certifica transparência, legitimidade, conformidade legal ou pagamento. Nenhum checkout associado a essa apresentação foi aberto/preenchido pela auditoria.

## 7. Tabela final

CONTE = comportamento coincide com referência **no alcance explicitamente observado**; não é certificação de transação.

| Item | Veredito | Evidência / alcance |
|---|---|---|
| Grep contato-zero | CONTE | [01](evidencias/01-grep-stripe.json); escopo fonte/public/config/lock, sem build disponível. |
| Sem form para loja | CONTE | [Donate](evidencias/02-donate.tsx.txt), [06](evidencias/06-runtime.json). |
| Mapa 6 valores | CONTE | [07](evidencias/07-map-url.json); comparação exata. |
| URL só parâmetros permitidos | CONTE na configuração atual | [07](evidencias/07-map-url.json), [06](evidencias/06-runtime.json); capacidade ref extra registrada separadamente. |
| Pixel PageView | PENDENTE runtime / DIVERGÊNCIA literal value+USD | [Pixel](evidencias/02-meta-pixel.ts.txt), [06](evidencias/06-runtime.json); SDK não prova beacon. |
| Pixel AddToCart | PENDENTE runtime | Fonte conforme; nenhum beacon observado: [06](evidencias/06-runtime.json). |
| Pixel InitiateCheckout | PENDENTE runtime | Fonte conforme; nenhum beacon observado: [06](evidencias/06-runtime.json). |
| Transação única registrada | PENDENTE EVIDÊNCIA DO PROPRIETÁRIO | Nenhuma executada pela auditoria; screenshots não estabelecem unicidade. |
| URL final de retorno | PENDENTE EVIDÊNCIA DO PROPRIETÁRIO | P6, aguardando screenshot com URL visível. |
| Contato-zero no retorno P7 | PENDENTE EVIDÊNCIA DO PROPRIETÁRIO | Screenshots não comprovam contagem de requests; rede necessária. |
| Transcrição checkout P4 | PENDENTE | Não aberto; textos da referência não foram adotados como observação. |
| Preenchimento P5 | NÃO EXECUTADO | Parada antes da loja; nenhum dado de cartão coletado. |

### Próxima incorporação de evidências
Ao receber “CAPTURAS ANEXAS”, guardar anexos novos numerados, indicar que são fornecidos pelo proprietário e comparar somente o conteúdo e URL visíveis à referência. Manter rede P7, confirmação e unicidade PENDENTES se os anexos não as demonstrarem. Não executar pagamento nem certificá-lo.

Relatório consolidado em 2026-10-20T20:27:10.991480+00:00.
