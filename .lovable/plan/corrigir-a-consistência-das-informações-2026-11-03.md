# Corrigir a consistência das informações

## Problemas confirmados

- **Mensagens de apoio:** Nicole mostra “0” e “No messages yet.”, mas exibe oito mensagens geradas. Isso acontece em **107 campanhas sem mensagens originais**. O contador mede mensagens originais, enquanto a lista também mostra exemplos sem identificação visível.
- **Datas de contribuições:** a linha marcada como “Top donation” oculta sua data, embora o destaque da mesma contribuição mostre a data.
- **Página Causes:** Disaster Relief afirma não ter campanhas, apesar de ter **3**. Os filtros Education, Community, Environment, Emergency e Housing ficam vazios, apesar de essas categorias reunirem **12 campanhas**.
- **Most Loved:** soma o mesmo valor histórico de Goyito duas vezes. O registro duplicado acrescenta **US$ 48.750** ao total. A página inicial já exclui essa duplicação.
- **Proteção de consistência:** os destaques e a contagem de contribuições não aplicam o mesmo filtro usado pelo histórico. Os registros atuais já chegam filtrados, mas a diferença pode causar divergências com outras fontes.
- **Verificações antigas:** a execução completa teve **110 testes aprovados e 4 falhas**. Duas falhas correspondem à falta de identificação dos exemplos; duas ainda pressupõem o estado anterior à importação de contribuições.

## Correções propostas, em ordem

1. **Separar apoio original e exemplos.** Mostrar a quantidade correspondente em cada grupo, com oito exemplos identificados nas campanhas sem mensagens originais. Remover a contradição entre “nenhuma mensagem” e uma lista preenchida; não converter exemplos em apoio recebido. Conferir Nicole e campanhas com 3 e 8 mensagens originais.
2. **Unificar as informações de contribuições.** Manter a data junto do selo de maior contribuição e usar os mesmos registros elegíveis para contagem, destaques e histórico. Restaurar identificação no caminho de exemplos de contribuições, hoje não utilizado pelas 147 campanhas. Testar registros privados, pendentes, duplicados e fora de ordem, além de conferir filtros e paginação na tela.
3. **Corrigir Causes.** Derivar disponibilidade e contagens das campanhas, oferecer todas as categorias existentes e eliminar a frase incorreta sobre Disaster Relief. Conferir os nove filtros e os links para campanhas.
4. **Corrigir Most Loved.** Excluir o duplicado reconhecido dos totais e da classificação, preservando os endereços existentes e os dados originais. Testar a diferença exata de US$ 48.750 e conferir a página.
5. **Atualizar testes desatualizados e repetir a conferência.** Preservar testes que detectam erros reais; atualizar apenas pressupostos superados pela importação. Conferir as telas em celular e computador e apresentar o que mudou.

## O que permanece inalterado

Datas enviadas pelo proprietário, valores de cada contribuição, histórias, fotos, pagamento, rastreamento e publicação. Totais históricos não serão substituídos pela soma da lista de contribuições: são informações de origens distintas.

## Limites da conferência

Os filtros principais da página inicial, a paginação, os percentuais de financiamento e a associação das 1.711 contribuições às 147 campanhas não apresentaram divergências confirmadas. A autenticidade dos pagamentos não foi verificada por esta leitura.

A ferramenta de segurança retornou apenas verificações antigas, sem uma análise aprofundada recente. Uma análise atual pode ser iniciada pela aba Security; esta conferência não estabelece que o site é seguro.

## Detalhes técnicos

Reutilizar as regras de elegibilidade e ordenação de `publicDonations` no limite de apresentação; manter exemplos separados de `CampaignActivity`. Compartilhar a exclusão do duplicado reconhecido entre coleções públicas e agregados históricos, sem alterar os registros de origem. Cobrir cada regra de contagem e agregação com testes de valores concretos, não testes de aparência.