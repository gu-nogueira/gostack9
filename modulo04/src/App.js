// Criando o primeiro componente React
// Mesmo não utilizando o React, em todo lugar que se utiliza a sintaxe JSX é necessário importá-lo
import React from 'react';
import './App.css';

import TechList from './components/TechList';

// Daremos um nome para a imagem, toda imagem precisa de um nome
// import profile from './assets/profile.jpeg';

// Existem várias maneiras de se criar um componente React, a mais simples é criando uma função

function App() {
  // sintaxe do jsx, para inserir uma variável = '{var}'
  return <TechList />;
}

export default App;