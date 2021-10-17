import { createStore, compose, applyMiddleware } from 'redux';

export default (reducers, middlewares) => {
  const enhancer = process.env.NODE_ENV === 'development'
    ? compose(
      console.tron.createEnhancer(),
      // O spread operator é usado para passar cada um dos middlewares do array como um argumento da função 'applyMiddleware'
      applyMiddleware(...middlewares)
    )
    : applyMiddleware(...middlewares);

  return createStore(reducers, enhancer);
};
