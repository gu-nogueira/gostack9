# Frontend
Montagem de frontend consumindo a api desenvolvida em node.js

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
- Nossa aplicação já entende código react graças ao preset no `babel.config.js`;
- Vamos iniciar no index.js:
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
- Vamos instalar 2 novos loaders: `yarn add style-loader css-loader -D`;
- Também vamos criar uma nova rule dentro de `webpack.config.js`:
```js
{
  test: /\.css$/,
  exclude: /node_modules/,
  use: [
    { loader: 'style-loader'},
    { loader: 'css-loader'},
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