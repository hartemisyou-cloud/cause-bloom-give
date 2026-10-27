# Migração visual Free Hearts → Hope Human

## Resultado
Aplicar a composição e a organização visual do projeto enviado à Hope Human, preservando sua marca, suas 56 campanhas e todas as ações atuais.

## Etapas
1. **Elementos compartilhados:** adaptar cabeçalho, navegação, rodapé, cartões, espaçamentos e hierarquia com o logo, as cores e a tipografia arredondada Hope Human. Não copiar dados institucionais ou serviços Free Hearts.
2. **Página inicial e descoberta:** reproduzir a sequência de seções, destaque de campanha, filtros, carrosséis, grades e explicação do processo. Manter busca, favoritos, paginação e acesso a todas as campanhas reais.
3. **Página de campanha — prioridade:** adaptar composição superior, fotos, história, arrecadação, organizador, compartilhamento e seções inferiores. Preservar fotos e textos, valores anteriores identificados, controles acessíveis e ausência de atividade fictícia.
4. **Doação:** adaptar somente a apresentação da página atual de valores; manter $20, $30, $50, $100, $250 e $500, destinos existentes, retorno, bloqueio de clique repetido e atribuição. Não importar o formulário de dados pessoais, pagamento ou sucesso simulado da referência.
5. **Páginas de apoio:** adaptar as páginas equivalentes de campanhas, causas, sobre, contato, ajuda, propostas, blog, eventos, políticas e agradecimento com o conteúdo próprio Hope Human. Não acrescentar páginas ou serviços inexistentes apenas porque aparecem na origem.
6. **Conferência e entrega:** comparar as páginas equivalentes, testar navegação e interações, registrar imagens e lista de alterações. Validar 320, 375, 390, 430, 768, 1024, 1280, 1440 e 1920px. Não publicar.

## Limites preservados
- Nenhuma alteração nos registros de campanhas, histórias, imagens, preços, destinos de pagamento, regras legais ou identidade institucional.
- Nenhuma importação de credenciais, banco, usuários, endpoints, analytics ou informações Free Hearts.
- Nenhuma transação real, cartão de teste em produção, confirmação inventada ou conversão de compra.
- Manter as URLs públicas, os metadados próprios, o Meta Pixel e o encaminhamento atual dos parâmetros de tráfego.

## Detalhes técnicos
Ambos os projetos usam React 19, TanStack Start e Tailwind 4; as versões e a configuração existentes permanecerão. Adaptar apresentação em módulos pequenos, usando os controles já instalados e dados Hope Human diretamente ou por adaptadores sem mutação. Manter `/campaign-detail?slug=…` e `/donate?slug=…`, sem transportar o roteamento ou os serviços da origem.

Registrar comparação de hashes dos arquivos protegidos, testes da coleção e dos seis destinos, regressão de atribuição/Pixel e verificação no navegador sem seguir o pagamento. A auditoria e a correspondência inicial estão em `outputs/frontend-migration/auditoria.md`; a aparência atual foi registrada antes das mudanças.

## Critério de conclusão
Todas as famílias de páginas adaptadas e verificadas nas larguras pedidas, sem erros ou sobreposição, com dados e integrações preservados. Relatar separadamente qualquer comparação ou confirmação externa indisponível; testes de pagamento dependem de ambiente autorizado e não serão apresentados como concluídos.