// Home

// Esta primeira action com nome de Request é a que irá para o redux-saga, feito isso o redux-saga irá disparar uma action
export function addToCartRequest(id) {
  return {
    type: '@cart/ADD_REQUEST',
    id,
  };
}

// Após a primeira action ser resolvida pelo redux-saga, ele irá disparar esta action 'addToCartSuccess()' passando a resposta da api
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

// Na maior parte dos casos quando estamos trabalhando com saga, utilizamos duas actions, uma para tratar e outra para confirmar
export function updateAmountRequest(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_REQUEST',
    id,
    amount,
  }
}

export function updateAmountSuccess(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_SUCCESS',
    id,
    amount,
  }
}
