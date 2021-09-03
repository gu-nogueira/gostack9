import { createStore } from 'redux';

import rootReducer from './modules/rootReducer';

const enhancer = process.env.NODE_ENV === 'development' ? console.tron.createEnhancer() : null;

// createStore vazio dará erro, pois o redux requer pelo menos um reducer na aplicação
const store = createStore(rootReducer, enhancer);

export default store;
