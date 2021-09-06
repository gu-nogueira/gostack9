import produce from 'immer';
// Todo reducer recebe o argumento state e o argumento action
// State é o estado anterior antes da action, neste exemplo é o nosso array vazio
// Action é a nossa action disparada em si
// O estado do redux é imutável, entã otodo reducer terá uma estrutura parecida
// Podemos fazer a inicialização do estado aqui dentro: state = []
export default function cart(state = [], action) {
  // Utilizamos o switch para sabermos quando faremos uma ação ou não
  // por padrão, o método 'dispatch' que dispara a action chama todos os reducers, então utilizamos o switch para identificar a qual reducer pertence a action disparada
  switch (action.type) {
    // Então, caso o type da action seja 'ADD_TO_CART', podemos modificar o estado da maneira que quisermos
    case '@cart/ADD_SUCCESS':
      return produce(state, draft => {
        // Aqui podemos fazer as alterações normalmente, sem se preocupar com a imutabilidade do state, podendo usar o .push convencional do javascript
        const { product } = action;
        draft.push(product)
      });
    case '@cart/REMOVE':
      return produce(state, draft => {
        // Busca o produto da lista
        const productIndex = draft.findIndex(p => p.id == action.id); // O id vem direto da action
        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }

      });

    case '@cart/UPDATE_AMOUNT_SUCCESS': {
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id == action.id);
        if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount);
        }

      });
    }


    // Por padrão, default retornamos o próprio state sem alterá-lo
    default:
      return state;
  }
}
