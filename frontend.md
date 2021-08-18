# Frontend
Montagem de frontend consumindo a api desenvolvida em node.js

## Rocketseat ReactJS snippets
- Vamos utilizar as extensões do VScode disponibilizadas pela Rocketseat para criar componentes entre outras coisas de maneira ágil, assim como no html por exemplo há o `tag.classe`
- Criar um functionar component: `rfc`

## Conceitos React
- Componentização: separar blocos de códigos estruturais / estilização / comportamentos em componentes, para serem reutilizados sem interferir na lógica da aplicação;
- Propriedades;
- Estados: são variáveis do javascript, de um componente a qual são manipuladas pelo mesmo, essas são chamadas de estado;
- Ciclo de vida;
- Debugs;
- JSX (HTML no Javascript);
- React, ReactJS, React-Native: quando falamos somente de React, se referimos a biblioteca que utiliza estrutura de componentização, programação declarativa, propriedades, estados, etc para montar a interface;
- Extremamente flexível, por se tratar de um framework, frontend, torna-o muito mais organizado, podendo consumir qualquer API por JSON ou outro padrão de envio de dados;
- Programação declarativa;
- Webpack:
  * Criação do bundle, um único arquivo com todo código transpilado (CommonJS) da aplicação;
  * Ensina ao JavaScript como importar arquivos CSS, imagens, etc;
  * Live reload com Webpack Dev Server;
  * São configurados diversos módulos (loaders), para lidar com imagens, reload, css, vídeos, etc;
- Babel:
  * Responsável por converter o código JS ES6 de uma forma que o browser entenda, pois o browser não entende esse código;
## Entendendo estrutura e funcionamento Babel / Webpack
- Vamos criar uma nova pasta `mkdir modulo04`
- Iniciando um novo projeto `yarn init -y`
- Instalando o babel, suas funcionalidades com react e o webpack `yarn add @babel/core -D @babel/preset-env -D @babel/preset-react -D webpack webpack-cli -D`
- Vamos utilizar o babel loader `yarn add babel-loader -D`
- Instalando o react `yarn add react react-dom`

### Configurando Babel
- Vamos criar um arquivo `babel.config.js`
```js
module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
};
```

### Configurando Webpack
- Vamos criar um arquivo `webpack.config.js`
```js
const path = require('path');
module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
```

- Vamos criar a pasta `src` onde ficará todo o código javascript. Dentro de `src` vamos criar o arquivo `index.js`, que será o arquivo de entrada da aplicação (tudo irá passar por ele); 
- Vamos criar também a pasta `public`, onde ficará o código bundle, que é o código javascript transpilado, gerado pelo Webpack;
- Vamos inserir no `package.json` um script para montar o nosso código javascript em um código que o navegador entenda:
```json
{
  "scripts" : {
    "build": "webpack --mode production"
  },
}
```
- Vamos criar um novo arquivo em `public > index.html` e importar o `bundle.js`:
```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modulo 04</title>
</head>
<body>
  <div id="app"></div>
  <script src="./bundle.js"></script>
</body>
</html>
```

### Configurando o Live Reload do Webpack
- Instalando o Webpack `yarn add webpack-dev-server -D`
- Vamos incluir uma configuração no `webpack.config.js`, logo abaixo de `output`:
```js
...
devServer: {
  contentBase: path.resolve(__dirname, 'public'),
},
```
- E vamos criar um novo script no `package.json`:
```json
{
"dev": "webpack serve --mode development"
}
```

## Criando componente raiz
- Nossa aplicação já entende código react graças ao `preset` no `babel.config.js`;
- Vamos iniciar no `index.js`:
```js
import React from 'react';
import { render } from 'react-dom';
// Components
import App from './app';
render(<App />, document.getElementById('app'));
```
- Depois criar o componente principal em `src > App.js`:
```js
import React from 'react';
function App() {
  return <h1>Opa</h1>;
}
export default App;
```

## Importando CSS
- Vamos instalar 2 novos loaders: `yarn add style-loader css-loader -D`
- Também vamos criar uma nova rule dentro de `webpack.config.js`:
```js
{
  test: /\.css$/,
  exclude: /node_modules/,
  use: [
    { loader: 'style-loader' },
    { loader: 'css-loader' },
  ],
}
```
- E por fim criar um arquivo `src > App.css` e importá-lo de dentro do `App.js`:
```js
import './App.css';
``` 

## Importando imagens
- Vamos instalar o loader `yarn add file-loader -D`;
- Vamos criar uma nova rule novamente em `webpack.config.js`:
```js
{
  test: /.*\.(gif|png|jpe?g)$/i,
  use: {
    loader: 'file-loader',
  },
}
```
- Vamos criar um novo diretório `src > assets` para receber as imagens;
- Vamos agora importar e retornar essa imagem dentro do projeto em `src > App.js`:
```js
import profile from './assets/profile.jpeg';
...
return <img src={profile} />;
```

