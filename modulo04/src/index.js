import React from 'react';
// Vamos importar de dentro do react-dom, que é o responsável por lidar com a árvore de elementos web o render, que é responsável por renderizar um componente react dentro do html
import { render } from 'react-dom';

// Componentes
import App from './app';

// Dentro de render podemos colocar conteúdo JSX como primeiro parâmetro
// Como segundo parâmetro onde ele deve jogar este conteúdo

// Esse é o formato dos componentes, como uma tag html
render(<App />, document.getElementById('app'));