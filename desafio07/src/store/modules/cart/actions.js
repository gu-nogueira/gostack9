// Home

// Solicitação para o saga
export function addToCartRequest(id) {
  // Retorna um objeto
  return {
    type: '@cart/ADD_REQUEST',
    id,
  }
}

// Retorno do saga
export function addToCartSuccess(product) {
  return {
    type: '@cart/ADD_SUCCESS',
    product,
  };
}

// Cart

export function removeFromCart(id) {
  return {
    type: '@cart/REMOVE',
    id,
  }
}

// Solicitação para o saga
export function updateAmountRequest(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_REQUEST',
    id,
    amount,
  }
}

// Retorno do saga
export function updateAmountSuccess(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_SUCCESS',
    id,
    amount,
  }
}
