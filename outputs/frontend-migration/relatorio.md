# Migração visual — Hope Human Foundation

## Resultado
Composição frontend adaptada da referência aprovada, com identidade, textos, dados e serviços da Hope Human preservados. Sem publicação, transações, envio de emails, importação de usuários ou configuração de provedores.

## Apresentação aplicada
- Cabeçalho fixo, navegação e rodapé institucional com logo autêntica.
- Homepage com campanha em destaque, filtros de categoria, rail de cartões, etapas de apoio e chamada institucional.
- Diretório com busca, filtros e cartões; totais derivados do acervo.
- Campanha com galeria/miniaturas, título abaixo da imagem, resumo, história, informações financeiras e ações existentes.
- Seleção de valores em página própria, mantendo os seis presets e o comportamento atual.
- Páginas institucionais, propostas, conteúdo e políticas com composição consistente; políticas com índice e retorno ao topo.
- Tokens e tipografia Hope Human mantidos; nenhuma história, identidade, doador fictício ou alegação institucional da Free Hearts importada.

## Verificações
| Verificação | Resultado |
| --- | --- |
| Páginas × larguras | 171 verificações: 19 páginas em nove larguras; respostas 200, sem overflow, imagens quebradas ou pageErrors |
| Campanhas | Todas as 56 rotas retornaram 200; slug desconhecido retornou 404 |
| Interações em 390/1280px | Busca, abertura de Liam, segunda foto, resumo/história completa, contato/Escape, seis valores e índice das políticas passaram |
| Testes | 16 arquivos, 73 testes aprovados |
| Arquivos protegidos | 11 hashes iguais ao baseline, incluindo campanhas, auditorias, checkout, Pixel, site, conteúdo de doação, dependências e configuração de publicação |
| Navegação externa | Interceptada antes de abrir a loja; URL exata abaixo; nenhuma transação |

`https://hopehumanbooks.com/comprar/the-adventures-of-tom-sawyer?utm_source=test&utm_medium=manual&utm_campaign=frontend-audit`

O build automático disponível registrou `build OK`. Não foi executado build ou typecheck manual, conforme as restrições do ambiente. Os testes de agradecimento emitiram avisos preexistentes do harness (`href` vazio e elemento `html` no contêiner de teste), sem falhas; a navegação real não registrou pageErrors.

## Evidências
Capturas antes/depois e resultados estruturados estão em `/tmp/browser/frontend-migration/`: `responsive.json`, `interactions.json`, `protected-hashes.json`, screenshots `after-*` e `selected-20-*`. Capturas públicas da referência em `reference-*`, com rastreamento e pagamentos bloqueados. O código da referência não foi executado.

## Limites e diferenças intencionais
- Reprodução visual adaptada, não cópia pixel a pixel: fonte, paleta, logo, histórias, textos, rotas e comportamento da Hope Human prevalecem.
- Formulários de dados pessoais/pagamento, serviços, traduções, contagens de doadores e registros de atividade da referência foram excluídos. Dados ausentes continuam vazios.
- Miniaturas não selecionadas não baixam fotos adicionais; usam indicação de foto para preservar o limite de transferência inicial.
- Provedor externo, confirmação de pagamento, entrega de recibos e métricas de produção não foram verificados. O fluxo externo existente foi preservado, não certificado como doação ou pagamento.
- A mensagem preexistente em `/thank-you` afirma confirmação a partir da URL; ela não constitui evidência técnica de pagamento e não foi alterada neste escopo visual.
- A publicação e o domínio permanecem inalterados. As pendências operacionais antigas do roadmap não foram tratadas como parte desta migração visual.

**Ready:** apresentação adaptada e regressões de preview verificadas.

**Still needed:** verificação independente do provedor e ambiente publicado, fora do escopo sem transações; nenhuma publicação foi feita.