# Campanhas Hope Human — reconstrução baseada em HTTrack

## Resultado e escopo
Página individual ajustada incrementalmente, mantendo identidade Hope Human, 56 campanhas, histórias/fotos, valores, página inicial, cabeçalho, rodapé e integrações existentes. Não houve publicação, envio de email nem abertura de checkout ou transação.

## Arquivos analisados
- Dois arquivos RAR: inventário de 89/90 entradas e hashes em `inventory.json`.
- Referência principal: `campaign-detaild512.html` (captura de `help-save-fabi`), seus estilos e handlers inline.
- Comparação com `campaign-detail02ee.html`, `campaign-detail5445.html`, `campaign-mediafdfe.css`, `campaign-media2fdd.js`, `offline-data8611.js`, stylesheet/fontes Plus Jakarta Sans e registros HTTrack.
- Mapeamento completo, divergências prioritárias e recursos ausentes: `auditoria.md`.
- Nenhum script capturado, shim de fetch, tracking, identidade ou endpoint de pagamento foi incorporado.

## Componentes e correções
| Arquivo | Alteração |
|---|---|
| `src/routes/campaign-detail.tsx` | Composição legível, estado reiniciado por campanha, dados de organizador no rodapé, contato mobile preservado e navegação existente para `/donate` |
| `src/components/campaign-gallery.tsx` | Módulo dedicado, foto selecionada apenas, enquadramento vertical, fallback de erro, resumo real da história, teclado e swipe horizontal |
| `src/components/campaign-funding.tsx` | Ring, total histórico e meta reutilizados sem alterar valores |
| `src/lib/campaign-gallery.ts` | Navegação circular e discriminação horizontal/vertical |
| `src/components/campaign-detail-sections.tsx` | Contato mobile e retorno de foco dos diálogos |
| `src/hooks/use-donation-bar.ts` | Supressão opcional perto de compartilhamento/campanhas relacionadas, evitando sobreposição de ações |
| `src/styles.css` | Geometria limitada a 1040px, coluna 340px, stack até 860px, sidebar desktop oculto no mobile, texto/blocos compactos, previews distintos e botão flutuante inset |
| Testes de galeria e barra de doação | Gestos, wrap e regra de visibilidade |
| `AGENTS.md`, `roadmap.md` | Convenção de módulos e conclusão do escopo |

Não foram alterados dados JSON de campanhas, checkout, Pixel, valores de doação, homepage ou footer. Nenhuma dependência nova ou asset de runtime foi adicionada.

## Comparação técnica verificável
Comparação controlada: HTML/CSS capturados, scripts removidos e slots de título/foto/valores preenchidos com a campanha Mateo apenas para estudar geometria. **Não é captura fiel do site original funcionando.**

| Largura | Referência: área/colunas | Implementação: área/colunas |
|---|---|---|
| 390px | 390px, bloco mobile | 390px, bloco mobile |
| 768px | 768px, coluna 706.562px | 768px, coluna 706.562px |
| 1280px | 1040px, 553.625px + 340px, gap 44px | Valores iguais |
| 1920px | 1040px, 502.406px + 340px, gap 44px | Valores iguais |

Os espaços computados de 44px/24px na área mobile/tablet diferem; no mobile o container é bloco, portanto o gap não define o espaçamento. No tablet a barra desktop foi substituída por conteúdo mobile explícito. Mantidas diferenças autorizadas de logo, texto inglês, ícones Lucide, acessibilidade, informações históricas e ausência de doadores inventados. Não foi atribuído percentual de fidelidade.

## Verificações executadas
- **Nove larguras:** 320, 375, 390, 430, 768, 1024, 1280, 1440 e 1920px. Sem overflow horizontal ou erros de página nos checks registrados.
- Galeria: seleção de foto, slide de resumo, leitura completa, recolhimento e teclado em desktop. Gestos sintéticos com propagação: swipe horizontal muda a foto; gesto vertical não muda.
- Diálogos: Contact e See all em cada largura; Escape fecha e devolve foco. Report prepara URL `mailto:` da Hope Human; nenhum email enviado.
- **56 campanhas:** navegação e título correspondente conferidos. Campanha desconhecida retorna HTTP **404**.
- Liam: segunda foto realmente carregada, Donate leva à campanha correta em `/donate`, escolha `$20` habilita `Donate $20`; não clicado.
- Reação Love atualiza estado local, sem contagem/persistência inventada.
- Homepage em 390/1280px sem overflow; não redesenhada.
- **Vitest:** 14 arquivos, **65 testes aprovados**. Avisos preexistentes no teste de thank-you sobre montagem de `<html>`/href vazio continuam registrados; não foram atribuídos à página de campanha.
- **Verificação automática mais recente:** `build OK` (2026-10-27T02:14:01Z), após corrigir o tipo explícito do dado da campanha. Não executado build/typecheck manual, conforme ambiente gerenciado.
- Lint global não executado; nenhuma alegação de resultado de lint ou deploy de produção.

## Evidências
- [Antes mobile](evidence/before-390.png) · [Depois mobile](evidence/after-390.png)
- [Antes desktop](evidence/before-1280.png) · [Depois desktop](evidence/after-1280.png)
- [Compartilhamento mobile](evidence/sharing-390.png)
- [Referência controlada, não runtime original](evidence/reference-controlled-1280.png)
- [Resultados das nove larguras](evidence/verification.json) · [Comparação e checks complementares](evidence/final-checks.json)

## Limitações explícitas
- Os arquivos não incluem as fotos dinâmicas de Fabi nem a árvore `uploads/`; foram mantidas as fotos autênticas existentes. Não há comparação pixel-a-pixel completa do original.
- Recursos/slots dependentes de scripts não foram tratados como dados de produção. Referência contém geração de doadores, reações e respostas offline simuladas: essas rotinas foram excluídas.
- O layout de compartilhamento preserva os três previews com diferenças de composição, sem copiar posts externos nem garantir desempenho de compartilhamento.
- Pixel foi bloqueado somente no navegador de QA. Os checks registraram tentativas existentes de carregar `connect.facebook.net`, mas não confirmam eventos Meta. Código de analytics não mudou.
- Não houve pedidos Stripe/loja no check final de campanha para seleção; nenhum pagamento, verificação de payout, recibo ou sucesso financeiro foi certificado.
- Publicação e ambiente externo de produção permanecem fora desta tarefa. Demais bloqueios institucionais anteriores no roadmap não foram resolvidos por alterações de apresentação.