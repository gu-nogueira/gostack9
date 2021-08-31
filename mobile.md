# Mobile
Montagem de aplicativo mobile consumindo a api desenvolvida em node.js
*Observação, para rodar react-native é necessário estar com o ambiente de desenvolvimento configurado e um emulador para rodar a aplicação, consultar em `setup.md`*

## Conceitos React Native
- Versão do React para desenvolvimento mobile;
- Multiplataforma, com um único código rodando Android e IOS;
  * Podemos manipular cada plataforma de forma diferente, com estilizações, APIs, etc;
- Não produz interface híbrida, mas sim nativa, rodando em Java para Android e Objective-C para IOS (vantagem). Diferente do Ionic por exemplo, que renderiza um WebView e renderiza todo código em Web neste WebView (isso faz com que a aplicação perca performance).
- Código não é transpilado como no Xamarin por exemplo. O React Native injeta uma dependência chamada Javascript-Core dentro do celular, assim o celular passa a entender Javascript;
- Muitas plataformas migrando (Microsoft com Windows já possui 40 aplicações rodando React Native);

## Arquitetura do React Native
- O Código Javascript passa por uma ferramenta chamada Metro Bundler (ou packager), que monitora todos os códigos Javascript e gera o código bundle.js (assim como o webpack do ReactJS);
- O bundle.js é repassado para o Bridge do React Native, que faz a ponte do código Javascript para o código nativo (Java, Objective-C);

## Sintaxe
- A declaração de componentes é igual ao ReactJS;
- Não usamos HTML e sim componentes próprios do React Native, a <View /> por exemplo que equivale a uma <div>;
- A estilização deve ser feita em cada componente (não possui estilização própria) e deve ser atribuida pelo atributo 'style ={}' no componente;
- A sintaxe de CSS é bem parecida, a única diferença é o formato Camel Case ao invés de hífen;
  * Isso é possível graças a uma biblioteca do facebook chamada `Yoga`, ela transforma código CSS em estilizações Java e Objective-C;

## Expo
- É uma SDK (conjunto de funcionalidades prontas) para usar câmera, video, integrações...
- Não é necessário configurar emulador, pois há um aplicativo para rodar nativamente React Native que pode ser baixado na play store;
- *Não será utilizado aqui* pois possui uma limitação sobre o controle do código nativo;
- Várias bibliotecas não tem suporte para o Expo;
- Hoje é possível instalar funcionalidades do expo em aplicações que não o utilizam;

# Criando um projeto

## Utilizando NPX
- É possível instalar o react-native-cli usando o `npx` do NPM, que a partir da versão 5 já possibilita utilizá-lo, permitindo acesso a pacotes (CLIs) sem precisar instalá-los na máquina;
- Então: `npx react-native init modulo06`
- Agora podemos rodar dentro da pasta do projeto `npx react-native run-android`

## Instalando o React Native CLI máquina
*ATENÇÃO: Só é possível instalá-lo com yarn após definir as variáveis ambientes do windows, consultar `setup.md`*
- Podemos também instalar a cli globalmente na máquina por `yarn global add react-native-cli`
- Depois, basta criar o projeto com `react-native init modulo06`
- E depois rodá-lo, já com o emulador aberto: `react-native run-android`

Feito isso, caso o metro bundler (terminal) não abra, podemos rodar `react-native start` ou `npx react-native start`
Agora, temos a aplicação instalada no emulador, para rodá-lo novamente, basta iniciar o aplicativo com `react-native start` e abrí-lo manualmente no emulador

### Habilitando o Live Reload
- Com a aplicação rodando, basta apertar `ctrl + M`, ou chacoalhar o celular para abrir um menu e selecionar a opção `Enable Fast Refresh` caso não esteja habilitada

## Console de debug

### Nativo
- No menu de desenvolvimento do aplicativo, basta selecionar a opção Debug, assim abrirá uma aba no navegador com o console, basta acessá-lo normalmente como na web com `ctrl + shift + i`
> Não será utilizado

### Organizando diretórios do projeto
- Vamos criar o diretório `src > index.js` e dentro deste arquivo jogaremos todo conteúdo de `App.js` e deletar o arquivo antigo
- Agora em `index.js` da raíz do projeto, vamos importar `./src` ao invés de `./App`

### Utilizando Reactotron
- Baixar em: [Reactotron](https://github.com/infinitered/reactotron/blob/master/docs/quick-start-react-native.md)
- Pegar a última versão (2.17.1 em 08/2021)
- Agora em nosso projeto vamos instalar a dependência `yarn add reactotron-react-native`
- Vamos criar `src > config > ReactotronConfig.js`:
```js
import Reactotron from "reactotron-react-native";
if (__DEV__) {
  const tron = Reactotron.configure({ /* USB only => */ host: '10.0.10.85' }).useReactNative().connect();
  console.tron = tron;
  tron.clear();
}
```
- E importá-lo em `src > index.js`:
```js
import './config/ReactotronConfig';
```
- Caso não funcione (principalmente no Android), será necessário realizar um redirecionamento de portas do ADB: `adb reverse tcp: 9090 tcp: 9090` ou então pelo caminho `~/Android/Sdk/platform-tools/adb reverse tcp: 9090 tcp: 9090`
- Agora, podemos realizar logs no console com `console.tron.log('Hello World!');`

## React Navigation (rotas)
- Assim como no ReactJS, vamos criar o diretório `src > pages`, onde ficarão contidas todas as telas da aplicação
- Dentro deste diretório vamos criar `Main > index.js` e `Users > index.js`
- Vamos criar os componentes utilizando os snippets da Rocketseat: `rnfc`
- Vamos criar o arquivo `src > routes.js`
- Vamos instalar a biblioteca `yarn add react-navigation` ou (atualizado) `yarn add @react-navigation/native`
- Seguir os passos da [documentação](https://reactnavigation.org/docs/getting-started/)
- Para bibliotecas que solicitam mudanças nativas no código do projeto, devemos remontar a aplicação com `react-native run-android`
- Vamos utilizar a navegação por stack, então `yarn add @react-navigation/native-stack`

# Resolução de problemas
- Grande parte dos problemas com React Native são resolvidos no terminal do Metro Bundler com `react-native start --reset-cache` ou no pior dos casos com `react-native run-android` ou `react-native run-ios`