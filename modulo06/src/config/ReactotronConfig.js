import Reactotron from "reactotron-react-native";
// Esta é uma variável global do react native, que retorna 'true' quando o usuário está emulando a aplicação em ambiente de desenvolvimento
if (__DEV__) {
  // Caso esteja utilizando USB, é necessário inserir a opção 'host' no '.configure()'
  const tron = Reactotron.configure({ host: '10.0.10.85' }).useReactNative().connect();
  // Aqui pegamos a variável global 'console' do javascript e inserimos o .tron para facilitar o debug
  console.tron = tron;
  // OPCIONAL: Limpa o hitórico de eventos no Reactotron
  tron.clear();
}
