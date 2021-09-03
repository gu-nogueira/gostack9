// funções em utils são funções que utilizaremos em diversos locais na aplicação

// Intl é uma função nativa do javascript que permite formatar valores
export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  // Este new Intl retorna várias funções, uma delas é o '.format', então, podemos pegar diretamente no nome da constante desestruturando ela. Vamos renomeá-la para formatPrice
});