## Class components
- Vamos criar um novo diretório em `src > components`;
- Nele vamos criar um novo componente de exemplo: `TechList.js`:
- No formato de classe podemos manipular o `state`
- Obrigatoriamente temos que utilizar o método `render()`, por onde será retornado todo conteúdo `JSX`
```js
import React, { Component } from 'react';

class TechList extends Component {
  state = {
    techs: [
      'Node.js',
      'ReactJS',
      'Javascript',
    ]
  };
  render() {
    console.log(this.state);
    return (
      <ul>
        <li>Node.js</li>
        <li>ReactJS</li>
        <li>Javascript</li>
      </ul>
    );
  }
}

export default TechList;
```
- E tambéem vamos importá-lo e retorná-lo dentro de `App.js`:
```js
import TechList from './components/TechList';
...
return <TechList />;
```

## State e imutabilidade
- O state é utilizado para armazenar informações em um componente. Portanto, pode ser utilizado somente em Class Components
- Sua declaração é da seguinte forma no início da classe do componente
```js
 state = {
    newTech: '',
    techs: [
      'Node.js',
      'ReactJS',
      'React Native',
    ]
  };
```

### Manipulando o state
- O state é imutável, portanto deve ser atualizado através do método `setState()`
- Todas as `functions` de manipulação do state **devem** estar no mesmo arquivo do componente onde foi declarado o state
- Ao manipular um array ou objeto do state:
  * Devemos remontá-lo **completamente**, atualizando **todos** os seus valores
- Ao deletar um item de um array no state:
  * Utilizamos o método `filter()` do javascript
```js
handleInputChange = (e) => {
  this.setState({ newTech: e.target.value });
}

// Insert new state item
handleSubmit = (e) => {
  e.preventDefault();
  this.setState({ techs: [... this.state.techs, this.state.newTech],
  newTech: ''
  })
}

// Remove state item
handleDelete = (tech) => {
  this.setState({ techs: this.state.techs.filter(t => t !== tech) });
}
```

## React Props
- As propriedades (props), são 'argumentos' que passamos para o componente React em sua declaração no `JSX`
- Podem receber qualquer nome desejado em sua declaração, exemplo, onde `tech` e `onDelete` são componentes:
```js
<TechItem key={tech} tech={tech} onDelete={() => this.handleDelete(tech)} />
```
- Assim, podemos capturar essa informação dentro do componente através dos parâmetros da função:
```js
function TechItem({ tech, onDelete }) {
  return (
    <li>
      {tech}
      <button type="button" onClick={onDelete}>Remover</button>
    </li> 
  );
}
```

### Configurando DefaultProps
- Os defaultProps são valores padrão que definimos quando não é passado a propriedade para o componente
```js
// Definindo no formato de função:
TechItem.defaultProps = {
  tech: 'Oculto',
};
// Definindo no formato de classe:
static defaultProps = {
  ...
};
```
### Configurando PropTypes
- Conseguimos reconhecer o time de uma propriedade passada no componente React através de uma biblioteca, então vamos instalá-la com: `yarn add prop-types`
- Agora podemos importar PropTypes em nosso componente que recebe propriedades:
```js
import PropTypes from 'prop-types';

// Definindo no formato de função:
TechItem.PropTypes = {
  tech: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};
// Definindo no formato de classe:
static propTypes = {
  ...
}
```

## Ciclo de vida dos componentes
- Determina-se do momento em que é montado, atualizado ou até mesmo apagado da interface do usuário
- Pode-se entender por métodos de um Class Component:
```js
// Executado assim que o componente aparece em tela (no momento em que é montado)
componentDidMount() {
}
// Executado sempre que houver alterações nas props ou no state do componente
componentDidUpdate(prevProps, prevState) {
}
// Executado quando o componente deixa de existir
componentWillUnmount() {
}
```

### Utilizando Local Storage
- Banco de dados local do navegador
- Útil para salvar informações de front que não posssuem possíveis alterações constantes
- Vamos montá-lo dentro de `componentDidUpdate()` pois é um método que executa toda vez em que o estado é atualizado. Caso fizéssemos dentro de cada método de manipulação do state (handleSubmit, handleDelete...), começaria a se tornar redundante o código, com diversos `localStorage.setItem`:
```js
// Verifica se há algo em localStorage para preencher o state
componentDidMount() {
  const techs = localStorage.getItem('techs');
  if (techs) {
    this.setState({ techs: JSON.parse(techs) });
  }
}
// Atualiza o localStorage com qualquer alteração no componente
componentDidUpdate(_, prevState) {
  if (prevState.techs !== this.state.techs) {
    localStorage.setItem('techs', JSON.stringify(this.state.techs));
  }
}
```

