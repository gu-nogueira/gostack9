// storage utiliza o storage nativo do ambiente da aplicação
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

// Redux persiste consegue ser usado com localStorage do navegador, asyncStorage do react native

export default reducers => {
  const persistedReducer = persistReducer({
    // Isso faz com que não confunda o storage com aplicações diiferentes caso haja rodando no mesmo servidor
    key: 'gobarber',
    storage,
    // em whitelist ficarão os reducers que terão as infos armazenadas
    whitelist: ['auth', 'user'],
  }, reducers);

  return persistedReducer;
};
