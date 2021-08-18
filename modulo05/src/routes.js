// Preciso importar o 'React' toda vez que utilizo sintaxe de JSX
import React from 'react';
// O BrowserRouter é um dos tipos de roteadores disponibilizados pelo react-router-dom, este é o padrão onde acessamos por: 'dominio.com/exemplo'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Importando as nossas páginas de Main e Repository
import Main from './pages/Main';
import Repository from './pages/Repository';

// Tudo dentro do React é componente, então cada rota da nossa aplicação será um componente
function Routes() {
  return (
    // Precisamos que o BrowerRouter esteja por volta de todos os nossos componentes que vão utilizar rotas
    <BrowserRouter>
      {/* Este componente 'Switch' garante que apenas uma rota seja chamada por momento. O que acontece no react-router-dom é que ele tem o poder de chamar mais de uma rota ao mesmo tempo */}
      <Switch>
        {/* O 'exact' entra pois o 'react-router-dom' procura pelas rotas que começam pelo parâmetro informado. Quando queremos procurar por uma rota exata temos que passar ele */}
        <Route path="/" exact component={Main} />
        {/* Cada 'Route' representa agora uma página da nossa aplicação, quando o usuário acessar o 'path="/repository"', irá acessar o componente 'Repository' */}
        <Route path="/repository" component={Repository} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
