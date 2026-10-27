# Reconstrução da página de campanha

## Escopo preservado
Aplicar a continuação enviada: ajustar somente as páginas individuais de campanha com base nos arquivos HTTrack, sem refazer a página inicial. Manter identidade, textos, fotos e dados Hope Human, cabeçalho, rodapé, valores de doação e integrações existentes. Sem transações ou publicação.

## Mapeamento e diferenças encontradas
- Os arquivos têm 89 e 90 entradas; o segundo acrescenta a página de campanha `help-save-fabi`. CSS, JavaScript, fontes e imagens compartilhados são idênticos.
- A referência limita a área principal a **1040px**, com coluna lateral de **340px** e intervalo de **44px**; o site atual usa outra largura e se expande excessivamente em telas grandes.
- A referência organiza a página em uma coluna até **860px**, e esconde a coluna lateral desktop até **600px**; regras atuais entram em conflito no celular.
- A galeria da referência acomoda fotos verticais e termina com um resumo da história. O site atual corta todas as fotos e não tem esse resumo.
- Os blocos de organizador, contato, confiança e compartilhamento estão maiores e mais espaçados do que os valores encontrados nos arquivos.
- As fotos da campanha não foram incluídas nos arquivos HTTrack. Usar as fotos autênticas já disponíveis no projeto; não substituir por imagens genéricas.

## Implementação incremental
1. Corrigir largura, espaçamentos e organização por tamanho de tela, mantendo os dados e as ações existentes.
2. Refinar a galeria: enquadramento de fotos verticais, resumo da história, seleção acessível e gesto horizontal sem interferir na rolagem.
3. Reorganizar informações da campanha e ajustar os blocos de organizador/contato, preservando os estados vazios de doadores.
4. Harmonizar as seções de confiança e compartilhamento com medidas verificadas e previews da própria campanha.
5. Aproximar a composição do botão flutuante mobile da referência, sem duplicar os controles visíveis de doação.

## Validação e entrega
- Conferir **320, 375, 390, 430, 768, 1024, 1280, 1440 e 1920px**, com capturas antes/depois.
- Testar galeria, leitura completa, compartilhamento, contato/reportar, navegação e seleção de valor, sem abrir checkout.
- Executar testes existentes, conferir os diagnósticos automáticos e registrar limitações no relatório.
- Não declarar equivalência visual completa sem evidência comparável da referência.

## Detalhes técnicos
- Auditoria registrada em `outputs/campaign-reconstruction/auditoria.md`, com inventário SHA-256 e mapa de componentes.
- Alterações concentradas na página de campanha, módulos de apresentação e estilos restritos a ela; não importar HTML pronto nem executar bundles capturados.
- Preservar TanStack, metadados por campanha, assets CDN espelhados, presets $20/$30/$50/$100/$250/$500 e lógica existente de checkout/Pixel.
- Não copiar endpoints, contatos, tracking, dados simulados de doadores/reação ou mensagens de envio/pagamento concluído da referência.