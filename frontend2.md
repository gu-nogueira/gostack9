# Frontend 2

# Redux

## Conceitos
- Redux é uma biblioteca que implementa Arquitetura Flux, pode ser usado com `React`, `Angular`, etc.
- Arquitetura Flux é uma forma de comunicação entre vários elementos em tela
- Serve para controlar estados globais na aplicação, acessíveis por qualquer componente da aplicação
- Quando utilizar o Redux?
  * Estados que não possuem um "dono"
  * Estado manipulado por múltiplos componentes
  * Ações do usuário que causam efeitos colaterais nos cados como um contador ou uma notificação
- Exemplos: carrinho de compras, dados do usuário, player de música

## Arquitetura Flux
- Quando queremos enviar uma ação para o estado global, é disparado uma `action`, nela são contidos um objeto com uma descrição e o elemento desejado
- Este objeto é enviado para o `redux store` que é o estado global, dentro do `redux store` temos os `reducers` que designa a separação dos estados dentro do `redux store`
  * Exemplo: Armazenar em cada reducer dados de um carrinho, dados do usuário
- Passado para o reducer, o redux realizará uma mutação no estado do componente final e todos os outros componentes que utilizam aquele estado global

## Princípios do Redux
- Toda action deve possuir um `type` informando qual é o tipo da ação. Este type deve ser único, pois é um type para cada tipo de ação que queremos manipular no estado
- O estado do Redux é o único ponto válido. A partir do momento que armazenamos qualquer atributo de um estado dentro do redux, todas as outras informações do estado do componente devem passar pelo redux também, não podemos armazenar uma parte no redux e outra no componente
- Não podemos mutar o estado do Redux sem uma `action`
- As actions e reducers não são assíncronas, não podem chamar uma API, acessar banco de dados, nada que aguarde uma resposta. Elas são funções puras, independente de quantas vezes chamarmos terão sempre os mesmos resultados (ótimo para testes unitários)
- Qualquer lógica de regra de negócio (um cálculo, adicionar um produto no carrinho, capturar um preço dele e inserir um preço formatado, adicionar uma nova página...) *devem sempre ficar no `reducer` e nunca na `action`*
> Nem toda aplicação precisa de Redux, inicie sem ele e sinta a necessidade depois

## Configurando o Redux
- Vamos instalá-lo no projeto junto com sua integração com o React `yarn add redux react-redux`
- Vamos criar uma pasta `src > store`, onde ficarão todos os arquivos de redux da aplicação
- Vamos criar um arquivo `index.js` para criar a configuração inicial do redux:
```js
import { createStore } from 'redux';
const store = createStore();
export default store;
```

- Agora em `App.js` vamos importar o react-redux para deixar o redux disponível para todos os componentes da aplicação:
```js
import { Provider } from 'react-redux';
import store from './store';
...
return (
  <Provider store={store}>
  ...
  </Provider>
);
```

- Feito isso, vamos criar o diretório `store > modules`, onde ficará cada reducer da aplicação. Neste exemplo criaremos `cart > reducer.js`:
```js
export default function cart() {
  return[];
}
```
- Agora, vamos agrupar todos os reducers da aplicação em um novo arquivo no diretório `store > modules` chamado `rootReducer.js`:
```js
import { combineReducers } from 'redux';

import cart from './cart/reducer';

// All reducers
export default combineReducers({
  cart,
});
```

- Feito isso, podemos importar `rootReducer.js` em `modules > index.js`:
```js
import rootReducer from './modules/rootReducer';

const store = createStore(rootReducer);
```

### Conectando state local ao reducer
- Em nossa página `Home > index.js` vamos conectar o estado local do componente com o estado do redux:
```js
import { connect } from 'react-redux';
...
class Home extends Component {
...
}
// Exportando o componente
export default connect()(Home);
```

### Disparando uma action
- Utilizamos o `dispatch` para disparar uma action ao redux:
```js
handleAddProduct = (product) => {
  const { dispatch } = this.props;
  dispatch({
    type: 'ADD_TO_CART',
    product,
  });
}
```

### Recebendo os dados no reducer
- O nosso arquivo de `reducer.js` de `store > modules > cart` ficará da seguinte forma:
```js
export default function cart(state = [], action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [ ... state, action.product ];
    default:
      return state;
  }
}
```

### Acessando informações do reducer de outro componente
- Vamos no componente onde queremos capturar essa informação, neste exemplo será o `Header`:
```js
import { connect } from 'react-redux';
...
function Header({ cart }) {
  ...
}
...
export default connect((state) => ({
  cart: state.cart,
}))(Header);
```
- Sempre que utilizamos o `connect()` no componente , quando o estado de `cart` passado dentro do connect sofrer alguma alteração, o componente irá renderizar e atualizar completamente

## Reactotron + Redux
- Ótimo para debugar o estado dentro do Redux
- Instalando junto com a integração com Redux `yarn add reactotron-react-js reactotron-redux`
- Vamos criar `src > config > ReactotronConfig.js`:
```js
import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
if (process.env.NODE_ENV === 'development') {
  const tron = Reactotron.configure().use(reactotronRedux()).connect();
  tron.clear();
  console.tron = tron;
}
```
- Agora em `src > store > index.js`, vamos inserir:
```js
const enhancer = process.env.NODE_ENV === 'development' ? console.tron.createEnhancer() : null;
const store = createStore(rootReducer, enhancer);
```
- E por fim, importar em `App.js`:
```js
import './config/ReactotronConfig';
```

## Immer
- O immer é uma ferramenta para facilitar a lidar com objetos e arrays que são imutáveis no React ou qualquer outra ferramenta que utilize `javascript`
- Com o immer conseguimos criar um rascunho chamado de `draft state` do estado atual com as alterações desejadas, que depois será aplicada no estado principal, sem ferir os conceitos da imutabilidade
- Pode ser acessado pela sua [documentação](https://immerjs.github.io/immer/)
- Instalando `yarn add immer`

# React Hooks
- Nova api do React a partir da versão 17
- Diminui a verbosidade entre passagem de `props` e informações do `state` e `life cycle` entre os componentes
- Utiliza `function components` somente
- Interessante para se estudar, porém a grande maioria no mercado ainda deve utilizar `class components`