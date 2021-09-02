import styled from 'styled-components/native';

// As diferenças do styled components do ReactJS para o Native é na importação, é necessário o '/native' e não há mais elementos html como h1, div, etc...
export const Container = styled.View`
/* Por padrão os components são display: flex no react native, então geralmente no container basta inserir um flex 1 para ele ocupar toda a tela */
  flex: 1;
  padding: 30px;
  background: #fff;
  /* Encadeamento aqui não funciona, os global styles também não funcionam, no body da aplicação por exemplo */
`;

// O React Native não tem componente de form, vamos utilizar uma View
export const Form = styled.View`
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  height: 40px;
  background: #eee;
  border-radius: 4px;
  padding: 0 15px;
  border: 1px solid #eee;
`;

// Há diversas formas de criar um botão no React Native, no nosso caso vamos utilizar a biblioteca react-native-gesture-handler que instalamos anteriormente. Ela possui botões integrados dentro dela extremamente acessíveis entre cada plataforma, então são botões que vão se estilizar automaticamente entre Android e IOS
// Como o 'RectButton' não é um componente padrão, temos que colocá-lo entre parênteses. Esta é uma vantagem do styled components, conseguimos estilizar componentes que são importados de outras ferramentas
export const SubmitButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background: #5dd2f8;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 12px;
  opacity: ${props => (props.loading ? 0.7 : 1)};
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const User = styled.View`
  align-items: center;
  margin: 0 20px 30px;
`;

export const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  /* Aqui a porcentagem não funciona */
  border-radius: 40px;
  /* Um background na imagem, serve para quando a imagem não tiver carregado ainda */
  background: #eee;
`;

export const Name = styled.Text`
  font-size: 14px;
  color: #333;
  font-weight: bold;
  margin-top: 4px;
  /* O text align center é necessário pois caso haja mais de uma linha não alinharia o texto e sim o componente*/
  text-align: center;
`;

export const Bio = styled.Text.attrs({
  // Este é um atributo do componente text que deixa somente o número determinado de linhas aparecendo, caso ultrapasse isso utiliza reticências
  numberOfLines: 2,
})`
  font-size: 13px;
  line-height: 18px;
  color: #999;
  margin-top: 5px;
  text-align: center;
`;

export const ProfileButton = styled.TouchableOpacity`
  margin-top: 10px;
  align-self: stretch;
  border-radius: 4px;
  background: #5dd2f8;
  justify-content: center;
  align-items: center;
  height: 36px;
`;

export const ProfileButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
`;

