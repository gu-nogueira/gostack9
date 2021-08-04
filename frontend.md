# Frontend
Montagem de frontend consumindo a api desenvolvida em node.js

## Conceitos React
- Componentização: separar blocos de códigos estruturais / estilização / comportamentos em componentes, para serem reutilizados sem interferir na lógica da aplicação;
- Propriedades;
- Estados;
- Ciclo de vida;
- Debugs;
- JSX (HTML no Javascript);
- React, ReactJS, React-Native: quando falamos somente de React, se referimos a biblioteca que utiliza estrutura de componentização, programação declarativa, propriedades, estados, etc para montar a interface;
- Extremamente flexível, por se tratar de um framework, frontend, torna-o muito mais organizado, podendo consumir qualquer API por JSON ou outro padrão de envio de dados;
- Programação declarativa;
- Webpack:
  * Criação do bundle, um único arquivo com todo código transpilado da aplicação;
  * Ensina ao JavaScript como importar arquivos CSS, imagens, etc;
  * Live reload com Webpack Dev Server;
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

### Criando componente raiz
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

### Importando CSS
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

### Importando imagens
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