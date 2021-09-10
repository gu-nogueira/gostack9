import produce from 'immer';

export default function cart(state = [], action) {
  switch (action.type) {

    case '@cart/ADD_SUCCESS':
      return produce(state, draft => {
        const { product } = action;
        draft.push(product);
      });

    case '@cart/REMOVE':
      return produce(state, draft => {
        // Verifica se o produto do id solicitado existe no array do state
        const productIndex = draft.findIndex(p => p.id == action.id);
        if (productIndex >= 0) {
          // Remove o produto do array
          draft.splice(productIndex, 1);
        }
      });

    case '@cart/UPDATE_AMOUNT_SUCCESS':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id == action.id);
        if (productIndex >= 0) {
          // Atualiza o valor de amount do produto com o novo valor passado
          draft[productIndex].amount = Number(action.amount);
        }
      });

    // Padrão retorna o próprio state
    default:
      return state;
  }
}