# Criando um projeto react do zero
- Iremos construir uma aplicação mais robusta
- Conteitos:
  * Padronização de código;
  * Navegação;
  * Styled components;
  * Local storage;
  * Requisições HTTP;
- Podemos executar um comando do react que cria todo o projeto com webpack, babel configurado já: `yarn create react-app modulo05`
- Agora as configurações de webpack e babel ficam dentro da dependência `react-scripts` no `package.json`
- Commandos:
  * `yarn start` para rodar em ambiente de desenvolvimento
  * `yarn build` para produção
  * `yarn test` para rodar testes
  * `yarn eject` caso precisemos realizar alguma configuração específica no webpack ou no babel, o react-scripts irá ejetar essas configurações para o nosso projeto para manusearmos
- Vamos remover as configurações de `"eslintConfig"` no `package.json`
- Como não estamos vendo PWAs neste módulo, pdoemos acessar `public` e deletar o `manifest.json` e remover a tag no `index.html` que referencia o manifest
- Vamos zerar todo o conteúdo do projeto deletando os seguintes arquivos:
  * `App.css`
  * `App.test.js`
  * `index.css`
  * `logo.svg`
  * `serviceWorker.js` ? (Exclusivo para PWAs mas. Não vem mais por padrão);

## Configurando padronização de código
- Configurando o padrão de escrita de código do projeto (style guide) com  ESLint, Prettier e EditorConfig
> Modulo 5, aula 2
- Aqui estamos trabalhando somente com o editorconfig

## Roteamento no React
- Para construir uma SPA (Single Page Application), é necessário fazer o roteamento no React
- Vamos adicionar o módulo `yarn add react-router-dom`
- Vamos criar os seguintes diretórios:
  * Arquivos de rotas em `src > routes.js`:
  ```jsx
  import React from 'react';
  import { BrowserRouter, Switch, Route } from 'react-router-dom';

  import Main from './pages/Main';
  import Repository from './pages/Repository';

  function Routes() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/repository" component={Repository} />
        </Switch>
      </BrowserRouter>
    );
  }
  export default Routes;
  ```
  * Pasta de páginas da aplicação `src > pages`
    * Pasta `src > pages > Main`, com um arquivo `index.js`:
    * Pasta `src > pages > Repository`, com um arquivo `index.js`
    > Vamos criar estes dois funcional components com o snippet `rfc`
  * Por fim, vamos importar o `routes.js` no `App.js`

## Styled Components
- Útil para fazer estilização CSS escopado (entre componentes apenas)
> Detalhe: importante ter a extensão do styled-components no vscode para que ele entenda a sintaxe css dentro de arquivos javascript
- Vamos instalá-lo com `yarn add styled-components`
- No exemplo, vamos criar um arquivo em `src > pages > Main > styles.js`
```js
import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 24px;
  /* Conseguimos controlar propriedades do css baseado nas props que o componente recebe */
  color: ${props => (props.error ? 'red' : '#7159c1')};
  font-family: Arial, Helvetica, sans-serif;

  small {
    font-size: 14px;
    color: #85a3cc;
  }
`;
```
- Depois, vamos importá-lo como um componente no nosso arquivo em `src > pages > Main > index.js`, por isso o nome `styled-components`:
```js
import React from 'react';
import { Title } from './styles';

function Main() {
  return (
    // Conseguimos manipular estilizações css passando nas props do componente
    <Title error={false}>
      Main
      <small>Eu odeio styled components</small>
    </Title>
  );
}
export default Main;
```

## Criando um global style no Styled Components
- Vamos criar um novo diretório e um arquivo em `src > styles > global.js`:
```js
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  html, body, #root {
    min-height: 100%;
  }
  body {
    background: #00bfff;
    -webkit-font-smoothing: antialiased !important;
  }
  body, input, button {
    color: #222;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
  }
  button {
    cursor: pointer;
  }
`;
```

- Agora em `App.js`, vamos importar o nosso `createGlobalStyle`:
```js
import GlobalStyle from './styles/global';
...
  return (
    <>
    <Routes />
    <GlobalStyle />
    </>
  );
```

## Utilizando ícones no React
- Instalando pacotes com as principais bibliotecas de ícones como font awesome, material icons, ionicons, etc: `yarn add react-icons`

## Consumindo uma API no React
- Há diversas formas de se consumir uma API. Há a API padrão do navegador chamada `fetch`, que serve para consumir um recurso externo via REST
- Neste caso vamos utilizar uma biblioteca auxiliar chamada axios com `yarn add axios`. Utilizaremos ela tanto na Web quanto no Mobile
- Vamos criar um arquivo num diretório novo em `src > services > api.js`:
```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
});

export default api;
```

- Criada essa configuração inicial, vamos importar essa api em nosso arquivo `Main > index.js`:
```js
import api from '../../services/api';
...
const response = await api.get(`/repos/${newRepo}`);
```