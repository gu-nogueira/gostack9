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

## React Hooks
- Nova api do React a partir da versão 17
- Diminui a verbosidade entre passagem de `props` e informações do `state` e `life cycle` entre os componentes
- Utiliza `function components` somente
- Interessante para se estudar, porém a grande maioria no mercado ainda deve utilizar `class components`